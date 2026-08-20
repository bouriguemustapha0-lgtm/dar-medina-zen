import { RIAD, mapEmbedSrc, mapsLink } from "@/lib/riad";

/**
 * Carte Google interactive (déplaçable / zoomable). Le repère rouge affiché est
 * celui de Google, ancré aux coordonnées du riad : il suit donc la carte quand
 * on la déplace.
 */
export function RiadMap({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <iframe
        title={title}
        src={mapEmbedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
      />
      <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-cobalt-deep px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-on-dark shadow-warm-lg">
        {RIAD.name}
      </span>

      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 rounded-sm bg-ivory/95 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-cobalt-deep shadow-warm"
      >
        Google Maps
      </a>
    </div>
  );
}
