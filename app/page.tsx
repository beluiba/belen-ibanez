import ProjectCard from "./components/ProjectCard";
import Callout from "./components/Callout";
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Belén Ibáñez — Notion-style Portfolio",
  description:
    "Product & UX/UI Designer with 15+ years creating human-centered products. Bridging design, engineering, and business across cybersecurity, finance, AI, and SaaS.",
  openGraph: {
    title: "Belén Ibáñez — Notion-style Portfolio",
    description:
      "Product & UX/UI Designer with 15+ years creating human-centered products.",
  },
};

export default function Page() {
  return (
    <main className="landing-container" id="main-content">
      {/* HERO */}
      <section className="landing-hero" aria-label="Hero">
        <h1 className="landing-hero-h1">
          Product & UX/UI Designer with 15+ years creating human-centered
          products.
        </h1>
        <p className="landing-hero-sub">
          Bridging design, engineering, and business across cybersecurity,
          finance, AI, and SaaS.
        </p>
        <div className="landing-hero-btns">
          <Link
            href="/case-studies"
            className="landing-btn"
            aria-label="View Case Studies"
          >
            View Case Studies
          </Link>
          <a href="/cv.pdf" className="landing-btn" aria-label="Download CV">
            Download CV
          </a>
        </div>
      </section>

      <hr className="landing-divider" />

      {/* FEATURED USE CASES */}
      <section className="landing-featured" aria-label="Featured Use Cases">
        <h2 className="sr-only">Featured Use Cases</h2>
        <div className="landing-cards">
          <div className="landing-card">
            <div className="landing-card-title">
              Bank of America — Risk & Controls
            </div>
            <div className="landing-card-summary">
              Designing tools for risk management and controls in a global
              financial institution. Empowering teams to make informed decisions
              and reduce operational risk.
            </div>
            <Link
              href="/case-studies/bank-of-america"
              className="landing-card-link"
              aria-label="View Bank of America case study"
            >
              View case study
            </Link>
          </div>
          <div className="landing-card">
            <div className="landing-card-title">
              Adarma — Cybersecurity SOC Tools
            </div>
            <div className="landing-card-summary">
              Building intuitive SOC tools for cybersecurity analysts.
              Streamlining workflows and surfacing actionable insights in
              high-pressure environments.
            </div>
            <Link
              href="/case-studies/adarma"
              className="landing-card-link"
              aria-label="View Adarma case study"
            >
              View case study
            </Link>
          </div>
          <div className="landing-card">
            <div className="landing-card-title">
              Silico — Decision Intelligence SaaS
            </div>
            <div className="landing-card-summary">
              Crafting a SaaS platform for decision intelligence. Enabling
              organizations to simulate, analyze, and optimize business outcomes
              with AI-driven insights.
            </div>
            <Link
              href="/case-studies/silico"
              className="landing-card-link"
              aria-label="View Silico case study"
            >
              View case study
            </Link>
          </div>
        </div>
      </section>

      <hr className="landing-divider" />

      {/* OTHER WORKS */}
      <section className="landing-other" aria-label="Other Works">
        <h2 className="sr-only">Other Works</h2>
        <p>
          Beyond case studies, I have helped teams launch, scale, and improve
          products in:
        </p>
        <ul className="landing-other-list">
          <li>🔍 Data visualization for AI/ML</li>
          <li>🛠️ Internal tools for SaaS ops</li>
          <li>🚀 Growth experiments for fintech</li>
          <li>🤝 Collaboration platforms</li>
          <li>📱 Mobile-first dashboards</li>
        </ul>
        <Link
          href="/other-works"
          className="landing-btn landing-other-btn"
          aria-label="See all other works"
        >
          See all other works
        </Link>
      </section>

      <hr className="landing-divider" />

      {/* PROCESS */}
      <section className="landing-process" aria-label="Process">
        <h2 className="sr-only">Process</h2>
        <div className="landing-timeline" role="list">
          <div className="landing-step" role="listitem">
            🔍 <span>Research: Understand users, context, and goals.</span>
          </div>
          <div className="landing-step" role="listitem">
            🧭 <span>Define: Frame the problem and success criteria.</span>
          </div>
          <div className="landing-step" role="listitem">
            🧪 <span>Prototype: Explore solutions and iterate quickly.</span>
          </div>
          <div className="landing-step" role="listitem">
            ✅ <span>Validate: Test with users and stakeholders.</span>
          </div>
          <div className="landing-step" role="listitem">
            🚀 <span>Deliver: Launch, measure, and refine.</span>
          </div>
        </div>
      </section>

      <hr className="landing-divider" />

      {/* CONTACT */}
      <section className="landing-contact" aria-label="Contact">
        <div className="landing-contact-cta">
          Let’s build something together.
        </div>
        <div className="landing-contact-btns">
          <a
            href="mailto:belen.ibanez@gmail.com"
            className="landing-btn"
            aria-label="Email"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/belenibanez"
            className="landing-btn"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/belenibanez"
            className="landing-btn"
            aria-label="GitHub"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          <a href="/cv.pdf" className="landing-btn" aria-label="Download CV">
            Download CV
          </a>
        </div>
      </section>

      <hr className="landing-divider" />

      {/* PROJECTS */}
      <section className="landing-projects" aria-label="Projects">
        <ProjectCard
          href="/work/silico"
          title="Silico"
          summary="Designing simulation tools for better business decisions."
          tags={["Product Design", "B2B", "Simulation"]}
          image="/silico-cover.jpg"
        />
        <ProjectCard
          href="/work/adarma"
          title="Adarma"
          summary="Brand and platform for a leading cybersecurity consultancy."
          tags={["Brand", "Platform", "Cybersecurity"]}
          image="/adarma-cover.jpg"
        />
      </section>

      <Callout icon="💬">
        Currently available for select design leadership and product strategy
        engagements.
      </Callout>

      <footer className="landing-footer"></footer>
    </main>
  );
}
