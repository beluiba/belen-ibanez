"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "@/styles/components/CaseModal.module.scss";

type Img = string | { src: string; caption?: string };
type Props = {
  images: Img[];
  caption?: string; // fallback caption
};

export default function Carousel({ images = [], caption = "" }: Props) {
  // normalise to object array
  const norm = images.map((i) => (typeof i === "string" ? { src: i, caption: "" } : i));
  const [mainRef, mainApi] = useEmblaCarousel({ loop: false, skipSnaps: false });
  const [thumbRef, thumbApi] = useEmblaCarousel({ containScroll: "keepSnaps" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelected(index);
    if (thumbApi) thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
    onSelect();
  }, [mainApi, onSelect]);

  useEffect(() => {
    setSelected(0);
    mainApi?.scrollTo(0);
    thumbApi?.scrollTo(0);
  }, [norm.length, mainApi, thumbApi]);

  if (!norm || norm.length === 0) return null;

  const currentCaption = norm[selected]?.caption ?? caption ?? "";

  return (
    <div className={styles.emblaContainer}>
      {currentCaption ? <div className={styles.mainImageCaption}>{currentCaption}</div> : null}

      <div className={styles.emblaMainWrap}>
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => mainApi?.scrollPrev()}
          className={styles.carouselNavPrev}
        >
          ‹
        </button>

        <div className={styles.emblaViewport} ref={mainRef}>
          <div className={styles.emblaTrack}>
            {norm.map((item, i) => (
              <div key={i} className={styles.emblaSlide}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.caption || `Image ${i + 1}`} className={styles.mainImage} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next image"
          onClick={() => mainApi?.scrollNext()}
          className={styles.carouselNavNext}
        >
          ›
        </button>
      </div>

      {norm.length > 1 ? (
        <div className={styles.thumbList} ref={thumbRef} role="tablist" aria-label="Image thumbnails">
          <div className={styles.thumbRow}>
            {norm.map((item, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={selected === i}
                onClick={() => mainApi?.scrollTo(i)}
                className={`${styles.thumb} ${selected === i ? styles.thumbSelected : ""}`.trim()}
              >
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