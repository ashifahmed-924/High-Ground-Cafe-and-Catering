import styles from "./AnimatedButton.module.css";

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const classes = `${styles.btn} ${styles[variant] || ""} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} {...props}>
        <span className={styles.label}>{children}</span>
        <span className={styles.shine} aria-hidden="true" />
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} {...props}>
      <span className={styles.label}>{children}</span>
      <span className={styles.shine} aria-hidden="true" />
    </button>
  );
}
