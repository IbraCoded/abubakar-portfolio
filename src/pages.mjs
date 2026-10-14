/** Page definitions. Each function returns the options passed to layout(). */
import { html, raw } from "./lib/html.mjs";
import { img, resolveImage } from "./lib/images.mjs";
import { site } from "./content/site.mjs";
import { projects, categories } from "./content/projects.mjs";
import { about, capabilities, cv } from "./content/profile.mjs";
import { projectCard, pageIntro, contactCta, block, projectLine, categoryLabels } from "./components.mjs";
import { socialLinks } from "./layout.mjs";

const SOFTWARE = ["AutoCAD", "Revit", "3ds Max", "SketchUp", "Blender", "D5 Render", "Photoshop", "InDesign", "Illustrator"];

function personLd(ctx) {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    alternateName: site.name,
    jobTitle: site.role,
    email: `mailto:${site.contact.email}`,
    ...(ctx.siteUrl ? { url: ctx.siteUrl + "/", image: ctx.siteUrl + site.portrait.src } : {}),
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Ilorin" },
    worksFor: { "@type": "Organization", name: "A.T.O Architects" },
    knowsAbout: ["Architectural design", "Architectural visualisation", "Climate-responsive design", "Technical drafting"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/* ------------------------------------------------------------------ HOME */
export function homePage(ctx) {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const heroProject = featured[0];
  const hero = heroProject.hero;
  const heroImg = resolveImage(hero.src);
  const heroSizes = "(min-width: 900px) 46vw, 100vw";

  const cardImages = {
    // Home cards alternate wide and tall images to give the grid rhythm.
    0: { ratio: "wide" },
    1: { ratio: "tall" },
    2: { ratio: "tall" },
    3: { ratio: "wide" },
  };

  const body = html`
<section class="hero wrap" aria-labelledby="hero-title">
  <div class="hero-text">
    <p class="eyebrow">${site.role} · ${site.location}</p>
    <h1 id="hero-title" class="hero-name">${site.name.split(" ").map((w) => html`<span>${w}</span> `)}</h1>
    <p class="hero-intro">${site.intro}</p>
    <div class="hero-actions">
      <a class="button" href="/work/">View selected work <span aria-hidden="true">→</span></a>
      <a class="link-arrow" href="/about/">About me</a>
    </div>
    <ul class="values" aria-label="Design values">${site.values.map((v, i) => html`<li><span aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${v}</li>`)}</ul>
  </div>
  <figure class="hero-media">
    <a href="/work/${heroProject.slug}/" class="hero-media-link">${img(hero.src, hero.alt, { sizes: heroSizes, eager: true })}</a>
    <figcaption><a href="/work/${heroProject.slug}/">${heroProject.title}</a> — ${heroProject.subtitle.toLowerCase()}, ${heroProject.location.split(",")[0]}, ${heroProject.year}</figcaption>
  </figure>
</section>

<section class="section wrap" aria-labelledby="work-title">
  <div class="section-head">
    <h2 id="work-title" class="section-title">Selected work</h2>
    <a class="link-arrow" href="/work/">All projects</a>
  </div>
  <div class="feature-grid">
    ${featured.map((p, i) =>
      html`<div class="feature-item feature-${i + 1} ratio-${cardImages[i]?.ratio || "wide"}" data-reveal>${projectCard(p, {
        variant: "feature",
        sizes: i === 0 || i === 3 ? "(min-width: 900px) 58vw, 100vw" : "(min-width: 900px) 42vw, 100vw",
      })}</div>`
    )}
  </div>
</section>

<section class="section about-preview wrap" aria-labelledby="about-title">
  <figure class="about-portrait" data-reveal>
    ${img(site.portrait.src, site.portrait.alt, { sizes: "(min-width: 900px) 34vw, 100vw", smRef: site.portrait.srcSm })}
  </figure>
  <div class="about-preview-text" data-reveal>
    <p class="eyebrow">About</p>
    <h2 id="about-title" class="statement">${about.statement}</h2>
    <p class="muted-lg">${about.bio[0]}</p>
    <div class="hero-actions">
      <a class="link-arrow" href="/about/">More about me</a>
      <a class="link-arrow" href="/cv/">Experience and CV</a>
    </div>
  </div>
</section>

<section class="section wrap" aria-labelledby="cap-title">
  <div class="section-head">
    <h2 id="cap-title" class="section-title">What I do</h2>
  </div>
  <ol class="capabilities">
    ${capabilities.map((c) => html`<li data-reveal><h3>${c.title}</h3><p>${c.text}</p></li>`)}
  </ol>
  <p class="tools"><span class="tools-label">Tools</span> ${SOFTWARE.join(" · ")}</p>
</section>

${contactCta(site.contact.email)}
`;

  return {
    path: "/",
    title: "",
    description: site.description,
    active: "",
    bodyClass: "page-home",
    preload: heroImg ? { src: heroImg.src, srcset: heroImg.srcset, sizes: heroSizes } : null,
    jsonLd: [
      personLd(ctx),
      { "@context": "https://schema.org", "@type": "WebSite", name: site.name, ...(ctx.siteUrl ? { url: ctx.siteUrl + "/" } : {}) },
    ],
    body,
  };
}

/* ------------------------------------------------------------------ WORK INDEX */
export function workPage() {
  const used = Object.keys(categories).filter((c) => projects.some((p) => p.categories.includes(c)));
  const body = html`
${pageIntro({
  eyebrow: "Work",
  title: "Selected work",
  lede: "Competition entries, projects in practice and freehand studies — from student housing and cultural buildings to interiors and terrace homes.",
})}
<section class="wrap work-index" aria-labelledby="page-title">
  <div class="filters" role="group" aria-label="Filter projects by category" data-filters hidden>
    <button type="button" class="filter" aria-pressed="true" data-filter="all">All <span class="count">${projects.length}</span></button>
    ${used.map((c) => {
      const n = projects.filter((p) => p.categories.includes(c)).length;
      return html`<button type="button" class="filter" aria-pressed="false" data-filter="${c}">${categories[c]} <span class="count">${n}</span></button>`;
    })}
  </div>
  <p class="visually-hidden" aria-live="polite" data-filter-status></p>
  <div class="index-grid" data-filter-grid>
    ${projects.map((p) => projectCard(p, { variant: "index" }))}
  </div>
</section>
${contactCta(site.contact.email)}
`;
  return {
    path: "/work/",
    title: "Selected work",
    description: `Architecture, interiors and visualisation by ${site.name}: ${projects.map((p) => p.plainTitle || p.title).join(", ")}.`,
    active: "work",
    body,
  };
}

/* ------------------------------------------------------------------ PROJECT */
export function projectPage(p, i, ctx) {
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const heroImg = resolveImage(p.hero.src);
  const body = html`
<article class="project" aria-labelledby="page-title">
  <header class="project-head wrap">
    <a class="back-link" href="/work/"><span aria-hidden="true">←</span> All work</a>
    <div class="project-title-row">
      <p class="project-number" aria-hidden="true">${p.number}</p>
      <div>
        <h1 id="page-title" class="page-title">${p.title}</h1>
        <p class="project-subtitle">${p.subtitle}</p>
      </div>
    </div>
    <dl class="meta-grid">
      ${p.meta.map(([k, v]) => html`<div><dt>${k}</dt><dd>${v}</dd></div>`)}
      <div><dt>Categories</dt><dd>${categoryLabels(p).join(", ")}</dd></div>
    </dl>
  </header>
  <figure class="project-hero">
    ${img(p.hero.src, p.hero.alt, { sizes: "100vw", eager: true, zoom: true })}
  </figure>
  <div class="project-body">
    ${p.blocks.map(block)}
  </div>
  <nav class="project-pager wrap" aria-label="More projects">
    <a class="pager-link" href="/work/${prev.slug}/" rel="prev"><span class="pager-label"><span aria-hidden="true">←</span> Previous</span><span class="pager-title">${prev.title}</span></a>
    <a class="pager-link pager-next" href="/work/${next.slug}/" rel="next"><span class="pager-label">Next <span aria-hidden="true">→</span></span><span class="pager-title">${next.title}</span></a>
  </nav>
</article>
${contactCta(site.contact.email)}
`;
  return {
    path: `/work/${p.slug}/`,
    title: `${p.plainTitle && p.plainTitle !== p.title ? p.title : p.title} — ${p.subtitle}`,
    description: p.summary,
    active: "work",
    ogType: "article",
    image: ctx.shareImageFor(p.slug),
    preload: heroImg ? { src: heroImg.src, srcset: heroImg.srcset, sizes: "100vw" } : null,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.title,
        alternativeHeadline: p.subtitle,
        description: p.summary,
        dateCreated: p.year,
        creator: { "@type": "Person", name: site.fullName },
        ...(p.location ? { locationCreated: { "@type": "Place", name: p.location } } : {}),
        ...(ctx.siteUrl ? { url: `${ctx.siteUrl}/work/${p.slug}/`, image: ctx.siteUrl + (heroImg?.src || "") } : {}),
      },
    ],
    body,
  };
}

