import { useEffect, useRef } from "react";
import { values } from "../data/business";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./TrustSection.module.css";

export default function TrustSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.card}`, {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
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

  return (
    <section className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <p className="section-label">Why High Ground</p>
        <h2 className="section-title">Trusted for the workday.</h2>
        <p className="section-copy">
          No partner logos or awards claimed here — just what regulars already know from the cafe.
        </p>
        <div className={styles.grid}>
          {values.map((item) => (
            <article key={item.id} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
