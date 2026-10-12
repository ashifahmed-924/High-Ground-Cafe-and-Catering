import { useEffect, useRef, useState, useCallback } from "react";
import { formatPrice, menuCategories } from "../data/menu";
import { business } from "../data/business";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import AnimatedButton from "./AnimatedButton";
import FoodLightbox from "./FoodLightbox";
import FullMenuModal from "./FullMenuModal";
import styles from "./MenuExplorer.module.css";

export default function MenuExplorer() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [fullOpen, setFullOpen] = useState(false);
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  const active = menuCategories.find((c) => c.id === activeId) || menuCategories[0];

  const switchCategory = (id) => {
    if (id === activeId) return;
    const { gsap, Flip } = getGsap();
    const grid = gridRef.current;
    if (!grid || reduced) {
      setActiveId(id);
      return;
    }

    const state = Flip.getState(grid.querySelectorAll(`.${styles.card}`));
    setActiveId(id);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.65,
        ease: "power2.inOut",
        absolute: true,
        stagger: 0.04,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.04 }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { autoAlpha: 0, duration: 0.25 }),
      });
    });
  };

  useEffect(() => {
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(`.${styles.card}`, {
        y: 36,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return (i - 1 + active.items.length) % active.items.length;
    });
  }, [active.items.length]);
  const nextLightbox = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return (i + 1) % active.items.length;
    });
  }, [active.items.length]);

  return (
    <section id="menu" className={`section ${styles.section}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="section-label">Explore our menu</p>
            <h2 className="section-title">A little taste of High Ground.</h2>
            <p className="section-copy">
              Browse categories below. Prices from Uber Eats delivery — ask in
              store for today’s specials and dietary options.
            </p>
          </div>
          <div className={styles.headActions}>
            <AnimatedButton
              variant="gold"
              href={business.uberEatsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Order on Uber Eats
            </AnimatedButton>
            <AnimatedButton variant="ink" onClick={() => setFullOpen(true)}>
              View full menu
            </AnimatedButton>
          </div>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Menu categories">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={cat.id === activeId}
              className={`${styles.tab} ${cat.id === activeId ? styles.tabActive : ""}`}
              onClick={() => switchCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className={styles.blurb}>{active.blurb}</p>

        <div className={styles.grid} ref={gridRef}>
          {active.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={styles.card}
              onClick={() => openLightbox(index)}
            >
              <div className={styles.thumb}>
                <img src={item.image} alt="" />
              </div>
              <div className={styles.cardCopy}>
                <div className={styles.cardTitle}>
                  <h3>{item.name}</h3>
                  {formatPrice(item.price) ? (
                    <span className={styles.price}>{formatPrice(item.price)}</span>
                  ) : null}
                </div>
                <p>{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <FoodLightbox
          items={active.items}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      ) : null}

      <FullMenuModal open={fullOpen} onClose={() => setFullOpen(false)} />
    </section>
  );
}
