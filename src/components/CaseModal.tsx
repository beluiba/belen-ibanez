"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "@/styles/components/CaseModal.module.scss";

type NavItem = { title: string; href?: string; onNavigate?: () => void };

interface CaseData {
  company: string;
  role?: string;
  tools?: string[];
  challenge?: string;
  approach?: string;
  impact?: string;
  restrictions?: string;
  images?: string[];
  oneLiner?: string;
  overview?: string;
  keyScreens?: { src: string; alt?: string }[];
  designDecisions?: string;
  outcomeNext?: string;
  [key: string]: unknown;
}

interface CaseModalProps {
  caseData: CaseData;
  onClose: () => void;
  projectList?: Array<NavItem | string | Record<string, unknown>>;
  currentIndex?: number;
}

/* --- Internal reusable ModalTemplate (kept inside this file as requested) --- */
type ModalSection = { id: string; heading?: string; content: React.ReactNode };

function ModalTemplate({
  title,
  subtitle,
  oneLiner,
  role,
  dates,
  sections = [],
  gallery = [],
  onClose,
  prev,
  next,
  children,
}: {
  title: string;
  subtitle?: string;
  oneLiner?: string;
  role?: string;
  dates?: string;
  sections?: ModalSection[];
  gallery?: { src: string; alt?: string }[];
  onClose: () => void;
  prev?: { label?: string; onClick: () => void } | null;
  next?: { label?: string; onClick: () => void } | null;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.modalContent} role="document">
        <header className={styles.modalHeader}>
          {/* Card-front style header: company + role + dates */}
          <div className={styles.cardFront}>
            <div className={styles.cardTitleRow}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.roleAndDates}>
                {role && <span className={styles.role}>{role}</span>}
                {dates && <span className={styles.dates}>{dates}</span>}
              </div>
            </div>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            {oneLiner && <p className={styles.oneLiner}>{oneLiner}</p>}
          </div>
          <div>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        </header>

        {/* removed hero area — images will be shown only inside the Key Screens tab */}

        <div className={styles.modalBody}>
          {children ? (
            children
          ) : (
            sections.map((s) => (
              <section key={s.id} className={styles.section}>
                {s.heading && <h3 className={styles.sectionHeading}>{s.heading}</h3>}
                <div className={styles.sectionBody}>{s.content}</div>
              </section>
            ))
          )}
        </div>

        {/* removed gallery here to ensure images only live in Key Screens tab */}

        <footer className={styles.footer} role="navigation" aria-label="Project navigation">
          <button
            type="button"
            className={styles.prevBtn}
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
            className={styles.nextBtn}
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
    </div>
  );
}

