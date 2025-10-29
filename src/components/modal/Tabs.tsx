import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/CaseModal.module.scss";

export type Tab = { id: string; title: string; content: React.ReactNode; ariaLabel?: string };

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
}

export default function Tabs({ tabs, defaultTabId, className = "" }: TabsProps) {
  const [active, setActive] = useState<string>(defaultTabId ?? tabs[0]?.id);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!tabs.some(t => t.id === active)) setActive(defaultTabId ?? tabs[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const selectByIndex = (i: number) => {
    const idx = ((i % tabs.length) + tabs.length) % tabs.length;
    setActive(tabs[idx].id);
    btnRefs.current[idx]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const idx = tabs.findIndex(t => t.id === active);
    if (e.key === "ArrowRight") { e.preventDefault(); selectByIndex(idx + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); selectByIndex(idx - 1); }
  };

  return (
    <div className={`${styles.tabbed} ${className}`}>
      <div className={styles.tablist} role="tablist" aria-label="Project sections" onKeyDown={onKey}>
        {tabs.map((t, i) => {
          const sel = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => { btnRefs.current[i] = el; }}
              id={`tab-${t.id}`}
              role="tab"
              aria-selected={sel}
              aria-controls={`panel-${t.id}`}
              tabIndex={sel ? 0 : 1}
              className={`${styles.tab} ${sel ? styles.tabActive : ""}`}
              onClick={() => setActive(t.id)}
              aria-label={t.ariaLabel ?? t.title}
            >
              {t.title}
            </button>
          );
        })}
      </div>

      {tabs.map(t => {
        const activePanel = t.id === active;
        return (
          <div
            key={t.id}
            id={`panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${t.id}`}
            hidden={!activePanel}
            className={styles.tabPanel}
          >
            {activePanel ? t.content : null}
          </div>
        );
      })}
    </div>
  );
}