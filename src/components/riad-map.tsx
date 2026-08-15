import { RIAD, mapEmbedSrc, mapsLink } from "@/lib/riad";

/**
 * Carte du riad avec un repère unique et clairement signalé
 * (l'étiquette « Riad Dar Medina Land » est superposée au centre de la carte).
 */
export function RiadMap({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* La carte est verrouillée (non déplaçable) : le centre correspond toujours
          aux coordonnées du riad, donc le repère reste collé au bon endroit. */}
      <iframe
        title={title}
        src={mapEmbedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="pointer-events-none h-full w-full"
        tabIndex={-1}
      />
      {/* Repère ancré exactement au centre de la carte : la pointe du marqueur
          touche le point de localisation. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="whitespace-nowrap rounded-sm bg-cobalt-deep px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-on-dark shadow-warm-lg">
          {RIAD.name}
        </span>
        <svg viewBox="0 0 24 32" className="mt-1 h-8 w-6 text-terracotta drop-shadow" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 0C5.9 0 1 4.9 1 11c0 7.7 9.3 19.4 10.2 20.5.4.5 1.2.5 1.6 0C13.7 30.4 23 18.7 23 11 23 4.9 18.1 0 12 0Z"
          />
          <circle cx="12" cy="11" r="4" fill="var(--on-dark)" />
        </svg>
      </div>

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
