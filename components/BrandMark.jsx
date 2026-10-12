export default function BrandMark({ inverted = false, compact = false }) {
  const title = inverted ? "text-oat" : "text-petrol";
  const sub = inverted ? "text-mist" : "text-stone";

  return (
    <div className="flex flex-col leading-none">
      <span
        className={`font-heading font-semibold tracking-[0.08em] uppercase ${title} ${
          compact ? "text-sm" : "text-base md:text-lg"
        }`}
      >
        High Ground
      </span>
      <span className={`utility-label mt-1 ${sub}`}>Cafe + Catering</span>
    </div>
  );
}
