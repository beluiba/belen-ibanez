"use client";
import React, { useEffect, useRef, useState } from "react";
import CaseTile from "./CaseTile";
import CaseModal from "./CaseModal";
import OtherWorks from "./OtherWorks";
import { featured, otherWorks } from "../data/cases";
import styles from "@/styles/components/WorkGrid.module.scss";

type WorkGridProps = {
  mode?: "landing" | "full";
  onOpen?: (globalIndex: number, origin?: HTMLElement | null) => void;
};

// derive CaseData from CaseModal props to keep types aligned
type CaseModalProps = React.ComponentProps<typeof CaseModal>;
type CaseData = CaseModalProps["caseData"];
// locally extend CaseData with optional id for stable keys and normalization
type CaseItem = CaseData & { id?: string | number };

export default function WorkGrid({ mode = "full", onOpen }: WorkGridProps) {
  const normalize = (raw: unknown): CaseItem => {
    const r = (raw as Record<string, unknown>) || {};
    const id = typeof r.id === "string" || typeof r.id === "number" ? r.id : undefined;
    const company = typeof r.company === "string" ? r.company : "";
    const role = typeof r.role === "string" ? r.role : "";
    const logo = typeof r.logo === "string" ? r.logo : "";
    const images = Array.isArray(r.images) ? (r.images as string[]) : [];
    const overview = typeof r.overview === "string" ? r.overview : "";
    return {
      id,
      company,
      role,
      logo,
      images,
      overview,
      ...(r as Record<string, unknown>),
    } as CaseItem;
  };

  const featuredList = Array.isArray(featured) ? featured.map(normalize) : [];
  const otherListRaw = Array.isArray(otherWorks) ? otherWorks : [];
  const otherList = otherListRaw.map(normalize);

  // deterministic global ordering: featured then other
  const combinedList = [...featuredList, ...otherList];

  // internal modal state (used only when parent doesn't provide onOpen)
  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // lock scroll while modal open
    if (activeCase) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCase]);

  const openModalAt = (globalIndex: number, origin?: HTMLElement | null) => {
    const idx = Math.max(0, Math.min(globalIndex, combinedList.length - 1));
    const item = combinedList[idx];
    if (!item) return;
    if (origin) lastActiveRef.current = origin;
    setActiveIndex(idx);
    setActiveCase(item);
  };

  const closeModal = () => {
    setActiveCase(null);
    setActiveIndex(null);
    try {
      lastActiveRef.current?.focus();
    } catch {
      /* ignore */
    }
  };

  // fallback handlers for internal CaseModal navigation
  const projectListHandlers: { onClick?: () => void }[] = combinedList.map((_, i) => ({
    onClick: () => {
      const item = combinedList[i];
      if (item) openModalAt(i, null);
    },
  }));

  return (
    <div className={styles.workgrid}>
      <h4>Featured Works</h4>

      <div className={styles["use-cases"]}>
        {featuredList.length > 0 ? (
          featuredList.map((c, i) => {
            const globalIndex = i;
            return (
              <div
                key={`${String(c.id ?? c.company ?? "featured")}-${i}`}
                className={styles.caseWrapper}
                role="button"
                tabIndex={0}
                aria-label={`Open ${c.company ?? ""}`}
                data-global-index={globalIndex}
                onClick={(e) => {
                  if (typeof onOpen === "function") {
                    onOpen(globalIndex, e.currentTarget as HTMLElement);
                    return;
                  }
                  openModalAt(globalIndex, e.currentTarget as HTMLElement);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (typeof onOpen === "function") {
                      onOpen(globalIndex, e.currentTarget as HTMLElement);
                      return;
                    }
                    openModalAt(globalIndex, e.currentTarget as HTMLElement);
                  }
                }}
              >
                <CaseTile caseData={c} />
              </div>
            );
          })
        ) : (
          <div className={styles.emptyMessage}>No featured work</div>
        )}
      </div>

      {mode === "full" && (
        <div className={styles.otherWorks}>
          {otherList.length === 0 ? (
            <div className={styles.emptyMessage}>No other works</div>
          ) : (
            <OtherWorks
              items={otherList}
              featuredOffset={featuredList.length}
              onOpen={(globalIndex: number) => {
                if (typeof onOpen === "function") {
                  onOpen(globalIndex, null);
                  return;
                }
                openModalAt(globalIndex, null);
              }}
            />
          )}
        </div>
      )}

      {typeof onOpen !== "function" && activeCase !== null && activeIndex !== null && (
        <CaseModal
          caseData={activeCase}
          onClose={closeModal}
          projectList={projectListHandlers}
          currentIndex={activeIndex}
        />
      )}
    </div>
  );
}