/* --- CaseModal: selects project-specific content, uses ModalTemplate --- */
const CaseModal: React.FC<CaseModalProps> = ({ caseData, onClose, projectList, currentIndex = 0 }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  // ensure portal root is resolved only on client
  useEffect(() => {
    setPortalRoot(document.getElementById("modal-root") ?? document.body);
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
                ? obj.title
                : typeof obj.name === "string"
                ? (obj.name as string)
                : "";
            const href = typeof obj.href === "string" ? obj.href : undefined;
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

  // expose debug object to window for quick inspection (temporary)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        (window as unknown as Record<string, unknown>).__pm_debug = {
          list,
          effectiveIndex,
          prevFromList,
          nextFromList,
        };
      } catch {}
    }
  }, [list, effectiveIndex, prevFromList, nextFromList]);

  // lock scroll while modal is open
  useEffect(() => {
    const prevOverflow = typeof document !== "undefined" ? document.body.style.overflow : "";
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = prevOverflow;
    };
  }, []);

  // keyboard navigation & focus trap (ESC + Tab handled)
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
          const nextIdx = (prev + delta + TAB_TITLES.length) % TAB_TITLES.length;
          return nextIdx;
        });
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Backdrop click closes
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();
    setActiveTab(0);
  }, [caseData]);

  function safeNavigate(target?: NavItem) {
    if (!target) return;
    try {
      onClose();
    } catch {}
    setTimeout(() => {
      try {
        if (typeof target.onNavigate === "function") {
          target.onNavigate();
          return;
        }
        if (target.href && typeof window !== "undefined") {
          window.location.href = target.href;
          return;
        }
        // eslint-disable-next-line no-console
        console.warn("[CaseModal] navigation target has no onNavigate or href", target);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[CaseModal] navigation error", err);
      }
    }, 60);
  }

  const companyKey = String(caseData.company ?? "").toLowerCase();

  const defaultSections = useMemo(
    () =>
      ({
        overview: caseData.oneLiner ?? caseData.overview ?? `${caseData.challenge ?? ""} ${caseData.approach ?? ""}`.trim(),
        impact: caseData.impact,
        keyScreens:
          Array.isArray(caseData.keyScreens) && caseData.keyScreens.length > 0
            ? (caseData.keyScreens as { src: string; alt?: string }[])
            : Array.isArray(caseData.images) && caseData.images.length > 0
            ? (caseData.images as string[]).map((s) => ({ src: s, alt: caseData.company }))
            : [],
        designDecisions: caseData.designDecisions ?? caseData.approach,
        outcomeNext: caseData.outcomeNext,
      } as {
        overview?: string;
        impact?: string;
        keyScreens: { src: string; alt?: string }[];
        designDecisions?: string;
        outcomeNext?: string;
      }),
    [caseData]
  );

  const TAB_TITLES = [
    "Overview",
    "Impact",
    "Key Screens & Flow",
    "Design Decisions",
    "Outcome & Next",
  ];

  const tabContentRenderers: Record<string, React.ReactNode> = {
    Overview: defaultSections.overview ? (
      <div className={styles.sectionBody}>
        <p>{defaultSections.overview}</p>
      </div>
    ) : (
      <div className={styles.sectionBody}>
        <p>No overview provided.</p>
      </div>
    ),
    Impact: defaultSections.impact ? (
      <div className={styles.sectionBody}>
        <p>{defaultSections.impact}</p>
      </div>
    ) : (
      <div className={styles.sectionBody}>
        <p>No impact information provided.</p>
      </div>
    ),
    "Key Screens & Flow":
      defaultSections.keyScreens && defaultSections.keyScreens.length > 0 ? (
        <div className={styles.gallery}>
          {defaultSections.keyScreens.map((k, i) => (
            <div className={styles.galleryItem} key={i}>
              <Image src={k.src} alt={k.alt ?? `${caseData.company} screen ${i + 1}`} width={400} height={240} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.sectionBody}>
          <p>No screens available.</p>
        </div>
      ),
    "Design Decisions": defaultSections.designDecisions ? (
      <div className={styles.sectionBody}>
        <p>{defaultSections.designDecisions}</p>
      </div>
    ) : (
      <div className={styles.sectionBody}>
        <p>No design decisions provided.</p>
      </div>
    ),
    "Outcome & Next": defaultSections.outcomeNext ? (
      <div className={styles.sectionBody}>
        <p>{defaultSections.outcomeNext}</p>
      </div>
    ) : (
      <div className={styles.sectionBody}>
        <p>No outcome / next steps provided.</p>
      </div>
    ),
  };

  const prev = prevFromList ? { label: prevFromList.title, onClick: () => safeNavigate(prevFromList) } : null;
  const next = nextFromList ? { label: nextFromList.title, onClick: () => safeNavigate(nextFromList) } : null;

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

  // build modal content (same as previous structure)
  const content = (
    <div ref={modalRef} tabIndex={-1} onClick={handleBackdrop} aria-label={`Details for ${caseData.company}`}>
      <ModalTemplate
        title={caseData.company}
        role={String(caseData.role ?? "")}
        dates={String(caseData.dates ?? caseData.duration ?? "")}
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
                className={`${styles.tabButton} ${activeTab === idx ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                {t}
              </button>
            ))}
          </div>

          <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className={styles.tabPanel} tabIndex={0}>
            {/*
              Ensure images/rendering for key screens is handled here.
              defaultSections.keyScreens already maps caseData.images -> keyScreens when keyScreens not provided.
            */}
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