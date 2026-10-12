export default function SectionLabel({ children, className = "" }) {
  return (
    <p className={`utility-label text-coral ${className}`}>{children}</p>
  );
}
