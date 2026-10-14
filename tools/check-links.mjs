/**
 * Check every internal link and image in dist/ points at a file that exists.
 *   npm run check
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const exists = async (p) => stat(p).then(() => true, () => false);
async function targetExists(url) {
  const clean = decodeURIComponent(url.split("#")[0].split("?")[0]);
  if (!clean) return true;
  const file = path.join(DIST, clean);
  if (clean.endsWith("/")) return exists(path.join(file, "index.html"));
  return (await exists(file)) || exists(path.join(file, "index.html"));
}

const pages = await walk(DIST);
const broken = [];
const external = new Set();
let checked = 0;

for (const page of pages) {
  const htmlText = await readFile(page, "utf8");
  const urls = [];
  for (const m of htmlText.matchAll(/\s(?:href|src)="([^"]+)"/g)) urls.push(m[1]);
  for (const m of htmlText.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/g)) urls.push(...m[1].split(",").map((s) => s.trim().split(/\s+/)[0]));
  for (const u of urls) {
    if (/^(mailto:|tel:|#|data:)/.test(u)) continue;
    if (/^https?:\/\//.test(u)) {
      external.add(u);
      continue;
    }
    checked++;
    if (!(await targetExists(u))) broken.push(`${path.relative(DIST, page)} → ${u}`);
  }
}

console.log(`Checked ${checked} internal links and images across ${pages.length} pages.`);
if (external.size) console.log(`External links (not checked): ${[...external].join(", ")}`);
if (broken.length) {
  console.error(`\n✗ ${broken.length} broken:`);
  broken.forEach((b) => console.error("  " + b));
  process.exit(1);
}
console.log("✓ No broken internal links.");
