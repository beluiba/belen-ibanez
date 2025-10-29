import React from "react";
import styles from "@/styles/components/CaseModal.module.scss";

interface KeyFactsProps {
  items: Array<{ label: string; value: React.ReactNode }>;
  className?: string;
}

export default function KeyFacts({ items, className = "" }: KeyFactsProps) {
  return (
    <aside className={`${styles.keyFacts} ${className}`} aria-labelledby="keyfacts-title">
      <h4 id="keyfacts-title">Key facts</h4>
      <dl>
        {items.map(it => (
          <React.Fragment key={String(it.label)}>
            <dt>{it.label}</dt>
            <dd>{it.value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </aside>
  );
}