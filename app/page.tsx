"use client";
import Hero from "@/src/components/Hero";
import WorkGrid from "@/src/components/WorkGrid";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
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
          {/* your view more link */}
        </div> 
      </section>

      <section id="contact" className="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
