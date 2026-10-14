/** Shared page shell: <head>, header, footer. */
import { html, raw } from "./lib/html.mjs";
import { site } from "./content/site.mjs";

const NAV = [
  { href: "/work/", label: "Work", key: "work" },
  { href: "/about/", label: "About", key: "about" },
  { href: "/cv/", label: "CV", key: "cv" },
  { href: "/contact/", label: "Contact", key: "contact" },
];

export const MARK = raw(
  `<svg class="mark" viewBox="96 140 1406 680" aria-hidden="true" focusable="false"><path fill="currentColor" d="M96 820 640 140h127v680H477v-90h186V270L208 820zM1502 820 958 140H831v680h290v-90H935V270l455 550z"/></svg>`
);

const ICONS = {
  instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.6 4.77 6v5.46h-4v-4.84c0-1.15-.02-2.64-1.6-2.64-1.62 0-1.86 1.26-1.86 2.56v4.92h-4z"/></svg>`,
  behance: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.2 11.4c.9-.4 1.6-1.2 1.6-2.4C9.8 6.8 8.2 6 6.2 6H1v12h5.4c2.1 0 4-1 4-3.4 0-1.5-.8-2.7-2.2-3.2zM3.4 8h2.5c.9 0 1.6.3 1.6 1.2 0 .9-.6 1.3-1.5 1.3H3.4zm2.7 8H3.4v-3.3h2.8c1.1 0 1.8.5 1.8 1.7S7.2 16 6.1 16zM18.6 9.1c-2.8 0-4.6 2-4.6 4.6 0 2.7 1.7 4.6 4.6 4.6 2.2 0 3.6-1 4.3-3.1h-2.3c-.2.7-1.1 1.1-1.9 1.1-1.4 0-2.2-.8-2.2-2.2H23c.2-2.8-1.3-5-4.4-5zm-2.1 3.6c.1-1.1.8-1.8 2-1.8s1.8.7 1.9 1.8zM15.5 6.7h5.7v1.4h-5.7z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
};

/** Social + email links, skipping any that aren't filled in. */
export function socialLinks({ withEmail = true, cls = "social" } = {}) {
  const items = [];
  if (withEmail && site.contact.email)
    items.push({ href: `mailto:${site.contact.email}`, label: "Email", icon: ICONS.email, ext: false });
  const labels = { instagram: "Instagram", linkedin: "LinkedIn", behance: "Behance" };
  for (const [key, url] of Object.entries(site.social)) {
    if (url) items.push({ href: url, label: labels[key] ?? key, icon: ICONS[key] ?? "", ext: true });
  }
  if (!items.length) return "";
  return html`<ul class="${cls}">${items.map(
    (i) =>
      html`<li><a href="${i.href}"${i.ext ? raw(' target="_blank" rel="noopener noreferrer"') : ""}>${raw(i.icon)}<span>${i.label}</span>${
        i.ext ? html`<span class="visually-hidden"> (opens in a new tab)</span>` : ""
      }</a></li>`
  )}</ul>`;
}

/**
 * Wrap page content in the full HTML document.
 * @param {object} o
 * @param {string} o.title        — page title (site name is appended)
 * @param {string} o.description  — meta description
 * @param {string} o.path         — URL path, e.g. "/work/ile-akekoo/"
 * @param {string} o.active       — nav key to highlight
 * @param {string} o.image        — share image path
 * @param {object[]} o.jsonLd     — structured data objects
 * @param {string} o.body         — page HTML
 * @param {string} o.bodyClass
 * @param {object} ctx            — { siteUrl, assetVersion }
 */
export function layout(o, ctx) {
  const fullTitle = o.title ? `${o.title} — ${site.name}` : `${site.name} — ${site.shortDescriptor}`;
  const description = o.description || site.description;
  const abs = (p) => (ctx.siteUrl ? ctx.siteUrl + p : p);
  const shareImage = o.image || site.shareImage;
  const v = ctx.assetVersion;

  return html`<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
${ctx.siteUrl ? html`<link rel="canonical" href="${abs(o.path)}">` : ""}
${o.noindex ? html`<meta name="robots" content="noindex">` : ""}
<meta name="theme-color" content="#FFFFFF">
<meta name="author" content="${site.fullName}">
<meta property="og:type" content="${o.ogType || "website"}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${o.title || site.name}">
<meta property="og:description" content="${description}">
${ctx.siteUrl ? html`<meta property="og:url" content="${abs(o.path)}">` : ""}
<meta property="og:image" content="${abs(shareImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&display=swap">
<link rel="stylesheet" href="/assets/styles.css?v=${v}">
${o.preload ? html`<link rel="preload" as="image" href="${o.preload.src}"${o.preload.srcset ? html` imagesrcset="${o.preload.srcset}" imagesizes="${o.preload.sizes}"` : ""} fetchpriority="high">` : ""}
${(o.jsonLd || []).map((d) => html`<script type="application/ld+json">${raw(JSON.stringify(d).replace(/</g, "\\u003c"))}</script>`)}
<script>document.documentElement.classList.add("js")</script>
</head>
<body class="${o.bodyClass || ""}">
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="header-inner">
    <a class="brand" href="/" aria-label="${site.name} — home">${MARK}<span class="brand-name">${site.name}</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-toggle>
      <span class="menu-toggle-label">Menu</span><span class="menu-icon" aria-hidden="true"><span></span><span></span></span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul>${NAV.map(
        (n) => html`<li><a href="${n.href}"${o.active === n.key ? raw(' aria-current="page"') : ""}>${n.label}</a></li>`
      )}</ul>
    </nav>
  </div>
</header>
<main id="main" tabindex="-1">
${o.body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-id">
      <a class="brand brand-footer" href="/">${MARK}<span class="brand-name">${site.name}</span></a>
      <p class="muted">${site.shortDescriptor}, ${site.location}.</p>
    </div>
    <nav class="footer-nav" aria-label="Footer">
      <ul>
        <li><a href="/">Home</a></li>
        ${NAV.map((n) => html`<li><a href="${n.href}">${n.label}</a></li>`)}
      </ul>
    </nav>
    <div class="footer-contact">
      ${site.contact.email ? html`<a class="footer-email" href="mailto:${site.contact.email}">${site.contact.email}</a>` : ""}
      ${socialLinks({ withEmail: false })}
    </div>
  </div>
  <div class="wrap footer-base">
    <p class="muted">© ${new Date().getFullYear()} ${site.fullName}.</p>
    <a class="back-to-top" href="#main">Back to top <span aria-hidden="true">↑</span></a>
  </div>
</footer>
<script src="/assets/site.js?v=${v}" defer></script>
</body>
</html>
`;
}
