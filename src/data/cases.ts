export const featured = [
  {
    id: "bofa",
    company: "Bank of America",
    role: "Senior UX Engineer - Contractor",
    date: "Sep 2024 - Present",
    overview:
      "The Good-to-Trade (GTT) portal helps front-office and operations make clear, auditable go/no-go decisions in minutes.",
    overviewBlocks: [
      {
        heading: "Overview",
        body: `The Good-to-Trade (GTT) portal helps front-office and operations make clear, auditable go/no-go decisions in minutes. The previous portal made this hard: a tangled product taxonomy and scattered screens meant traders spent too long piecing together which rule failed, why a trade was NGTT, and who could fix it. That slowed decisions, drove escalations, and created unclear handoffs.`,
        wrapperClass: "case-block case-overview",
        paragraphClass: "case-paragraph"
      },
      {
        heading: "Context & Problem",
        body: [
          "Confusing taxonomy: overlapping categories and inconsistent names made it hard to build a single mental model.",
          "Opaque NGTT reasons: users couldn’t easily see which control failed, where it lived, or who owned the fix.",
          "Inefficient workflow: people jumped between lists, detail pages, and email to find the “right person,” pushing SLAs at risk."
        ],
        wrapperClass: "case-block case-context",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet"
      },
      {
        heading: "What We Changed",
        body: [
          "Simplified taxonomy: a clear hierarchy aligned to how FO/Ops think (portfolio → product → trade → control) so roll-ups are accurate and predictable.",
          "Status at a glance: one view that shows GTT/NGTT, the failing rule, the rationale, evidence, timestamps/lineage, and the next best action.",
          "Ownership & routing: every failing control shows the accountable owner, resolver group, and a direct contact path (assign/escalate) to move work immediately.",
          "Progressive disclosure: critical signals first; details one click away; audit trail and entitlements always visible."
        ],
        wrapperClass: "case-block case-changes",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet"
      },
      {
        heading: "My Role",
        body: `End-to-end: clarified requirements with SMEs (FO, Ops, Compliance), redesigned the taxonomy and information architecture, defined status/ownership patterns, extended the bank’s design system, and built accessible, data-driven UI.`,
        wrapperClass: "case-block case-role",
        paragraphClass: "case-paragraph"
      },
      {
        heading: "Decision Lens (JTBD)",
        body: [
          "When a trade is flagged NGTT, users need to see which control failed and who owns it so they can route and resolve within minutes.",
          "When product risk shifts, users need a single view of exposure and exceptions to make a confident, auditable go/no-go call."
        ],
        wrapperClass: "case-block case-jtbd",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet"
      },
      {
        heading: "Success Targets",
        body: `Reduce time-to-decision, cut escalations, improve SLA-on-time resolution, and create reusable patterns that scale to adjacent workflows.`,
        wrapperClass: "case-block case-success",
        paragraphClass: "case-paragraph"
      }
    ],
    // Tools list shown in the first tab
    // tools moved into the "Process" screen (see screens[0].tools)
    // Screens tab: Ideation & process — paragraph + bullets (paragraph will render as a paragraph, bullets as list)
    screens: [
      {
        heading: "Process",
        paragraph:
          "I focused on FO/Ops decision moments and rebuilt taxonomy, flows, and UI for speed and auditability—delivered with Helix, the bank’s Figma design system. I also contributed back: new B2B-SaaS components, expanded state logic, and token updates, with documented usage and accessibility notes.",
        bullets: [
          "Discovery: Interviewed front-office, operations, and compliance SMEs; mapped the existing taxonomy and data lineage; surfaced pain points and explicit decision requirements.",
          "Ideation: Sketched alternative taxonomies and selected an IA that supports clear roll-ups (portfolio → product → trade → control) and predictable status propagation.",
          "Prototyping: Built interactive prototypes to validate ownership, routing, and progressive-disclosure patterns (status → rationale → next best action).",
          "Testing: Ran usability sessions with traders and ops; iterated copy, flows, and keyboard paths to reduce time-to-decision and clarify escalation routes.",
          "Design system (Helix): Implemented with Helix; extended tokens, states, and a set of components with usage notes and WCAG 2.2 guidance.",
          "System design: Embedded entitlements, audit trail, and change history; added safe-by-default controls with preview-before-save.",
          "Delivery: Piloted with operations, captured metrics, and refined for scale; documented patterns for reuse across adjacent workflows."
        ],
        // moved note from overview into process screen
        sideNote: "Note: visuals use sample/redacted data.",
        tools: [
          "Figma / FigJam",
          "Design tokens",
          "Horizon",
          "Helix"
        ],
        images: [],
        wrapperClass: "case-block case-screens",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet"
      },
      {
        heading: "Concept",
        sideNote:
          "To demonstrate how the solution works, I created this concept interface. The production designs are the bank’s property and can’t be shared. Visuals use sample/redacted data",
        paragraph:
          "A single GTT workspace that surfaces go/NGTT status, top exceptions, and next actions in one view. A rule-inspector panel explains which control fired, why, and who owns the fix, with assign/escalate built in. Progressive disclosure reveals evidence, lineage, and entitlements, preserving auditability without slowing triage.",
        bullets: [],
        images: [
          "/images/cases/bofa-1.png"
        ],
        wrapperClass: "case-block case-concept",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet"
      }
    ],
    // Screens (second tab) note + images (sample/redacted)
    context:
      "Redesigned the Good-to-Trade portal end-to-end, simplifying the product taxonomy and making GTT/NGTT reasons and ownership clear. Partnered with FO/Ops/Compliance, extended the design system, and shipped accessible, data-driven interfaces.",
    images: ["/images/cases/bofa-1.png"],
    // structured impact content for the "Impact & Outcome" tab
    impactBlocks: [
      {
        heading: "Operational speed",
        body: "Go/NGTT time-to-decision dropped from ~12m → ~4m (-67%) by consolidating status, rationale, and next action in one view.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph"
      },
      {
        heading: "Quality & risk",
        body: "Clear NGTT explanations, evidence, and ownership reduced mis-routes and unnecessary escalations.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph"
      },
      {
        heading: "SLA reliability",
        body: "On-time resolution increased; fewer SLA-risk cases as triage paths became deterministic.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph"
      },
      {
        heading: "Adoption",
        body: "Traders and Ops adopted the unified workflow; components and patterns were reused in adjacent areas, reducing delivery time for new screens.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph"
      },
      {
        heading: "Design system impact",
        body: "Extended Helix with status chips, exception banners, and rule-inspector patterns (tokens, states, usage notes), raising system coverage for data-heavy B2B flows.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph"
      },
      {
        heading: "Compliance & accessibility",
        body: "WCAG-aligned interactions; entitlements and audit trail surfaced without slowing triage.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph"
      }
    ],
    metrics: [
      { label: "Time-to-decision", before: "≈12 min", after: "≈4 min" },
      { label: "Time-to-decision Δ", before: "", after: "-67%" },
      { label: "Escalations / 100 trades", before: "↑", after: "↓" }
    ],
    timeline: [
      { date: "Q3 2024", label: "Discovery & SME interviews" },
      { date: "Q4 2024", label: "Prototypes & design system extensions" },
      { date: "Q1 2025", label: "Pilot & rollout to operations" }
    ],
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