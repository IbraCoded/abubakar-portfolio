/** Image helpers: resolve project image references and read their pixel sizes (no dependencies). */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { html } from "./html.mjs";

let PUBLIC_DIR = "public";
export const setPublicDir = (dir) => (PUBLIC_DIR = dir);

const sizeCache = new Map();
export const missingImages = new Set();

/** Read width/height from a WebP, PNG or JPEG file header. */
export function imageSize(file) {
  if (sizeCache.has(file)) return sizeCache.get(file);
  const b = readFileSync(file);
  let size = null;
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8X") size = { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    else if (chunk === "VP8 ") size = { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    else if (chunk === "VP8L") {
      const bits = b.readUInt32LE(21);
      size = { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  } else if (b.readUInt32BE(0) === 0x89504e47) {
    size = { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  } else if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) break;
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        size = { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
        break;
      }
      i += 2 + len;
    }
  }
  if (!size) throw new Error(`Could not read image size: ${file}`);
  sizeCache.set(file, size);
  return size;
}

/**
 * Resolve an image reference.
 *  - "ile-akekoo/courtyard-view"  → public/images/projects/ile-akekoo/courtyard-view(.webp | -sm.webp)
 *  - "/images/profile/x.webp"     → used as-is (absolute path inside public/)
 */
export function resolveImage(ref, smRef) {
  const isPath = ref.startsWith("/");
  const large = isPath ? ref : `/images/projects/${ref}.webp`;
  const small = smRef !== undefined ? smRef : isPath ? null : `/images/projects/${ref}-sm.webp`;
  const largeFile = path.join(PUBLIC_DIR, large);
  if (!existsSync(largeFile)) {
    missingImages.add(large);
    return null;
  }
  const out = { src: large, ...imageSize(largeFile), srcset: null };
  if (small && existsSync(path.join(PUBLIC_DIR, small))) {
    const sm = imageSize(path.join(PUBLIC_DIR, small));
    out.small = { src: small, ...sm };
    out.srcset = `${small} ${sm.width}w, ${large} ${out.width}w`;
  }
  return out;
}

/**
 * Responsive <img>. Options:
 *   sizes    — CSS sizes hint (default: full viewport)
 *   eager    — load immediately (use for the first visible image only)
 *   zoom     — opens in the lightbox when clicked
 *   cls      — class name
 */
export function img(ref, alt, { sizes = "100vw", eager = false, zoom = false, cls = "", smRef } = {}) {
  const r = resolveImage(ref, smRef);
  if (!r) return html`<div class="img-missing" role="img" aria-label="${alt}">Missing image: ${ref}</div>`;
  const tag = html`<img src="${r.src}"${
    r.srcset ? html` srcset="${r.srcset}" sizes="${sizes}"` : ""
  } width="${r.width}" height="${r.height}" alt="${alt}" ${eager ? html`fetchpriority="high"` : html`loading="lazy"`} decoding="async"${
    cls ? html` class="${cls}"` : ""
  }>`;
  if (!zoom) return tag;
  return html`<a class="zoom" href="${r.src}" data-lightbox data-w="${r.width}" data-h="${r.height}" aria-label="View larger: ${alt}">${tag}</a>`;
}
