"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/components/CaseModal.module.scss";
import navStyles from "@/styles/components/Nav.module.scss";

type TimelineItem = { date?: string; label?: string };
type Metric = { label: string; before: string; after: string };
type CaseData = {
  company?: string;
  role?: string;
  dates?: string;
  duration?: string;
  logo?: string;
  overview?: string;
  process?: string;
  screens?: string;
  tools?: string[];
  impact?: string;
  timeline?: TimelineItem[];
  metrics?: Metric[];
  images?: string[];
};

type ProjectListItem = { onClick?: () => void } | null;

type CaseModalProps = {
  caseData: CaseData;
  onClose: () => void;
  projectList?: ProjectListItem[];
  currentIndex?: number;
};

const TAB_TITLES = [
  "Overview",
  "Ideation & Process",
  "Screens",
  "Tools Used",
  "Impact & Outcome",
] as const;

const CaseModal: React.FC<CaseModalProps> = ({ caseData, onClose, projectList = [], currentIndex = 0 }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  // responsive: tabs on large, accordion on small (<1024)
  const [isAccordion, setIsAccordion] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>(-1);

  useEffect(() => {
    // client-only portal root selection
    const root = typeof document !== "undefined" ? document.getElementById("modal-root") ?? document.body : null;
    setPortalRoot(root);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const handle = (ev?: MediaQueryListEvent | MediaQueryList) => {
      const matches = ev && "matches" in ev ? ev.matches : mq.matches;
      setIsAccordion(Boolean(matches));
    };
    // initial
    handle();
    // attach listener (cover older browsers)
    let legacyHandler: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null = null;
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handle as EventListener);
    } else if ("addListener" in mq && typeof mq.addListener === "function") {
      legacyHandler = function (this: MediaQueryList, ev: MediaQueryListEvent) {
        handle(ev);
      };
      mq.addListener(legacyHandler);
    }
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handle as EventListener);
      } else if (legacyHandler && "removeListener" in mq && typeof mq.removeListener === "function") {
        mq.removeListener(legacyHandler);
      }
    };
  }, []);

  // sync open accordion panel with active tab when switching modes
  useEffect(() => {
    setOpenIndex(isAccordion ? activeTab : -1);
  }, [isAccordion, activeTab]);

  const tabContentRenderers: Record<typeof TAB_TITLES[number], React.ReactNode> = {
    Overview: <div className={styles.sectionBody}><p>{caseData.overview ?? "No overview"}</p></div>,
    "Ideation & Process": <div className={styles.sectionBody}><p>{caseData.process ?? "No process"}</p></div>,
    Screens: <div className={styles.sectionBody}><p>{caseData.screens ?? "No screens"}</p></div>,
    "Tools Used": <div className={styles.sectionBody}><p>{(caseData.tools ?? []).join(", ") || "No tools"}</p></div>,
    "Impact & Outcome": <div className={styles.sectionBody}><p>{caseData.impact ?? "No impact"}</p></div>,
  };

  // render only on client when portalRoot is available
  if (!portalRoot) return null;

  // defensive helpers for prev/next
  const callPrev = () => {
    const prev = projectList?.[Math.max(0, currentIndex - 1)];
    if (prev?.onClick) prev.onClick();
  };
  const callNext = () => {
    const next = projectList?.[currentIndex + 1];
    if (next?.onClick) next.onClick();
  };

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={`${caseData.company ?? "Case"} details`}>
      <div className={styles.modalContent} ref={modalRef}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            {caseData.logo ? (
              <div className={styles.logoWrapper}>
                <img src={caseData.logo} alt={`${caseData.company ?? "company"} logo`} className={styles.logoImage} width={40} height={40} />
              </div>
            ) : null}
            <div className={styles.headerInfo}>
              <h3 className={styles.company}>{caseData.company ?? ""}</h3>
              <h4 className={styles.roleName}>{caseData.role ?? ""}</h4>
              <div className={styles.duration}>{caseData.dates ?? caseData.duration ?? ""}</div>
            </div>
          </div>

          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <main className={styles.modalMain}>
          {isAccordion ? (
            <div className={styles.accordion} role="presentation">
              {TAB_TITLES.map((title, idx) => {
                const expanded = openIndex === idx;
                return (
                  <div className={styles.accordionItem} key={title}>
                    <button
                      id={`accordion-${idx}`}
                      className={styles.accordionButton}
                      aria-controls={`panel-${idx}`}
                      aria-expanded={expanded}
                      onClick={() => setOpenIndex(expanded ? -1 : idx)}
                      type="button"
                    >
                      <span>{title}</span>
                      <span className={styles.accordionChevron} aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>

                    <div
                      id={`panel-${idx}`}
                      role="region"
                      aria-labelledby={`accordion-${idx}`}
                      className={styles.accordionPanel}
                      hidden={!expanded}
                    >
                      {tabContentRenderers[title]}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className={`${navStyles.menu ?? ""} ${styles.tabList}`} role="tablist" aria-label="Case sections">
                {TAB_TITLES.map((title, idx) => {
                  const isActive = activeTab === idx;
                  const linkClass = `${navStyles.link ?? ""} ${isActive ? navStyles.active ?? "" : ""}`.trim();
                  return (
                    <a
                      key={title}
                      id={`tab-${idx}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${idx}`}
                      tabIndex={isActive ? 0 : -1}
                      href="#"
                      className={linkClass || styles.tabButton}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(idx);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      data-selected={isActive ? "true" : undefined}
                    >
                      {title}
                      {isActive && <span className={styles.selectedDot} aria-hidden="true" />}
                    </a>
                  );
                })}
              </div>

              <section
                id={`panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                className={styles.tabPanel}
              >
                {tabContentRenderers[TAB_TITLES[activeTab]]}
              </section>
            </>
          )}
        </main>

        <footer className={styles.footer}>
          <button type="button" className="btnToken--outline" onClick={callPrev} aria-label="Previous project">
            ← Prev
          </button>

          <div style={{ flex: 1 }} />

          <button type="button" className="btnToken--outline" onClick={callNext} aria-label="Next project">
            Next →
          </button>
        </footer>
      </div>
    </div>,
    portalRoot
  );
};

export default CaseModal;
