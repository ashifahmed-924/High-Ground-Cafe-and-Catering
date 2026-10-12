import { useEffect, useRef } from "react";
import { formatPrice, signatureItems } from "../data/menu";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./SignatureSection.module.css";

export default function SignatureSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.item}`, {
        x: -40,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
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
        <p className="section-label">Signatures</p>
        <h2 className="section-title">Made fresh. Made for you.</h2>
        <div className={styles.list}>
          {signatureItems.map((item, i) => (
            <article key={item.id} className={styles.item}>
              <span className={styles.index}>0{i + 1}</span>
              <div className={styles.text}>
                <h3>{item.name}</h3>
                {formatPrice(item.price) ? (
                  <span className={styles.price}>{formatPrice(item.price)}</span>
                ) : null}
                <p>{item.copy}</p>
              </div>
              <div className={styles.thumb}>
                <img src={item.image} alt={item.name} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
