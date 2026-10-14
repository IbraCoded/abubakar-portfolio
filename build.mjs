/**
 * Build the static site into ./dist
 *
 *   node build.mjs                 build
 *   SITE_URL=https://example.com node build.mjs   build with a known domain (enables canonical URLs + sitemap)
 *
 * No dependencies — runs on any machine with Node.js 18 or newer.
 */
import { rm, mkdir, cp, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./src/content/site.mjs";
import { projects } from "./src/content/projects.mjs";
import { layout } from "./src/layout.mjs";
import { setPublicDir, missingImages } from "./src/lib/images.mjs";
import { homePage, workPage, projectPage, aboutPage, cvPage, contactPage, notFoundPage } from "./src/pages.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(root, "public");
const DIST = path.join(root, "dist");
setPublicDir(PUBLIC);

const siteUrl = (process.env.SITE_URL || site.url || "").replace(/\/+$/, "");

// ---- sanity checks on content -------------------------------------------------
const slugs = new Set();
for (const p of projects) {
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Project slug "${p.slug}" may only contain a-z, 0-9 and hyphens.`);
  if (slugs.has(p.slug)) throw new Error(`Two projects share the slug "${p.slug}".`);
  slugs.add(p.slug);
}

// ---- output -------------------------------------------------------------------
await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(PUBLIC, DIST, { recursive: true });
await cp(path.join(root, "src", "assets"), path.join(DIST, "assets"), { recursive: true });

const assetVersion = createHash("sha1")
  .update(await readFile(path.join(root, "src/assets/styles.css")))
  .update(await readFile(path.join(root, "src/assets/site.js")))
  .digest("hex")
  .slice(0, 8);

const ctx = {
  siteUrl,
  assetVersion,
  shareImageFor: (slug) => (existsSync(path.join(PUBLIC, "images/share", `${slug}.jpg`)) ? `/images/share/${slug}.jpg` : site.shareImage),
};

const pages = [homePage(ctx), workPage(ctx), ...projects.map((p, i) => projectPage(p, i, ctx)), aboutPage(ctx), cvPage(ctx), contactPage(ctx)];
const notFound = notFoundPage(ctx);

async function writePage(page) {
  const file = page.path.endsWith(".html") ? path.join(DIST, page.path) : path.join(DIST, page.path, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, layout(page, ctx).toString());
}

for (const page of pages) await writePage(page);
await writePage(notFound);

// ---- robots.txt + sitemap.xml -------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
if (siteUrl) {
  const urls = pages.map((p) => `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  await writeFile(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}
await writeFile(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`);

// ---- report -------------------------------------------------------------------
console.log(`✓ Built ${pages.length + 1} pages into dist/`);

if (missingImages.size) {
  console.error(`\n✗ ${missingImages.size} image(s) referenced in the content could not be found:`);
  for (const m of missingImages) console.error(`   public${m}`);
  process.exit(1);
}

const todo = [];
if (!siteUrl) todo.push("Site URL — set `url` in src/content/site.mjs (or SITE_URL) to enable canonical URLs, full link previews and sitemap.xml");
for (const [k, v] of Object.entries(site.social)) if (!v) todo.push(`${k} profile URL — hidden until added in src/content/site.mjs`);
if (todo.length) {
  console.log("\nStill to fill in (the site works without these):");
  for (const t of todo) console.log(`  • ${t}`);
}
