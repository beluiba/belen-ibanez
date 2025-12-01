"use client";
import React, { useState } from "react";
import Hero from "@/src/components/Hero";
import WorkGrid from "@/src/components/WorkGrid";
import CaseModal from "@/src/components/CaseModal";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import { featured, otherWorks } from "@/src/data/cases";
import styles from "@/styles/pages/Home.module.scss";

// widen WorkGrid props locally to include optional onOpen and mode
type WorkGridWithOpenProps = React.ComponentProps<typeof WorkGrid> & {
  onOpen?: (index: number) => void;
  mode?: string;
};
const WorkGridWithOpen = WorkGrid as React.ComponentType<WorkGridWithOpenProps>;

export default function HomePage() {
  const projectList = [
    ...(Array.isArray(featured) ? featured : []),
    ...(Array.isArray(otherWorks) ? otherWorks : []),
  ];

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const open = (index: number) => {
    if (typeof index === "number" && index >= 0 && index < projectList.length) {
      setModalIndex(index);
    }
  };

  const close = () => setModalIndex(null);

  // projectList handlers used by CaseModal (it calls projectList[i].onClick())
  const projectListHandlers = projectList.map((_, i) => ({
    onClick: () => setModalIndex(i),
  }));

  return (
    <>
      <Hero />

      <section id="work" className="featured">
        <div className={styles.featuredRow}>
          <WorkGridWithOpen mode="landing" onOpen={open} />
        </div>
      </section>

      {modalIndex !== null && modalIndex >= 0 && modalIndex < projectList.length && (
        <CaseModal
          caseData={projectList[modalIndex]}
          onClose={close}
          projectList={projectListHandlers}
          currentIndex={modalIndex}
        />
      )}

      <section id="contact" className="contact">
        <Contact />
      </section>

      <Footer />
    </>
  );
}
