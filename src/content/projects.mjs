/**
 * PROJECTS
 * --------
 * Each project below becomes a page at /work/<slug>/ and a card on the Work page.
 * The order of this list is the order projects appear on the site.
 * Set `featured: true` to show a project on the home page (the first four featured are used).
 *
 * Images are referenced as "<folder>/<name>", which points to
 *   public/images/projects/<folder>/<name>.webp      (large)
 *   public/images/projects/<folder>/<name>-sm.webp   (small, optional)
 * Use tools/optimize-images.mjs to create both from your original files.
 *
 * Page content is a list of `blocks`. Available block types:
 *   { type: "text", heading, body: ["paragraph", ...], list: ["item", ...] }
 *   { type: "image", image: {src, alt, caption}, size: "full" | "wide" | "medium" | "narrow" }
 *   { type: "gallery", images: [{src, alt, caption}, ...], columns: 2 | 3 }
 *   { type: "split", heading, body: [...], list: [...], image: {...}, reverse: true|false }
 *   { type: "key", heading, items: ["Entrance", "Reception", ...] }   — numbered drawing legend
 *   { type: "parts", heading, items: [{ title, text }, ...] }          — numbered component list
 *   { type: "materials", heading, body: [...], swatches: [{src, label}], list: [...] }
 */

export const categories = {
  housing: "Housing",
  cultural: "Cultural & public",
  interior: "Interiors",
  competition: "Competitions",
  practice: "Professional practice",
  sketches: "Sketches",
};

/**
 * A single freehand sketch with one image. The image is public/images/projects/sketches/<image>.webp
 * (defaults to the slug). `year` and `text` are optional — add them when you have them.
 */
function sketch({ number, slug, title, subtitle, medium, alt, image = slug, year = "", text = "" }) {
  return {
    slug,
    number,
    title,
    subtitle,
    categories: ["sketches"],
    featured: false,
    year,
    location: "",
    summary: `${subtitle}: ${alt.charAt(0).toLowerCase()}${alt.slice(1)}.`,
    cover: { src: `sketches/${image}`, alt },
    hero: { src: `sketches/${image}`, alt },
    meta: [["Type", `Freehand sketch · ${subtitle.toLowerCase()}`], ["Medium", medium], ...(year ? [["Year", year]] : [])],
    blocks: text ? [{ type: "text", heading: "About this sketch", body: [text] }] : [],
  };
}

