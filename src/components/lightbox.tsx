import { useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { EightPointStar } from "./ornaments";

export type LightboxPhoto = { src: string; alt: string };

/** Lightbox à cadre mauresque, transition douce, navigation clavier. */
export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  labels,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  labels: { close: string; prev: string; next: string };
}) {
  const open = index !== null;

  const move = useCallback(
    (step: number) => {
      if (index === null) return;
      onIndexChange((index + step + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, move]);

  if (index === null) return null;
  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-100 flex animate-fade-in items-center justify-center px-4 py-10"
      style={{ background: "oklch(0.2 0.03 250 / 88%)" }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-5 top-5 border border-on-dark/35 p-2.5 text-on-dark transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
      >
        <X className="h-4 w-4" strokeWidth={1.2} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          move(-1);
        }}
        aria-label={labels.prev}
        className="absolute left-3 z-10 border border-on-dark/30 p-2.5 text-on-dark transition-colors duration-300 hover:border-terracotta hover:text-terracotta sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.2} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          move(1);
        }}
        aria-label={labels.next}
        className="absolute right-3 z-10 border border-on-dark/30 p-2.5 text-on-dark transition-colors duration-300 hover:border-terracotta hover:text-terracotta sm:right-8"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.2} />
      </button>

      <figure
        className="relative m-0 max-h-full w-full max-w-4xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="arch border border-cobalt/60 bg-ivory p-2 shadow-warm-lg">
          <img
            src={photo.src}
            alt={photo.alt}
            className="arch max-h-[74vh] w-full object-cover"
            width={1600}
            height={1100}
          />
        </div>
        <figcaption className="mt-5 flex items-center justify-center gap-3 text-center text-xs uppercase tracking-[0.22em] text-on-dark/80">
          <EightPointStar className="h-3.5 w-3.5 text-terracotta" />
          {photo.alt}
        </figcaption>
      </figure>
    </div>
  );
}
