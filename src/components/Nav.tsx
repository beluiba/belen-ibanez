/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/components/Nav.module.scss";

export default function Nav({ onOpenContact }: { onOpenContact?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [, setContactActive] = useState(false);
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // simple observer to toggle highlight when #contact is visible on the current page
    obsRef.current?.disconnect();
    obsRef.current = null;
    if (typeof window === "undefined") return;
    const el = document.getElementById("contact");
    if (!el || window.location.pathname !== "/") {
      setContactActive(false);
      return;
    }
    const obs = new IntersectionObserver(entries => {
      setContactActive(Boolean(entries[0]?.isIntersecting));
    }, { threshold: 0.2 });
    obs.observe(el);
    obsRef.current = obs;
    return () => obs.disconnect();
  }, [/* run on mount and when user navigates */]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("[Nav] contact clicked, pathname:", window.location.pathname);
    // If already on home, prevent navigation and open/scroll
    if (window.location.pathname === "/") {
      e.preventDefault();
      setContactActive(true);
      if (onOpenContact) {
        console.log("[Nav] calling onOpenContact");
        onOpenContact();
        window.dispatchEvent(new Event("contact:open"));
      } else {
        const el = document.getElementById("contact");
        if (el) {
          console.log("[Nav] scrolling to #contact");
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          (el as HTMLElement).focus?.();
        } else {
          console.log("[Nav] #contact not found — navigating to /#contact");
          window.location.href = "/#contact";
        }
      }
      // focus item in nav
      document.getElementById("nav-contact")?.focus();
      return;
    }

    // Not on home — allow the browser to navigate to /#contact
    // Do nothing (do NOT preventDefault); but ensure href exists for fallback.
    console.log("[Nav] navigating to /#contact from other page");
    // leaving default anchor behavior — no preventDefault
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.siteTitle} aria-label="Home">
          <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
        </Link>

        <ul className={styles.menu}>
          <li><Link href="/work">Work</Link></li>
          <li><a href="/cv.pdf" target="_blank" rel="noopener">CV</a></li>
          <li><a href="/cover.pdf" target="_blank" rel="noopener">Cover Letter</a></li>

          <li>
            <a
              id="nav-contact"
              href="/#contact"
              className={styles.contactToggle}
              aria-label="Contact"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}