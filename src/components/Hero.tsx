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

// iconTooltips maps each icon label to an array of tooltip strings describing the key activities or features for that step.
// Structure: { [label: string]: string[] }
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

  return (
    <section className={styles.hero}>
      <div className={styles.heroHeading}>
        <h1>Belén Ibáñez </h1>
        <h2>Product UX/UI Design Engineer</h2>
        <h3>15+ years shipping interfaces that move KPIs.</h3>
        <p>I define product requirements, design the system, and code accessible, data-driven interfaces. I turn ambiguity into decisions through evidence, clear data visualisation, and AI-aware workflows, then ship and iterate against measurable outcomes partnering tightly with engineering and product.</p>
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
                  <div key={i}>{tip}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
