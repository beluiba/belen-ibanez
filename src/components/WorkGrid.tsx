"use client";
import React, { useState, useRef, useEffect } from "react";
import CaseTile from "./CaseTile";
import CaseModal from "./CaseModal";
import OtherWorks from "./OtherWorks";
import { featured, otherWorks } from "../data/cases";
import styles from "@/styles/components/WorkGrid.module.scss";

interface WorkGridProps {
  mode?: "landing" | "full";
}

type CaseTileCaseData = React.ComponentProps<typeof CaseTile>["caseData"];
type CaseModalCaseData = React.ComponentProps<typeof CaseModal>["caseData"];

const WorkGrid: React.FC<WorkGridProps> = ({ mode = "full" }) => {
  // debug - log data at runtime
  useEffect(() => {
    console.log("[WorkGrid] featured:", Array.isArray(featured) ? featured.length : featured, featured);
    console.log("[WorkGrid] otherWorks:", Array.isArray(otherWorks) ? otherWorks.length : otherWorks, otherWorks);
  }, []);

  const [openCase, setOpenCase] = useState<CaseModalCaseData | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const main = document.getElementById("main-content") || document.querySelector("main");
    if (openCase) {
      document.body.style.overflow = "hidden";
      if (main) main.setAttribute("aria-hidden", "true");
    } else {
      document.body.style.overflow = "";
      if (main) main.removeAttribute("aria-hidden");
    }
    return () => {
      document.body.style.overflow = "";
      if (main) main.removeAttribute("aria-hidden");
    };
  }, [openCase]);

  const handleOpen = (caseData: CaseTileCaseData, origin: HTMLElement | null) => {
    lastActiveRef.current = origin;
    setOpenCase(caseData as unknown as CaseModalCaseData);
  };

  const handleClose = () => {
    setOpenCase(null);
    if (lastActiveRef.current) {
      lastActiveRef.current.focus();
    }
  };

  const normalizeCaseData = (c: Partial<Record<string, unknown>>): CaseTileCaseData => {
    if (!c || typeof c !== "object") return {} as CaseTileCaseData;
    const {
      restrictions,
      company = "",
      role = "",
      context = "",
      images = [],
      logo = "",
      id = "",
      ...rest
    } = c as Record<string, unknown>;
    const normalizedRestrictions =
      typeof restrictions === "boolean" ? restrictions : Boolean(restrictions);
    return {
      id: String(id ?? ""),
      company: String(company ?? ""),
      role: String(role ?? ""),
      context: String(context ?? ""),
      images: Array.isArray(images) ? images : [],
      logo: String(logo ?? ""),
      ...(rest as Record<string, unknown>),
      restrictions: normalizedRestrictions,
    } as CaseTileCaseData;
  };

  const otherArray = Array.isArray(otherWorks) ? otherWorks.filter(Boolean) : [];

  return (
    <div className={styles.workgrid}>
      <div className={styles["use-cases"]}>
        {Array.isArray(featured) && featured.length > 0 ? (
          featured.map((item, idx) => (
            <CaseTile
              key={String(item?.id ?? item?.company ?? idx)}
              caseData={normalizeCaseData(item)}
              onOpen={handleOpen}
            />
          ))
        ) : (
          <div className={styles.emptyMessage}>No featured work found.</div>
        )}
      </div>

      {mode === "full" && (
        <div className={styles.otherWorks}>

          {/* 4-column grid for other works */}
          {otherArray.length === 0 ? (
            <div className={styles.emptyMessage}>No other works available.</div>
          ) : (
            <OtherWorks items={otherArray.map(item => normalizeCaseData(item))} />
          )}
        </div>
      )}

      {openCase && (
        <CaseModal
          caseData={openCase}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default WorkGrid;