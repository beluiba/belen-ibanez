import React from "react";
import type { Tab } from "./Tabs";
import KeyFacts from "../modal/KeyFacts";
import styles from "@/styles/components/CaseModal.module.scss";
import type { ProjectData } from "../ProjectModal";

/**
 * buildProjectTabs(project)
 * Returns a consistent set of tabs (Overview, Screens, Process, System, Tools, Results)
 * populated from ProjectData. Use in ProjectModal as `tabs={buildProjectTabs(project)}`.
 *
 * Keeps markup simple and reusable across projects; styling is driven by CaseModal.module.scss.
 */

export function buildProjectTabs(project: ProjectData, opts?: { addins?: React.ReactNode[] }): Tab[] {
  const toolsDisplay = Array.isArray(project.tools) ? project.tools.join(" · ") : typeof project.tools === "string" ? project.tools : undefined;

  const toNode = (v: unknown, fallback: React.ReactNode): React.ReactNode => {
    if (v == null || v === "") return fallback;
    if (Array.isArray(v)) return v.join(" · ");
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return v;
    if (React.isValidElement(v)) return v;
    return String(v);
  };

  const keyFactsItems: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Role & scope", value: toNode(project.role, "Product · UX/UI · Design‑Engineering") },
    { label: "Timeline", value: toNode(project.timeline, "—") },
    { label: "Team & partners", value: toNode(project.team, "—") },
    { label: "Tools", value: toNode(toolsDisplay, "—") },
    { label: "Design system", value: toNode(project.designSystem, "—") },
    { label: "Platform", value: toNode(project.platform, "Desktop web") },
  ];

  const Overview = (
    <div className={styles.popupOverview}>
      {project.oneLiner ? <p className={styles.oneLiner}><strong>One-liner:</strong> {project.oneLiner}</p> : null}

      <div className={styles.twoCol}>
        <div className={styles.sectionContent}>
          <h4>Context & Users</h4>
          <p>{project.oneLiner ? `${project.oneLiner.split("—")[0] || ""}` : ""}</p>

          <h4>Problem (before)</h4>
          <ul>
            <li>{typeof project.challenge === "string" ? project.challenge : "Scattered tools and stale timestamps slowed decisions."}</li>
            <li>{typeof project.approach === "string" ? project.approach : "Exceptions and labels were inconsistent and hard to present."}</li>
          </ul>

          <h4>Goals (after)</h4>
          <ul>
            <li>Single, comparative GTT view across entities.</li>
            <li>Actionable, consistent badges with evidence links.</li>
            <li>Audit-friendly metadata: ID · status · last updated.</li>
          </ul>

          <h4>Key Decisions & Trade-offs</h4>
          <ul>
            <li>Matrix layout (rows = rules, columns = entities) to surface differences quickly.</li>
            <li>Badge taxonomy with icon+text (not color-only) to meet accessibility and audit needs.</li>
            <li>Progressive disclosure: filters + drawer to keep table density manageable.</li>
          </ul>

          <h4>Outcomes (illustrative)</h4>
          <ul>
            <li>Time-to-confirm: ~120s → ~40s (illustrative)</li>
            <li>Exception rework: −25% (illustrative)</li>
          </ul>

          {project.disclaimer ? <p className={styles.disclaimer}>{project.disclaimer as React.ReactNode}</p> : null}
        </div>

        <KeyFacts items={keyFactsItems} />
      </div>
    </div>
  );

  const Screens = (
    <div className={styles.popupScreens}>
      <h4>Hero screen</h4>
      <p className={styles.sectionContent}>Dense rules × entities matrix proving cross-entity consolidation and audit cues.</p>

      <h5>Supporting screens</h5>
      <ul>
        <li>Rules & Regulations Matrix — consolidated comparison with badges and timestamps.</li>
        <li>Rule Detail Drawer — rationale, evidence links, and change history without losing context.</li>
        <li>Empty & Stale states — guidance and refresh actions for missing/out-of-date data.</li>
      </ul>

      <h5>Present / Export</h5>
      <p className={styles.sectionContent}>Client-ready present mode (PDF) preserving badges and audit footer.</p>
    </div>
  );

  const Process = (
    <div className={styles.popupProcess}>
      <h4>Approach</h4>
      <p className={styles.sectionContent}>Problem → Research → Shaping → Flows & IA → Wireframes → UI & System → Front-end → Validation.</p>

      <h5>Evidence gathered</h5>
      <p className={styles.sectionContent}>Interviews, sample datasets, system logs, usability sessions, and stakeholder walkthroughs.</p>

      <h5>Risks & mitigations</h5>
      <ul>
        <li>Freshness risk — authoritative timestamps and refresh CTA.</li>
        <li>Conflicting statuses — conflict badge + escalation guidance.</li>
        <li>High density — validated typography and row metrics in prototype tests.</li>
      </ul>

      <h5>Decisions log</h5>
      <ul>
        <li>Matrix over tabs: reduced cross-clicks and sped comparison tasks.</li>
        <li>Server-validated timestamps to preserve auditability.</li>
        <li>Badge taxonomy for consistent actionability.</li>
      </ul>
    </div>
  );

  const System = (
    <div className={styles.popupSystem}>
      <h4>Information Architecture</h4>
      <p className={styles.sectionContent}>Organized by Rule → Entity → Evidence with filters for BU, rule category, and date range.</p>

      <h4>Design System Work</h4>
      <p className={styles.sectionContent}>Added badge component, dense-table tokens, and a detail-drawer pattern for evidence.</p>

      <h4>States coverage</h4>
      <ul>
        <li>Loading skeletons</li>
        <li>Empty / Partial guidance</li>
        <li>Stale warning (timestamp + refresh)</li>
        <li>Role-based disabled actions</li>
      </ul>

      <h4>Accessibility & Performance</h4>
      <p className={styles.sectionContent}>WCAG AA for badges/navigation; perf target illustrative: LCP ≤ 2.5s.</p>
    </div>
  );
  const Tools = (
    <div className={styles.popupTools}>
      <h4>Toolchain</h4>
      <p className={styles.sectionContent}>{toolsDisplay ?? "Figma · React · Next.js · Jira · Looker"}</p>

      <h4>Collaboration</h4>

      <h4>Collaboration</h4>
      <p className={styles.sectionContent}>Weekly syncs, PR reviews, paired spikes, and compliance walkthroughs.</p>

      <h4>Handoff artifacts</h4>
      <ul>
        <li>Design specs, Storybook tokens, acceptance criteria, and compliance checklists.</li>
      </ul>
    </div>
  );

  const Results = (
    <div className={styles.popupResults}>
      <h4>Results & Learnings</h4>
      <p className={styles.sectionContent}>Impact summary (illustrative) and qualitative outcomes; next steps: Present Mode, change history, watchlists & alerts.</p>

      <h5>Illustrative metrics</h5>
      <ul>
        <li>Time-to-confirm: ~120s → ~40s (illustrative)</li>
        <li>Exception rework: −25% (illustrative)</li>
      </ul>

      {opts?.addins?.map((n, i) => <div key={i}>{n}</div>)}
    </div>
  );

  const tabs: Tab[] = [
    { id: "overview", title: "Overview", content: Overview },
    { id: "screens", title: "Screens", content: Screens },
    { id: "process", title: "Process", content: Process },
    { id: "system", title: "System", content: System },
    { id: "tools", title: "Tools", content: Tools },
    { id: "results", title: "Results", content: Results },
  ];

  return tabs;
}

export default buildProjectTabs;