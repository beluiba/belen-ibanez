import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/components/CaseModal.module.scss";

interface CaseData {
  company: string;
  role: string;
  tools?: string[];
  challenge: string;
  approach: string;
  impact: string;
  restrictions?: string;
  images: string[];
}

interface CaseModalProps {
  caseData: CaseData;
  onClose: () => void;
}

const CaseModal: React.FC<CaseModalProps> = ({ caseData, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
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
  }, []);

  return (
    <div
      className={styles.backdrop}
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${caseData.company}`}
      onClick={handleBackdrop}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">×</button>
        <h2 className={styles.title}>{caseData.company}</h2>
        <div className={styles.meta}>
          <span className={styles.role}>{caseData.role}</span>
          <span className={styles.tools}>{caseData.tools?.join(", ")}</span>
        </div>
        <div className={styles.blocks}>
          <div><strong>Challenge:</strong> {caseData.challenge}</div>
          <div><strong>Approach:</strong> {caseData.approach}</div>
          <div><strong>Impact:</strong> {caseData.impact}</div>
        </div>
        {caseData.restrictions === "No visuals — NDA" ? (
          <div className={styles.ndaBanner}>
            <p>No visuals — NDA</p>
            <Image src={caseData.images[0]} alt="NDA placeholder" width={600} height={400} />
          </div>
        ) : (
          <div className={styles.gallery}>
            {caseData.images.map((img: string, i: number) => (
              <Image key={img} src={img} alt={`${caseData.company} placeholder ${i + 1}`} width={240} height={160} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseModal;