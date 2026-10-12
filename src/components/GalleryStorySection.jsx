import { useCallback, useEffect, useRef, useState } from "react";
import { galleryStories } from "../data/gallery";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import FoodLightbox from "./FoodLightbox";
import styles from "./GalleryStorySection.module.css";

export default function GalleryStorySection() {
  const [index, setIndex] = useState(null);
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const items = galleryStories.map((g) => ({
    id: g.id,
    name: g.caption,
    description: g.alt,
    image: g.src,
  }));

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.frame}`, {
        y: 36,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );

  return (
    <section id="gallery" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <p className="section-label">Gallery</p>
        <h2 className="section-title">More than just a coffee stop.</h2>
        <div className={styles.grid}>
          {galleryStories.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.frame} ${styles[item.id] || ""}`}
              onClick={() => setIndex(i)}
            >
              <img src={item.src} alt={item.alt} />
              <span>{item.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {index !== null ? (
        <FoodLightbox
          items={items}
          index={index}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </section>
  );
}
