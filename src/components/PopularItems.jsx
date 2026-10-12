import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice, popularItems } from "../data/menu";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./PopularItems.module.css";

export default function PopularItems() {
  const scrollerRef = useRef(null);
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.card}`, {
        x: 40,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(360, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.head}>
          <div className={styles.titleBlock}>
            <p className="section-label">A few reasons to come back</p>
            <h2 className="section-title">The good stuff.</h2>
          </div>
          <div className={styles.nav}>
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll left">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll right">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.scroller} ref={scrollerRef}>
        {popularItems.map((item) => (
          <article key={item.id} className={styles.card}>
            <img src={item.image} alt={item.name} />
            <div>
              <p>{item.category}</p>
              <h3>{item.name}</h3>
              {formatPrice(item.price) ? (
                <span className={styles.price}>{formatPrice(item.price)}</span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
