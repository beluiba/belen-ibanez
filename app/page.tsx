"use client";
import Link from "next/link";
import WorkGrid from "../src/components/WorkGrid";
import Hero from "../src/components/Hero";
import styles from "@/styles/pages/Home.module.scss";
import ArrowIcon from "../src/components/ArrowIcon";

export default function HomePage() {
  return (
    <main id="main-content" className="home-container">
      <Hero />
      <section className="featured">
        <div className={styles.featuredRow}>
          <WorkGrid mode="landing" />
        </div>

        <div className={styles.viewMoreRow}>
          <Link href="/work" className={styles.viewMore}>
            <span>View more</span>
            <ArrowIcon className={styles.arrowLeft} />
          </Link>
        </div>
      </section>

      <section className="process" />
      <section id="contact" className="contact" />
    </main>
  );
}
