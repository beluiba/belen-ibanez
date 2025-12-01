'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/components/Nav.module.scss";

export default function Nav({ onOpenContact }: { onOpenContact?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactActive, setContactActive] = useState(false);
  const [workActive, setWorkActive] = useState(false); // replaced workAtTop with workActive
  const [mobileOpen, setMobileOpen] = useState(false);
  const obsRef = useRef<IntersectionObserver | null>(null);
  const workObsRef = useRef<IntersectionObserver | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // contact intersection observer (replaced with visibility rules that ensure only one active)
  useEffect(() => {
    obsRef.current?.disconnect();
    obsRef.current = null;
    if (typeof window === "undefined") return;
    const el = document.getElementById("contact");
    if (!el || pathname !== "/") {
      setContactActive(false);
      return;
    }

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0;
    const TOL = 6;

    const checkActive = (entry: IntersectionObserverEntry) => {
      const rect = (entry.target as HTMLElement).getBoundingClientRect();
      const fullyVisible = rect.top >= headerHeight - TOL && rect.bottom <= window.innerHeight + TOL;
      const mostlyVisible = entry.intersectionRatio >= 0.9;
      const shouldBeActive = fullyVisible || mostlyVisible;
      if (shouldBeActive) {
        setContactActive(true);
        setWorkActive(false); // never allow both active
      } else {
        setContactActive(false);
      }
    };

    const obs = new IntersectionObserver((entries) => {
      // take the first entry (single observed element)
      checkActive(entries[0]);
    }, { threshold: [0, 0.5, 0.9, 1] });

    obs.observe(el);
    obsRef.current = obs;
    return () => obs.disconnect();
  }, [pathname]);

  // work intersection observer — mirror contact behaviour
  useEffect(() => {
    workObsRef.current?.disconnect();
    workObsRef.current = null;
    if (typeof window === "undefined") return;
    const el = document.getElementById("work");
    if (!el || pathname !== "/") {
      setWorkActive(false);
      return;
    }

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0;
    const TOL = 6;

    const checkActive = (entry: IntersectionObserverEntry) => {
      const rect = (entry.target as HTMLElement).getBoundingClientRect();
      const fullyVisible = rect.top >= headerHeight - TOL && rect.bottom <= window.innerHeight + TOL;
      const mostlyVisible = entry.intersectionRatio >= 0.9;
      const shouldBeActive = fullyVisible || mostlyVisible;
      if (shouldBeActive) {
        setWorkActive(true);
        setContactActive(false); // never allow both active
      } else {
        setWorkActive(false);
      }
    };

    const obs = new IntersectionObserver((entries) => {
      checkActive(entries[0]);
    }, { threshold: [0, 0.5, 0.9, 1] });

    obs.observe(el);
    workObsRef.current = obs;
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

  // helper: scroll so the section top sits directly below the header
  const scrollToElementTop = (el: HTMLElement | null) => {
    if (!el || typeof window === "undefined") return;
    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0;
    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // handler for Works — use Link but intercept navigation when already on home
  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // allow modifier-clicks / new-tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    // always prevent default so we control the behavior
    e.preventDefault();

    const doScrollTo = (el: HTMLElement) => {
      scrollToElementTop(el);
      setWorkActive(true);
      try {
        history.replaceState(null, "", "/#work");
      } catch {
        /* ignore */
      }
      setMobileOpen(false);
    };

    if (pathname === "/") {
      // try immediately
      const el = document.getElementById("work");
      if (el) {
        doScrollTo(el);
        return;
      }

      // element might be rendered client-side; poll briefly
      let attempts = 0;
      const maxAttempts = 20; // 20 * 50ms = 1s
      const iv = window.setInterval(() => {
        const el2 = document.getElementById("work");
        if (el2) {
          clearInterval(iv);
          doScrollTo(el2);
          return;
        }
        attempts += 1;
        if (attempts >= maxAttempts) {
          clearInterval(iv);
          // fallback: update hash so navigation to /#work will land when page re-renders
          try {
            history.replaceState(null, "", "/#work");
          } catch {}
          setMobileOpen(false);
        }
      }, 50);

      return;
    }

    // from another route: navigate to home with hash
    router.push("/#work");
    setMobileOpen(false);
  };

  // logo click: if already on homepage, scroll to top; otherwise let Link navigate
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // clear section active states so logo becomes active
      setContactActive(false);
      setWorkActive(false);
      setMobileOpen(false);
    }
    // when not on home, allow Link to navigate to "/"
  };

  // home active when on root and neither contact nor work are active
  const isHome = pathname === "/" && !contactActive && !workActive;
  const isWork = workActive;
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
          onClick={handleLogoClick}
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
            <Link
              id="nav-works"
              role="menuitem"
              href="/#work"
              scroll={false}
              prefetch={false}
              className={isWork ? styles.active : undefined}
              onClick={handleWorkClick}
              aria-current={isWork ? "page" : undefined}
            >
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

        {/* mobile toggle */}
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