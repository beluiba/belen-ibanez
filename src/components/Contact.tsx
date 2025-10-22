"use client";
import React, { useEffect, useRef } from "react";
import styles from "@/styles/components/Contact.module.scss";

export default function Contact({ open }: { open?: boolean }) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      window.dispatchEvent(new Event("contact:open"));
      const first = rootRef.current?.querySelector<HTMLElement>("input, textarea, button, a");
      (first || rootRef.current)?.focus?.();
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.dispatchEvent(new Event("contact:close"));
    }
  }, [open]);

  return (
    <section
      id="contact"
      ref={rootRef}
      tabIndex={-1}
      aria-hidden={!open}
      data-open={open ? "true" : "false"}
      className={styles.contactSection}
    >
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            // submit logic...
          }}
          aria-labelledby="contact-title"
          noValidate
        >
          <h2 id="contact-title" className={styles.title}>Contact</h2>

          {/* name + email in one row */}
          <div className={styles.fieldsRow}>
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input name="name" type="text" required />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input name="email" type="email" required />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Message</span>
            <textarea name="message" rows={6} required />
          </label>

          <div className={styles.formActions}>
            <div className={styles.feedback} aria-live="polite"></div>
            <button type="submit" className={styles.sendBtn}>Send</button>
          </div>
        </form>
      </div>
    </section>
  );
}
