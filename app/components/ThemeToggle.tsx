"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // On mount, check localStorage and set theme
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      style={{ fontSize: 22, padding: 6, borderRadius: 8, background: "none", border: "none", cursor: "pointer" }}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
