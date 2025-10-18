"use client";
import React, { useState, useRef, useEffect } from "react";
import CaseTile from "./CaseTile";
import CaseModal from "./CaseModal";
import { featured, otherWorks } from "../data/cases";
import styles from "@/styles/components/WorkGrid.module.scss";

interface WorkGridProps {
  mode?: "landing" | "full";
}

type CaseTileCaseData = React.ComponentProps<typeof CaseTile>["caseData"];
type CaseModalCaseData = React.ComponentProps<typeof CaseModal>["caseData"];

const WorkGrid: React.FC<WorkGridProps> = ({ mode = "full" }) => {
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

  const handleOpen = (caseData: CaseTileCaseData, origin: HTMLElement) => {
    lastActiveRef.current = origin;
    setOpenCase(caseData as unknown as CaseModalCaseData);
  };

  const handleClose = () => {
    setOpenCase(null);
    if (lastActiveRef.current) {
      lastActiveRef.current.focus();
    }
  };

  const normalizeCaseData = (c: unknown): CaseTileCaseData => {
    return c as CaseTileCaseData;
  };

  return (
    <div className={styles.workgrid} aria-label="Use Cases">
      <div className={styles["use-cases"]}>
        <h2 className={styles["section-title"]}>Featured Work</h2>
        {featured.map((item) => (
          <CaseTile
            key={item.id}
            caseData={normalizeCaseData(item)}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {mode === "full" && (
        <div className={styles["other-works"]}>
          <h2 className={styles["section-title"]}>Other Works</h2>
          {otherWorks.map((item) => (
            <CaseTile
              key={item.id}
              caseData={normalizeCaseData(item)}
              isOther
              onOpen={handleOpen}
            />
          ))}
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