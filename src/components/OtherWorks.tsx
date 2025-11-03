"use client";
import React from "react";
import CaseTile from "./CaseTile";
import { secondary as secondaryCases } from "../data/cases";
import styles from "@/styles/components/OtherWorks.module.scss";

type WorkItem = {
  id?: string | number;
  href?: string;
  title?: string;
  company?: string;
  subtitle?: string;
  role?: string;
  imageSrc?: string;
  imageAlt?: string;
  logo?: string;
  images?: string[]; // optional images array
  [key: string]: unknown;
};

type Props = {
  items?: WorkItem[]; // optional override; defaults to secondary cases
  featuredOffset?: number; // used to compute global index for modal
  onOpen?: (globalIndex: number) => void;
};

export default function OtherWorks({ items, featuredOffset = 0, onOpen }: Props) {
  const source: WorkItem[] = Array.isArray(items) && items.length > 0 ? items : (Array.isArray(secondaryCases) ? secondaryCases.slice(0, 4) : []);

  if (!Array.isArray(source) || source.length === 0) {
    return <div className={styles.emptyMessage}>No other works available.</div>;
  }

  const normalize = (raw: WorkItem, idx: number) => {
    const id = raw?.id ?? idx;
    const images = Array.isArray(raw?.images) ? raw.images : raw?.imageSrc ? [raw.imageSrc] : [];
    return {
      id: String(id),
      title: raw?.title ?? raw?.company ?? `Work ${idx + 1}`,
      subtitle: raw?.subtitle ?? "",
      company: raw?.company ?? raw?.title ?? "",
      role: raw?.role ?? raw?.subtitle ?? "",
      logo: raw?.logo ?? "",
      images,
      href: raw?.href ?? (id ? `/work/${id}` : ""),
      raw,
    };
  };

  return (
    <section className={styles.otherWorks} aria-label="Other works">
      <h3>Other Works</h3>
      <div className={styles.grid} role="list">
        {source.map((raw, idx) => {
          const data = normalize(raw, idx);
          const isLast = idx === source.length - 1;

          const imagesForTile: string[] = isLast
            ? (data.images.length >= 4
                ? data.images.slice(0, 4)
                : (data.images.length > 0
                    ? Array.from({ length: 4 }, (_, i) => data.images[i % data.images.length])
                    : []))
            : (data.images.length > 0 ? [data.images[0]] : []);

          const caseData = {
            id: data.id,
            company: data.company,
            title: data.title,
            subtitle: data.subtitle,
            role: data.role,
            context: data.subtitle || data.role || data.title,
            logo: data.logo,
            images: imagesForTile,
            href: data.href,
          };

          const globalIndex = featuredOffset + idx;

          return (
            <article
              key={data.id}
              className={styles.tile}
              role="button"
              tabIndex={0}
              aria-label={`Open ${data.company}`}
              onClick={() => {
                if (typeof onOpen === "function") onOpen(globalIndex);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (typeof onOpen === "function") onOpen(globalIndex);
                }
              }}
            >
              <CaseTile caseData={caseData} />
            </article>
          );
        })}
      </div>
    </section>
  );
}