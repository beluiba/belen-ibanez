"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "@/styles/components/CaseModal.module.scss";

type NavItem = { title: string; href?: string; onNavigate?: () => void };

type DecisionLogItem = { date: string; note: string };
type Metric = { label: string; before: number | string; after: number | string };
type KeyScreen = {
  src: string;
  alt?: string;
  name?: string;
  goal?: string;
  outcome?: string;
  notable?: string;
  before?: string;
  after?: string;
  caption?: string;
};
type Milestone = { date: string; name?: string; label?: string };
type GalleryData = { metrics?: Metric[]; milestones?: Milestone[] };

interface CaseData {
  company: string;
  role?: string;
  tools?: string[];
  toolsDetail?: Record<string, string>;
  challenge?: string;
  approach?: string;
  impact?: string;
  restrictions?: string;
  images?: string[];
  logo?: string;
  oneLiner?: string;
  overview?: string;
  keyScreens?: KeyScreen[];
  designDecisions?: string;
  outcomeNext?: string;
  targetUsers?: string[];
  goals?: string[];
  roleSummary?: string;
  timeline?: Milestone[];
  insights?: string[];
  flows?: string;
  tradeoff?: string;
  designSystem?: string;
  validation?: string;
  decisionLog?: DecisionLogItem[];
  date?: string;
  duration?: string;
  metrics?: Metric[];
  quote?: string;
  businessImpact?: string;
  next?: string;
  reflection?: string;
}

interface CaseModalProps {
  caseData: CaseData;
  onClose: () => void;
  projectList?: Array<NavItem | string | Record<string, unknown>>;
  currentIndex?: number;
}

/* --- Internal reusable ModalTemplate (kept inside this file as requested) --- */

