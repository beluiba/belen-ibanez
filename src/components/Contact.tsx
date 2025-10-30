"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/Contact.module.scss";

export default function Contact({ open }: { open?: boolean }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  // simple email regexp (reasonable client-side check)
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const validateForm = (form: HTMLFormElement) => {
    const formErrors: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement | null)?.value?.trim() ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value?.trim() ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement | null)?.value?.trim() ?? "";

    if (!name) formErrors.name = "Please enter your contact name.";
    if (!email) formErrors.email = "Please enter your contact email.";
    else if (!isValidEmail(email)) formErrors.email = "Please enter a valid email address.";
    if (!message) formErrors.message = "Please enter a message.";
    else if (message.length < 5) formErrors.message = "Message must be at least 5 characters.";

    return formErrors;
  };

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
          action="https://formspree.io/f/mzzkvjqa"
          method="POST"
          aria-labelledby="contact-title"
          noValidate
          onSubmit={(e) => {
            const form = e.currentTarget as HTMLFormElement;
            const foundErrors = validateForm(form);
            setErrors(foundErrors);

            // set aria-invalid on fields and show inline messages
            const setFieldInvalid = (name: string, message?: string) => {
              const el = form.elements.namedItem(name) as HTMLElement | null;
              if (el) {
                if (message) el.setAttribute("aria-invalid", "true");
                else el.removeAttribute("aria-invalid");
              }
            };
            setFieldInvalid("name", foundErrors.name);
            setFieldInvalid("email", foundErrors.email);
            setFieldInvalid("message", foundErrors.message);

            if (Object.keys(foundErrors).length > 0) {
              // prevent submission and announce errors
              e.preventDefault();
              setIsSubmitting(false);
              const firstErrorField = form.querySelector<HTMLElement>("[aria-invalid='true']");
              firstErrorField?.focus();
              if (feedbackRef.current) {
                feedbackRef.current.textContent =
                  foundErrors.name ?? foundErrors.email ?? foundErrors.message ?? "Please fix the errors above.";
              }
              return;
            }

            // no errors — allow native form submission to Formspree
            setIsSubmitting(true);
            if (feedbackRef.current) {
              feedbackRef.current.textContent = "Sending message…";
            }
            // do not call e.preventDefault() so browser posts the form to formspree
          }}
        >
          <h2 id="contact-title" className={styles.title}>
            Contact
          </h2>

          {/* name + email in one row */}
          <div className={styles.fieldsRow}>
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input
                name="name"
                type="text"
                required
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "error-name" : undefined}
              />
              {errors.name && (
                <div id="error-name" role="alert" className={styles.fieldError}>
                  {errors.name}
                </div>
              )}
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "error-email" : undefined}
              />
              {errors.email && (
                <div id="error-email" role="alert" className={styles.fieldError}>
                  {errors.email}
                </div>
              )}
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Message</span>
            <textarea
              name="message"
              rows={6}
              required
              aria-required="true"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "error-message" : undefined}
            />
            {errors.message && (
              <div id="error-message" role="alert" className={styles.fieldError}>
                {errors.message}
              </div>
            )}
          </label>

          <div className={styles.formActions}>
            <button type="submit" className="btnToken" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
