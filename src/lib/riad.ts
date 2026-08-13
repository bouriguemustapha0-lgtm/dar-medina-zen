/** Données factuelles de l'établissement — source unique pour le NAP, le SEO et le JSON-LD. */

export const RIAD = {
  name: "Riad Dar Medina Land",
  legalType: "Riad — maison d'hôtes de luxe",
  street: "72 Issebtienne, Rue Derb Jdid, Médina",
  city: "Marrakech",
  postalCode: "40000",
  country: "MA",
  countryName: "Maroc",
  phone: "+212639675900",
  phoneDisplay: "+212 639 675 900",
  phoneLocal: "0639675900",
  whatsapp: "212639675900",
  email: "riaddarmedinaland72@gmail.com",
  rooms: 8,
  latitude: 31.6212,
  longitude: -7.9866,
  checkIn: "15:00",
  checkOut: "11:00",
  rating: { value: "4.8", count: 126 },
} as const;

export const fullAddressFr = `${RIAD.street}, ${RIAD.postalCode} ${RIAD.city}, ${RIAD.countryName}`;
export const fullAddressEn = `${RIAD.street}, ${RIAD.postalCode} ${RIAD.city}, Morocco`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${RIAD.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${RIAD.name}, ${RIAD.street}, ${RIAD.city}`);

/** Carte Google : un seul repère nommé « Riad Dar Medina Land ». */
export const mapEmbedSrc = `https://www.google.com/maps?q=${RIAD.latitude},${RIAD.longitude}(${encodeURIComponent(
  RIAD.name,
)})&z=18&hl=fr&output=embed`;

/** Types de chambres proposés à la réservation : simple, double, triple (FR/EN). */
export const ROOM_TYPES = [
  { key: "single", fr: "Chambre simple", en: "Single room" },
  { key: "double", fr: "Chambre double", en: "Double room" },
  { key: "triple", fr: "Chambre triple", en: "Triple room" },
] as const;

/** Distances vérifiables depuis le riad (clé = identifiant, texte traduit dans i18n). */
export const DISTANCE_KEYS = [
  "saadiens",
  "majorelle",
  "bahia",
  "photographie",
  "benyoussef",
  "theatre",
  "chinguitti",
  "bus",
] as const;

export type DistanceKey = (typeof DISTANCE_KEYS)[number];

export const ROOM_KEYS = ["andalouse", "atlas", "zellige", "moucharabieh", "menara"] as const;
export type RoomKey = (typeof ROOM_KEYS)[number];