/* ------------------------------------------------------------------ ABOUT */
export function aboutPage(ctx) {
  const timeline = [
    ...cv.experience.map((e) => ({ dates: e.dates, title: e.role, org: e.org })),
    ...cv.education.slice(0, 1).map((e) => ({ dates: e.dates, title: e.title, org: e.org })),
  ];
  const body = html`
<section class="about-hero wrap" aria-labelledby="page-title">
  <div class="about-hero-text">
    <p class="eyebrow">About</p>
    <h1 id="page-title" class="page-title">Abubakar‑Sadiq Adeshina</h1>
    <p class="statement">${about.statement}</p>
  </div>
  <figure class="about-hero-portrait">
    ${img(site.portrait.src, site.portrait.alt, { sizes: "(min-width: 900px) 40vw, 100vw", eager: true, smRef: site.portrait.srcSm })}
    <figcaption>${site.portrait.credit}</figcaption>
  </figure>
</section>

<section class="section wrap about-body">
  <h2 class="block-heading">Background</h2>
  <div class="prose prose-lg">${about.bio.map((t) => html`<p>${t}</p>`)}</div>
</section>

<section class="section wrap about-columns">
  <div>
    <h2 class="block-heading">Interests</h2>
    <ul class="bullets">${about.interests.map((t) => html`<li>${t}</li>`)}</ul>
  </div>
  <div>
    <h2 class="block-heading">At a glance</h2>
    <ol class="timeline">${timeline.map(
      (t) => html`<li><span class="timeline-dates">${t.dates}</span><span class="timeline-title">${t.title}</span><span class="timeline-org">${t.org}</span></li>`
    )}</ol>
  </div>
</section>

<section class="section wrap">
  <div class="button-row">
    <a class="button" href="${site.documents.cv}" download>Download CV (PDF) <span aria-hidden="true">↓</span></a>
    <a class="button button-ghost" href="/cv/">Read the full CV</a>
    <a class="button button-ghost" href="${site.documents.portfolio}" download>Portfolio PDF (7.6 MB) <span aria-hidden="true">↓</span></a>
  </div>
</section>

${contactCta(site.contact.email)}
`;
  return {
    path: "/about/",
    title: "About",
    description: `${site.name} is an architectural designer and visualiser in Nigeria, trained at the University of Ilorin and working across housing, cultural buildings and interiors.`,
    active: "about",
    image: "/images/share/about.jpg",
    jsonLd: [personLd(ctx)],
    body,
  };
}

