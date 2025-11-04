"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/Hero.module.scss";

const icons = [
  { src: "/images/icons/problem.svg", label: "Problem Framing" },
  { src: "/images/icons/research.svg", label: "Discovery Research" },
  { src: "/images/icons/definition.svg", label: "Opportunity Mapping" },
  { src: "/images/icons/map.svg", label: "Flows & Information Architecture" },
  { src: "/images/icons/prototype.svg", label: "Wireframes & Prototypes" },
  { src: "/images/icons/visual.svg", label: "UI & Design System" },
  { src: "/images/icons/dev.svg", label: "Layout & Front-End" },
  { src: "/images/icons/iteration.svg", label: "Validation & Iteration" },
];

const iconTooltips: Record<string, string[]> = {
  "Problem Framing": [
    "- Clarify business goals",
    "- Identify user pain points",
    "- Define success metrics",
  ],
  "Discovery Research": ["- User input", "- Competitive analysis"],
  "Opportunity Mapping": ["- Map opportunities", "- Prioritize features"],
  "Flows & Information Architecture": [
    "- Design user flows",
    "- Structure information",
  ],
  "Wireframes & Prototypes": ["- Create wireframes", "- Build prototypes"],
  "UI & Design System": ["- Design UI components", "- Maintain design system"],
  "Layout & Front-End": ["- Implement layouts", "- Front-end development"],
  "Validation & Iteration": ["- Validate with users", "- Iterate on feedback"],
};

export default function Hero() {
  const [flipped, setFlipped] = useState<string | null>(null);

  // Skills data (three categories)
  const specialtyBadges = [
    "B2B SaaS",
    "Data-Heavy Products",
    "Design Systems",
    "Decision Dashboards",
  ];
  const focusAreas = [
    "Enterprise UX",
    "FinTech",
    "Cybersecurity (SecOps)",
    "Onboarding & Activation",
    "Data Visualization",
  ];
  const coreStack = [
    "Figma",
    "React",
    "Next.js",
    "TypeScript",
    "SCSS",
    "Storybook",
    "Tailwind",
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.heroHeading}>
        <h1>Belén Ibáñez </h1>
        <h2>Product UX/UI Design Engineer</h2>
        <h3>15+ years shipping interfaces that move KPIs.</h3>
        <p>
          <b>End-to-end Designer.</b> I clarify requirements, design systems, and build accessible, data-driven interfaces. <br />With evidence, clear data visualisation, and AI-aware workflows, I ship and iterate closely with product and engineering.
        </p>
      </div>

      <div className={styles.heroTitle}>
        <h4>My process</h4>
      </div>

      <div className={styles.heroIcons}>
        {icons.map((icon) => (
          <div
            key={icon.label}
            className={`${styles.card} ${
              flipped === icon.label ? styles.flipped : ""
            }`}
            onMouseEnter={() => setFlipped(icon.label)}
            onMouseLeave={() => setFlipped(null)}
            onFocus={() => setFlipped(icon.label)}
            onBlur={() => setFlipped(null)}
            tabIndex={0}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <span
                  className={styles.heroIconInteractive}
                  aria-label={icon.label}
                >
                  <Image
                    src={icon.src}
                    alt={icon.label}
                    width={48}
                    height={48}
                    className={styles.heroIconImg}
                  />
                </span>
                <p>{icon.label}</p>
              </div>
              <div className={styles.cardBack}>
                {(iconTooltips[icon.label] || []).map((tip, i) => (
                  <p key={i}>{tip}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.heroTitle}>
        <h4>My Skills</h4>
      </div>

      <section className={styles.skillsSection} aria-label="Skills">
        <div className={styles.skillsRowSingle} role="list">
          {specialtyBadges.map((b) => (
            <span
              key={`spec-${b}`}
              role="listitem"
              className={`${styles.skill} ${styles.specialty}`}
            >
              {b}
            </span>
          ))}

          {focusAreas.map((f) => (
            <span
              key={`focus-${f}`}
              role="listitem"
              className={`${styles.skill} ${styles.focus}`}
            >
              {f}
            </span>
          ))}

          {coreStack.map((s) => (
            <span
              key={`core-${s}`}
              role="listitem"
              className={`${styles.skill} ${styles.core}`}
            >
              {s}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
}
