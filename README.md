# Abubakar Adeshina — portfolio website

A fast, ad-free static portfolio built from Abubakar's 2026 portfolio PDF, CV, portrait and AD monogram.

- **No dependencies.** The build is one Node.js script (`build.mjs`). Nothing to `npm install`.
- **Static output.** `npm run build` writes plain HTML, CSS, JS and images into `dist/`, which any static host can serve for free.
- **All content in three files.** Personal details, projects and CV text live in `src/content/` — you never need to touch layout code to update the site.

## Pages

| URL | What it is |
| --- | --- |
| `/` | Home — name, intro, hero render, four featured projects, about preview, capabilities, contact call to action |
| `/work/` | All projects with category filters (Housing, Cultural & public, Interiors, Competitions, Professional practice, Sketches). Filters are linkable, e.g. `/work/?category=housing` |
| `/work/ile-akekoo/` | Ilé Akẹ́kọ̀ọ́ — sustainable student residence (sole author) |
| `/work/earth-in-motion/` | Earth in Motion — innovation and experience centre (team leader, with Afolabi Abdulmuiz and Olaniyi Nasirudeen) |
| `/work/thirteen-670/` | Thirteen / 670 — terrace apartments under construction (A.T.O Architects) |
| `/work/digital-commons/` | Digital Commons — tech hub interior redesign (A.T.O Architects) |
| `/work/sketches/` | Sketchbook — freehand form studies |
| `/about/` | Statement, background, interests, timeline, CV and portfolio PDF downloads |
| `/cv/` | Full CV as a web page, with PDF download and a print-friendly layout |
| `/contact/` | Email, social links and a contact form |
| `/404.html` | Not-found page (served automatically by the hosts below) |

Every project image opens in a keyboard- and swipe-friendly lightbox with an "Actual size" mode for reading drawings.

## Run it on your computer

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm start          # builds, then serves the site at http://localhost:4321
npm run build      # builds into dist/ only
npm run check      # builds and checks every internal link and image
```

## Folder structure

```
src/content/site.mjs        name, intro, email, phone, social links, site URL, form endpoint
src/content/projects.mjs    every project: text, metadata, images, page layout
src/content/profile.mjs     About page text, capabilities and CV content
src/assets/styles.css       all styling
src/assets/site.js          menu, filters, lightbox, contact form
src/pages.mjs               page templates
public/images/projects/     project images (WebP), one folder per project
public/images/profile/      portrait
public/images/share/        1200×630 link-preview images (WhatsApp, LinkedIn…)
public/documents/           CV PDF and portfolio PDF
tools/optimize-images.mjs   converts new images to web-ready WebP
build.mjs                   builds the site into dist/
```

## Common updates

### Change contact details or add Instagram / LinkedIn

Edit `src/content/site.mjs`, then rebuild. Empty values are hidden on the site, so nothing appears broken while you wait for a link.

### Add a new project

1. Put the original images in a folder and give them descriptive names (`courtyard-view.png`, `ground-floor-plan.png`…).
2. Convert them (needs the `sharp` image library, only for this step):
   ```bash
   npm install --no-save sharp
   npm run images -- ~/path/to/originals my-new-project
   ```
   This creates `public/images/projects/my-new-project/<name>.webp` and `<name>-sm.webp`.
3. Copy an existing entry in `src/content/projects.mjs`, change the `slug` to `my-new-project`, and fill in the text. Reference images as `"my-new-project/courtyard-view"`.
4. Optional: add a 1200×630 JPEG at `public/images/share/my-new-project.jpg` for link previews.
5. `npm run check`, then deploy.

The build stops with a clear message if a referenced image is missing, so a typo can't reach the live site.

### Reorder or feature projects

The order of the `projects` list is the order on the site. `featured: true` puts a project on the home page (the first four are used).

### Replace the CV

Overwrite `public/documents/abubakar-adeshina-cv.pdf` (keep the file name) and update the text in `src/content/profile.mjs`.

### Replace the portrait

Overwrite `public/images/profile/abubakar-adeshina-portrait.webp` (about 1200 px wide) and `…-sm.webp` (about 700 px wide), and update the `alt` text and photographer credit in `site.mjs`.

## Deploying (free, no ads)

### Option A — Cloudflare Pages with GitHub (recommended)

Every push to GitHub redeploys automatically.

1. Push this folder to a GitHub repository.
2. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repository.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** `node build.mjs`
   - **Build output directory:** `dist`
   - **Environment variable:** `SITE_URL` = the final address, e.g. `https://abubakaradeshina.com` (or the `https://<project>.pages.dev` address until a domain is bought)
4. Deploy. The site is live at `https://<project-name>.pages.dev`.

### Option B — upload the built folder

Run `npm run build` (with `SITE_URL=… npm run build` if you know the address), then drag the `dist` folder into Cloudflare Pages (**Create → Pages → Upload assets**) or [Netlify Drop](https://app.netlify.com/drop).

Netlify and Vercel also work with the same build command and output folder. GitHub Pages works too, but `_headers` is ignored there.

### Custom domain

1. Buy a domain (e.g. `abubakaradeshina.com`) from any registrar, or through Cloudflare Registrar.
2. In Cloudflare Pages: **your project → Custom domains → Set up a custom domain**, and follow the DNS steps it shows (automatic if the domain is on Cloudflare).
3. Set `url` in `src/content/site.mjs` (or the `SITE_URL` variable) to the new address and redeploy. This turns on canonical URLs, full link previews and `sitemap.xml`.
4. Optional: submit `https://<domain>/sitemap.xml` in Google Search Console.

## Contact form

By default the form opens the visitor's email app with their message filled in — nothing is sent from the site, and the page says so.

To receive messages directly instead, create a free form at a service such as [Formspree](https://formspree.io), copy its endpoint (`https://formspree.io/f/xxxxxxx`) into `contactFormEndpoint` in `site.mjs`, and rebuild. The form then posts to that service, shows a success or error message, and includes a hidden spam trap. No secret keys are stored in the site.

## Notes

- Images were extracted from the portfolio PDF at 300 dpi and converted to WebP (drawings at higher quality so linework stays readable). Each image has a large and small version; browsers download the size they need, and images below the first screen load lazily.
- The downloadable portfolio PDF (`public/documents/abubakar-adeshina-portfolio-2026.pdf`, 7.1 MB) is the October 2026 spreads export with its images downsampled to 160 dpi. Text and drawings stay vector, so text is selectable.
- Font: Inter, loaded from Google Fonts (falls back to Helvetica/Arial if unavailable). Accent colour `#1E3A8C` is the brand blue, also used in the portfolio PDF and the AD monogram.
- Motion is limited to gentle fade-ins and hover states, and is switched off for visitors who prefer reduced motion.