/* ------------------------------------------------------------------ CV */
export function cvPage() {
  const entry = (e) => html`<li class="cv-entry">
  <div class="cv-when"><span>${e.dates}</span>${e.kind ? html`<span class="tag">${e.kind}</span>` : ""}</div>
  <div class="cv-what">
    <h3>${e.role}<span class="cv-org">${e.org}</span></h3>
    ${e.project ? html`<p class="cv-project">Key project: ${e.project}</p>` : ""}
    <ul class="bullets">${e.points.map((t) => html`<li>${t}</li>`)}</ul>
  </div>
</li>`;

  const body = html`
<header class="page-intro wrap cv-intro">
  <p class="eyebrow">Curriculum vitae</p>
  <h1 id="page-title" class="page-title">${site.fullName.replace("-", "‑")}</h1>
  <p class="lede">${site.role} · ${site.location}${site.contact.email ? html` · <a href="mailto:${site.contact.email}">${site.contact.email}</a>` : ""}</p>
  <div class="button-row">
    <a class="button" href="${site.documents.cv}" download>Download CV (PDF) <span aria-hidden="true">↓</span></a>
    <button class="button button-ghost" type="button" data-print hidden>Print this page</button>
  </div>
</header>

<div class="wrap cv">
  <section class="cv-section" aria-labelledby="cv-profile">
    <h2 id="cv-profile" class="cv-heading">Profile</h2>
    <p class="cv-profile">${cv.profile}</p>
  </section>

  <section class="cv-section" aria-labelledby="cv-exp">
    <h2 id="cv-exp" class="cv-heading">Experience</h2>
    <ol class="cv-list">${cv.experience.map(entry)}</ol>
  </section>

  <section class="cv-section" aria-labelledby="cv-lead">
    <h2 id="cv-lead" class="cv-heading">Leadership</h2>
    <ol class="cv-list">${cv.leadership.map(entry)}</ol>
  </section>

  <section class="cv-section" aria-labelledby="cv-edu">
    <h2 id="cv-edu" class="cv-heading">Education</h2>
    <ol class="cv-list">${cv.education.map(
      (e) => html`<li class="cv-entry"><div class="cv-when"><span>${e.dates}</span></div><div class="cv-what"><h3>${e.title}<span class="cv-org">${e.org}</span></h3></div></li>`
    )}</ol>
  </section>

  <section class="cv-section" aria-labelledby="cv-projects">
    <h2 id="cv-projects" class="cv-heading">Selected projects</h2>
    <ol class="cv-list">${projects
      .filter((p) => p.featured)
      .map(
        (p) => html`<li class="cv-entry"><div class="cv-when"><span>${p.year}</span></div><div class="cv-what"><h3><a href="/work/${p.slug}/">${p.title}</a><span class="cv-org">${p.subtitle}</span></h3><p class="cv-project">${(p.meta.find(([k]) => k === "Role") || [])[1] || ""}${(p.meta.find(([k]) => k === "Context") || [])[1] ? ` · ${(p.meta.find(([k]) => k === "Context") || [])[1]}` : ""}</p></div></li>`
      )}</ol>
  </section>

  <section class="cv-section" aria-labelledby="cv-skills">
    <h2 id="cv-skills" class="cv-heading">Skills and software</h2>
    <dl class="skills">${cv.skills.map((s) => html`<div><dt>${s.group}</dt><dd>${s.items.join(", ")}</dd></div>`)}</dl>
  </section>
</div>
`;
  return {
    path: "/cv/",
    title: "CV",
    description: `Curriculum vitae of ${site.fullName}: experience at A.T.O Architects, Idlewoods and Hexaterra, freelance visualisation, education and software skills.`,
    active: "cv",
    bodyClass: "page-cv",
    body,
  };
}

