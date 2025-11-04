export const featured = [
  {
    id: "bofa",
    company: "Bank of America",
    role: "Senior UX Engineer - Contractor",
    date: "Sep 2024 - Present",
    // short summary (backwards-compatible)
    overview:
      "Good-to-Trade (GTT) portal that helps front-office and operations make fast, auditable go/no‑go trade decisions.",
    // structured overview blocks (preferred by CaseModal if present)
    overviewBlocks: [
      {
        heading: "Overview",
        body: `The Good-to-Trade (GTT) portal enables front-office and operations to decide go/no-go on trades with confidence and auditability. The previous portal had a fragmented product taxonomy and page structure, forcing traders to dig through multiple screens to understand rule status, control ownership, and why a trade was NGTT. Time-to-decision lengthened, escalations increased, and handoffs were unclear.`
      },
      {
        heading: "Context & Problem",
        body: [
          "Fragmented taxonomy: overlapping product categories and inconsistent naming spread signals across views; users couldn’t form a single mental model.",
          "Opaque NGTT reasons: rules fired without a clear, hierarchical explanation of which control failed, where it lived, or who owned the fix.",
          "Inefficient workflow: traders bounced between lists, rule detail pages, and emails to locate the right contact, slowing decisions and breaching SLAs."
        ]
      },
      {
        heading: "What changed (Our proposal)",
        body: [
          "Taxonomy redesign: simplified hierarchical model (portfolio → product → trade → control) to reduce duplication and make status roll-ups accurate.",
          "Risk-at-a-glance: single overview showing GTT/NGTT with drill-down (rule, reason, evidence, timestamp/data lineage, next action).",
          "Ownership & routing: failing controls show owner, resolver group, and contact path (assign/escalate).",
          "Progressive disclosure: critical signals first; deeper rationale and audit trail one click away."
        ]
      },
      {
        heading: "My role",
        body: [
          "Led end-to-end: SME interviews (FO, Ops, Compliance), IA & taxonomy redesign, decision criteria definition.",
          "Extended the bank’s design system and built accessible, data-driven UI prototypes."
        ]
      },
      {
        heading: "JTBD (decision lens)",
        body: [
          "When a trade is NGTT, show which control failed and who owns it so traders can route and resolve within minutes.",
          "When product risk shifts, provide a single view of exposure + exceptions for confident, auditable decisions."
        ]
      },
      {
        heading: "Success targets",
        body: [
          "Reduce time-to-decision and escalations.",
          "Increase SLA on-time resolution.",
          "Improve consistency & delivery speed via reusable patterns across adjacent workflows."
        ]
      }
    ],
    // Tools list shown in the first tab
    tools: [
      "Figma / FigJam",
      "Storybook",
      "Design tokens",
      "React (prototype)",
      "Next.js",
      "TypeScript",
      "SCSS",
      "Recharts / D3",
      "Jest",
      "React Testing Library",
      "Playwright",
      "GitHub / CI"
    ],
    // Screens (second tab) note + images (sample/redacted)
    context:
      "Risk at a glance: Exposure deltas, threshold status, and top exceptions in one view for quick go/no-go. Drill-down to trade: Alert → trade → controls with rationale, change history, and entitlement-aware actions. Change since yesterday: Trends and anomaly surfacing to speed triage. Exception workflow: Assign, comment, escalate—full audit trail. Threshold editor: Preview impact before save; guardrails prevent unsafe configs. Note: visuals use sample/redacted data.",
    images: ["/images/cases/bofa-1.png"],
    impact:
      "Time-to-decision and SLA improvements driven by clearer, entitlement-aware workflows and surfaced anomalies. Components were reused across adjacent workflows, improving consistency and delivery speed. “We make the call faster and escalate less—everything we need is in one place.” — Front-office user (anonymised)",
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