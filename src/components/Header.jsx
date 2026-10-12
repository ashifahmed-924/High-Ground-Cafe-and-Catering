import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/navigation";
import { business } from "../data/business";
import { getGsap } from "../animations/gsapSetup";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./Header.module.css";

export default function Header({ navOpen, setNavOpen }) {
  const [preview, setPreview] = useState(navLinks[0].preview);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();

    if (!reduced && overlayRef.current) {
      const { gsap } = getGsap();
      const ctx = gsap.context(() => {
        gsap.fromTo(
          `.${styles.navLink}`,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
          }
        );
        gsap.fromTo(
          `.${styles.preview}, .${styles.meta}`,
          { autoAlpha: 0, x: 24 },
          { autoAlpha: 1, x: 0, duration: 0.6, delay: 0.15, ease: "power2.out" }
        );
      }, overlayRef);
      return () => {
        window.removeEventListener("keydown", onKey);
        ctx.revert();
      };
    }

    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen, reduced, setNavOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setNavOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <header className={`${styles.header} ${navOpen ? styles.open : ""}`}>
        <a
          className={styles.brand}
          href="#top"
          onClick={(e) => handleNav(e, "#top")}
        >
          <span className={styles.brandText}>
            <strong>HIGH GROUND</strong>
            <small>Cafe &amp; Catering</small>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={styles.enquire}
            href={business.uberEatsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Order Uber Eats
          </a>
          <button
            ref={closeBtnRef}
            className={styles.menuBtn}
            type="button"
            aria-expanded={navOpen}
            aria-controls="site-nav-overlay"
            onClick={() => setNavOpen((v) => !v)}
          >
            {navOpen ? <X size={22} /> : <Menu size={22} />}
            <span>{navOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </header>

      <div
        id="site-nav-overlay"
        ref={overlayRef}
        className={`${styles.overlay} ${navOpen ? styles.overlayOpen : ""}`}
        aria-hidden={!navOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className={styles.overlayInner}>
          <nav className={styles.nav} aria-label="Overlay">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                className={styles.navLink}
                style={{ "--i": index }}
                onClick={(e) => handleNav(e, link.href)}
                onMouseEnter={() => setPreview(link.preview)}
                onFocus={() => setPreview(link.preview)}
                tabIndex={navOpen ? 0 : -1}
              >
                <span className={styles.navIndex}>0{index + 1}</span>
                <span className={styles.navLabel}>{link.label}</span>
              </a>
            ))}
          </nav>

          <div className={styles.side}>
            <div className={styles.preview} aria-hidden="true">
              <img src={preview} alt="" />
            </div>
            <aside className={styles.meta}>
              <p>{business.address.display}</p>
              <a href={business.phoneHref} tabIndex={navOpen ? 0 : -1}>
                {business.phone}
              </a>
              <a href={business.emailHref} tabIndex={navOpen ? 0 : -1}>
                {business.email}
              </a>
              <p className={styles.hours}>{business.hours.weekdays}</p>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
