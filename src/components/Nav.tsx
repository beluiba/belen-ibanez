"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/Nav.module.scss";

const Nav = () => {
  const pathname = usePathname();
  const [contactActive, setContactActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const contact = document.getElementById("contact");
      if (contact) {
        const rect = contact.getBoundingClientRect();
        setContactActive(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" className={styles.siteTitle} aria-label="Home">
          <Image
            src="/images/logo.svg"
            alt="Belén Ibáñez logo"
            width={40}
            height={40}
          />
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link
              href="/work"
              aria-current={pathname === "/work" ? "page" : undefined}
            >
              Work
            </Link>
          </li>
          <li>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener"
              aria-label="Open CV PDF"
            >
              CV
            </a>
          </li>
          <li>
            <a
              href="/cover.pdf"
              target="_blank"
              rel="noopener"
              aria-label="Open Cover Letter PDF"
            >
              Cover Letter
            </a>
          </li>
          <li>
            <a
              href="#contact"
              aria-current={contactActive ? "page" : undefined}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;