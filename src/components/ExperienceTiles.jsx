import { useEffect, useRef } from "react";
import { experienceTiles } from "../data/menu";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./ExperienceTiles.module.css";

export default function ExperienceTiles() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.tile}`, {
        y: 48,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" className={`section ${styles.section}`} ref={ref}>
      <div className="container">
        <p className="section-label">Experience</p>
        <h2 className={`section-title ${styles.title}`}>Four ways through the day</h2>
        <div className={styles.grid}>
          {experienceTiles.map((tile) => (
            <a key={tile.id} href={tile.href} className={styles.tile}>
              <img src={tile.image} alt="" />
              <div className={styles.tileCopy}>
                <h3>{tile.title}</h3>
                <p>{tile.copy}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
