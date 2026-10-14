/**
 * PERSONAL DETAILS AND SITE SETTINGS
 * ----------------------------------
 * Everything personal that appears on the website lives in this one file.
 * Edit a value, run `npm run build`, and every page updates.
 *
 * Leave a value as an empty string ("") if you don't have it yet. The site hides
 * anything that is empty instead of showing a broken link, and the build prints
 * a reminder listing what is still missing.
 */
export const site = {
  // The address the site will live at, without a trailing slash,
  // e.g. "https://abubakaradeshina.com". Used for link previews, the sitemap and canonical URLs.
  // You can also leave this empty and set a SITE_URL environment variable when building.
  url: "",

  name: "Abubakar Adeshina",
  fullName: "Abubakar-Sadiq Motolani Adeshina",
  role: "Architectural designer",
  shortDescriptor: "Architectural designer and visualiser",
  location: "Nigeria",
  values: ["People", "Place", "Culture", "Comfort"],

  // Shown under the name on the home page.
  intro:
    "I design climate-responsive buildings rooted in the people, places and cultures they serve — and carry them from first sketch to drawings on site.",

  // Used by search engines and link previews when a page doesn't set its own description.
  description:
    "Portfolio of Abubakar Adeshina, an architectural designer and visualiser in Nigeria working on climate-responsive housing, cultural buildings and interiors.",

  contact: {
    email: "aadeshina473@gmail.com",
    phone: "+234 701 039 6918",
    showPhone: false, // set to true to show the phone number on the Contact page
  },

  // Paste full profile URLs, e.g. "https://www.instagram.com/yourhandle/".
  social: {
    instagram: "",
    linkedin: "",
    behance: "",
  },

  // Optional: a form service endpoint (e.g. Formspree "https://formspree.io/f/xxxxxx").
  // If empty, the contact form opens the visitor's email app with the message filled in.
  contactFormEndpoint: "",

  documents: {
    cv: "/documents/abubakar-adeshina-cv.pdf",
    portfolio: "/documents/abubakar-adeshina-portfolio-2026.pdf",
  },

  portrait: {
    src: "/images/profile/abubakar-adeshina-portrait.webp",
    srcSm: "/images/profile/abubakar-adeshina-portrait-sm.webp",
    alt: "Portrait of Abubakar Adeshina wearing a white kaftan, a patterned fila cap and round glasses",
    credit: "Portrait by Yemi Àjàlá",
  },

  // Image used when a page is shared on WhatsApp, LinkedIn, etc.
  shareImage: "/images/share/default.jpg",
};
