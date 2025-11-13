'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/components/Nav.module.scss";

export default function Nav({ onOpenContact }: { onOpenContact?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactActive, setContactActive] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const obsRef = useRef<IntersectionObserver | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    obsRef.current?.disconnect();
    obsRef.current = null;
    if (typeof window === "undefined") return;
    const el = document.getElementById("contact");
    if (!el || pathname !== "/") {
      setContactActive(false);
      return;
    }
    const obs = new IntersectionObserver(entries => {
      setContactActive(Boolean(entries[0]?.isIntersecting));
    }, { threshold: 0.2 });
    obs.observe(el);
    obsRef.current = obs;
    return () => obs.disconnect();
  }, [pathname]);

  // close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // close on outside click / escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      const target = e.target as Node | null;
      if (target && !menuRef.current.contains(target) && !(target as HTMLElement).closest(`.${styles.mobileToggle}`)) {
        setMobileOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onOpenContact?.();
    if (pathname === "/") {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileOpen(false);
        return;
      }
      router.push("/#contact");
      setMobileOpen(false);
      return;
    }
    router.push("/#contact");
    setMobileOpen(false);
  };

  const isHome = pathname === "/" && !contactActive;
  const isWork = pathname === "/work" || pathname.startsWith("/work/");
  const isContactRoute = pathname === "/contact" || pathname.startsWith("/contact");
  const contactIsActive = isContactRoute || contactActive;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link
          href="/"
          className={`${styles.siteTitle} ${isHome ? styles.active : ""}`}
          aria-label="Home"
          aria-current={isHome ? "page" : undefined}
          onClick={() => setMobileOpen(false)}
        >
          <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
        </Link>

        {/* render menu first so server/client order is deterministic */}
        <ul
          id="main-nav"
          ref={menuRef}
          className={`${styles.menu} ${mobileOpen ? styles.open : ""}`}
          role="menubar"
        >
          <li role="none">
            <Link role="menuitem" href="/work" className={isWork ? styles.active : undefined} onClick={() => setMobileOpen(false)} aria-current={isWork ? "page" : undefined}>
              Works
            </Link>
          </li>

          <li role="none"><a role="menuitem" href="/cv.pdf" target="_blank" rel="noopener" onClick={() => setMobileOpen(false)}>CV</a></li>
          <li role="none"><a role="menuitem" href="/cover.pdf" target="_blank" rel="noopener" onClick={() => setMobileOpen(false)}>Cover Letter</a></li>

          <li role="none">
            <Link
              id="nav-contact"
              role="menuitem"
              href="/#contact"
              className={`${styles.contactToggle} ${contactIsActive ? styles.active : ""}`}
              aria-current={contactIsActive ? "page" : undefined}
              onClick={handleContactClick}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* mobile toggle: keep present on server & client; suppress hydration warning to avoid mismatch */}
        <button
          className={styles.mobileToggle}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="main-nav"
          onClick={() => setMobileOpen(v => !v)}
          suppressHydrationWarning
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>
    </header>
  );
}