/* ------------------------------------------------------------------ CONTACT */
export function contactPage() {
  const usesEndpoint = Boolean(site.contactFormEndpoint);
  const body = html`
${pageIntro({
  eyebrow: "Contact",
  title: "Get in touch",
  lede: "For project enquiries, collaborations, visualisation work or employment and academic opportunities, email me directly or use the form below.",
})}
<section class="wrap contact-grid" aria-label="Contact details and form">
  <div class="contact-details">
    <h2 class="block-heading">Email</h2>
    <a class="contact-email" href="mailto:${site.contact.email}">${site.contact.email}</a>
    ${site.contact.showPhone && site.contact.phone
      ? html`<h2 class="block-heading">Phone</h2><a class="contact-phone" href="tel:${site.contact.phone.replace(/\s+/g, "")}">${site.contact.phone}</a>`
      : ""}
    ${Object.values(site.social).some(Boolean) ? html`<h2 class="block-heading">Elsewhere</h2>${socialLinks({ withEmail: false, cls: "social social-lg" })}` : ""}
    <p class="muted">Based in ${site.location}. Available for projects, collaborations and visualisation commissions.</p>
  </div>

  <form class="contact-form" data-contact-form data-email="${site.contact.email}" ${usesEndpoint ? html`action="${site.contactFormEndpoint}" method="POST" data-endpoint` : raw('action="#" data-mailto')} novalidate>
    <h2 class="block-heading">Send a message</h2>
    <div class="field">
      <label for="cf-name">Name</label>
      <input id="cf-name" name="name" type="text" autocomplete="name" required>
      <p class="field-error" id="cf-name-error" hidden>Please enter your name.</p>
    </div>
    <div class="field">
      <label for="cf-email">Email</label>
      <input id="cf-email" name="email" type="email" autocomplete="email" required>
      <p class="field-error" id="cf-email-error" hidden>Please enter a valid email address.</p>
    </div>
    <div class="field">
      <label for="cf-type">Enquiry type</label>
      <select id="cf-type" name="subject">
        <option>Project enquiry</option>
        <option>Collaboration</option>
        <option>Visualisation commission</option>
        <option>Employment opportunity</option>
        <option>Academic enquiry</option>
        <option>Other</option>
      </select>
    </div>
    <div class="field">
      <label for="cf-message">Message</label>
      <textarea id="cf-message" name="message" rows="6" required></textarea>
      <p class="field-error" id="cf-message-error" hidden>Please write a short message.</p>
    </div>
    <div class="hp" aria-hidden="true"><label for="cf-company">Company</label><input id="cf-company" name="_gotcha" type="text" tabindex="-1" autocomplete="off"></div>
    <button class="button" type="submit">${usesEndpoint ? "Send message" : "Open in your email app"} <span aria-hidden="true">→</span></button>
    <p class="form-note muted">${
      usesEndpoint
        ? "Your message is sent securely through a form service and delivered to my inbox."
        : "This opens your email app with your message filled in, ready to send. Nothing is sent from this website."
    }</p>
    <p class="form-status" role="status" aria-live="polite" data-form-status></p>
  </form>
</section>
`;
  return {
    path: "/contact/",
    title: "Contact",
    description: `Contact ${site.name} about architectural design, visualisation, collaborations or opportunities.`,
    active: "contact",
    body,
  };
}

/* ------------------------------------------------------------------ 404 */
export function notFoundPage() {
  const body = html`
<section class="wrap not-found" aria-labelledby="page-title">
  <p class="eyebrow">Error 404</p>
  <h1 id="page-title" class="page-title">This page doesn’t exist.</h1>
  <p class="lede">The link may be old or mistyped. These might help:</p>
  <ul class="not-found-links">
    <li><a class="link-arrow" href="/">Home</a></li>
    <li><a class="link-arrow" href="/work/">Selected work</a></li>
    <li><a class="link-arrow" href="/contact/">Contact</a></li>
  </ul>
</section>`;
  return { path: "/404.html", title: "Page not found", noindex: true, body };
}

export { projectLine };
