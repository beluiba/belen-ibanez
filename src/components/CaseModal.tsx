"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/components/CaseModal.module.scss";
import navStyles from "@/styles/components/Nav.module.scss";

type TimelineItem = { date?: string; label?: string };
type Metric = { label: string; before: string; after: string };
type CaseData = {
  id?: string | number;
  date?: string;
  dates?: string;
  duration?: string;
  company?: string;
  title?: string;
  role?: string;
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
  "Overview + Ideation & Tools",
  "Screens (Key Moments)",
  "Impact & Outcome",
] as const;

const CaseModal: React.FC<CaseModalProps> = ({ caseData, onClose, projectList = [], currentIndex = 0 }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  // responsive: tabs on large, accordion on small (<1024)
  const [isAccordion, setIsAccordion] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>(-1);

  useEffect(() => {
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
    handle();
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

  // Adjust modal main height in accordion mode so all accordion headers remain visible.
  useEffect(() => {
    if (!isAccordion || !modalRef.current || !mainRef.current || !accordionRef.current) {
      // clear any inline sizing when not in accordion
      if (mainRef.current) {
        mainRef.current.style.maxHeight = "";
        mainRef.current.style.overflowY = "";
      }
      // also clear panel sizing
      const panels = accordionRef.current?.querySelectorAll<HTMLElement>("[data-accordion-panel]");
      panels?.forEach(p => {
        p.style.maxHeight = "";
        p.style.overflowY = "";
      });
      return;
    }

    let raf = 0;
    const adjust = () => {
      // Elements
      const modalEl = modalRef.current!;
      const mainEl = mainRef.current!;
      const accordionEl = accordionRef.current!;

      // measure header/footer within modal
      const headerEl = modalEl.querySelector(`.${styles.header}`) as HTMLElement | null;
      const footerEl = modalEl.querySelector(`.${styles.footer}`) as HTMLElement | null;

      const vh = window.innerHeight;
      const headerH = headerEl?.offsetHeight ?? 0;
      const footerH = footerEl?.offsetHeight ?? 0;
      const margin = 0; // breathing room
      const available = Math.max(0, vh - headerH - footerH - margin);

      // sum of accordion header buttons heights
      const buttons = accordionEl.querySelectorAll<HTMLElement>("[data-accordion-button]");
      let headersHeight = 0;
      buttons.forEach((b) => {
        headersHeight += b.offsetHeight;
      });

      // height of expanded panel content (if any)
      let expandedContentHeight = 0;
      if (openIndex >= 0) {
        const panel = accordionEl.querySelector<HTMLElement>(`#panel-${openIndex}`);
        if (panel) expandedContentHeight = panel.scrollHeight;
      }

      // desired main area height: at least headersHeight, prefer headers + expanded content but cap to available
      const desired = Math.min(available, headersHeight + expandedContentHeight);
      const finalMainHeight = Math.max(desired, headersHeight);

      // set main container sizing
      mainEl.style.maxHeight = `${finalMainHeight}px`;
      mainEl.style.overflowY = "auto";

      // determine remaining space for panel content (space left after headers)
      const remainingForPanels = Math.max(0, finalMainHeight - headersHeight);

      // apply max-height to each accordion panel so panel content never exceeds available remaining space
      const panels = accordionEl.querySelectorAll<HTMLElement>("[data-accordion-panel]");
      panels.forEach((p) => {
        // If panel is expanded, allow it up to remainingForPanels, otherwise keep it collapsed but prepared to expand
        p.style.maxHeight = `${remainingForPanels}px`;
        p.style.overflowY = "auto";
      });
    };

    const runAdjust = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(adjust);
    };

    // initial adjust and on resize/orientation/transition
    runAdjust();
    window.addEventListener("resize", runAdjust);
    window.addEventListener("orientationchange", runAdjust);

    // watch images or fonts loading which may change layout
    const imgs = accordionRef.current.querySelectorAll("img");
    const imgLoadHandler = () => runAdjust();
    imgs.forEach((im) => im.addEventListener("load", imgLoadHandler));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", runAdjust);
      window.removeEventListener("orientationchange", runAdjust);
      imgs.forEach((im) => im.removeEventListener("load", imgLoadHandler));
      // clear inline styles on unmount
      if (mainRef.current) {
        mainRef.current.style.maxHeight = "";
        mainRef.current.style.overflowY = "";
      }
      const panels = accordionRef.current?.querySelectorAll<HTMLElement>("[data-accordion-panel]");
      panels?.forEach(p => {
        p.style.maxHeight = "";
        p.style.overflowY = "";
      });
    };
  }, [isAccordion, openIndex, portalRoot, styles.header, styles.footer]);

  const tabContentRenderers: Record<typeof TAB_TITLES[number], React.ReactNode> = {
    "Overview + Ideation & Tools": (
      <div className={styles.sectionBody}>
        <section>
          <p>{caseData.overview ?? "No overview available."}</p>
        </section>
        <section>
          <h6 className={styles.subHeading}>Ideation & Process</h6>
          <p>{caseData.process ?? "No process information."}</p>
        </section>
        <section>
          <h6 className={styles.subHeading}>Tools</h6>
          <p>{(caseData.tools ?? []).length > 0 ? (caseData.tools ?? []).join(", ") : "No tools listed."}</p>
        </section>
      </div>
    ),
    "Screens (Key Moments)": (
      <div className={styles.sectionBody}>
        <p>{caseData.screens ?? "Key screens and moments from this project."}</p>
        <div className={styles.screensGrid}>
          {(caseData.images ?? []).length > 0 ? (
            (caseData.images ?? []).map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={idx} src={src} alt={`${caseData.company ?? "work"} screenshot ${idx + 1}`} className={styles.screenThumb} />
            ))
          ) : (
            <p>No screens available.</p>
          )}
        </div>
      </div>
    ),
    "Impact & Outcome": (
      <div className={styles.sectionBody}>
        <p>{caseData.impact ?? "No impact information."}</p>
        {caseData.timeline && caseData.timeline.length > 0 ? (
          <ul className={styles.timeline}>
            {caseData.timeline.map((t, i) => (
              <li key={i}><strong>{t.date ?? ""}</strong> — {t.label ?? ""}</li>
            ))}
          </ul>
        ) : null}
        {caseData.metrics && caseData.metrics.length > 0 ? (
          <ul className={styles.metrics}>
            {caseData.metrics.map((m, i) => (
              <li key={i}>{m.label}: {m.before} → {m.after}</li>
            ))}
          </ul>
        ) : null}
      </div>
    ),
  };

  if (!portalRoot) return null;

  // Navigation: circular using only projectList/currentIndex (no DOM)
  const total = Array.isArray(projectList) ? projectList.length : 0;

  const validCurrentIndex =
    typeof currentIndex === "number" && Number.isFinite(currentIndex) && currentIndex >= 0 && currentIndex < total
      ? Math.floor(currentIndex)
      : (total > 0 ? 0 : -1);

  const wrapIndex = (n: number) => {
    if (total <= 0) return -1;
    return ((n % total) + total) % total;
  };

  const callPrev = () => {
    if (total <= 0 || validCurrentIndex < 0) return;
    const dest = wrapIndex(validCurrentIndex - 1);
    const entry = projectList[dest];
    if (entry?.onClick) entry.onClick();
  };

  const callNext = () => {
    if (total <= 0 || validCurrentIndex < 0) return;
    const dest = wrapIndex(validCurrentIndex + 1);
    const entry = projectList[dest];
    if (entry?.onClick) entry.onClick();
  };

  // determine special "More Works" / last-project layout:
  const rawTitle = String(caseData.title ?? caseData.company ?? "").trim().toLowerCase();
  const isExplicitMore =
    rawTitle === "more works" || rawTitle === "more work" || rawTitle === "more";
  const isLastProject = total > 0 && validCurrentIndex >= 0 && validCurrentIndex === total - 1;
  const hasScreens = Array.isArray(caseData.images) && caseData.images.length > 0;
  const isMoreWorks = isExplicitMore || (isLastProject && hasScreens);

  const images = Array.isArray(caseData.images) ? caseData.images : [];

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={`${caseData.company ?? "Case"} details`}>
      <div className={styles.modalContent} ref={modalRef}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {caseData.logo ? (
              <div className={styles.logoWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={String(caseData.logo)} alt={`${caseData.company ?? "company"} logo`} className={styles.logoImage} width={40} height={40} />
              </div>
            ) : null}
            <div className={styles.headerInfo}>
              <h3 className={styles.company}>{caseData.company ?? ""}</h3>
              <h4 className={styles.roleName}>{caseData.role ?? ""}</h4>
              <div className={styles.duration}>
                {caseData.date ?? caseData.dates ?? caseData.duration ?? ""}
              </div>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">×</button>
        </header>

        <main ref={mainRef} className={styles.modalMain}>
          {isMoreWorks ? (
            <div className={styles.moreWorksLayout}>
              <div className={styles.moreWorksImages}>
                {images.length > 0 ? (
                  images.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={src} alt={`${caseData.company ?? "work"} screenshot ${i + 1}`} className={styles.screenImage} />
                  ))
                ) : (
                  <div className={styles.emptyMessage}>No screens available</div>
                )}
              </div>

              <aside className={styles.moreWorksAside}>
                <h4 className={styles.moreWorksTitle}>{caseData.title ?? caseData.company ?? "More works"}</h4>
                <p className={styles.moreWorksDescription}>{caseData.overview ?? caseData.process ?? "See more projects on the work page."}</p>
              </aside>
            </div>
          ) : isAccordion ? (
            <div className={styles.accordion} role="presentation" ref={accordionRef}>
              {TAB_TITLES.map((title, idx) => {
                const expanded = openIndex === idx;
                return (
                  <div className={styles.accordionItem} key={title}>
                    <button
                      id={`accordion-${idx}`}
                      data-accordion-button
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
                      data-accordion-panel
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
                      onClick={(e) => { e.preventDefault(); setActiveTab(idx); }}
                      aria-current={isActive ? "page" : undefined}
                      data-selected={isActive ? "true" : undefined}
                    >
                      {title}
                      {isActive && <span className={styles.selectedDot} aria-hidden="true" />}
                    </a>
                  );
                })}
              </div>

              <section id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className={styles.tabPanel}>
                {tabContentRenderers[TAB_TITLES[activeTab]]}
              </section>
            </>
          )}
        </main>

        <footer className={styles.footer}>
          <button type="button" className="btnToken--outline" onClick={callPrev} aria-label="Previous project" disabled={total <= 1}>← Prev</button>
          <div style={{ flex: 1 }} />
          <button type="button" className="btnToken--outline" onClick={callNext} aria-label="Next project" disabled={total <= 1}>Next →</button>
        </footer>
      </div>
    </div>,
    portalRoot
  );
};

export default CaseModal;
