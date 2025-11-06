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
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Context & Problem",
        body: [
          "Confusing taxonomy: overlapping categories and inconsistent names made it hard to build a single mental model.",
          "Opaque NGTT reasons: users couldn’t easily see which control failed, where it lived, or who owned the fix.",
          "Inefficient workflow: people jumped between lists, detail pages, and email to find the “right person,” pushing SLAs at risk.",
        ],
        wrapperClass: "case-block case-context",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "What We Changed",
        body: [
          "Simplified taxonomy: a clear hierarchy aligned to how FO/Ops think (portfolio → product → trade → control) so roll-ups are accurate and predictable.",
          "Status at a glance: one view that shows GTT/NGTT, the failing rule, the rationale, evidence, timestamps/lineage, and the next best action.",
          "Ownership & routing: every failing control shows the accountable owner, resolver group, and a direct contact path (assign/escalate) to move work immediately.",
          "Progressive disclosure: critical signals first; details one click away; audit trail and entitlements always visible.",
        ],
        wrapperClass: "case-block case-changes",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "My Role",
        body: `End-to-end: clarified requirements with SMEs (FO, Ops, Compliance), redesigned the taxonomy and information architecture, defined status/ownership patterns, extended the bank’s design system, and built accessible, data-driven UI.`,
        wrapperClass: "case-block case-role",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Decision Lens (JTBD)",
        body: [
          "When a trade is flagged NGTT, users need to see which control failed and who owns it so they can route and resolve within minutes.",
          "When product risk shifts, users need a single view of exposure and exceptions to make a confident, auditable go/no-go call.",
        ],
        wrapperClass: "case-block case-jtbd",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "Success Targets",
        body: `Reduce time-to-decision, cut escalations, improve SLA-on-time resolution, and create reusable patterns that scale to adjacent workflows.`,
        wrapperClass: "case-block case-success",
        paragraphClass: "case-paragraph",
      },
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
          "Delivery: Piloted with operations, captured metrics, and refined for scale; documented patterns for reuse across adjacent workflows.",
        ],
        // moved note from overview into process screen
        sideNote: "Note: visuals use sample/redacted data.",
        tools: ["Figma / FigJam", "Design tokens", "Horizon", "Helix"],
        images: [],
        wrapperClass: "case-block case-screens",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "Concept",
        sideNote:
          "To demonstrate how the solution works, I created this concept interface. The production designs are the bank’s property and can’t be shared. Visuals use sample/redacted data",
        paragraph:
          "A single GTT workspace that surfaces go/NGTT status, top exceptions, and next actions in one view. A rule-inspector panel explains which control fired, why, and who owns the fix, with assign/escalate built in. Progressive disclosure reveals evidence, lineage, and entitlements, preserving auditability without slowing triage. To demonstrate how the solution works, I created this concept interface. The production designs are the bank’s property and can’t be shared. Visuals use sample/redacted data.",
        bullets: [],
        images: ["/images/cases/bofa-1.png"],
        wrapperClass: "case-block case-concept",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
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
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Quality & risk",
        body: "Clear NGTT explanations, evidence, and ownership reduced mis-routes and unnecessary escalations.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "SLA reliability",
        body: "On-time resolution increased; fewer SLA-risk cases as triage paths became deterministic.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Adoption",
        body: "Traders and Ops adopted the unified workflow; components and patterns were reused in adjacent areas, reducing delivery time for new screens.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Design system impact",
        body: "Extended Helix with status chips, exception banners, and rule-inspector patterns (tokens, states, usage notes), raising system coverage for data-heavy B2B flows.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Compliance & accessibility",
        body: "WCAG-aligned interactions; entitlements and audit trail surfaced without slowing triage.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
    ],
    metrics: [
      { label: "Time-to-decision", before: "≈12 min", after: "≈4 min" },
      { label: "Time-to-decision Δ", before: "", after: "-67%" },
      { label: "Escalations / 100 trades", before: "↑", after: "↓" },
    ],
    timeline: [
      { date: "Q3 2024", label: "Discovery & SME interviews" },
      { date: "Q4 2024", label: "Prototypes & design system extensions" },
      { date: "Q1 2025", label: "Pilot & rollout to operations" },
    ],
    logo: "/images/cases/bofa-icon.svg",
  },
  {
    id: "adarma",
    company: "Adarma",
    role: "Senior Product Designer",
    date: "Aug 2023 - Sep 2024",
    overview:
      "Security-operations dashboards to help analysts and managers see posture, triage alerts, and track incident response in one place—built for speed, clarity, and repeatability.",
    overviewBlocks: [
      {
        heading: "Overview",
        body: `Security-operations dashboards to help analysts and managers see posture, triage alerts, and track incident response in one place—built for speed, clarity, and repeatability.`,
        wrapperClass: "case-block case-overview",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Context & Problem",
        body: [
          "Fragmented views across SIEM, ticketing, and reporting made triage slow and inconsistent.",
          "Alert floods hid true priority; ownership and next steps were unclear.",
          "Leadership lacked a trustworthy “state of posture” view to steer action.",
        ],
        wrapperClass: "case-block case-context",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "What We Changed",
        body: [
          "Unified workspace: posture, alerts, cases, and trends in a single, role-aware view.",
          "Clear priority model with progressive disclosure (signal → rationale → next action).",
          "Ownership routing (who, by when) and lightweight playbook cues in-context.",
          "Tokenised, reusable UI patterns for rapid iteration across modules.",
        ],
        wrapperClass: "case-block case-changes",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "My Role",
        body: `End-to-end: clarified requirements with SOC analysts/managers, defined IA and interaction patterns, designed the dashboards, authored design tokens, and implemented core UI in Svelte.`,
        wrapperClass: "case-block case-role",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Decision Lens (JTBD)",
        body: [
          "When an alert spikes, an analyst needs to see impact and likely root cause so they can triage and assign within minutes.",
          "When posture drifts, a manager needs a single, trustworthy view of gaps and owners to plan remediation.",
          "When an incident opens, the team needs status, evidence, and next actions in one place to reduce time to contain.",
        ],
        wrapperClass: "case-block case-jtbd",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "Success Targets",
        body: `Reduce MTTA/MTTR, increase SLA-on-time closures, cut mis-routes/hand-offs, and improve posture visibility (fewer unknowns, clearer owners).`,
        wrapperClass: "case-block case-success",
        paragraphClass: "case-paragraph",
      },
    ],
    // Process & Screens
    screens: [
      {
        heading: "Process",
        paragraph:
          "Discovery, definition, exploration, systemisation, and validation focused on role-aware IA, priority model, and token-driven component patterns.",
        bullets: [
          "Discovery: SME interviews (SOC L1–L3, IR leads), tool/notification audit, and review of typical playbooks.",
          "Definition: IA for role-aware views (Analyst, Lead, Manager) and a common priority model.",
          "Exploration: Low-fi flows → interactive prototypes; killed concepts that added clicks or hid context.",
          "Systemisation: Design tokens + component patterns (status chips, evidence panels, trend bands).",
          "Validation: Task-based walkthroughs; refined copy, keyboard paths, and empty/error/loading states.",
        ],
        tools: ["Figma / FigJam", "Design tokens", "Svelte"],
        images: [],
        wrapperClass: "case-block case-screens",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
      {
        heading: "Concept",
        paragraph:
          "High-level proposal: posture overview with risk scores and owners; triage board with rationale and one-click assign/escalate; incident view with timeline and containment checklist; trends & anomalies with links to affected assets.",
        bullets: [
          "Posture overview: risk scores, control coverage, and drift with owners and due dates.",
          "Triage board: alert queues with rationale, suggested action, and one-click assign/escalate.",
          "Incident view: timeline, evidence, containment checklist, and stakeholder updates.",
          "Trends & anomalies: recent deltas with “what changed” and links to affected assets.",
          "Ownership routing: resolver group, SLA clock, and blockers surfaced inline.",
        ],
        images: [
          "/images/cases/adarma-1.png",
          "/images/cases/adarma-2.png",
          "/images/cases/adarma-3.png",
          "/images/cases/adarma-4.png",
        ],
        wrapperClass: "case-block case-concept",
        paragraphClass: "case-paragraph",
        listClass: "case-bullets",
        listItemClass: "case-bullet",
      },
    ],
    context:
      "Built a unified, role-aware security operations workspace that reduces context-switching and supports repeatable triage and incident response.",
    images: [
      "/images/cases/adarma-1.png",
      "/images/cases/adarma-2.png",
      "/images/cases/adarma-3.png",
      "/images/cases/adarma-4.png",
    ],
    // Impact & Outcome structured blocks
    impactBlocks: [
      {
        heading: "Operational speed",
        body: "Faster triage by consolidating signal, rationale, and next action; reduced context-switching and duplicate investigation.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Quality & risk",
        body: "Clearer prioritisation and evidence reduced mis-routes and improved containment decisions.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "SLA reliability",
        body: "On-time closures increased as ownership, due dates, and blockers were visible in the triage view.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Adoption",
        body: "Analysts and managers used the unified flows as the default workspace; patterns reused across additional modules.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Design system impact",
        body: "Token-driven components (status chips, evidence panels, exception banners) accelerated new screen delivery and improved consistency.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
      {
        heading: "Compliance & accessibility",
        body: "WCAG-aligned interactions, readable deltas, and auditable timelines; role-based access respected entitlements.",
        wrapperClass: "case-block case-impact",
        paragraphClass: "case-paragraph",
      },
    ],
    metrics: [
      // metrics indicative — add real numbers if available
      { label: "MTTA / MTTR", before: "—", after: "Improved" },
    ],
    timeline: [
      { date: "Q1 2024", label: "Discovery & SME interviews" },
      { date: "Q2 2024", label: "Prototypes & tokenisation" },
      { date: "Q3 2024", label: "Pilot & rollout" },
    ],
    logo: "/images/cases/adarma-icon.png",
  },
  {
    id: "silico",
    company: "SilicoAI",
    role: "UX Engineer",
    date: "Dec 2020 - Jun 2023",
    overview:
      "Decision-intelligence dashboards and workflows that let operators and leaders explore “what-if” scenarios, understand drivers, and choose the next best action with confidence.",
    overviewBlocks: [
      {
        heading: "Overview",
        body: `Decision-intelligence dashboards and workflows that let operators and leaders explore “what-if” scenarios, understand drivers, and choose the next best action with confidence.`,
      },
      {
        heading: "Context & Problem",
        body: [
          "Insights were split across models, spreadsheets, and BI views—making scenario planning slow and inconsistent.",
          "Users struggled to see drivers vs outcomes and how a change in one lever flowed through the system.",
          "Collaboration friction: results weren’t easy to share, compare, or explain to non-modelers.",
        ],
      },
      {
        heading: "What We Changed",
        body: [
          "Unified workspace that brings models, scenarios, and KPIs together with a shared interaction pattern.",
          "Driver trees + scenario controls with progressive disclosure (assumptions → impact → risk).",
          "Clear comparison views (baseline vs scenario) and annotated “why” explanations.",
          "Tokenised, reusable UI patterns for charts, deltas, sensitivities, and “next action” prompts.",
        ],
      },
      {
        heading: "My Role",
        body: `End-to-end: clarified requirements with PMs/SMEs, defined IA and interaction patterns, designed the dashboards, authored design tokens, and implemented core UI in React/Next.js with data-viz components.`,
      },
      {
        heading: "Decision Lens (JTBD)",
        body: [
          "When exploring options, a user needs to adjust drivers and instantly see KPI impact so they can pick the best scenario.",
          "When sharing results, a user needs a clear explanation of what changed and why so stakeholders can align quickly.",
          "When a metric moves, a user needs likely causes and recommended actions to decide whether to pivot or proceed.",
        ],
      },
      {
        heading: "Success Targets",
        body: `Reduce time from question → scenario → decision, increase scenario adoption in planning cycles, and improve clarity of “why” behind KPI changes.`,
      },
    ],
    screens: [
      {
        heading: "Process",
        paragraph:
          "Discovery, definition, exploration, systemisation, and validation focused on IA for models → drivers → scenarios → KPIs, plus reusable comparison and explanation patterns.",
        bullets: [
          "Discovery: Interviews with modelers, ops, and exec users; audit of current models/dashboards and hand-offs.",
          "Definition: IA for models → drivers → scenarios → KPIs; standardised comparison and explanation patterns.",
          "Exploration: Low-fi sketches → interactive prototypes; killed paths that hid assumptions or slowed iteration.",
          "Systemisation: Design tokens + component patterns (driver controls, delta chips, sensitivity bands, compare panels).",
          "Validation: Task-based reviews; tuned copy, empty/error/loading states, keyboard paths, and chart annotations.",
        ],
        tools: [
          "Figma / FigJam",
          "Design tokens",
          "React / Next.js",
          "TypeScript",
          "SCSS",
          "Storybook",
          "Recharts / D3",
        ],
        images: [],
      },

      // replaced single "Concept" block with three project showcases (each has text, bullets, 4 images)
      {
        heading: "Project — Scenario / Dashboard Workspace",
        paragraph:
          "Designed decision-intelligence dashboards that pair live scenarios with KPIs so leaders can forecast outcomes, compare options, and choose the next best action with confidence.",
        bullets: [
          "Scenario workspace: create, save, and switch scenarios; compare to baseline with KPI deltas.",
          "Driver highlights: show which levers moved and their contribution to change.",
          "Save & share: persist scenarios, add notes, and share links for review.",
          "Quick filters: focus by time range, segment, or confidence band.",
          "Readable at a glance: concise summaries with deeper detail on demand.",
        ],
        images: [
          "/images/cases/silico-1.svg",
          "/images/cases/silico-2.svg",
          "/images/cases/silico-3.svg",
          "/images/cases/silico-4.svg",
          "/images/cases/silico-5.svg",
          "/images/cases/silico-6.svg",
          "/images/cases/silico-7.svg",
        ],
      },
      {
        heading: "Project — New Inspector",
        paragraph:
          "Built an interactive inspector for model elements so users could review formulas, edit parameters, and understand downstream impact without leaving context.",
        bullets: [
          "Editable parameters: adjust ranges, step size, and defaults inline.",
          "Formula view: reveal logic, assumptions, and constraints per element.",
          "Impact preview: show affected KPIs and sensitivity before applying changes.",
          "Provenance links: trace values back to sources and model inputs.",
          "Guardrails: validation, error states, and safe-to-revert controls.",
        ],
        images: [
          "/images/cases/silico-8.svg",
          "/images/cases/silico-9.svg",
          "/images/cases/silico-10.svg",
          "/images/cases/silico-11.svg",
          "/images/cases/silico-12.svg",
        ],
      },
      {
        heading: "Project — Insights",
        paragraph:
          "Prototyped ‘quick simulations’ that let users tweak a single parameter and see immediate impact—paired with a minimal visual redesign for faster interpretation.",
        bullets: [
          "One-knob runs: change one input and get instant KPI feedback.",
          "Context chips: show what changed, by how much, and confidence.",
          "Minimal UI: reduced chrome, clearer hierarchy, accessible contrasts.",
          "Inline rationale: explain why the metric moved (drivers, assumptions).",
          "Export & share: snapshot results for async decision reviews.",
        ],
        images: [
          "/images/cases/silico-13.svg",
          "/images/cases/silico-14.svg",
          "/images/cases/silico-15.svg",
          "/images/cases/silico-16.svg",
        ],
      },
      {
        heading: "Project — Design System",
        paragraph:
          "Established Silico’s token-driven design system and core components to speed delivery and keep complex, data-heavy screens consistent and accessible.",
        bullets: [
          "Design tokens: color, spacing, typography, elevation, and data states.",
          "Core components: driver controls, delta chips, compare panels, tabs.",
          "Documentation: usage guidelines, do/don’t examples, and patterns.",
          "Storybook integration: live props, states, and testable stories.",
          "Accessibility: WCAG-aligned roles, focus, and keyboard behaviors.",
        ],
        images: [
          "/images/cases/SilicoSystem-1.svg",
          "/images/cases/SilicoSystem-2.svg",
          "/images/cases/SilicoSystem-3.svg",
          "/images/cases/SilicoSystem-4.svg",
        ],
      },
    ],
    context:
      "I designed a decision intelligence dashboard that visualises scenarios, constraints, and projected outcomes, letting decision makers run what ifs, compare trade offs, and prioritise the highest impact actions.",
    images: [
      "/images/cases/silico-1.svg",
      "/images/cases/silico-2.svg",
      "/images/cases/silico-3.svg",
      "/images/cases/silico-4.svg",
      "/images/cases/silico-5.svg",
    ],
    impactBlocks: [
      {
        heading: "Operational speed",
        body: "Shorter path from question → model run → decision by consolidating drivers, KPIs, and comparisons in one place.",
      },
      {
        heading: "Quality & risk",
        body: "Clear assumptions and provenance reduced misinterpretation; sensitivity views highlighted brittle scenarios early.",
      },
      {
        heading: "SLA reliability",
        body: "Planning/decision checkpoints hit more consistently as scenarios became repeatable and sharable.",
      },
      {
        heading: "Adoption",
        body: "Scenario workspace became the default for planning discussions; patterns reused across additional modules.",
      },
      {
        heading: "Design system impact",
        body: "Token-driven components (driver controls, delta chips, compare panels) accelerated delivery and ensured visual consistency.",
      },
      {
        heading: "Compliance & accessibility",
        body: "WCAG-aligned interactions and readable chart annotations; audit-friendly provenance for inputs, runs, and outputs.",
      },
    ],
    metrics: [
      // indicative metrics can be added here if available
    ],
    timeline: [
      { date: "Q4 2020", label: "Discovery & SME interviews" },
      { date: "Q1 2021", label: "Prototypes & tokenisation" },
      { date: "Q2 2021", label: "Pilot & rollout" },
    ],
    logo: "/images/cases/silico-icon.svg",
  },
];

export const otherWorks = [
  {
    id: "psa-peugeot",
    company: "PSA / Peugeot",
    role: "Product Designer",
    overview:
      "Two connected e-commerce experiences for PSA: AFS (book an at‑home mechanic) and Peugeot Online Purchase (configure and buy a vehicle). Both flows reduce friction from discovery to confirmation with clear steps, validation, and audit‑friendly summaries.",
    overviewBlocks: [
      {
        heading: "Overview",
        body: [
          "Two connected e-commerce experiences for PSA:",
          "1. AFS: Book an at-home mechanic by location, vehicle, and required work.",
          "2. Peugeot Online Purchase: Configure and buy a vehicle end-to-end (version, packages, financing).",
          "Both flows reduce friction from discovery to confirmation with clear steps, validation, and audit-friendly summaries."
        ]
      },
      {
        heading: "Context & Problem",
        body: [
          "AFS: Service booking required multiple phone/email handoffs; users struggled to find a nearby technician and match services to their vehicle. Address/ZIP and geolocation errors stalled bookings.",
          "Peugeot Online Purchase: Vehicle purchase journeys were fragmented across brochures, dealers, and calculators; users couldn’t compare versions, packages, and payments in one flow.",
        ],
      },
      {
        heading: "What We Changed",
        body: [
          "AFS: A guided funnel -   find location → identify vehicle (VIN/model) → choose services → pick time → pay → confirm, with instant validation for ZIP/address/geolocation and clear error recovery.",
          "Peugeot Online Purchase: A unified configurator with version, features/packages, color, payment (cash/lease/loan), live totals, and scenario presets for comparison.",
        ],
      },
      {
        heading: "My Role",
        body: "End-to-end designer: Mapped requirements, defined IA and step logic, designed flows and UI, authored tokens/components, and built core screens (Svelte) with accessible patterns.",
      },
      {
        heading: "Decision Lens (JTBD)",
        body: [
          "AFS: When I need my car serviced, I want a nearby mechanic, accurate pricing, and a clear slot so I can book in minutes without calling around.",
          "Peugeot Online Purchase: When I’m configuring a Peugeot, I want to compare versions/packages and payment options in one place so I can buy confidently online.",
        ],
      },
      {
        heading: "Success Targets",
        body: "Increase completed bookings and online purchases; reduce drop-offs on location/vehicle steps; cut errors and misroutes; shorten time to service slot or checkout.",
      },
    ],
    screens: [
      {
        heading: "Process",
        paragraph:
          "End-to-end workflow to unify agent, back-office, and consumer experiences—reducing handoffs, improving proof quality, and making approvals auditable.",
        bullets: [
          "Discovery & alignment: SME interviews (agents, reviewers, ops) → goals, constraints, compliance needs.",
          "Workflow mapping: Current → future flows across capture → classify → approve; identify failure modes and handoff gaps.",
          "IA & taxonomy: Standardise proof types, statuses, and document metadata for consistent handling.",
          "Design system: Tokenise color/spacing/typography/status; establish reusable tables, chips, checklists, and panels.",
          "Prototype & validate: Low-fi → interactive; test tasks, refine copy, states, keyboard paths, and focus order.",
          "Pilot & scale: Ship to a subset, track first-pass approvals/time-to-review/drop-offs, then roll patterns across products."
        ],
        tools: ["Figma / FigJam", "Design tokens"],
        images: [],
      },
      {
        heading: "Project — AFS (service booking)",
        paragraph:
          "AFS: Find a nearby service, identify vehicle, choose services, pick a timeslot, pay, and confirm with a human‑readable summary and robust error recovery.",
        bullets: [
          "Find service via ZIP / My address / My location with clear error and retry patterns.",
          "Identify vehicle by VIN or Make → Year → Model → Engine; handle VIN failures gracefully.",
          "Choose services with itemised pricing and select time from a calendar grid; confirm with tech name, date/time, and address.",
        ],
        images: [
          "/images/cases/AFS-1.jpg",
          "/images/cases/AFS-2.jpg",
          "/images/cases/AFS-3.jpg",
          "/images/cases/AFS-4.jpg",
          "/images/cases/AFS-5.jpg",
        ],
      },
      {
        heading: "Project — Peugeot Configurator",
        paragraph:
          "Peugeot: unified configurator for version, packages, color, and payment with live totals, scenario presets, and clear feature/group breakdowns.",
        bullets: [
          "Select Version → Add Features/Packages → Choose Color → Payment with live totals and cash/lease/loan options.",
          "Feature groups and tech packs show inclusions and price deltas to aid comparison.",
          "Scenario presets let users compare equipment and payment outcomes side-by-side.",
        ],
        images: [
          "/images/cases/PSA-1.jpg",
          "/images/cases/PSA-2.jpg",
          "/images/cases/PSA-3.jpg",
          "/images/cases/PSA-4.jpg",
          "/images/cases/PSA-5.jpg",
        ],
      },
    ],
    context:
      "I led end-to-end UX for PSA’s AFS service booking and Peugeot’s online purchase flows—defining IA, designing token-driven UI, and building core screens to make booking and configuring a car fast, clear, and reliable.",
    images: ["/images/cases/AFS-1.jpg", "/images/cases/PSA-1.jpg"],
    impactBlocks: [
      {
        heading: "Operational speed",
        body: "Users complete bookings and configurations faster thanks to guided steps, instant validation, and clear next actions.",
      },
      {
        heading: "Quality & risk",
        body: "Fewer misroutes and abandoned sessions by surfacing address/VIN errors early and explaining feature/package impacts before checkout.",
      },
      {
        heading: "SLA reliability",
        body: "More on-time service appointments as the flow locks location, services, and timeslot with a clear confirmation summary (tech/contact, date/time, address).",
      },
      {
        heading: "Adoption",
        body: "Configurator becomes a single source of truth for versions/packages and payments; AFS becomes the default path to book a mobile mechanic.",
      },
      {
        heading: "Design system impact",
        body: "Consistent, token-driven components (option tiles, calendars, price rows, summary panels) used across service and commerce surfaces, accelerating new screens.",
      },
      {
        heading: "Compliance & accessibility",
        body: "WCAG-aligned contrast, labels, focus order, and keyboard support; transparent pricing and confirmations improve auditability and user trust.",
      },
      {
        heading: "Note",
        body: "Metrics are indicative for portfolio use; screenshots use sample/redacted data.",
      },
    ],
    metrics: [],
    timeline: [],
    logo: "/images/cases/psa-icon.svg",
  },
  {
    id: "highland",
    company: "Highland Easy Life",
    role: "Senior Product UX UI Developer - Contractor",
    date: "Aug 2019 - Oct 2020",
    overview:
      "EasyLife (ELA) is a multi-carrier life-insurance quote tool with a companion broker dashboard for managing inbound leads and quote requests. Consumers get a quick estimate, refine answers, and compare carriers; brokers see leads, status, and next actions in a single workspace.",
    overviewBlocks: [
      {
        heading: "Overview",
        body: [
          "EasyLife (ELA) is a multi-carrier life-insurance quote tool with a companion broker dashboard for managing inbound leads and quote requests.",
          "Consumers get a quick estimate, refine answers, and compare carriers; brokers see leads, status, and next actions in a single workspace."
        ]
      },
      {
        heading: "Context & Problem",
        body: [
          "Consumers bounced between forms and carrier pages; quotes weren’t comparable or easy to refine.",
          "Brokers lacked a unified view of lead details, health class, premium, term, and status, slowing follow-up."
        ]
      },
      {
        heading: "What We Changed",
        body: [
          "A guided Learn → Refine → Review quote flow with live ranges and clear monthly premium comparisons.",
          "Broker ELA Dashboard with sortable leads, confidence signals, and quick actions (Quote & Apply)."
        ]
      },
      {
        heading: "My Role",
        body:
          "End-to-end: UX for quote + broker flows, UI implementation (token-driven components), accessibility states, and annotated hand-off for engineering."
      },
      {
        heading: "Decision Lens (JTBD)",
        body: [
          "When I’m shopping for life insurance, I need comparable quotes I can refine quickly so I can pick a carrier with confidence.",
          "When I receive a new lead, I need health class, premium, and contact context in one view so I can prioritise outreach."
        ]
      },
      {
        heading: "Success Targets",
        body:
          "Increase completed quote → apply starts, reduce abandon during refine, shorten broker time-to-first-contact, and improve lead routing clarity."
      }
    ],
    // Process & Screens
    screens: [
      {
        heading: "Process",
        paragraph:
          "End-to-end workflow to unify agent, back-office, and consumer experiences—reducing handoffs, improving proof quality, and making approvals auditable.",
        bullets: [
          "Discovery & alignment: SME interviews (agents, reviewers, ops) → goals, constraints, compliance needs.",
          "Workflow mapping: Current → future flows across capture → classify → approve; identify failure modes and handoff gaps.",
          "IA & taxonomy: Standardise proof types, statuses, and document metadata for consistent handling.",
          "Design system: Tokenise color/spacing/typography/status; establish reusable tables, chips, checklists, and panels.",
          "Prototype & validate: Low-fi → interactive; test tasks, refine copy, states, keyboard paths, and focus order.",
          "Pilot & scale: Ship to a subset, track first-pass approvals/time-to-review/drop-offs, then roll patterns across products."
        ],
        tools: ["Figma / FigJam", "Design tokens"],
        images: [],
      },
      {
        heading: "Project — Consumer QuickQuote",
        paragraph:
          "Consumer QuickQuote: sliders for term and amount, premium range, and location context with a switch to detailed quoting to refine.",
        bullets: [
          "Sliders for term and amount with live premium ranges and location context.",
          "Carrier compare table with product name and monthly premium for side-by-side selection.",
          "Refine forms: health/family/driving sections with left summary panel showing coverage split and progress."
        ],
        images: [
          "/images/cases/easylife-1.png",
          "/images/cases/easylife-2.png",
          "/images/cases/easylife-3.png",
          "/images/cases/easylife-4.png",
          "/images/cases/easylife-5.png"
        ]
      },
      {
        heading: "Project — Broker ELA Dashboard",
        paragraph:
          "Broker dashboard: paginated, sortable leads list with submitted date, coverage, carrier, term, premium, age, status, and quick Quote & Apply actions.",
        bullets: [
          "Sortable leads table with confidence signals and quick actions (Quote & Apply).",
          "Lead detail panel surfaces health class, premium, term, contact context, and suggested next actions.",
          "Pagination and filters to prioritise outreach by age, premium, or confidence."
        ],
        images: [
          "/images/cases/highland-6.jpg",
          "/images/cases/highland-7.jpg",
          "/images/cases/highland-8.jpg",
          "/images/cases/highland-9.jpg",
          "/images/cases/highland-10.jpg"
        ]
      }
    ],
    context:
      "I led UX and UI implementation for EasyLife’s consumer quick-quote experience and the broker ELA dashboard — standardising IA, tokenising components, and improving the end-to-end flow to reduce abandon and speed broker contact.",
    images: [
      "/images/cases/highland-1.jpg",
      "/images/cases/highland-5.jpg"
    ],
    impactBlocks: [
      {
        heading: "Operational speed",
        body:
          "Consumers move from estimate to carrier selection faster; brokers see all lead context without system-hopping."
      },
      {
        heading: "Quality & risk",
        body:
          "Structured refine questions reduce bad inputs; broker view lowers mis-prioritised outreach."
      },
      {
        heading: "SLA reliability",
        body:
          "Clear status and next actions help brokers respond within internal SLAs; consumer flow reduces abandon during refine."
      },
      {
        heading: "Adoption",
        body:
          "Broker dashboard becomes the default lead screen; QuickQuote becomes the entry to deeper quoting."
      },
      {
        heading: "Design system impact",
        body:
          "Tokenised tables, chips, and summary panels reused across consumer and broker surfaces, speeding new screen delivery."
      },
      {
        heading: "Compliance & accessibility",
        body:
          "WCAG-aligned labels, contrast, and keyboard paths; transparent pricing tables and human-readable summaries support auditability."
      }
    ],
    metrics: [],
    timeline: [],
    logo: "/images/cases/highland-icon.jpeg"
  },
  {
    id: "emerios",
    company: "Emerios",
    role: "Senior Product UX/UI Developer",
    date: "Dec 2013 - Mar 2017",
    overview:
      "Built and refined core experiences across Emerios’s ecosystem: a secure Agent Vault for documents, a Back-Office console for verification, and a SafeLink Enrollment flow with multi-channel proof submission. The goal across all three was the same: reduce handoffs, make evidence audit-ready, and move cases forward faster.",
    overviewBlocks: [
      {
        heading: "Overview",
        body: [
          "Built and refined core experiences across Emerios’s ecosystem: a secure Agent Vault for documents, a Back-Office console for verification, and a SafeLink Enrollment flow with multi-channel proof submission.",
          "The goal across all three was the same: reduce handoffs, make evidence audit-ready, and move cases forward faster."
        ]
      },
      {
        heading: "Context & Problem",
        body: [
          "Sensitive proofs scattered across email/folders slowed retrieval and increased compliance risk.",
          "Back-office reviewers had to jump between pages to classify proofs and resolve errors.",
          "Applicants struggled to submit acceptable documentation from the devices/channels they actually had."
        ]
      },
      {
        heading: "What We Changed",
        body: [
          "Centralised, searchable Vault with structured metadata, versioning, and quick actions.",
          "Single-screen document processing with required-proof checklist, page carousel, and standardised reasons.",
          "Multi-channel enrollment step (upload, email, text, fax, mail) with clear guidance, validation, and status."
        ]
      },
      {
        heading: "My Role",
        body:
          "End-to-end UX across the three streams: requirements, IA, flows, and UI; authored token-driven patterns; implemented key screens and states; wrote usage and accessibility guidance."
      },
      {
        heading: "Decision Lens (JTBD)",
        body: [
          "When I capture a customer document, I need to store and retrieve it quickly with the right tags so I can finish enrollment and pass audit.",
          "When I review a case, I need to classify proofs accurately on one screen so the file can advance without rework.",
          "When I apply, I need a simple way to submit proofs from whatever I have so my enrollment isn’t blocked."
        ]
      },
      {
        heading: "Success Targets",
        body:
          "Faster document retrieval and review; fewer misclassified/invalid proofs; higher first-pass approvals; reduced drop-offs in documentation steps; clearer audit trail."
      }
    ],
    // Process & Screens
    screens: [
      {
        heading: "Process",
        paragraph:
          "End-to-end workflow to unify agent, back-office, and consumer experiences—reducing handoffs, improving proof quality, and making approvals auditable.",
        bullets: [
          "Discovery & alignment: SME interviews (agents, reviewers, ops) → goals, constraints, compliance needs.",
          "Workflow mapping: Current → future flows across capture → classify → approve; identify failure modes and handoff gaps.",
          "IA & taxonomy: Standardise proof types, statuses, and document metadata for consistent handling.",
          "Design system: Tokenise color/spacing/typography/status; establish reusable tables, chips, checklists, and panels.",
          "Prototype & validate: Low-fi → interactive; test tasks, refine copy, states, keyboard paths, and focus order.",
          "Pilot & scale: Ship to a subset, track first-pass approvals/time-to-review/drop-offs, then roll patterns across products."
        ],
      },
      {
        heading: "Tools (shared)",
        paragraph:
          "Figma / FigJam • Design tokens (color, spacing, typography, status) • Reusable table, chip, and panel components",
        images: []
      },
      {
        heading: "Project — Agent Vault Tool",
        paragraph:
          "Agent Vault: centralised storage, search, and quick actions to manage proofs and their provenance.",
        bullets: [
          "Mapped agent tasks (capture → upload → tag → find/share); designed bulk upload, search, and retention cues.",
          "Defined metadata, versioning, and share/revoke flows; added clear processing/verified states.",
          "Concept: card/table toggle with filters and tags; preview + activity history on each file; quick actions (upload, tag, share, revoke)."
        ],
        images: [
          "/images/cases/emerios-1.jpg",
          "/images/cases/emerios-2.jpg",
          "/images/cases/emerios-3.jpg",
          "/images/cases/emerios-4.jpg"
        ]
      },
      {
        heading: "Project — Back-Office Document Processing",
        paragraph:
          "Single-screen document processor to classify, validate, and advance cases without hopping between pages.",
        bullets: [
          "Audited current review path; consolidated steps into a single screen; standardised proof taxonomy and error handling.",
          "Added “next step” cues and guardrails to prevent partial submissions.",
          "Concept: required-proof checklist tied to case type; page carousel with quick classify, validate, and submit/reject with reasons; status chips for ready/pending/needs-correction."
        ],
        images: [
          "/images/cases/emerios-5.jpg",
          "/images/cases/emerios-6.jpg",
          "/images/cases/emerios-7.jpg",
          "/images/cases/emerios-8.jpg"
        ]
      },
      {
        heading: "Project — SafeLink Enrollment (Multi-Channel Proof)",
        paragraph:
          "Multi-channel proof submission step so applicants can provide documents by upload, email, text, fax, or mail with clear validation and status.",
        bullets: [
          "Catalogued all submission channels; wrote channel-specific guidance; added file limits/format validation and enrollment-ID anchoring.",
          "Designed reminders and “what’s missing” messages to reduce back-and-forth and improve first-pass success.",
          "Concept: documentation status step with channel options, upload queue showing filenames/progress/validation results, pending verification badges, deadlines, and next-step CTAs."
        ],
        images: [
          "/images/cases/emerios-9.jpg",
          "/images/cases/emerios-10.jpg",
          "/images/cases/emerios-11.jpg",
          "/images/cases/emerios-12.jpg"
        ]
      }
    ],
    context:
      "I led end-to-end UX across Agent Vault, Back-Office processing, and SafeLink Enrollment — centralising proofs, standardising taxonomy, and building resilient multi-channel submission flows so cases move forward faster and audits are simpler.",
    images: ["/images/cases/emerios-1.jpg"],
    impactBlocks: [
      {
        heading: "Operational speed",
        body:
          "Agents and reviewers complete document tasks faster (centralised search, one-screen classification, clear next actions)."
      },
      {
        heading: "Quality & risk",
        body:
          "Consistent metadata, proof taxonomy, and validation reduce misfiles, misclassification, and compliance exposure."
      },
      {
        heading: "SLA reliability",
        body:
          "Clear statuses and reasons minimise ping-pong; more cases meet internal SLAs for review and approval."
      },
      {
        heading: "Adoption",
        body:
          "Vault becomes the default doc workspace; back-office console the primary review screen; multi-channel step reduces abandonment."
      },
      {
        heading: "Design system impact",
        body:
          "Token-driven tables, chips, checklists, and panels reused across products, accelerating new screens and keeping visuals consistent."
      },
      {
        heading: "Compliance & accessibility",
        body:
          "WCAG-aligned labels, contrast, focus order, and keyboard paths; auditable histories and human-readable summaries for every action."
      }
    ],
    metrics: [],
    timeline: [],
    logo: "/images/cases/emerios-icon.svg",
  },
  {
    id: "misc",
    company: "More Works",
    role: "Various Projects",
    date: "2010 - Present",
    context:
      "Collection of smaller projects and experiments — gallery-style entry.",
    challenge: "Various.",
    approach: "Placeholder approach: short case summaries and visual showcase.",
    impact: "Placeholder impact summary.",
    tools: ["Figma"],
    images: [
      "/images/cases/more-1.jpg",
      "/images/cases/more-2.jpg",
      "/images/cases/more-3.jpg",
      "/images/cases/more-4.jpg",
    ],
  },
];

// ensure `otherWorks` is defined above (the array you created)
// add this alias so consumers can import `secondary`
export const secondary = typeof otherWorks !== "undefined" ? otherWorks : [];
