/**
 * Preview the built site locally:  npm start   (builds, then serves dist/ at http://localhost:4321)
 * Behaves like the real host: /work/ile-akekoo/ serves dist/work/ile-akekoo/index.html,
 * and unknown paths get dist/404.html with a 404 status.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = Number(process.env.PORT) || 4321;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".pdf": "application/pdf", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".ico": "image/x-icon",
};

async function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = path.join(DIST, clean);
  if (!file.startsWith(DIST)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = path.join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const urlPath = req.url || "/";
  // Like most static hosts: /work/x → /work/x/
  if (!path.extname(urlPath.split("?")[0]) && !urlPath.split("?")[0].endsWith("/")) {
    const dir = await resolve(urlPath.split("?")[0] + "/");
    if (dir) {
      res.writeHead(301, { Location: urlPath.split("?")[0] + "/" });
      return res.end();
    }
  }
  const file = await resolve(urlPath);
  const target = file || path.join(DIST, "404.html");
  try {
    const body = await readFile(target);
    res.writeHead(file ? 200 : 404, { "Content-Type": TYPES[path.extname(target)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end("Run `npm run build` first.");
  }
}).listen(PORT, () => console.log(`Previewing dist/ at http://localhost:${PORT}  (Ctrl+C to stop)`));
