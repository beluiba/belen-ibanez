"use client";
import React from "react";
import CaseTile from "./CaseTile";
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
};

type CaseData = {
  id: string;
  company: string;
  title: string;
  subtitle: string;
  role: string;
  context: string;
  logo: string;
  images: string[];
  href: string;
};

export default function OtherWorks({ items }: { items: WorkItem[] }) {
  if (!Array.isArray(items) || items.length === 0) {
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
      <div className={styles.grid} role="list">
        {items.map((raw, idx) => {
          const data = normalize(raw, idx);
          const isLast = idx === items.length - 1;

          const imagesForTile: string[] = isLast
            ? (data.images.length >= 4
                ? data.images.slice(0, 4)
                : (data.images.length > 0
                    ? Array.from({ length: 4 }, (_, i) => data.images[i % data.images.length])
                    : []))
            : (data.images.length > 0
                ? [data.images[0]]
                : []);
          const caseData: CaseData = {
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

          return (
            <article key={data.id} className={styles.tile} role="listitem">
              <CaseTile
                caseData={caseData}
                onOpen={() => {}}
                // pass a hint prop — CaseTile should read company/role/logo from caseData;
                // if CaseTile supports an explicit prop to toggle display, it will receive it.
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}