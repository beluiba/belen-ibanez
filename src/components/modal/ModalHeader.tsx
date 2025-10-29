import React from "react";
import styles from "@/styles/components/CaseModal.module.scss";

interface HeaderProps {
  title: string;
  role?: string;
  tools?: string[];
  oneLiner?: string;
  disclaimer?: string;
  children?: React.ReactNode;
}

export default function ModalHeader({ title, role, tools, oneLiner, disclaimer, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.meta}>
        {role ? <span className={styles.role}>{role}</span> : null}
        {tools?.length ? <span className={styles.tools}>{tools.join(", ")}</span> : null}
      </div>
      {oneLiner ? <div className={styles.oneLiner}>{oneLiner}</div> : null}
      {disclaimer ? <div className={styles.disclaimer}>{disclaimer}</div> : null}
      {children}
    </header>
  );
}