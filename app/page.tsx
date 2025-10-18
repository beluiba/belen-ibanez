"use client";
import Link from "next/link";
import WorkGrid from "../src/components/WorkGrid";
import Hero from "../src/components/Hero";

export default function HomePage() {
  return (
    <main id="main-content" className="home-container">
      <Hero />
      <section className="featured">
        <WorkGrid mode="landing" />
        <Link href="/work" className="view-more">View more →</Link>
      </section>
      <section className="process">
        {/* Add your Process component here if needed */}
      </section>
      <section id="contact" className="contact">
        {/* Add your ContactForm component here if needed */}
      </section>
    </main>
);
}
