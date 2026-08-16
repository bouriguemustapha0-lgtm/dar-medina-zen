# Dar Medina Gold

Tu es un développeur front-end senior UI/UX, spécialisé en sites vitrines pour l'hôtellerie de luxe (riads et maisons d'hôtes haut de gamme au Maroc), avec une expertise en SEO technique et en GEO (Generative Engine Optimization — optimisation pour que le contenu soit repris par ChatGPT, Perplexity, Google AI Overviews, Gemini).

CONTEXTE DU PROJET

Construis un site vitrine front-end uniquement (pas de back-end, pas de base de données — formulaires en mailto: ou intégration future avec un service tiers type Formspree, avec redirection WhatsApp par défaut) pour un riad de luxe à Marrakech.

Type d'établissement : Hôtel Riad — maison traditionnelle marocaine avec patio, dans la médina de Marrakech.

⚠️ Ne mélange pas les types : tout le vocabulaire, les visuels et les arguments de vente doivent correspondre à un riad — intimité, architecture traditionnelle, patio, artisanat marocain — et non à un hôtel de chaîne, un appart-hôtel ou une villa.

DIRECTION ARTISTIQUE — NOIR & OR

L'identité visuelle du site repose entièrement sur une palette noir et or, dans un esprit hôtellerie de luxe :

