"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "@/styles/components/CaseModal.module.scss";

type Img = string | { src: string; caption?: string };
type Props = {
  images: Img[];
};

export default function Carousel({ images = [] }: Props) {
  const norm = images.map((i) =>
    typeof i === "string" ? { src: i, caption: "" } : i && typeof i.src === "string" ? { src: i.src, caption: i.caption ?? "" } : { src: String(i), caption: "" }
  );

  const [mainRef, mainApi] = useEmblaCarousel({ loop: false, skipSnaps: false });
  const [thumbRef, thumbApi] = useEmblaCarousel({ containScroll: "keepSnaps" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const idx = mainApi.selectedScrollSnap();
    setSelected(idx);
    if (thumbApi) thumbApi.scrollTo(idx);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
    mainApi.on("init", onSelect);
    onSelect();
    return () => {
      mainApi.off?.("select", onSelect);
      mainApi.off?.("init", onSelect);
    };
  }, [mainApi, onSelect]);

  useEffect(() => {
    setSelected(0);
    mainApi?.scrollTo(0);
    thumbApi?.scrollTo?.(0);
  }, [norm.length, mainApi, thumbApi]);

  // compute caption only from the selected image
  const currentCaption = String((norm[selected] && norm[selected].caption) || "").trim();

  // navigation helpers
  // use explicit indices and scrollTo so navigation wraps when at ends
  const prev = () => {
    const idx = (selected - 1 + norm.length) % norm.length;
    setSelected(idx);
    mainApi?.scrollTo(idx);
  };
  const next = () => {
    const idx = (selected + 1) % norm.length;
    setSelected(idx);
    mainApi?.scrollTo(idx);
  };
  const goTo = (i: number) => {
    const idx = Math.max(0, Math.min(i, norm.length - 1));
    setSelected(idx);
    mainApi?.scrollTo(idx);
  };

  // debug log
  if (typeof window !== "undefined") {
    console.debug("Carousel selected", selected, "norm:", norm);
  }

  return (
    <div className={styles.emblaContainer}>
      <div className={styles.emblaMainWrap}>
        <button type="button" aria-label="Previous image" onClick={prev} className={styles.carouselNavPrev}>‹</button>

        <div className={styles.emblaViewport} ref={mainRef} aria-roledescription="carousel" aria-label={`${selected + 1} of ${norm.length}`} aria-describedby={`carousel-caption-${selected}`}>
          <div className={styles.emblaTrack}>
            {norm.map((item, i) => (
              <div key={i} className={styles.emblaSlide}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.caption || `Image ${i + 1}`} className={styles.mainImage} />
              </div>
            ))}
          </div>
        </div>

        <button type="button" aria-label="Next image" onClick={next} className={styles.carouselNavNext}>›</button>
      </div>

      {/* DEBUG: always render a visible caption element so we can confirm it updates */}
      <p
        id={`carousel-caption-${selected}`}
        className={`${styles.mainImageCaptionBelow} debug-visible`}
        aria-live="polite"
      >
        {/* show index + caption for debugging */}
        {`#${selected + 1} — ${currentCaption || "(no per-image caption found)"}`}
      </p>

      {norm.length > 1 ? (
        <div className={styles.thumbList} ref={thumbRef} role="tablist" aria-label="Image thumbnails">
          <div className={styles.thumbRow}>
            {norm.map((item, i) => (
              <button key={i} type="button" aria-pressed={selected === i} onClick={() => goTo(i)} className={`${styles.thumb} ${selected === i ? styles.thumbSelected : ""}`.trim()}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.caption || `Thumbnail ${i + 1}`} className={styles.thumbImg} />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}