export const projects = [
  {
    slug: "ile-akekoo",
    number: "01",
    title: "Ilé Akẹ́kọ̀ọ́",
    plainTitle: "Ile Akekoo",
    subtitle: "Sustainable student residence",
    categories: ["housing", "competition"],
    featured: true,
    year: "2026",
    location: "Ile-Ife, Osun State, Nigeria",
    summary:
      "A courtyard residence for more than 50 students at Obafemi Awolowo University, cooled by passive design and organised around the Yoruba agbo ilé.",
    cover: {
      src: "ile-akekoo/courtyard-view",
      alt: "Rendered view of the residence courtyard, with students seated on concrete benches around a central tree beneath open access galleries",
    },
    hero: {
      src: "ile-akekoo/exterior-render",
      alt: "Rendered exterior of the three-storey residence, with curved roofs, white walls carved with geometric patterns and a brick-clad ground floor",
    },
    meta: [
      ["Type", "Student housing"],
      ["Context", "Open student competition"],
      ["Location", "Ile-Ife, Osun State, Nigeria"],
      ["Year", "2026"],
      ["Site", "2,475 m²"],
      ["Role", "Sole author — design and visualisation"],
    ],
    blocks: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "Ilé Akẹ́kọ̀ọ́ reimagines student accommodation as a climate-responsive, community-centred residence for Obafemi Awolowo University. The proposal houses more than 50 students and relies on passive design strategies suited to the warm tropical climate of Ile-Ife.",
          "The building is conceived as more than a place to sleep: a residence where learning continues beyond the classroom, and where shared spaces encourage interaction, collaboration and a strong sense of community.",
        ],
      },
      {
        type: "image",
        size: "medium",
        image: {
          src: "ile-akekoo/facade-concept-painting",
          alt: "Painted concept sketch of the residence facade in soft blue, white and ochre, with a figure in the foreground",
          caption: "Oil-painted facade concept",
        },
      },
      {
        type: "text",
        heading: "A courtyard at the centre",
        body: [
          "The form begins as a simple rectangular block. Its centre is removed to create a courtyard in the manner of the Yoruba agbo ilé, the compound house arranged around a shared open space. The front and back are then chamfered to arrive at the final mass.",
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "ile-akekoo/location-plan",
            alt: "Location plan showing the residence among neighbouring campus buildings and roads",
            caption: "Location plan · 1:1000",
          },
          {
            src: "ile-akekoo/site-plan",
            alt: "Site plan showing the two residential wings around the courtyard, gazebos, storage tanks, parking and the student garden",
            caption: "Site plan · 1:500",
          },
        ],
      },
      {
        type: "text",
        heading: "Plans",
        body: [
          "The ground floor is the public zone, with the reception, common room, shared kitchen and study spaces. The first and second floors hold the student rooms, arranged as four-bed, two-bed and one-bed units around the open courtyard.",
        ],
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          {
            src: "ile-akekoo/ground-floor-plan",
            alt: "Ground floor plan with entrance, reception, minimart, kitchens, library and laundry around the courtyard",
            caption: "Ground floor · 1:350",
          },
          {
            src: "ile-akekoo/first-floor-plan",
            alt: "First floor plan with four-bed, two-bed and one-bed rooms on either side of the courtyard void",
            caption: "First floor · 1:350",
          },
          {
            src: "ile-akekoo/second-floor-plan",
            alt: "Second floor plan, repeating the room layout of the first floor",
            caption: "Second floor · 1:350",
          },
        ],
      },
      {
        type: "key",
        heading: "Plan key",
        items: [
          "Entrance",
          "Reception",
          "Minimart",
          "Security",
          "Manager’s office",
          "Courtyard",
          "Store / control room",
          "Kitchen",
          "Library & study",
          "Laundry",
          "Balcony & gallery",
          "Four-bed room",
          "Two-bed room",
          "One-bed room",
        ],
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "ile-akekoo/four-bed-room-interior",
          alt: "Rendered interior of a four-bed room with timber bunk beds, a shared desk and a slatted window",
          caption: "Four-bed room interior",
        },
      },
      {
        type: "split",
        heading: "Designed for the climate",
        list: [
          "The central courtyard lets air move through the building and keeps heat from becoming trapped.",
          "Large windows face north and south and are deeply recessed, so direct sunlight does not enter the rooms.",
          "A double-skin brick facade uses the stack effect to draw warm air away and lower room temperatures.",
          "Wide gable vents in the parapet walls prevent heat and moisture from building up under the roof.",
        ],
        image: {
          src: "ile-akekoo/room-section-climate",
          alt: "Room section showing sunlight blocked by the brick screen and air rising through the cavity between the screen and the bedroom wall",
          caption: "Room section: airflow, sunlight, brick facade and bedroom wall",
        },
        reverse: true,
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "ile-akekoo/section-perspective",
          alt: "Section perspective through both wings and the courtyard stair, with arrows showing cool air rising and leaving through the roof",
          caption: "Section perspective showing airflow through the courtyard",
        },
      },
      {
        type: "materials",
        heading: "Materials",
        body: ["The building draws on vernacular materials and vegetation native to Nigeria."],
        list: ["Rammed earth walls", "Brick facade", "Bamboo wall skin", "Ceramic roof tiles", "African baobab trees"],
        swatches: [
          { src: "ile-akekoo/swatch-red-brick", label: "Red brick" },
          { src: "ile-akekoo/swatch-bamboo", label: "Bamboo" },
          { src: "ile-akekoo/swatch-white-stucco", label: "White stucco" },
          { src: "ile-akekoo/swatch-grey-concrete", label: "Light grey concrete" },
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "ile-akekoo/brick-screen-facade",
            alt: "Rendered long elevation with perforated red brick screens between white floor bands",
            caption: "Brick screen facade",
          },
          {
            src: "ile-akekoo/courtyard-view",
            alt: "Rendered courtyard with students seated around a central tree beneath open galleries",
            caption: "Courtyard view",
          },
        ],
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "ile-akekoo/exploded-axonometric",
          alt: "Exploded axonometric separating the curved roof sheets, steel trusses, brick screens, aluminium bars, art walls, rammed earth walls and concrete supports",
          caption: "Exploded axonometric",
        },
      },
      {
        type: "parts",
        heading: "Building components",
        items: [
          { title: "Roofing sheet", text: "Galvanised corrugated steel sheets: a lightweight, easily replaceable roof covering." },
          { title: "Steel trusses", text: "Galvanised RHS steel truss members, bolted with a steel seat plate on wall ties." },
          { title: "Brick facade skin", text: "Exterior brick facade (225 × 65 mm) protecting the inner walls from direct sunlight." },
          { title: "Vertical aluminium bars", text: "Anodised aluminium bars at 200 mm centres, finished with acrylic latex paint." },
          { title: "Contemporary African art wall", text: "Cement board depicting contemporary African art, with a termite-treated timber finish." },
          { title: "Rammed earth walls", text: "Compacted rammed earth base walls, stabilised with Portland cement." },
          { title: "RC wall supports", text: "Reinforced concrete base wall supports at 300 mm centres." },
        ],
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "ile-akekoo/physical-model",
          alt: "Grey card physical model of the residence showing the curved roofs and patterned facade panels",
          caption: "Physical model",
        },
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: "ile-akekoo/model-process-1", alt: "Model parts laid over printed plans on a cutting mat", caption: "Model-making process" },
          { src: "ile-akekoo/model-process-2", alt: "Hand holding cut card facade pieces beside a craft knife and pencil", caption: "Cutting the facade panels" },
          { src: "ile-akekoo/model-process-3", alt: "Hand holding an assembled card facade strip beside a scale rule", caption: "Assembling the facade" },
        ],
      },
    ],
  },

  {
    slug: "earth-in-motion",
    number: "02",
    title: "Earth in Motion",
    subtitle: "A circular innovation and experience centre",
    categories: ["cultural", "competition"],
    featured: true,
    year: "2026",
    location: "Lagos, Nigeria",
    summary:
      "A three-building centre for sustainable innovation, planned as a continuous flow of energy between people, climate, material and experience.",
    cover: {
      src: "earth-in-motion/entrance-plaza-render",
      alt: "Rendered entrance plaza in evening light, with the curved terracotta screens of the Discovery building, a concrete entrance portal and a terracotta lattice facade",
    },
    hero: {
      src: "earth-in-motion/aerial-view",
      alt: "Rendered aerial view of the three buildings, with pitched terracotta roofs, a curved timber-clad block and a figure-of-eight pavilion",
    },
    meta: [
      ["Type", "Innovation and experience centre"],
      ["Context", "International competition"],
      ["Location", "Lagos, Nigeria"],
      ["Year", "2026"],
      ["Site", "15,000 m²"],
      ["Role", "Team leader, designer and visualiser"],
      ["Team", "With Afolabi Abdulmuiz and Olaniyi Nasirudeen"],
    ],
    blocks: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "Earth in Motion responds to the need for more sustainable and energy-efficient buildings in Nigeria by bringing innovation, community and cultural identity together in one shared place.",
          "The project is shaped around the idea of continuous energy flow, guiding visitors through a smooth sequence of different experiences.",
        ],
      },
      {
        type: "split",
        heading: "First sketch",
        body: [
          "The preliminary concept sketch already sets out the circular arrival point, the energy beacon and the sweep of buildings that wrap around it.",
        ],
        image: {
          src: "earth-in-motion/concept-sketch",
          alt: "Loose ink concept sketch of the site plan, showing a circular centrepiece linking rectangular buildings, annotated ‘Energy beacon’ and ‘Parking’",
          caption: "Preliminary concept sketch",
        },
      },
      {
        type: "split",
        heading: "Reading the site",
        body: [
          "The 15,000 m² site is bounded by Logbo Road, James Williams Road and Highbridge Road. Its sloping topography and exposure called for careful shading, easy access, proper drainage and an efficient use of land.",
        ],
        image: {
          src: "earth-in-motion/existing-site",
          alt: "Existing site plan with contour lines, the site boundary, main and service access points and the three surrounding roads",
          caption: "Existing site · 1:2000",
        },
        reverse: true,
      },
      {
        type: "key",
        heading: "Site key",
        items: ["Site area", "Main access", "Service access", "Logbo Road", "James Williams Road", "Highbridge Road"],
      },
      {
        type: "image",
        size: "medium",
        image: {
          src: "earth-in-motion/site-analysis-1",
          alt: "Two site diagrams: arrows showing surface water draining to low points, and the sun path with prevailing winds",
          caption: "Topography and drainage · Sun and prevailing winds",
        },
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "earth-in-motion/site-analysis-2",
          alt: "Three site diagrams showing vehicle arrival, pedestrian routes between nodes, and service vehicle access to parking",
          caption: "Access and arrival · Pedestrian movement · Vehicular service",
        },
      },
      {
        type: "split",
        heading: "Concept and massing",
        body: [
          "The concept reimagines energy architecture as a continuous flow between people, climate, material and experience. The layout comprises three buildings: the Discovery building, the Education building and the Administration building.",
          "The massing was developed by creating and removing volumes from a continuous form, then wrapping the result in exterior shading.",
        ],
        image: {
          src: "earth-in-motion/massing-studies",
          alt: "Four axonometric massing diagrams: existing massing flow, creating and deleting volumes, exterior shading strategies and final massing",
          caption: "Massing studies",
        },
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "earth-in-motion/aerial-view",
          alt: "Rendered aerial view of the complex and its landscaped plaza within the surrounding neighbourhood",
          caption: "Aerial view",
        },
      },
      {
        type: "materials",
        heading: "Materials",
        body: ["Earthy, sustainable and readily available materials were selected for the project."],
        list: [
          "Terracotta clay for fins, frames and other shading devices",
          "White stucco for the primary walls",
          "Natural timber for screens, louvres and soffits",
          "Exposed concrete for the entrance facade walls",
        ],
        swatches: [
          { src: "earth-in-motion/swatch-terracotta", label: "Terracotta" },
          { src: "earth-in-motion/swatch-white-stucco", label: "White stucco" },
          { src: "earth-in-motion/swatch-lumber", label: "Timber" },
          { src: "earth-in-motion/swatch-exposed-concrete", label: "Exposed concrete" },
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "earth-in-motion/terracotta-screen-walls",
            alt: "Close-up render of curved terracotta screen panels between white floor slabs",
            caption: "Screen walls",
          },
          {
            src: "earth-in-motion/entrance-fins",
            alt: "Close-up render of a terracotta lattice facade beside tall vertical timber fins at the entrance",
            caption: "Entrance fins",
          },
        ],
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "earth-in-motion/discovery-ground-floor-plan",
          alt: "Ground floor plan of the Discovery building, a curved block of laboratories and workshops wrapped around an exhibition hallway",
          caption: "Discovery building, ground floor · 1:1000",
        },
      },
      {
        type: "key",
        heading: "Plan key",
        items: [
          "Reception",
          "Ticketing",
          "Exhibition gallery",
          "Hallway",
          "Cafe",
          "Collaboration zone",
          "Lounge & servery",
          "Restrooms",
          "Laboratories",
          "Storage & maintenance",
          "Testing room",
          "Raw material store",
          "Workshops",
          "Stairs & elevator",
          "Energy farm",
        ],
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "earth-in-motion/discovery-approach-elevation",
          alt: "Approach elevation of the Discovery building, with a lattice-screened block beside a long facade of vertical fins",
          caption: "Discovery building, approach elevation · 1:1000",
        },
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "earth-in-motion/discovery-section-perspective",
          alt: "Section perspective through the Discovery building showing double-height spaces, stairs and figures for scale",
          caption: "Discovery building, section perspective",
        },
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "earth-in-motion/entrance-plaza-render",
          alt: "Rendered entrance plaza in evening light: the Discovery building with curved terracotta screens on the left, a concrete entrance portal, a terracotta lattice facade with vertical fins, and the spherical energy beacon sculpture on the right",
          caption: "Discovery building, entrance plaza and energy beacon",
        },
      },
    ],
  },

  {
    slug: "thirteen-670",
    number: "03",
    title: "Thirteen / 670",
    subtitle: "Semi-detached terrace apartments",
    categories: ["housing", "practice"],
    featured: true,
    year: "2026",
    location: "Okun Ajah, Lagos, Nigeria",
    summary:
      "Thirteen four-bedroom terrace homes on a 670 m² waterfront plot in Lagos — designed, documented and now under construction.",
    cover: {
      src: "thirteen-670/site-photo-facade",
      alt: "Site photograph of the rendered four-storey terrace block with dark balcony bands, scaffolding and concrete columns in the foreground",
    },
    hero: {
      src: "thirteen-670/site-photo-facade",
      alt: "Site photograph of the terrace block under construction, with scaffolding along one end and recessed balconies",
    },
    meta: [
      ["Type", "Residential terrace, 13 units"],
      ["Status", "Under construction"],
      ["Location", "Okun Ajah waterfront, Coastal Road, Lagos"],
      ["Year", "2026"],
      ["Site", "670 m²"],
      ["Duration", "12–18 months"],
      ["Role", "Lead designer, drafter and site supervisor"],
      ["Practice", "A.T.O Architects Ltd"],
    ],
    blocks: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "The client asked for a terrace development that put privacy, comfort, sustainability and aesthetic quality first, while making full use of a 670 m² plot.",
          "The design answer is thirteen four-bedroom, semi-detached terrace apartments in suburban Okun Ajah, on the waterfront along Coastal Road in Lagos.",
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "thirteen-670/survey-plan",
            alt: "Survey plan of plot 5 among neighbouring plots, with a table of survey beacon bearings and distances",
            caption: "Survey plan · 1:2000",
          },
          {
            src: "thirteen-670/site-plan",
            alt: "Site plan showing two terrace blocks facing each other across a central drive, with parking along the boundary",
            caption: "Site plan · 1:500",
          },
        ],
      },
      {
        type: "split",
        heading: "Order of programme",
        body: ["Each unit rises over three floors, separated into zones by privacy and access."],
        list: [
          "Ground floor — car parking, boys’ quarters and kitchen",
          "First floor — foyer, living room, dining and an en-suite guest bedroom",
          "Second floor — en-suite master bedroom with closet, a second en-suite bedroom and two balconies",
        ],
        image: {
          src: "thirteen-670/unit-distribution-axonometric",
          alt: "Exploded axonometric of the terrace floors, with a single unit highlighted in blue through all three levels",
          caption: "Axonometric unit distribution diagram",
        },
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "thirteen-670/long-section",
          alt: "Long section through eight terrace units showing ground, first and second floors under a flat roof",
          caption: "Section · 1:350",
        },
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          {
            src: "thirteen-670/typical-ground-floor",
            alt: "Typical ground floor plan with two parking bays, boys’ quarters, kitchen and staircase",
            caption: "Typical ground floor · 1:150",
          },
          {
            src: "thirteen-670/typical-first-floor",
            alt: "Typical first floor plan with entrance, foyer, open living and dining room, guest bedroom and staircase",
            caption: "Typical first floor · 1:150",
          },
          {
            src: "thirteen-670/typical-second-floor",
            alt: "Typical second floor plan with master bedroom, closet, master bathroom, second bedroom and staircase",
            caption: "Typical second floor · 1:150",
          },
        ],
      },
      {
        type: "split",
        heading: "Construction details",
        body: [
          "The detail set resolves how the building is put together, from the strip foundation to the roof edge.",
        ],
        list: [
          "Ceiling detail — 230 mm blockwork, aluminium facade panels, timber struts and roof noggins at 600 mm centres, 80 mm rockwool insulation and a suspended POP ceiling",
          "Facade joinery — 230 mm R.C. beam and 300 mm lintel, aluminium facade panel, 4 mm glass panel, frameless glass balustrade and aluminium handrail",
          "Foundation — 230 mm blockwork on a foundation wall and footing over blinding, with a 230 mm R.C. slab on hardcore",
        ],
        image: {
          src: "thirteen-670/construction-details",
          alt: "Detail sheet with a 1:50 transverse section and enlarged 1:20 details of the ceiling, facade joinery and foundation",
          caption: "Transverse section 1:50 and details 1:20",
        },
        reverse: true,
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "thirteen-670/site-photo-columns",
            alt: "Site photograph of column reinforcement and timber formwork in front of the completed block",
            caption: "Site photograph",
          },
          {
            src: "thirteen-670/site-photo-formwork",
            alt: "Site photograph of steel props supporting slab formwork, with a worker on a ladder and stacked clay blocks",
            caption: "Site photograph",
          },
        ],
      },
    ],
  },

  {
    slug: "digital-commons",
    number: "04",
    title: "Digital Commons",
    subtitle: "Tech hub interior redesign",
    categories: ["interior", "practice"],
    featured: true,
    year: "2026",
    location: "Jibowu and Ikeja, Lagos, Nigeria",
    summary:
      "The upgrade of two working tech-hub offices in Lagos — desks, lighting, acoustics, bathrooms and reception — planned without disrupting daily work.",
    cover: {
      src: "digital-commons/proposed-design",
      alt: "Rendered proposal for the training room, with white desks, mesh task chairs, a coffered ceiling, plants and illustrated feature walls",
    },
    hero: {
      src: "digital-commons/training-room-render",
      alt: "Rendered view of the redesigned training room facing a whiteboard and projection screen, with rows of white desks, mesh chairs, timber wall panels and tall plants",
    },
    meta: [
      ["Type", "Office interior redesign"],
      ["Context", "Interior design competition"],
      ["Location", "Jibowu and Ikeja, Lagos"],
      ["Year", "2026"],
      ["Role", "Site visits, design and visualisation"],
      ["Practice", "A.T.O Architects Ltd"],
    ],
    blocks: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "The project covers a complete upgrade of two active offices in Jibowu and Ikeja, Lagos, carried out without disrupting daily work. It began with site visits to map out improvements to desks, lighting, acoustics, bathrooms and reception areas.",
        ],
      },
      {
        type: "split",
        heading: "Process",
        body: [
          "Site assessments and stakeholder consultations defined the interventions: workstation ergonomics, high-traffic flooring, acoustic window treatments, modern bathrooms, layered lighting and redesigned reception areas.",
          "Realistic 3D renderings then let stakeholders review and approve the new look before construction started. During the build, the team managed budgets and visited the sites twice a week to keep contractors on track.",
        ],
        image: {
          src: "digital-commons/workstation-room-left-wing",
          alt: "Photograph of the existing workstation room, with rows of timber desks, black office chairs and a glazed partition",
          caption: "Existing workstation room, left wing",
        },
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "digital-commons/retrofitting-works",
            alt: "Photograph of patched floor tiles where new cable trunking has been laid beneath desks",
            caption: "Retrofitting works",
          },
          {
            src: "digital-commons/sketching-as-built-plans",
            alt: "A designer in a high-visibility vest sketching an as-built floor plan by hand on site",
            caption: "Sketching as-built floor plans",
          },
        ],
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "digital-commons/existing-plan",
          alt: "Existing floor plan with workstation wings on either side of the central stair hall and reception",
          caption: "Existing plan · 1:300",
        },
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "digital-commons/demolition-and-new-plan",
          alt: "Demolition and new-work plan, with removed walls dashed in red and new walls drawn in blue",
          caption: "Demolition and new work · 1:300 — demolished elements dashed in red, new work in blue",
        },
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "digital-commons/proposed-plan",
          alt: "Proposed floor plan with reorganised workstations, a huddle room, IT office, meeting room and new bathrooms",
          caption: "Proposed plan · 1:300",
        },
      },
      {
        type: "key",
        heading: "Proposed plan key",
        items: [
          "Elevator & stair hall",
          "Reception",
          "Workstations (left wing)",
          "Workstations (right wing)",
          "Huddle room",
          "IT office",
          "Meeting room",
          "Store",
          "Female bathroom",
          "Lobby",
          "Inverter room",
          "Male bathroom",
          "Escape staircase",
          "Battery room",
          "Store",
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "digital-commons/existing-design",
            alt: "Photograph of the existing training room with long timber desks and fluorescent ceiling panels",
            caption: "Existing",
          },
          {
            src: "digital-commons/proposed-design",
            alt: "Rendered proposal for the same room with white desks, ergonomic chairs, carpet and a warmer ceiling",
            caption: "Proposed",
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- SKETCHES
  // Each sketch is its own entry on the Work page (filter: "Sketches").
  // Rename a sketch by changing its `title`; change its web address with `slug`.

  {
    slug: "ile-amo",
    number: "05",
    title: "Ilé Amọ̀",
    plainTitle: "Ile Amo",
    subtitle: "The House of Clay",
    categories: ["sketches"],
    featured: false,
    year: "2026",
    location: "Ibadan, Oyo State, Nigeria",
    summary:
      "A rammed-earth house drawn from the ground Ibadan was built from — a sweeping tiled roof, a Yoruba courtyard and walls compacted from local soil.",
    cover: {
      src: "sketches/ile-amo-cover",
      position: "50% 0%", // which part of the image the cropped card shows (left-right, top-bottom)
      alt: "The original pen sketch floating in the sky above a visualisation of the rammed-earth house with its brown-tiled roof sloping to the ground",
    },
    hero: {
      src: "sketches/ile-amo-cover",
      alt: "The original blue pen sketch drawn in the sky above the finished visualisation: a rammed-earth house with layered ochre walls, a tiled roof sweeping to the ground, an arched entrance and scattered square openings",
    },
    meta: [
      ["Type", "Sketch and visualisation"],
      ["Location", "Ibadan, Oyo State, Nigeria"],
      ["Year", "2026"],
      ["Medium", "Ballpoint on paper; digital visualisation"],
    ],
    blocks: [
      {
        type: "split",
        heading: "The House of Clay",
        body: [
          "Ile Amo goes back to the ground Ibadan was built from. Its rammed-earth walls are compacted layer by layer from local soil, and the strata of laterite red, ochre and sienna stay visible on the surface. A brown-tiled roof sweeps all the way down to the ground, recalling the rust-brown roofscape that has defined the city’s skyline for generations.",
          "The design takes its cues from the traditional Yoruba compound: thick, cool walls, soft rounded corners, and a courtyard at the centre of the home, entered through a carved timber arch. It sets these in a contemporary language. Deep-set square openings scatter across the walls, shading the interior and letting air move through the house. A band of Adire-inspired relief is pressed into the earth, and planting is allowed to climb and settle into the walls.",
        ],
        image: {
          src: "sketches/ile-amo-sketch",
          alt: "Blue ballpoint sketch of a house with a steep tiled roof sweeping to the ground, an arched entrance and a rounded block pierced with small square openings, with glasses and a pen on the paper",
          caption: "Original ballpoint sketch",
        },
      },
      {
        type: "text",
        heading: "Built from its own soil",
        body: [
          "The building also responds to the climate. The mass of its earth walls absorbs the heat of the day and releases it slowly, keeping the interior comfortable with less need for mechanical cooling. The roof and a raised stone plinth protect the walls from tropical rain. Because the walls are built from soil dug close to the site, the house has a far smaller carbon footprint than one built of cement block, and the craft of building it stays in local hands.",
          "Ile Amo argues that Nigerian architecture doesn’t need to borrow from elsewhere to be modern. The answer has always been in our own soil.",
        ],
      },
      {
        type: "image",
        size: "wide",
        image: {
          src: "sketches/ile-amo-render",
          alt: "Visualisation of the house in rammed earth with layered ochre walls, a brown-tiled roof sloping to the ground, an arched glazed entrance to a courtyard, climbing plants and a band of Adire-patterned relief",
          caption: "Visualisation",
        },
      },
    ],
  },

  sketch({ number: "06", slug: "curved-wall-house", title: "Curved Wall House", subtitle: "Form study", medium: "Ballpoint on paper",
    alt: "Blue ballpoint sketch of a building with a tall curved wall sweeping down to the ground beside a tree" }),
  sketch({ number: "07", slug: "arched-facade", title: "Arched Facade", subtitle: "Facade study", medium: "Ballpoint on paper",
    alt: "Blue ballpoint sketch of a building with three tall arched windows beside a gridded block, drawn above hatched ground" }),
  {
    slug: "learning-threshold",
    number: "08",
    title: "The Learning Threshold",
    subtitle: "An African contemporary educational hub",
    categories: ["sketches"],
    featured: false,
    year: "",
    location: "Nigeria",
    summary:
      "A conceptual design for a university learning facility inspired by the climate-responsive and culturally grounded architecture of Francis Kéré.",
    cover: {
      src: "sketches/learning-threshold-cover",
      position: "50% 70%", // frame the card on the tower and passage rather than the sky
      alt: "Visualisation of a travertine tower raised on concrete columns over a passage lined with an Adire mural, beside a sandstone academic wing and a mature tree, with the original sketch drawn in the sky",
    },
    hero: {
      src: "sketches/learning-threshold-cover",
      alt: "Visualisation of the learning hub: an ivory travertine tower on concrete columns over a pedestrian passage lined with a blue and earth-toned Adire mural, beside a long sandstone academic wing, with students on stone paving under a tree and the original ink sketch drawn in the sky above",
    },
    meta: [
      ["Type", "Concept sketch and visualisation"],
      ["Programme", "University learning facility"],
      ["Location", "Nigerian university campus"],
      ["Medium", "Ink on paper; digital visualisation"],
    ],
    blocks: [
      {
        type: "text",
        heading: "Overview",
        body: [
          "A conceptual design for a university learning facility inspired by the climate-responsive and culturally grounded architecture of Francis Kéré.",
        ],
      },
      {
        type: "split",
        heading: "Philosophy",
        body: [
          "The architecture is anchored by a solid ivory travertine tower that contrasts with a warm earth-brown sandstone academic wing, creating a clear hierarchy of forms and materials. The focal point of the design is a welcoming pedestrian corridor that cuts through the building, functioning as both a circulation spine and a social space. Lined with smooth rammed-earth walls and enriched by a contemporary Adire-inspired Yoruba mural, the passage transforms movement through the building into a cultural experience.",
          "Exposed concrete columns elevate portions of the structure, while deep concrete roof overhangs and timber soffits provide shade and climatic comfort. Reflective glazing framed in black aluminium introduces natural light while maintaining a strong architectural presence.",
        ],
        image: {
          src: "sketches/tower-and-hall",
          alt: "Ink elevation sketch of a square tower raised over an entrance passage beside a long, low hall with a row of high windows",
          caption: "Concept sketch",
        },
      },
      {
        type: "image",
        size: "medium",
        image: {
          src: "sketches/learning-threshold-render",
          alt: "Visualisation of the travertine tower over the mural-lined passage and the sandstone academic wing, with students walking through and sitting beneath a tree",
          caption: "Visualisation",
        },
      },
      {
        type: "text",
        heading: "Rooted in place",
        body: [
          "Set within a Nigerian university campus, the building is surrounded by an African contemporary landscape featuring mature African mahogany trees, shaded seating areas, and random-cut natural stone paving. The design balances architecture and landscape, creating spaces where students can gather, study, and connect.",
          "Strong daylight, crisp shadows, natural materials, and cultural storytelling combine to create an educational environment that is both modern and deeply rooted in place — an expression of African contemporary architecture where learning, community, and identity converge.",
        ],
      },
    ],
  },

  {
    slug: "woven-opera-house",
    number: "09",
    title: "The Woven Opera House",
    subtitle: "A 1,000-seat opera house woven like a basket",
    categories: ["sketches", "cultural"],
    featured: false,
    year: "",
    location: "Accra, Ghana",
    summary:
      "A conceptual 1,000-seat opera house inspired by Yoruba basket weaving and Ghana’s Bolga baskets — a woven steel shell that rises out of the landscape.",
    cover: {
      src: "sketches/woven-opera-house-day",
      alt: "Visualisation of the opera house by day: a woven steel shell over a glazed hall, with crowds walking up a curving path past baobab trees and the original pen sketch drawn in the sky",
    },
    hero: {
      src: "sketches/woven-opera-house-day",
      alt: "Visualisation of the opera house by day: a woven steel shell over a glazed hall, with a family and crowds walking up curving paths past baobab trees, and the original pen sketch drawn in the sky above",
    },
    meta: [
      ["Type", "Concept sketch and visualisation"],
      ["Location", "Accra, Ghana"],
      ["Capacity", "1,000 seats"],
      ["Floors", "3 above ground, 1 basement"],
      ["Climate", "Tropical savannah"],
      ["Medium", "Ink on paper; digital visualisation"],
    ],
    blocks: [
      {
        type: "split",
        heading: "Carrying the past forward",
        body: [
          "Architecture is often seen as a reflection of its time. But I believe the most meaningful architecture doesn’t leave the past behind — it carries it forward. When developing this concept, I kept asking myself one question: how can African architecture embrace the future without losing touch with its roots? The answer wasn’t found in copying traditional buildings. It was found in understanding the thinking behind them.",
          "For centuries, master artisans across West Africa have transformed simple strands into woven baskets — objects that are elegant, durable, protective, and deeply embedded in everyday life. Every weave tells a story of craftsmanship, patience, and cultural identity. That became the starting point.",
        ],
        image: {
          src: "sketches/woven-opera-house-sketch",
          alt: "Black ink concept sketch of a long woven dome rising out of the landscape, with a path curving up into it, a pen above and glasses below on the paper",
          caption: "Concept sketch",
        },
      },
      {
        type: "text",
        heading: "A basket at architectural scale",
        body: [
          "Inspired by Yoruba basket weaving and Ghana’s iconic Bolga baskets, this conceptual 1,000-seat opera house reimagines that tradition at an architectural scale. The woven steel shell becomes more than a façade — it filters light, creates shade, protects the glazed interior, and gives the building its unmistakable identity. Even the arrival experience continues the narrative. The approach path appears as though a single strand has been pulled from the basket itself, gradually unravelling from the landscape before rising into the architecture. Rather than sitting on the site, the building feels as though it has grown from the earth.",
        ],
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "sketches/woven-opera-house-night",
          alt: "Night visualisation of the opera house glowing warm gold beneath its woven shell, with lit paths, crowds arriving and the sketch drawn in white in the starry sky",
          caption: "The opera house at night",
        },
      },
      {
        type: "image",
        size: "full",
        image: {
          src: "sketches/woven-opera-house-exploded-axonometric",
          alt: "Exploded axonometric separating the building into the woven steel shell, the glass envelope, the auditorium level, the public level, the entrance level and the basement, with material callouts",
          caption: "Exploded axonometric",
        },
      },
      {
        type: "parts",
        heading: "From shell to basement",
        items: [
          { title: "Woven shell", text: "Protective woven skin inspired by traditional African basketry." },
          { title: "Glass envelope", text: "Encases the public spaces and auditorium while keeping a visual connection to the surroundings." },
          { title: "Third floor — auditorium level", text: "The main 1,000-seat opera auditorium, with balcony, choir rooms and orchestra tuning space." },
          { title: "Second floor — public level", text: "Grand lobby, indoor amphitheatre, art gallery and exhibition spaces open to the public. A central courtyard brings in light." },
          { title: "Ground floor — entrance level", text: "Main entrance lobby, café, ticketing, retail and access to the courtyard." },
          { title: "Basement", text: "Back-of-house spaces: parking, loading bay, mechanical rooms, workshops, dressing rooms and storage." },
        ],
      },
      {
        type: "text",
        heading: "Materials and climate",
        list: [
          "Woven steel shell — handcrafted steel mullions inspired by Yoruba and Bolga basket weaving, denser in some areas like a real basket",
          "Pigmented concrete shell — 600 mm thick, smooth, with a subtle patina of water streaks and iron stains beneath the steel",
          "Tinted glass envelope — greyish-blue glass, 40% reflective, allowing views out while revealing the warm interior lighting",
          "Carved from the earth — the base is carved and sculpted from the landscape, so the building appears to grow from the ground",
          "Sustainable design — solar panels on the roof surfaces, natural ventilation through the courtyard, daylighting, rainwater harvesting and shading from the woven shell",
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "sketches/woven-opera-house-shell-detail",
            alt: "Close-up at dusk of the textured steel strands of the woven shell crossing in front of the glowing glazed facade",
            caption: "The woven steel shell",
          },
          {
            src: "sketches/woven-opera-house-auditorium",
            alt: "The auditorium during a concert: an orchestra on a timber stage surrounded by flowing balconies, with the woven shell and city lights visible through the glazing",
            caption: "The auditorium",
          },
        ],
      },
      {
        type: "text",
        heading: "Seeing tradition through a new lens",
        body: [
          "The goal was never simply to design an opera house. It was to explore what contemporary African architecture could become when it draws confidence from its own heritage instead of borrowing its identity from elsewhere. To me, architecture is at its strongest when people don’t just admire the building — they recognise themselves in it.",
          "Africa has never lacked design intelligence. We’ve simply spent too little time translating it into contemporary architecture. Perhaps the future of African architecture isn’t about inventing something entirely new. Perhaps it’s about seeing our traditions through a new lens.",
        ],
      },
    ],
  },

  sketch({ number: "10", slug: "earth-sheltered-forms", title: "Earth-Sheltered Forms", subtitle: "Landscape study", medium: "Pen on paper",
    alt: "Sketch of rounded window forms set into a sloping hillside" }),
  sketch({ number: "11", slug: "radial-plan", title: "Radial Plan", subtitle: "Plan study", medium: "Pencil on paper",
    alt: "Pencil sketch of a circular radial plan divided into wedge-shaped rooms" }),
  sketch({ number: "12", slug: "folded-form", title: "Folded Form", subtitle: "Form study", medium: "Pen on paper",
    alt: "Sketch of an S-shaped folded building form with textured surfaces" }),
  sketch({ number: "13", slug: "sail-roofs", title: "Sail Roofs", subtitle: "Roof study", medium: "Pen on paper",
    alt: "Sketch of a row of sail-like curved roof shells" }),
  sketch({ number: "14", slug: "stacked-tower", title: "Stacked Tower", subtitle: "Tower study", medium: "Pen on paper",
    alt: "Sketch of a tower of stacked, staggered floor plates" }),
  sketch({ number: "15", slug: "twisting-tower", title: "Twisting Tower", subtitle: "Tower study", medium: "Pen on paper",
    alt: "Small sketch of a tower with twisting, wave-like floor edges" }),
  sketch({ number: "16", slug: "ribbed-pod", title: "Ribbed Pod", subtitle: "Tower study", medium: "Pen on paper",
    alt: "Sketch of a tall ribbed, pod-shaped tower" }),
  sketch({ number: "17", slug: "corner-building", title: "Corner Building", subtitle: "Massing study", medium: "Pen on paper",
    alt: "Sketch of an angular corner building with annotations" }),

  {
    slug: "ogba-pupa",
    number: "18",
    title: "Ọgbà Pupa",
    plainTitle: "Ogba Pupa",
    subtitle: "The Red Garden",
    categories: ["sketches"],
    featured: false,
    year: "",
    location: "Ikeja, Lagos, Nigeria",
    summary:
      "A five-storey office building that brings a garden into the busy streets of Ikeja, with rows of curved rust-red planters spilling greenery down its facade.",
    cover: {
      src: "sketches/ogba-pupa-render",
      position: "50% 55%", // frame the card on the building rather than the sky
      alt: "Visualisation of a five-storey cream office building on a Lagos street corner, its main facade lined with staggered rust-red curved planters spilling greenery",
    },
    hero: {
      src: "sketches/ogba-pupa-render",
      alt: "Visualisation of the five-storey office building on a Lagos street corner: a solid cream wall scored into large panels, and a main facade of staggered rust-red curved planters overflowing with plants, above red boundary railings, with a yellow danfo bus parked outside",
    },
    meta: [
      ["Type", "Sketch and visualisation"],
      ["Programme", "Five-storey office building"],
      ["Location", "Ikeja, Lagos, Nigeria"],
      ["Medium", "Ballpoint on paper; digital visualisation"],
    ],
    blocks: [
      {
        type: "split",
        heading: "A garden on the street",
        body: [
          "Ọgbà Pupa is a five-storey office building that brings a garden into the busy streets of Ikeja. Its shell is a solid, quiet mass of cream Tyrolean render, scored into large panels. Against it, the main facade opens up into rows of curved planters clad in rust-red metal. They catch the Lagos sun and spill greenery down the face of the building.",
          "The design takes a familiar idea, the potted plants that line Lagos balconies and verandas, and builds it into the architecture. The planters are staggered from floor to floor, so no two levels read the same. Their soft, rounded forms play against the hard grid of the floor slabs. The same red metal returns in the roof coping and the boundary railings, tying the building and its compound together.",
        ],
        image: {
          src: "sketches/ogba-pupa-sketch",
          alt: "Blue ballpoint perspective sketch of a tall block with one heavily hatched solid wall and a facade of staggered rounded planters, with glasses above and a pen below on the paper",
          caption: "Original ballpoint sketch",
        },
      },
      {
        type: "text",
        heading: "Shade, cool air and something growing",
        body: [
          "The building also responds to the climate. Its west wall is left solid, so a thick, unbroken shell stands between the interior and the harsh afternoon sun, and the offices stay cooler without relying on air conditioning alone. On the main facade, the planting shades the walls, cools the air around the windows and softens the glare of the street. The greenery also gives the people working inside a view of something growing, in a part of the city where green space is scarce.",
          "Ọgbà Pupa argues that a city building doesn’t have to choose between density and nature. In Lagos, the garden can grow upwards.",
        ],
      },
      {
        type: "image",
        size: "medium",
        image: {
          src: "sketches/ogba-pupa-board",
          alt: "Presentation board with the title Ọgbà Pupa, The Red Garden, over the visualisation of the building, with a small white line drawing of the sketch in the corner",
          caption: "Presentation board",
        },
      },
    ],
  },
];
