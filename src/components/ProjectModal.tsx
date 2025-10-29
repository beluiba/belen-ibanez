import React, { useEffect } from "react";
import styles from "@/styles/components/CaseModal.module.scss";

export type NavItem = { title: string; href?: string; onNavigate?: () => void };

export type ProjectData = {
  title: string;
  oneLiner?: string;
  [key: string]: unknown;
};

type Props = {
  project: ProjectData;
  tabs?: unknown;
  defaultTabId?: string;
  onClose: () => void;
  projectList?: Array<NavItem | string | Record<string, unknown>>;
  currentIndex?: number;
};

export default function ProjectModal({
  project,
  tabs,
  defaultTabId,
  onClose,
  projectList,
  currentIndex = 0,
}: Props) {
  // normalize incoming list into NavItem[]
  const list: NavItem[] = Array.isArray(projectList)
    ? projectList
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
        .filter(Boolean) as NavItem[]
    : [];

  // compute effective index safely
  const effectiveIndex = (() => {
    if (list.length === 0) return 0;
    if (typeof currentIndex === "number" && currentIndex >= 0 && currentIndex < list.length) return currentIndex;
    const byTitle = list.findIndex((p) => p.title === project?.title);
    if (byTitle >= 0) return byTitle;
    // try href slug match
    const slug = String(project?.title ?? "").toLowerCase().replace(/\s+/g, "-");
    const byHref = list.findIndex((p) => String(p.href ?? "").toLowerCase().includes(slug));
    return byHref >= 0 ? byHref : 0;
  })();

  const len = list.length;
  const prevFromList: NavItem | undefined = len > 0 ? list[(effectiveIndex - 1 + len) % len] : undefined;
  const nextFromList: NavItem | undefined = len > 0 ? list[(effectiveIndex + 1) % len] : undefined;

  // expose debug object to window (safe)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        (window as unknown as Record<string, unknown>).__pm_debug = {
          list,
          effectiveIndex,
          prev: prevFromList,
          next: nextFromList,
        };
      } catch {}
    }
  }, [list, effectiveIndex, prevFromList, nextFromList]);

  const safeNavigate = (target?: NavItem) => {
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
        // nothing to navigate to
        // eslint-disable-next-line no-console
        console.warn("[ProjectModal] target has no onNavigate or href", target);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[ProjectModal] navigation error", err);
      }
    }, 60);
  };

  // keyboard navigation (left/right) — avoid when focus is in inputs or interactive components
  useEffect(() => {
    if (!list || list.length <= 1) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const active = document.activeElement as HTMLElement | null;
      if (active) {
        const tag = active.tagName;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
        if (active.closest && (active.closest('[role="tablist"]') || active.closest('[role="tab"]') || active.closest('[role="textbox"]'))) {
          return;
        }
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (nextFromList) safeNavigate(nextFromList);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (prevFromList) safeNavigate(prevFromList);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [list, effectiveIndex, prevFromList, nextFromList]);

  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-label={project.title ?? "Project"}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <div>
            <h2 className={styles.title}>{project.title}</h2>
            {project.oneLiner && <p className={styles.oneLiner}>{String(project.oneLiner)}</p>}
          </div>
          <div>
            <button type="button" onClick={onClose} aria-label="Close" className={styles.closeBtn}>
              ×
            </button>
          </div>
        </header>

        <div className={styles.modalBody}>
          {/* keep existing body content here; render children/tabs etc. */}
        </div>

        {/* NAVIGATION BUTTONS: previous / next */}
        <div className={styles.modalFooter} role="navigation" aria-label="Project navigation">
          <button
            type="button"
            className={styles.navBtn}
            data-test="prev-project-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (prevFromList) safeNavigate(prevFromList);
            }}
            aria-label={prevFromList ? `Previous project: ${prevFromList.title}` : "Previous project"}
            disabled={!prevFromList}
          >
            ← {prevFromList?.title ?? "Previous"}
          </button>

          <div aria-hidden="true" style={{ flex: 1 }} />

          <button
            type="button"
            className={styles.navBtn}
            data-test="next-project-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (nextFromList) safeNavigate(nextFromList);
            }}
            aria-label={nextFromList ? `Next project: ${nextFromList.title}` : "Next project"}
            disabled={!nextFromList}
          >
            {nextFromList?.title ?? "Next"} →
          </button>
        </div>
      </div>
    </div>
  );
}