Fond principal noir profond (#0B0B0B à #111111) ou blanc cassé/ivoire (#F5F1E8) en alternance selon les sections, jamais de blanc pur agressif.

Or comme couleur d'accent unique (#C6A15B à #D4AF37), utilisé avec parcimonie pour les titres, filets, icônes, bordures fines et le bouton CTA — jamais en aplat massif.

Typographie : une serif élégante (type Playfair Display, Cormorant, ou équivalent) pour les titres, associée à une sans-serif discrète et très lisible (type Inter, Montserrat Light) pour le corps de texte.

Beaucoup d'espace blanc/noir négatif, mise en page aérée, grilles asymétriques inspirées des zelliges et moucharabiehs (sans surcharge graphique).

Filets fins dorés, séparateurs géométriques inspirés des motifs marocains (étoiles à 8 branches, zelliges) utilisés en éléments décoratifs SVG légers, pas en images lourdes.

Animations discrètes au scroll (fade-in, léger parallax sur le hero), jamais tape-à-l'œil.

Boutons CTA : contour ou fond doré fin, texte en majuscules avec letter-spacing, effet hover subtil (inversion des couleurs ou léger glow doré).

INFORMATIONS DE L'ÉTABLISSEMENT

Nom de l'établissement : Riad Dar Medina Land

Ville / quartier : Médina de Marrakech, Maroc — 72 Issebtienne, Rue Derb Jdid, Médina, 40000 Marrakech

Nombre de chambres : 11 chambres, certaines avec vue sur les montagnes

Équipements clés : centre de bien-être / spa sur place, salles de bains avec baignoire spa et toilette séparée (selon les chambres), sèche-cheveux, draps de bain fournis, petit-déjeuner continental (crêpes, fruits frais, fromage)

Localisation & distances (à utiliser telles quelles pour le SEO/GEO) :

Moins de 2 km des Tombeaux Saadiens

Environ 25 minutes à pied du Jardin Majorelle

À proximité du Palais Bahia

650 m de la Maison de la Photographie de Marrakech

Courte distance de la Médersa Ben Youssef

3 km du Théâtre Royal de Marrakech

200 m du Café Snack Chinguitti

Environ 10 minutes à pied de l'arrêt de bus Loada Saidia

Positionnement : authentique et raffiné, expérience intimiste dans une médina historique, luxe discret et chaleureux (pas ostentatoire)

Langues cibles : français (langue principale du site), anglais (traduction complète), arabe en option

Ton de marque : luxueux, feutré, authentique — vocabulaire évocateur mais toujours appuyé sur des faits concrets (distances, matériaux, services)

STACK TECHNIQUE

HTML5 sémantique + Tailwind CSS (avec palette noir/or personnalisée dans la config) + JavaScript vanilla

Mobile-first, responsive, Core Web Vitals optimisés (LCP < 2.5s, CLS < 0.1)

Images en loading="lazy" sauf le hero, formats WebP recommandés

Structure claire : index.html, styles.css (ou config Tailwind), script.js

STRUCTURE DES PAGES / SECTIONS

Hero — accroche évocatrice sur fond noir, photo forte du patio ou de la façade du riad, CTA réservation doré bien visible

Présentation — histoire du riad, quartier de la Médina, ce qui différencie Dar Medina Land (architecture, intimité, emplacement)

Chambres — fiche par type de chambre (photos, vue montagne ou non, équipements de la salle de bain, tarif indicatif)

Équipements & Services — centre de bien-être, petit-déjeuner continental, wifi, etc., présentés avec icônes fines dorées

Galerie photo — patio, chambres, détails architecturaux (zelliges, moucharabiehs)

Localisation — quartier, carte, toutes les distances listées ci-dessus présentées en liste ou tableau

Avis clients — témoignages structurés, exploitables en rich snippets

FAQ — 6 à 10 questions réelles (annulation, arrivée/départ, animaux, transferts aéroport, paiement, hammam)

Contact / Réservation — formulaire + téléphone + WhatsApp

Footer — mentions légales, réseaux sociaux, adresse complète (NAP)

EXIGENCES SEO (techniques, non optionnelles)

Balises <title> et <meta description> uniques par section, incluant "Riad", "Marrakech", "Médina" et un élément différenciant

Hiérarchie de titres logique : un seul <h1>, <h2> par section, pas de saut de niveau

Attributs alt descriptifs sur toutes les images (décrire la scène réelle, jamais générique)

Données structurées Schema.org JSON-LD : Hotel ou LodgingBusiness avec address, geo, amenityFeature, priceRange, aggregateRating ; FAQPage pour la FAQ ; BreadcrumbList si multi-pages

sitemap.xml et robots.txt de base

URLs propres si multi-pages (/chambres, /localisation, etc.)

Balises hreflang (fr/en)

CSS/JS minifiés en prod

Balises Open Graph + Twitter Card avec visuel noir/or pour un partage social cohérent

EXIGENCES GEO (pour être cité par les IA génératives)

Contenu en phrases déclaratives auto-suffisantes, extractibles hors contexte (ex. : "Riad Dar Medina Land se trouve à moins de 2 km des Tombeaux Saadiens et à environ 25 minutes à pied du Jardin Majorelle.")

Répondre directement aux questions dans le corps du texte, pas seulement en FAQ

Données concrètes et vérifiables partout : 11 chambres, distances en mètres/minutes, adresse complète

Informations structurées en listes et tableaux (équipements, distances, tarifs)

Éviter le jargon marketing vague sans fait à l'appui — remplacer "une expérience inoubliable" par une description sensorielle précise appuyée sur un détail réel (ex. matériaux, artisanat, silence du patio)

Fichier llms.txt à la racine résumant l'établissement (nom, type, ville, équipements, politique de réservation)

Cohérence stricte du NAP (Nom, Adresse, Téléphone) sur tout le site

LIVRABLES ATTENDUS

Code front-end complet et fonctionnel (HTML/CSS/JS) avec la charte noir & or appliquée intégralement

sitemap.xml, robots.txt, llms.txt

JSON-LD intégré et valide

Contenu rédactionnel réel en français (et en anglais), aucun lorem ipsum, s'appuyant sur les informations réelles ci-dessus

Court résumé final : mots-clés ciblés + recommandations SEO/GEO restantes (backlinks, Google Business Profile, collecte d'avis)

CONTRAINTE FINALE

Aucune fonctionnalité back-end réelle (pas de base de données, pas de paiement). Le formulaire de réservation doit être fonctionnel visuellement mais redirige vers WhatsApp par défaut, sauf indication contraire d'un service tiers.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dar-medina-zen.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/884efa8d-0578-4c42-8b03-87fdbd85f7fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
