export const featured = [
  {
    id: "bofa",
    company: "Bank of America",
    role: "Senior UX Engineer - Contractor",
    date: "Sep 2024 - Present",
    context: "Led UX for mission-critical internal tools—trading operations. I mapped and simplified complex flows, defined IA, and delivered high-fidelity UI, partnering with engineering to ship accessible, reusable components that made data-dense screens faster, clearer, and more reliable.",
    challenge: "Complex domain, legacy constraints, strict compliance; visuals restricted.",
    approach: "Mapped flows with SMEs; iterative React prototypes for exploration; partnered with Angular team to maintain parity.",
    impact: "Faster comprehension of booking status; clearer entity selection; improved internal adoption.",
    tools: ["Figma","React (prototype)","Angular (implementation)"],
    images: ["/images/cases/bofa-1.png"],
    restrictions: "No visuals — NDA",
    logo: "/images/cases/bofa-icon.svg"
  },
  {
    id: "adarma",
    company: "Adarma",
    role: "Senior Product Designer",
    date: "Aug 2023 - Sep 2024 ",
    context: "I designed an executive dashboard that visualises security posture risk exposure, control coverage, and trends giving decision-makers an at a glance view to prioritise remediation, track progress, and justify investment with confidence.",
    challenge: "Balance power-user efficiency with clarity; unify fragmented views.",
    approach: "Svelte component exploration, heuristic reviews, design tokens, task-driven IA.",
    impact: "Improved analyst workflows and visibility (MTTD/MTTR).",
    tools: ["Figma","Svelte"],
    images: [
      "/images/cases/adarma-1.png",
      "/images/cases/adarma-2.svg",
      "/images/cases/adarma-3.svg",
      "/images/cases/adarma-4.svg",
      "/images/cases/adarma-5.svg"
    ],
    logo: "/images/cases/adarma-icon.png"
  },
  {
    id: "silico",
    company: "SilicoAI",
    role: "UX Engineer",
    date: "Dec 2020 - Jun 2023",
    context: "I designed a decision intelligence dashboard that visualises scenarios, constraints, and projected outcomes, letting decision makers run what ifs, compare trade offs, and prioritise the highest impact actions. Collaborating with engineering in making complex simulations feel clear and actionable.",
    challenge: "Make models approachable for non-data users while preserving power features.",
    approach: "Built a design system; dashboards & inspector; clarified IA.",
    impact: "Consistent UI, faster delivery, clearer model inspection.",
    tools: ["Figma","React"],
    images: [
      "/images/cases/silico-1.svg",
      "/images/cases/silico-2.svg",
      "/images/cases/silico-3.svg",
      "/images/cases/silico-4.svg",
      "/images/cases/silico-5.svg"
    ],
    logo: "/images/cases/silico-icon.svg"
  },

];

export const otherWorks = [
  {
    id: "psa",
    company: "PSA Peugeot",
    role: "Senior Product UX UI Developer - Contractor",
    date: "Feb 2020 - Oct 2020",
    context: "Placeholder context for PSA Peugeot — automotive experience and connected apps.",
    challenge: "Placeholder challenge: diverse device targets and complex configuration flows.",
    approach: "Placeholder approach: user research, prototyping, component library.",
    impact: "Placeholder impact summary.",
    tools: ["Figma", "React"],
    images: ["/images/cases/psa-1.jpg", "/images/cases/psa-2.jpg"],
    logo: "/images/cases/psa-icon.svg",
    restrictions: "Placeholder restrictions (if any)"
  },
  {
    id: "highland",
    company: "Highland Easy Life",
    role: "Senior Product UX UI Developer - Contractor",
    date: "Aug 2019 - Oct 2020",
    context: "Placeholder context for Highland Easy Life — insurance quoting and onboarding.",
    challenge: "Placeholder challenge: align B2B and B2C flows, simplify quoting.",
    approach: "Placeholder approach: journey mapping, iterative prototypes, usability testing.",
    impact: "Placeholder impact summary.",
    tools: ["Figma", "Sketch"],
    images: ["/images/cases/highland-1.jpg", "/images/cases/highland-2.jpg"],
    logo: "/images/cases/highland-icon.jpeg"
  },
  {
    id: "emerios",
    company: "Emerios",
    role: "Senior Product UX/UI Developer",
    date: "Dec 2013 - Mar 2017",
    context: "Placeholder context for Emerios — sales and backoffice platform.",
    challenge: "Placeholder challenge: legacy workflows, high data density.",
    approach: "Placeholder approach: design system, performance-minded UI components.",
    impact: "Placeholder impact summary.",
    tools: ["Figma"],
    images: ["/images/cases/emerios-1.jpg"],
    logo: "/images/cases/emerios-icon.svg"
  },
  {
    id: "misc",
    company: "More Works",
    role: "Various Projects",
    date: "2010 - Present",
    context: "Collection of smaller projects and experiments — gallery-style entry.",
    challenge: "Various.",
    approach: "Placeholder approach: short case summaries and visual showcase.",
    impact: "Placeholder impact summary.",
    tools: ["Figma"],
    images: [
      "/images/cases/more-1.jpg",
      "/images/cases/more-2.jpg",
      "/images/cases/more-3.jpg",
      "/images/cases/more-4.jpg"
    ]
  }
];

// ensure `otherWorks` is defined above (the array you created)
// add this alias so consumers can import `secondary`
export const secondary = typeof otherWorks !== "undefined" ? otherWorks : [];