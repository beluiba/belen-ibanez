import React, { useEffect, useRef } from "react";
import styles from "@/styles/components/CaseModal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  ariaLabel?: string;
  className?: string;
}

export default function Modal({ children, onClose, ariaLabel = "Dialog", className = "" }: ModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prevActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    prevActive.current = (typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null) ?? null;
    const prevOverflow = typeof document !== "undefined" ? document.body.style.overflow : "";
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
    return () => {
      if (typeof document !== "undefined") document.body.style.overflow = prevOverflow;
      try { prevActive.current?.focus?.(); } catch {}
    };
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const focusable = ref.current.querySelectorAll<HTMLElement>(
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
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onBackdrop = (e: React.MouseEvent) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <div
      className={styles.backdrop}
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onBackdrop}
    >
      <div className={`${styles.modalContent} ${className}`}>
        {children}
      </div>
    </div>
  );
}