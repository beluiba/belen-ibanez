'use client';

import React, { useRef } from "react";
import Image from "next/image";
import styles from "@/styles/components/CaseTile.module.scss";
import ArrowIcon from "./ArrowIcon";

interface CaseData {
  id?: string | number;
  company?: string;
  title?: string;
  role?: string;
  context?: string;
  images?: string[]; // only first image used
  logo?: string;
  logoSize?: number;
}

interface CaseTileProps {
  caseData: CaseData;
  showLogoAndRole?: boolean;
  onOpen: (caseData: CaseData, origin: HTMLElement | null) => void;
}

export default function CaseTile({
  caseData,
  onOpen,
  showLogoAndRole = true,
}: CaseTileProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const imgs = Array.isArray(caseData.images) ? caseData.images : [];
  const cover = imgs.length > 0 ? imgs[0] : "/images/placeholder.png";

  const handleOpen = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    onOpen(caseData, btnRef.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <article
      className={styles.caseTile}
      tabIndex={0}
      role="button"
      aria-label={caseData.company ?? caseData.title ?? "Open case"}
      onClick={() => handleOpen()}
      onKeyDown={handleKeyDown}
      data-logo-size={caseData.logoSize ? `${caseData.logoSize}px` : undefined}
    >
      <div className={styles.inner}>
        {/* FRONT */}
        <div className={styles.front}>
          <div className={styles.media}>
            <div className={styles.cover}>
              <Image
                src={cover}
                alt={caseData.title ?? caseData.company ?? "cover"}
                fill
                sizes="(min-width:1200px) 33vw, (min-width:768px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className={styles.overlay}>
            <div className={styles.row}>
              {showLogoAndRole && caseData.logo ? (
                <div className={styles.logoSmall} aria-hidden="true">
                  <Image
                    src={caseData.logo}
                    alt={caseData.company ? `${caseData.company} logo` : `${caseData.title} logo`}
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : null}

              <div className={styles.titleMeta}>
                <h3 className={styles.company}>{caseData.company ?? caseData.title}</h3>
                {showLogoAndRole && caseData.role ? <div className={styles.role}>{caseData.role}</div> : null}
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className={styles.back}>
          <div className={styles.backHeader}>
            {showLogoAndRole && caseData.logo ? (
              <div className={styles.logoSmall} aria-hidden="true">
                <Image
                  src={caseData.logo}
                  alt={caseData.company ? `${caseData.company} logo` : `${caseData.title} logo`}
                  width={40}
                  height={40}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}

            <div className={styles.titleMeta}>
              <h3 className={styles.company}>{caseData.company ?? caseData.title}</h3>
              {caseData.role ? <div className={styles.role}>{caseData.role}</div> : null}
            </div>
          </div>

          {typeof caseData.context === "string" && caseData.context ? (
            <p className={styles.description}>{caseData.context}</p>
          ) : null}

          <div className={styles.backFooter}>
            <button
              ref={btnRef}
              type="button"
              className={styles.viewBtn}
              onClick={(e) => { e.stopPropagation(); handleOpen(); }}
              aria-label={`View more ${caseData.company ?? caseData.title}`}
            >
              <span className={styles.viewText}>
                View more
                <ArrowIcon className={styles.arrowChar} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}