export default function CafePattern({
  variant = "cup-rings",
  className = "",
  opacity = 0.04,
}) {
  const id = `cafe-pattern-${variant}`;

  const patterns = {
    "cup-rings": (
      <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="22" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="22" r="6" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="52" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="40" y="12" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="0.7" />
      </pattern>
    ),
    "counter-grid": (
      <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="1.2" fill="currentColor" />
      </pattern>
    ),
    wrapper: (
      <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="none" stroke="currentColor" strokeWidth="0.55" />
        <rect x="14" y="14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="0.55" />
      </pattern>
    ),
    tray: (
      <pattern id={id} width="96" height="56" patternUnits="userSpaceOnUse">
        <rect x="4" y="8" width="88" height="40" rx="6" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="14" y="16" width="28" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <rect x="50" y="16" width="28" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="0.7" />
      </pattern>
    ),
    dots: (
      <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.1" fill="currentColor" />
        <circle cx="16" cy="14" r="0.9" fill="currentColor" />
      </pattern>
    ),
  };

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>{patterns[variant] || patterns["cup-rings"]}</defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
