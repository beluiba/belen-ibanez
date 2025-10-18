import React, { useRef } from "react";
import Image from "next/image";
import styles from "@/styles/components/CaseTile.module.scss";

interface CaseData {
  company: string;
  role: string;
  context: string;
  images: string[];
  restrictions?: boolean;
}

interface CaseTileProps {
  caseData: CaseData;
  isOther?: boolean;
  onOpen: (caseData: CaseData, origin: HTMLElement) => void;
}

const CaseTile: React.FC<CaseTileProps> = ({ caseData, onOpen }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (btnRef.current) onOpen(caseData, btnRef.current);
    }
  };

  return (
    <div
      className={styles.card}
      tabIndex={0}
      role="group"
      aria-label={caseData.company}
      onKeyDown={handleKeyDown}
    >
      <Image
        src={caseData.images?.[0] || "/images/cases/default.svg"}
        alt={caseData.restrictions ? "NDA placeholder" : `${caseData.company} placeholder 01`}
        width={340}
        height={220}
        className={styles.cover}
      />
      <div className={styles.meta}>
        <h3 className={styles.company}>{caseData.company}</h3>
        <span className={styles.role}>{caseData.role}</span>
        <p className={styles.context}>{caseData.context}</p>
      </div>
      <button
        ref={btnRef}
        className={styles.openBtn}
        aria-label={`Open details for ${caseData.company}`}
        onClick={() => btnRef.current && onOpen(caseData, btnRef.current)}
      >
        Open
      </button>
    </div>
  );
};

export default CaseTile;