/**
 * Icônes marocaines dessinées à la main (traits fins, 1px) :
 * lanterne, théière, moucharabieh, palmier, étoile à huit branches, vasque de hammam.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function LanternIcon({ className = "", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M16 2.5v2.4" />
      <path d="M11 6.4h10" />
      <path d="M12 6.4c-1.6 2-2.6 4.3-2.6 7 0 4 2.9 7.3 6.6 7.3s6.6-3.3 6.6-7.3c0-2.7-1-5-2.6-7" />
      <path d="M16 9.6c-1.7 1-2.7 2.3-2.7 3.9s1.2 3 2.7 3 2.7-1.4 2.7-3-1-2.9-2.7-3.9z" />
      <path d="M11.6 20.7h8.8" />
      <path d="M13.6 20.7l1 3.6h2.8l1-3.6" />
      <path d="M16 24.3v3.2M14 29.5h4" />
    </svg>
  );
}

export function TeapotIcon({ className = "", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M9 13.5h13.5c1.4 2 2.1 4.2 2.1 6.4 0 3.1-3.4 5.6-8.8 5.6s-8.8-2.5-8.8-5.6c0-2.2.7-4.4 2-6.4z" />
      <path d="M11.6 13.5c1-1.2 2.6-2 4.4-2s3.4.8 4.4 2" />
      <path d="M15.9 8.2v3.3M14.2 8.2h3.4" />
      <path d="M22.5 14.4l4.6-3.6" />
      <path d="M6.9 16.6c-1.8.5-2.8 1.7-2.8 3.1 0 1.5 1.1 2.6 2.9 3" />
      <path d="M12.4 28h7.2" />
    </svg>
  );
}

export function MoucharabiehIcon({ className = "", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <rect x="4.5" y="4.5" width="23" height="23" rx="1" />
      <path d="M16 4.5 27.5 16 16 27.5 4.5 16z" />
      <path d="M16 10.4 21.6 16 16 21.6 10.4 16z" />
      <path d="M4.5 16h23M16 4.5v23" />
    </svg>
  );
}

export function PalmIcon({ className = "", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M15.4 29V13.6" />
      <path d="M15.4 13.6c-2.4-3.4-5.6-4.8-9.4-4.3 2.4-2.7 5.9-3 9.4-.6" />
      <path d="M15.4 13.6c2.4-3.4 5.6-4.8 9.4-4.3-2.4-2.7-5.9-3-9.4-.6" />
      <path d="M15.4 12c-.8-3.6-.1-6.6 2.4-9-3.2.5-5 2.7-5.6 6" />
      <path d="M12 29c1-2.6 5.8-2.6 6.8 0" />
    </svg>
  );
}

export function StarEightIcon({ className = "", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M16 2.5 20 9.4 27.4 8 26 15.4 32 16l-6 .6 1.4 7.4-7.4-1.4L16 29.5 12 22.6 4.6 24 6 16.6 0 16l6-.6L4.6 8 12 9.4z" />
      <circle cx="16" cy="16" r="3.6" />
    </svg>
  );
}

export function HammamIcon({ className = "", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M5 16.5h22c0 5.4-4.9 9.6-11 9.6S5 21.9 5 16.5z" />
      <path d="M9.8 29h12.4" />
      <path d="M12.4 12.6c1.6-1.1 1.8-2.6.6-4.4 2.3.8 3 2.6 2 4.4" />
      <path d="M19 12.2c1.4-1.4 1.4-2.9 0-4.6 2.4 1.1 3 3 1.6 4.6" />
    </svg>
  );
}

export function ArchIcon({ className = "", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M8 29V15.5C8 10.8 11.6 7 16 7s8 3.8 8 8.5V29" />
      <path d="M11.4 29V15.8c0-3 2-5.4 4.6-5.4s4.6 2.4 4.6 5.4V29" />
      <path d="M4.5 29h23" />
    </svg>
  );
}

export const AMENITY_ICON_SET = [
  HammamIcon,
  LanternIcon,
  TeapotIcon,
  PalmIcon,
  MoucharabiehIcon,
  ArchIcon,
] as const;
