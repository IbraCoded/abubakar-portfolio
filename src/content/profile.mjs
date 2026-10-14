/**
 * ABOUT AND CV CONTENT
 * --------------------
 * Text for the About page and the CV page. Everything here comes from the 2026 CV and portfolio.
 * When the CV changes: update this file AND replace public/documents/abubakar-adeshina-cv.pdf.
 */

export const about = {
  statement:
    "I’m interested in buildings that answer to their climate and their culture — courtyards that move air, screens that hold back the sun, and forms drawn from the building traditions of the places they stand in.",

  bio: [
    "I am an architectural designer trained at the University of Ilorin, where I completed a B.Sc. in Architecture in 2025. Since 2021 I have worked across residential, mixed-use and interior projects in practice — first as a draftsman and designer at Hexaterra, then as an architectural intern at Idlewoods and at A.T.O Architects, where I currently work.",
    "My work moves between design and delivery. On Thirteen / 670, a terrace of thirteen homes in Lagos now under construction, I developed the design, produced the drawings and supervised work on site. On Digital Commons, the refurbishment of two working offices, I carried out site visits and worked on the design and the 3D renderings stakeholders reviewed before construction began.",
    "Climate and culture run through my competition work. Ilé Akẹ́kọ̀ọ́, a student residence for Obafemi Awolowo University, is organised around the Yoruba agbo ilé courtyard and cooled by recessed windows, a double-skin brick facade and roof vents. Earth in Motion, which I led with two collaborators, explores energy architecture through terracotta shading, timber and a continuous flow of public space.",
    "Visualisation is how I test and communicate all of this. Since 2021 I have produced architectural renders for clients on Upwork, and I build physical models and sketch by hand alongside working in Revit, 3ds Max, D5 Render and Blender.",
  ],

  interests: [
    "Climate-responsive and passive design",
    "Cultural identity in contemporary architecture",
    "Residential and affordable housing",
    "Architectural visualisation and digital workflows",
    "Heritage and cultural representation",
  ],
};

export const capabilities = [
  {
    title: "Architectural design",
    text: "Concept development, massing, site planning and design development, from early sketches to client-approved schemes.",
  },
  {
    title: "Technical drawing",
    text: "Planning and construction drawing packages, details and coordinated drawing sets in AutoCAD and Revit.",
  },
  {
    title: "3D modelling & visualisation",
    text: "Photorealistic renders and presentation visuals in 3ds Max, SketchUp, Blender and D5 Render, finished in Photoshop.",
  },
  {
    title: "Site & delivery",
    text: "Measured surveys, site supervision and regular site visits to keep construction aligned with the drawings.",
  },
];

export const cv = {
  profile:
    "Architect in training with experience across residential, mixed-use and interior projects, spanning drafting, design development and architectural visualisation. Has worked in professional studio environments including Hexaterra, Idlewoods and A.T.O Architects, delivering planning-ready drawings, concept development and client-facing visuals. Strong interest in spatial clarity, climate-responsive design and the effective use of digital tools to translate ideas into buildable architecture.",

  experience: [
    {
      role: "Architectural Intern",
      org: "A.T.O Architects",
      kind: "Internship",
      dates: "Jan 2026 – present",
      project: "Multi-unit residential apartment development",
      points: [
        "Contributed to the design development of a multi-unit residential apartment scheme through iterative layout refinements that improved unit efficiency and circulation, leading to client approval and progression to detailed design.",
        "Produced a coordinated set of architectural drawings and 3D visualisations for client presentations, enabling sign-off on the design direction.",
        "Shaped facade articulation and climate-responsive shading strategies that improved daylight performance and the visual coherence of the massing.",
        "Developed early site planning proposals — zoning layouts, access strategies and open-space distribution — with planning diagrams that established feasibility at concept stage.",
      ],
    },
    {
      role: "Architectural Intern",
      org: "Idlewoods Ltd",
      kind: "Internship",
      dates: "Mar 2024 – Oct 2024",
      project: "Mixed-use commercial development",
      points: [
        "Turned early-stage concepts into a coherent, client-ready proposal by leading massing development and site-responsive planning studies, securing internal design approval.",
        "Produced presentation drawings and visualisations that clarified design intent for stakeholders throughout the design process.",
        "Developed interior layouts across residential projects to improve spatial flow, function and comfort, supported by 3D interior models and renders.",
      ],
    },
    {
      role: "Freelance Architectural Visualisation Artist",
      org: "Upwork",
      kind: "Freelance",
      dates: "Nov 2021 – present",
      points: [
        "Delivers 3D architectural renders and visualisations for residential and commercial projects using 3ds Max, Blender, D5 Render and Photoshop.",
        "Built and maintains a client base by producing photorealistic visuals for architecture and real-estate clients.",
      ],
    },
    {
      role: "Architectural Draftsman & Designer",
      org: "Hexaterra Nig. Ltd",
      kind: "Employment",
      dates: "Mar 2021 – Nov 2021",
      project: "Single-family residential housing",
      points: [
        "Delivered complete architectural drawing packages for several single-family homes, translating concept sketches into accurate, build-ready drawings for planning submission and construction.",
        "Reduced late-stage revisions by producing precise construction documentation from the outset.",
        "Updated drawings promptly in response to client feedback and site constraints, keeping projects moving through design iterations.",
      ],
    },
  ],

  leadership: [
    {
      role: "Department President",
      org: "Department of Architecture, University of Ilorin",
      dates: "Nov 2024 – Nov 2025",
      points: [
        "Represented a student body of more than 200 architecture students, coordinating academic and extracurricular initiatives.",
        "Facilitated communication between faculty and students, resolving academic concerns and improving departmental processes.",
      ],
    },
  ],

  education: [
    { title: "B.Sc. Architecture", org: "University of Ilorin, Nigeria", dates: "Sep 2020 – Oct 2025" },
    { title: "West African Senior School Certificate (WASSCE)", org: "Zamani College, Nigeria", dates: "Sep 2014 – Sep 2020" },
  ],

  skills: [
    { group: "CAD & BIM", items: ["Autodesk AutoCAD", "Autodesk Revit"] },
    { group: "3D modelling & rendering", items: ["Autodesk 3ds Max", "SketchUp", "Blender", "D5 Render", "Marvelous Designer"] },
    { group: "Adobe Creative Suite", items: ["Photoshop", "InDesign", "Illustrator"] },
    {
      group: "Core competencies",
      items: [
        "Architectural design",
        "Design development",
        "Technical drafting",
        "Architectural visualisation",
        "Presentation drawing",
        "Interior space planning",
        "Climate-responsive design",
        "Concept development",
      ],
    },
  ],
};
