"use client";
import { useState } from "react";
import styles from "@/styles/components/Contact.module.scss";

const initialState = { name: "", email: "", message: "" };
const FORMSPREE_ENDPOINT = "https://formspree.io/f/belenibanezm@gmail.com"; // Replace with your Formspree endpoint

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("Message sent! Thank you for reaching out.");
        setForm(initialState);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-labelledby="contact-title"
      noValidate
    >
      <h2 id="contact-title">Contact</h2>
      <div className={styles.fieldsRow}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formActions}>
        <div aria-live="polite" className={styles.feedback}>
          {error && <span className={styles.error}>{error}</span>}
          {success && <span className={styles.success}>{success}</span>}
        </div>
        <button type="submit" disabled={loading} className="btn-secondary">
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
