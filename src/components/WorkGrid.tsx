"use client";
import React, { useEffect, useRef, useState } from "react";
import CaseTile from "./CaseTile";
import CaseModal from "./CaseModal";
import OtherWorks from "./OtherWorks";
import { featured, otherWorks } from "../data/cases";
import styles from "@/styles/components/WorkGrid.module.scss";

interface WorkGridProps {
  mode?: "landing" | "full";
}

// derive the modal case type from CaseModal props
type CaseModalProps = React.ComponentProps<typeof CaseModal>;
type CaseData = CaseModalProps["caseData"];

export default function WorkGrid({ mode = "full" }: WorkGridProps) {
  // normalize helper to ensure fields exist and types are safe
  const normalize = (raw: unknown): CaseData => {
    const r = (raw as Record<string, unknown>) || {};
    const id =
      typeof r.id === "string" || typeof r.id === "number" ? String(r.id) : "";
    const company = typeof r.company === "string" ? r.company : "";
    const role = typeof r.role === "string" ? r.role : "";
    const images = Array.isArray(r.images) ? (r.images as string[]) : [];
    const logo = typeof r.logo === "string" ? r.logo : "";
    const rest = { ...(r as Record<string, unknown>) };
    return {
      id,
      company,
      role,
      images,
      logo,
      ...rest,
    } as CaseData;
  };

  const featuredList = Array.isArray(featured) ? featured.map(normalize) : [];
  const otherListRaw = Array.isArray(otherWorks) ? otherWorks : [];
  const otherList = otherListRaw.map(normalize);

  // modal state holds normalized CaseData compatible with CaseModal
  const [activeCase, setActiveCase] = useState<CaseData | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // accessibility: lock scroll when modal open
    if (activeCase) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCase]);

  const openModalFor = (caseData: CaseData, origin?: HTMLElement | null) => {
    if (origin) lastActiveRef.current = origin;
    setActiveCase(caseData);
  };

  const closeModal = () => {
    setActiveCase(null);
    try {
      lastActiveRef.current?.focus();
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.workgrid}>
      <h3>Featured Works</h3>
      <div className={styles["use-cases"]}>
        {featuredList.length > 0 ? (
          featuredList.map((c, i) => (
            <div
              key={`${c.company}-${i}`}
              className={styles.caseWrapper}
              role="button"
              tabIndex={0}
              onClick={(e) => openModalFor(c, e.currentTarget as HTMLElement)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModalFor(c, e.currentTarget as HTMLElement);
                }
              }}
              aria-label={`Open ${c.company}`}
            >
              <CaseTile caseData={c} />
            </div>
          ))
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
                const localIndex = globalIndex - featuredList.length;
                const item = otherList[localIndex];
                if (item) openModalFor(item, null);
              }}
            />
          )}
        </div>
      )}

      {activeCase && (
        <CaseModal caseData={activeCase} onClose={closeModal} />
      )}
    </div>
  );
}