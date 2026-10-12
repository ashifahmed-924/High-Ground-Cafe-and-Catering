import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./ReviewsSection.module.css";

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const review = testimonials[index];

  useEffect(() => {
    if (reduced) return undefined;
    const { gsap } = getGsap();
    const el = document.querySelector(`.${styles.quote}`);
    if (!el) return undefined;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }
    );
  }, [index, reduced]);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section id="reviews" className={`section ${styles.section}`}>
      <div className={`container ${styles.wrap}`}>
        <p className="section-label">Reviews</p>
        <h2 className="section-title">Kind words. Great coffee.</h2>
        <blockquote className={styles.quote} key={review.id}>
          <p>“{review.quote}”</p>
          <footer>
            <cite>{review.name}</cite>
            <span>{review.date}</span>
          </footer>
        </blockquote>
        <div className={styles.controls}>
          <button type="button" onClick={prev} aria-label="Previous review">
            <ChevronLeft size={20} />
          </button>
          <div className={styles.dots} aria-hidden="true">
            {testimonials.map((t, i) => (
              <span key={t.id} className={i === index ? styles.dotActive : ""} />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Next review">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
