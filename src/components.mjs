/** Reusable page components. */
import { html, raw } from "./lib/html.mjs";
import { img } from "./lib/images.mjs";
import { categories } from "./content/projects.mjs";

export const categoryLabels = (p) => p.categories.map((c) => categories[c] ?? c);

/** Short line under a project title: "Student housing · Ile-Ife, Osun State, Nigeria · 2026" */
export const projectLine = (p) => {
  const type = (p.meta.find(([k]) => k === "Type") || [])[1];
  return [type, p.location, p.year].filter(Boolean).join(" · ");
};

/**
 * Project card used on the home page and the Work index.
 * variant: "feature" (home, keeps the image's own proportions) or "index" (uniform 4:3 crop)
 */
export function projectCard(p, { variant = "index", sizes = "(min-width: 900px) 50vw, 100vw", eager = false, image } = {}) {
  const cover = image || p.cover;
  return html`<article class="card card-${variant}" data-categories="${p.categories.join(" ")}">
  <a class="card-link" href="/work/${p.slug}/">
    <div class="card-media">${img(cover.src, cover.alt, { sizes, eager })}</div>
    <div class="card-body">
      <p class="card-number" aria-hidden="true">${p.number}</p>
      <div>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-sub">${p.subtitle}</p>
      </div>
      <p class="card-meta">${projectLine(p)}</p>
      ${variant === "feature" ? html`<p class="card-summary">${p.summary}</p>` : ""}
      <span class="card-cta" aria-hidden="true">View project <span class="arrow">→</span></span>
    </div>
  </a>
</article>`;
}

export function pageIntro({ eyebrow, title, lede, id = "page-title" }) {
  return html`<header class="page-intro wrap">
  ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ""}
  <h1 id="${id}" class="page-title">${title}</h1>
  ${lede ? html`<p class="lede">${lede}</p>` : ""}
</header>`;
}

export function contactCta(email) {
  return html`<section class="cta wrap" aria-labelledby="cta-title">
  <p class="eyebrow">Contact</p>
  <h2 id="cta-title" class="cta-title">Have a project, collaboration or opportunity in mind?</h2>
  <div class="cta-actions">
    ${email ? html`<a class="cta-email" href="mailto:${email}">${email}</a>` : ""}
    <a class="button button-ghost" href="/contact/">Get in touch <span aria-hidden="true">→</span></a>
  </div>
</section>`;
}

const figure = (image, sizes) =>
  html`<figure class="figure">${img(image.src, image.alt, { sizes, zoom: true })}${
    image.caption ? html`<figcaption>${image.caption}</figcaption>` : ""
  }</figure>`;

const paragraphs = (body) => (body || []).map((t) => html`<p>${t}</p>`);
const bullets = (list) => (list?.length ? html`<ul class="bullets">${list.map((t) => html`<li>${t}</li>`)}</ul>` : "");

/** Render one content block from projects.mjs. */
export function block(b) {
  switch (b.type) {
    case "text":
      return html`<section class="block block-text wrap">
  <h2 class="block-heading">${b.heading}</h2>
  <div class="prose">${paragraphs(b.body)}${bullets(b.list)}</div>
</section>`;

    case "image": {
      const sizes = { full: "100vw", wide: "(min-width: 1200px) 1100px, 100vw", medium: "(min-width: 900px) 760px, 100vw", narrow: "(min-width: 700px) 560px, 100vw" }[b.size || "wide"];
      return html`<div class="block block-image block-image-${b.size || "wide"}">${figure(b.image, sizes)}</div>`;
    }

    case "gallery": {
      const cols = b.columns || 2;
      return html`<div class="block block-gallery wrap cols-${cols}">${b.images.map((i) =>
        figure(i, cols === 3 ? "(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw" : "(min-width: 700px) 50vw, 100vw")
      )}</div>`;
    }

    case "split":
      return html`<section class="block block-split wrap${b.reverse ? " is-reversed" : ""}">
  <div class="split-text">
    <h2 class="block-heading">${b.heading}</h2>
    <div class="prose">${paragraphs(b.body)}${bullets(b.list)}</div>
  </div>
  <div class="split-media">${figure(b.image, "(min-width: 900px) 58vw, 100vw")}</div>
</section>`;

    case "key":
      return html`<section class="block block-key wrap" aria-label="${b.heading}">
  <h2 class="key-heading">${b.heading}</h2>
  <ol class="key-list">${b.items.map((t) => html`<li>${t}</li>`)}</ol>
</section>`;

    case "parts":
      return html`<section class="block block-parts wrap">
  <h2 class="block-heading">${b.heading}</h2>
  <ol class="parts-list">${b.items.map((i) => html`<li><h3>${i.title}</h3><p>${i.text}</p></li>`)}</ol>
</section>`;

    case "materials":
      return html`<section class="block block-materials wrap">
  <div class="split-text">
    <h2 class="block-heading">${b.heading}</h2>
    <div class="prose">${paragraphs(b.body)}${bullets(b.list)}</div>
  </div>
  <ul class="swatches">${(b.swatches || []).map(
    (s) => html`<li>${img(s.src, "", { sizes: "160px", smRef: null })}<span>${s.label}</span></li>`
  )}</ul>
</section>`;

    default:
      throw new Error(`Unknown block type "${b.type}"`);
  }
}

export { raw };