function ModalTemplate({
  title,
  subtitle,
  oneLiner,
  role,
  date,
  gallery,
  logoSrc,
  onClose,
  prev,
  next,
  children,
}: {
  title: string;
  subtitle?: string;
  oneLiner?: string;
  role?: string;
  date?: string;
  gallery?: GalleryData;
  logoSrc?: string;
  onClose: () => void;
  prev?: { label?: string; onClick: () => void } | null;
  next?: { label?: string; onClick: () => void } | null;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={`${title} case study`}>
      
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              {logoSrc ? (
                <div className={styles.logoWrapper} aria-hidden="true">
                  <Image
                    src={logoSrc}
                    alt={`${title} logo`}
                    width={75}
                    height={75}
                    className={styles.logoImage}
                    unoptimized={logoSrc.startsWith("/images/") ? false : undefined}
                  />
                </div>
              ) : null}

              {/* single info block containing Company, Role, Duration */}
              <div className={styles.headerInfo}>
                <h3 className={styles.company}>{title}</h3>
                <h4 className={styles.roleName}>{role ?? ""}</h4>
                <div className={styles.duration}>{date ?? ""}</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close modal"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            ×
          </button>
        </header>

        {/* main scrollable area contains the optional metrics/milestones and the tabbed body */}
        <div className={styles.modalMain} role="document" aria-roledescription="case study modal">
          {gallery?.metrics?.length ? (
            <div className={styles.modalContent}>
              <div className={styles.metricChips} aria-hidden={false}>
                {gallery.metrics.map((m, i) => (
                  <div key={i} className={styles.metricChip}>
                    <strong className={styles.metricLabel}>{m.label}</strong>
                    <span className={styles.metricValue}>
                      {m.before} → {m.after}
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.milestones} role="group" aria-label="Milestones">
                {gallery?.milestones?.length ? (
                  gallery.milestones.map((ms, i) => (
                    <div key={i} className={styles.milestone}>
                      <span className={styles.milestoneName}>{ms.name ?? ms.label ?? ""}</span>
                      <time className={styles.milestoneDate}>{ms.date}</time>
                    </div>
                  ))
                ) : (
                  <>
                    <div className={styles.milestone}>
                      <span className={styles.milestoneName}>Kickoff</span>
                      <time className={styles.milestoneDate}>—</time>
                    </div>
                    <div className={styles.milestone}>
                      <span className={styles.milestoneName}>Alpha</span>
                      <time className={styles.milestoneDate}>—</time>
                    </div>
                    <div className={styles.milestone}>
                      <span className={styles.milestoneName}>Beta</span>
                      <time className={styles.milestoneDate}>—</time>
                    </div>
                    <div className={styles.milestone}>
                      <span className={styles.milestoneName}>Launch</span>
                      <time className={styles.milestoneDate}>—</time>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}

          <div className={styles.modalBody}>{children}</div>
        </div>
 
         <footer className={styles.footer} role="navigation" aria-label="Project navigation">
           <button
             type="button"
             className="btnToken"
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               if (prev) prev.onClick();
             }}
             disabled={!prev}
             aria-label={prev ? `Previous: ${prev.label ?? "previous"}` : "Previous project"}
             data-test="prev-project-btn"
           >
             ← {prev?.label ?? "Previous"}
           </button>
           <div aria-hidden style={{ flex: 1 }} />
           <button
             type="button"
             className="btnToken"
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               if (next) next.onClick();
             }}
             disabled={!next}
             aria-label={next ? `Next: ${next.label ?? "next"}` : "Next project"}
             data-test="next-project-btn"
           >
             {next?.label ?? "Next"} →
           </button>
         </footer> 
     </div>
   );
 }
/* --- CaseModal: selects project-specific content, uses ModalTemplate --- */
const TAB_TITLES = ["Overview", "Ideation & Process", "Screens", "Tools Used", "Impact & Outcome"] as const;

const CaseModal: React.FC<CaseModalProps> = ({ caseData, onClose, projectList, currentIndex = 0 }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById("modal-root") ?? document.body);
  }, []);

  // Accessibility focus management
  useEffect(() => {
    const main = document.getElementById("main-content");
    previouslyFocused.current = (document.activeElement as HTMLElement) ?? null;

    const focusTarget =
      modalRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ??
      modalRef.current;
    focusTarget?.focus();

    if (main) {
      try {
        (main as HTMLElement & { inert: boolean }).inert = true;
      } catch {}
      main.setAttribute("aria-hidden", "true");
    }

    return () => {
      if (main) {
        try {
          (main as HTMLElement & { inert: boolean }).inert = false;
        } catch {}
        main.removeAttribute("aria-hidden");
      }
      try {
        previouslyFocused.current?.focus();
      } catch {}
    };
  }, []);

  // normalize incoming project list into NavItem[]
  const list: NavItem[] = useMemo(() => {
    return Array.isArray(projectList)
      ? (projectList
          .map((it) => {
            if (!it) return null;
            if (typeof it === "string") return { title: it };
            const obj = it as Record<string, unknown>;
            const title =
              typeof obj.title === "string"
                ? (obj.title as string)
                : typeof obj["name"] === "string"
                ? (obj["name"] as string)
                : "";
            const href = typeof obj.href === "string" ? (obj.href as string) : undefined;
            const onNavigate = typeof obj.onNavigate === "function" ? (obj.onNavigate as () => void) : undefined;
            return { title, href, onNavigate };
          })
          .filter(Boolean) as NavItem[])
      : [];
  }, [projectList]);

  const effectiveIndex = (() => {
    if (list.length === 0) return 0;
    if (typeof currentIndex === "number" && currentIndex >= 0 && currentIndex < list.length) return currentIndex;
    const byTitle = list.findIndex((p) => p.title === caseData.company);
    if (byTitle >= 0) return byTitle;
    const slug = String(caseData.company || "").toLowerCase().replace(/\s+/g, "-");
    const byHref = list.findIndex((p) => String(p.href ?? "").toLowerCase().includes(slug));
    return byHref >= 0 ? byHref : 0;
  })();

  const len = list.length;
  const prevFromList: NavItem | undefined = len > 0 ? list[(effectiveIndex - 1 + len) % len] : undefined;
  const nextFromList: NavItem | undefined = len > 0 ? list[(effectiveIndex + 1) % len] : undefined;

  const prev = prevFromList
    ? {
        label: prevFromList.title,
        onClick: () => {
          const target = prevFromList;
          if (target.onNavigate) return target.onNavigate();
          if (target.href && typeof window !== "undefined") window.location.href = target.href;
        },
      }
    : null;

  const next = nextFromList
    ? {
        label: nextFromList.title,
        onClick: () => {
          const target = nextFromList;
          if (target.onNavigate) return target.onNavigate();
          if (target.href && typeof window !== "undefined") window.location.href = target.href;
        },
      }
    : null;

  // lock scroll while modal is open
  useEffect(() => {
    const prevOverflow = typeof document !== "undefined" ? document.body.style.overflow : "";
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = prevOverflow;
    };
  }, []);

  // keyboard navigation (Escape + Arrow keys)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        const activeEl = document.activeElement as HTMLElement | null;
        if (activeEl) {
          const tag = activeEl.tagName;
          if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
        }
        e.preventDefault();
        setActiveTab((prev) => {
          const delta = e.key === "ArrowRight" ? 1 : -1;
          return (prev + delta + TAB_TITLES.length) % TAB_TITLES.length;
        });
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const defaultSections = useMemo(() => {
    const keyScreens: KeyScreen[] =
      Array.isArray(caseData.keyScreens) && caseData.keyScreens.length > 0
        ? caseData.keyScreens
        : Array.isArray(caseData.images) && caseData.images.length > 0
        ? caseData.images.map((s) => ({ src: s, alt: caseData.company }))
        : [];
    return {
      overview: caseData.oneLiner ?? caseData.overview ?? `${caseData.challenge ?? ""} ${caseData.approach ?? ""}`.trim(),
      impact: caseData.impact,
      keyScreens,
      designDecisions: caseData.designDecisions ?? caseData.approach,
      outcomeNext: caseData.outcomeNext,
    };
  }, [caseData]);

  const tabContentRenderers: Record<(typeof TAB_TITLES)[number], React.ReactNode> = {
    "Overview": (
      <div className={styles.sectionBody}>
        <h4>Context</h4>
        <p>{defaultSections.overview ?? "No overview provided."}</p>

        <h4>Target users</h4>
        <p>
          {Array.isArray(caseData.targetUsers) && caseData.targetUsers.length > 0
            ? caseData.targetUsers.join(", ")
            : "Users and top tasks not specified."}
        </p>

        <h4>Problem & goals</h4>
        <ul>
          {(caseData.goals ?? ["Goal 1", "Goal 2"]).map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>

        <h4>Constraints</h4>
        <p>{caseData.restrictions ?? "Time, data, regulation, tech constraints (if any)."}</p>

        <h4>My role</h4>
        <p>{caseData.roleSummary ?? caseData.role ?? "Role not specified."}</p>

        <h4>Timeline</h4>
        <ul>
          {(caseData.timeline ?? []).map((m, i) => (
            <li key={i}>
              <time>{m.date}</time> — {m.label ?? m.name}
            </li>
          ))}
        </ul>
      </div>
    ),
    "Ideation & Process": (
      <div className={styles.sectionBody}>
        <h4>Discovery → Insights</h4>
        <ul>
          {(caseData.insights ?? ["Insight 1", "Insight 2", "Insight 3"]).slice(0, 3).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h4>Flows & IA</h4>
        <p>{caseData.flows ?? "Describe how users move through the product."}</p>

        <h4>Explorations & trade-offs</h4>
        <p>{caseData.tradeoff ?? "Critical decision and rationale."}</p>

        <h4>Design system & a11y</h4>
        <p>{caseData.designSystem ?? "Tokens/components touched. Key accessibility note."}</p>

        <h4>Validation</h4>
        <p>{caseData.validation ?? "Method, sample, what changed."}</p>

        <h5>Decision log</h5>
        <ul>
          {(caseData.decisionLog ?? []).map((d, i) => (
            <li key={i}>
              <time>{d.date}</time>: {d.note}
            </li>
          ))}
        </ul>
      </div>
    ),
    "Screens": (
      <div className={styles.sectionBody}>
        {defaultSections.keyScreens && defaultSections.keyScreens.length > 0 ? (
          defaultSections.keyScreens.map((k, i) => (
            <article key={i} className={styles.screenItem}>
              <h5 className={styles.screenTitle}>{k.name ?? `Flow ${i + 1}`}</h5>
              <p className={styles.screenMeta}>
                <strong>Goal:</strong> {k.goal ?? "Goal not provided."} — <strong>Outcome:</strong> {k.outcome ?? "Outcome not provided."}
              </p>
              <div className={styles.screenNotable}>
                <p>{k.notable ?? "Notable patterns / data-viz decisions."}</p>
              </div>
              {k.src && (
                <div className={styles.screenImage}>
                  <Image src={k.src} alt={k.alt ?? `${caseData.company} screen ${i + 1}`} width={800} height={450} />
                </div>
              )}
              {(k.before || k.after) && (
                <div className={styles.beforeAfter}>
                  {k.before && (
                    <Image src={k.before} alt="before" width={800} height={450} />
                  )}
                  {k.after && (
                    <Image src={k.after} alt="after" width={800} height={450} />
                  )}
                </div>
              )}
              <p className={styles.screenCaption}>{k.caption ?? ""}</p>
            </article>
          ))
        ) : (
          <p>No screens available.</p>
        )}

        <h4>Assets checklist</h4>
        <ul>
          <li>WebP + PNG fallback</li>
          <li>Light / dark variants if relevant</li>
          <li>Redacted sensitive data</li>
        </ul>
      </div>
    ),
    "Tools Used": (
      <div className={styles.sectionBody}>
        <ul>
          {(caseData.tools ?? ["Figma", "React/Next.js", "Storybook"]).map((t, i) => (
            <li key={i}>
              <strong>{t}</strong> — {caseData.toolsDetail?.[t] ?? `used for ${t.toLowerCase()}`}
            </li>
          ))}
        </ul>
      </div>
    ),
    "Impact & Outcome": (
      <div className={styles.sectionBody}>
        <h4>Quant</h4>
        <ul>
          {(caseData.metrics ?? []).map((m, i) => (
            <li key={i}>
              <strong>{m.label}:</strong> {m.before} → {m.after}
            </li>
          ))}
        </ul>

        <h4>Qual</h4>
        <blockquote>{caseData.quote ?? "Stakeholder / user quote (paraphrased)."}</blockquote>

        <h4>Business impact</h4>
        <p>{caseData.businessImpact ?? "Revenue / risk / efficiency notes."}</p>

        <h4>Next</h4>
        <p>{caseData.next ?? "What you'd ship with one more sprint."}</p>

        <h4>Reflection</h4>
        <p>{caseData.reflection ?? "One learning."}</p>
      </div>
    ),
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key === "ArrowRight" || key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab((cur) => {
        const delta = key === "ArrowRight" ? 1 : -1;
        return (cur + delta + TAB_TITLES.length) % TAB_TITLES.length;
      });
    }
    if (key === "Home") {
      e.preventDefault();
      setActiveTab(0);
    }
    if (key === "End") {
      e.preventDefault();
      setActiveTab(TAB_TITLES.length - 1);
    }
  };

  const companyKey = String(caseData.company || "").toLowerCase();

  const logoSrc = useMemo(() => {
    // prefer explicit logo property on the case data
    if (caseData.logo) return String(caseData.logo);

    // fallback: first image that contains "logo" in filename, or images[0]
    if (Array.isArray(caseData.images) && caseData.images.length > 0) {
      const found = caseData.images.find((s) => /logo/i.test(String(s)));
      return String(found ?? caseData.images[0]);
    }

    // final fallback: construct from company slug under /images/cases
    const slug = String(caseData.company || "").toLowerCase().replace(/\s+/g, "-");
    return `/images/cases/${slug}-icon.svg`;
  }, [caseData.logo, caseData.images, caseData.company]);

  // derive a readable date string from timeline.date (earliest → latest) or other common fields
  const dateDisplay = useMemo(() => {
    // prefer explicit string fields
    if (typeof caseData.date === "string" && caseData.date.trim()) return caseData.date;
    if (typeof caseData.duration === "string" && caseData.duration.trim()) return caseData.duration;

    // timeline: collect valid date strings from timeline[].date
    if (Array.isArray(caseData.timeline) && caseData.timeline.length > 0) {
      const date = caseData.timeline
        .map((m: Milestone) => String(m.date ?? "").trim())
        .filter(Boolean);

      if (date.length === 1) return date[0];
      if (date.length > 1) {
        // try to sort ISO-like strings; fall back to lexical sort which works for YYYY[-MM[-DD]]
        const sorted = date.slice().sort();
        return `${sorted[0]} — ${sorted[sorted.length - 1]}`;
      }
    }

    // fallback: empty
    return "";
  }, [caseData.date, caseData.duration, caseData.timeline]);

  const content = (
    <div ref={modalRef} tabIndex={-1} onClick={handleBackdrop} aria-label={`Details for ${caseData.company}`}>
      <ModalTemplate
        title={caseData.company}
        role={String(caseData.role ?? "")}
        date={dateDisplay}
        subtitle={
          companyKey.includes("bank")
            ? "Finance product redesign"
            : companyKey.includes("adarma")
            ? "Platform build"
            : companyKey.includes("silico")
            ? "Data platform"
            : undefined
        }
        oneLiner={caseData.oneLiner}
        gallery={{ metrics: caseData.metrics, milestones: caseData.timeline }}
        logoSrc={logoSrc}
        onClose={onClose}
        prev={prev}
        next={next}
      >
        <div className={styles.tabsWrapper}>
          <div className={styles.tabList} role="tablist" aria-label="Case sections" onKeyDown={onTabKeyDown}>
            {TAB_TITLES.map((t, idx) => (
              <button
                key={t}
                id={`tab-${idx}`}
                role="tab"
                aria-selected={activeTab === idx}
                aria-controls={`panel-${idx}`}
                tabIndex={activeTab === idx ? 0 : -1}
                className={`${styles.tabButton} ${activeTab === idx ? styles.tabActive : ""} ${activeTab === idx ? "btnToken" : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                {t}
              </button>
            ))}
          </div>

          <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className={styles.tabPanel} tabIndex={0}>
            {tabContentRenderers[TAB_TITLES[activeTab]]}
          </div>
        </div>
      </ModalTemplate>
    </div>
  );

  if (!portalRoot) return null;
  return createPortal(content, portalRoot);
};

export default CaseModal;