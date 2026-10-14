/**
 * Turn high-resolution source images into web-ready WebP files.
 *
 *   node tools/optimize-images.mjs <source-folder> <project-slug>
 *
 * Example:
 *   node tools/optimize-images.mjs ~/Desktop/new-project-renders my-new-project
 *
 * For every .png / .jpg / .jpeg / .webp / .tif in <source-folder> it writes two files to
 * public/images/projects/<project-slug>/:
 *
 *   <name>.webp     large version (fits inside 2000 x 2400 px) — used on project pages and in the lightbox
 *   <name>-sm.webp  small version (fits inside 900 x 1100 px)  — used for thumbnails and on phones
 *
 * Name your source files descriptively (e.g. "courtyard-view.png"), because the file name becomes the image name.
 * Drawings (file names containing plan, section, elevation, detail, axonometric, diagram, survey, massing,
 * analysis or site) are saved at higher quality so that fine linework and small text stay legible.
 *
 * Requires the "sharp" package, which is only needed for this tool, not for building the site:
 *   npm install --no-save sharp
 */
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error('This tool needs the "sharp" package. Install it with:  npm install --no-save sharp');
  process.exit(1);
}

const [, , srcDir, slug] = process.argv;
if (!srcDir || !slug) {
  console.error("Usage: node tools/optimize-images.mjs <source-folder> <project-slug>");
  process.exit(1);
}

const outDir = path.join(root, "public", "images", "projects", slug);
await mkdir(outDir, { recursive: true });

const DRAWING = /(plan|section|elevation|detail|axonometric|diagram|survey|massing|analysis|site|sequence)/i;
const files = (await readdir(srcDir)).filter((f) => /\.(png|jpe?g|webp|tiff?)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const quality = DRAWING.test(name) ? 90 : 80;
  const input = path.join(srcDir, file);
  const isSwatch = name.startsWith("swatch-");

  if (!isSwatch) {
    await sharp(input)
      .resize({ width: 2000, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(path.join(outDir, `${name}.webp`));
  }
  await sharp(input)
    .resize({ width: isSwatch ? 360 : 900, height: isSwatch ? 360 : 1100, fit: "inside", withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(path.join(outDir, `${name}${isSwatch ? "" : "-sm"}.webp`));

  console.log(`✓ ${slug}/${name}.webp`);
}
console.log(`\nDone. Reference the images in src/content/projects.mjs as "${slug}/<name>".`);
