"use client";
import Link from "next/link";
import Hero from "@/src/components/Hero";
import WorkGrid from "@/src/components/WorkGrid";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import ArrowIcon from "@/src/components/ArrowIcon";
import styles from "@/styles/pages/Home.module.scss";

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
            <span className={styles.viewText}>View more</span>
            <ArrowIcon className={styles.arrowLeft} />
          </Link>
        </div>
      </section>

      <section id="contact" className="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
