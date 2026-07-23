# Script de construction — Site Brice Poitau Conseils

À coller tel quel dans Claude Code comme prompt de départ. Ce document sert de source de vérité unique pour tout le projet : stack, design system, arborescence, contenu page par page, animations, et logique du premier simulateur.

---

## 0. Contexte du projet

Tu vas construire le site vitrine de **Brice Poitau Conseils**, cabinet d'ingénierie patrimoniale indépendant, positionné B2C (particuliers), avec pour signature : **« Structurer votre liberté financière »**.

Le site doit être **premium, immersif, avec du motion design maîtrisé** (pas d'animation gratuite qui nuit à la performance ou à la lisibilité). Le cœur de la conversion : des **simulateurs financiers interactifs** en libre accès, et une prise de rendez-vous fluide.

Une maquette de référence a déjà été validée avec le client. Respecte-la exactement pour la direction artistique (voir section 2).

---

## 1. Stack technique

- **Framework** : Next.js 15 (App Router) + TypeScript
- **Style** : Tailwind CSS
- **Animation** : `motion` (le package s'appelle `motion`, PAS `framer-motion` — il a été renommé en 2025 ; import via `motion/react`)
- **Graphiques des simulateurs** : `recharts`
- **Contenu ressources (articles/guides)** : MDX, fichiers locaux dans `/content/ressources/`, pas de CMS externe pour le moment
- **Prise de RDV** : iframe/lien vers la page de réservation Google Calendar existante du client (URL à insérer en variable d'environnement `NEXT_PUBLIC_GCAL_BOOKING_URL`)
- **Formulaire de contact** : route API Next.js + Resend (plan gratuit, 100 emails/jour) — prévoir un fallback `mailto:` si la clé API n'est pas configurée
- **Analytics** : Google Analytics 4 (id en variable d'environnement `NEXT_PUBLIC_GA_ID`)
- **Hébergement cible** : Vercel (plan Hobby)
- **Polices** : Google Fonts — `Fraunces` (display/serif) et `Inter` (texte courant), chargées via `next/font/google`

Installe uniquement ce qui est nécessaire, pas de dépendances superflues.

---

## 2. Design system (obligatoire, ne pas dévier)

### Couleurs (variables CSS)
```
--cream: #F4EFE3        /* fond principal */
--cream-card: #FBF8F1   /* fond des cartes */
--ink: #16212E          /* bleu marine profond — texte fort, boutons, fond section contrastée */
--ink-soft: #2C3644     /* bleu marine secondaire — nav, liens */
--gold: #A9843F          /* or mat — accents, hover, liens actifs */
--gold-soft: #C9A968     /* or clair — soulignements, détails */
--line: #E3DAC5          /* bordures et séparateurs discrets */
--text: #33312B          /* texte courant */
--text-muted: #75705F    /* texte secondaire */
```

### Typographie
- Titres (`h1`, `h2`, `h3`) : `Fraunces`, graisses 300/450/600, tracking légèrement négatif sur les gros titres
- Corps de texte : `Inter`, 400/500/600
- Eyebrows (labels au-dessus des titres) : `Inter` 12px, majuscules, `letter-spacing: .14em`, couleur `--gold`

### Signature visuelle
Un motif de **fond façon "plan d'ingénieur"** (grille de lignes fines `--line` sur `--cream`, masquée en dégradé radial) apparaît en arrière-plan du hero uniquement. C'est l'élément signature du site — clin d'œil au positionnement "ingénieur patrimonial". Ne pas le réutiliser ailleurs pour ne pas le diluer.

### Layout & composants types
- Header fixe, fond crème translucide + `backdrop-blur`, bordure basse fine, logo serif + nav + bouton "Prendre RDV" en pilule bleu marine
- Cartes (simulateurs, contenus) : coins arrondis 18px, fond `--cream-card`, bordure `--line`, liseré doré en haut qui apparaît au hover, `translateY(-6px)` + ombre douce au hover
- Boutons primaires : pilule bleu marine → devient doré au hover, `translateY(-2px)`
- Sections alternant fond crème et un bloc plein bleu marine (section Ressources) pour ponctuer la lecture

### Animations (motion)
- Hero : apparition séquencée du eyebrow → titre → paragraphe → CTA, léger `translateY` + fade, décalage de ~150-200ms entre chaque élément
- Ligne dorée qui se dessine sous le hero après l'apparition du texte
- Scroll reveal : chaque section/carte apparaît en fade + translateY(28px)→0 via `IntersectionObserver` (respecter `prefers-reduced-motion`: désactiver ou réduire les transitions si l'utilisateur l'a demandé)
- Micro-interactions : hover cartes, hover liens (soulignement qui se dessine), hover boutons
- Pas de scroll-jacking, pas de parallax lourd, pas d'animation qui bloque le rendu initial (LCP < 2.5s)

**Référence exacte** : reproduis fidèlement la maquette HTML déjà validée (fournie séparément) pour le hero et la grille de simulateurs — mêmes proportions, mêmes timings d'animation, même palette.

---

## 3. Arborescence du projet

```
/app
  /layout.tsx                 → polices, meta globales, header/footer
  /page.tsx                   → Accueil
  /simulateurs
    /page.tsx                 → Grille des simulateurs
    /assurance-vie/page.tsx   → Simulateur Assurance Vie (seul actif au lancement)
  /ressources
    /page.tsx                 → Page Ressources (partenaires, habilitations, diplômes)
  /a-propos/page.tsx
  /rdv/page.tsx                → Prise de RDV (Google Calendar embed + contact)
  /mentions-legales/page.tsx
  /politique-confidentialite/page.tsx
  /api/contact/route.ts        → route d'envoi du formulaire de contact
/components
  /layout/Header.tsx
  /layout/Footer.tsx
  /ui/Button.tsx
  /ui/Card.tsx
  /ui/RevealOnScroll.tsx       → wrapper motion générique pour le scroll reveal
  /simulateurs/SimulatorCard.tsx
  /simulateurs/assurance-vie/AssuranceVieForm.tsx
  /simulateurs/assurance-vie/AssuranceVieChart.tsx
/content
  /ressources/                 → fichiers MDX (vide pour le moment, structure prête)
/lib
  /simulateurs/assuranceVie.ts → logique de calcul pure (testable, sans JSX)
/public
  /fonts, /images
```

---

## 4. Contenu page par page

### 4.1 Accueil (`/`)
- Header fixe
- **Hero** : eyebrow "Ingénieur patrimonial" · titre "Structurer *votre* liberté financière" (le mot "votre" en italique doré) · paragraphe de positionnement · deux CTA : "Prendre rendez-vous" (primaire) et "Découvrir les simulateurs" (lien souligné)
- **Section simulateurs (aperçu)** : 3 cartes mises en avant (dont Assurance Vie active), lien "Voir tous les simulateurs →" vers `/simulateurs`
- **Section réassurance** : bandeau discret avec habilitations/certifications (ex. "Conseiller en Investissements Financiers (CIF)", "Immatriculé ORIAS n°XXXXXXX" — à compléter par le client) + logos partenaires si disponibles
- **Section ressources (teaser)** : bloc bleu marine reprenant la maquette validée, avec uniquement "Nos partenaires & habilitations" et "Diplômes & certifications" pour le moment (les articles éducatifs viendront s'ajouter plus tard, prévoir la structure en liste extensible)
- **CTA final** : "Un premier échange, sans engagement, pour clarifier votre situation patrimoniale." + bouton RDV
- Footer

### 4.2 Simulateurs (`/simulateurs`)
- Grille des 6 simulateurs identifiés (reprendre exactement les intitulés et descriptions de la maquette) :
  1. **Assurance Vie** — actif, lien vers `/simulateurs/assurance-vie` (logique native, voir section 5)
  2. **SCPI** — actif *(en attente du contenu exact de l'outil externe `simulateur-av-scpi`, voir note ci-dessous)*
  3. PER — "En préparation"
  4. **Comparateur de contrats** — actif, intégration de l'outil externe `simulateur-assurance-vie` (voir section 5 bis)
  5. **Acheter ou louer** — actif, intégration de l'outil externe existant (voir section 5 bis)
  6. **Une pierre deux coups** (SCPI à crédit) — actif, intégration du fichier HTML fourni par le client (voir section 5 bis)
- Les simulateurs "en préparation" affichent un badge désactivé, non cliquable
- **Note bloquante** : l'outil `https://incoval.github.io/simulateur-av-scpi/` doit être scindé en deux — la partie Assurance Vie (à comparer/fusionner avec le simulateur natif de la section 5) et la partie SCPI (pour remplir la case 2). Le contenu exact de cet outil n'a pas encore pu être inspecté (appli JavaScript non accessible en lecture directe) — **ne pas développer cette partie tant que le client n'a pas fourni une capture ou le code source de cet outil.**

### 4.3 Simulateur Assurance Vie (`/simulateurs/assurance-vie`)
Voir section 5 pour la logique complète.

### 4.4 Ressources (`/ressources`)
- Deux blocs actifs uniquement pour le lancement :
  - **Nos partenaires & habilitations** : liste de logos/textes des partenaires (assureurs, sociétés de gestion, SCPI...) — prévoir un tableau de données facilement éditable (`/content/partenaires.ts`), même vide au départ
  - **Diplômes & certifications** : liste des diplômes/certifications du client (ex. Master, CIF, ORIAS...) — même logique, fichier `/content/diplomes.ts`
- Prévoir une zone "Articles & guides" en dessous, structurée mais vide (message "À venir prochainement" si aucun article MDX n'existe), pour accueillir le contenu éducatif gratuit plus tard sans refonte

### 4.5 À propos (`/a-propos`)
- Parcours du conseiller, philosophie de conseil, photo
- Contenu à fournir par le client — prévoir la structure avec du texte de remplissage clairement identifié `[À COMPLÉTER PAR LE CLIENT]`

### 4.6 Prendre RDV (`/rdv`)
- Titre + courte accroche
- Embed de la page de réservation Google Calendar (iframe responsive) — URL depuis `NEXT_PUBLIC_GCAL_BOOKING_URL`
- Bloc contact direct : email et téléphone (variables d'environnement `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`)
- Formulaire de contact simple (nom, email, message) en alternative au RDV direct

### 4.7 Mentions légales / Politique de confidentialité
- Gabarits standards pour un CGP indépendant, avec tous les champs (SIREN, n° ORIAS, RCP, hébergeur) en `[À COMPLÉTER]`

---

## 5. Simulateur Assurance Vie — logique de calcul

### Entrées utilisateur
- Capital initial (€) — défaut 5 000
- Versement mensuel (€) — défaut 200
- Durée (années) — slider 1 à 40, défaut 15
- Taux de rendement annuel estimé (%) — 3 préréglages cliquables (Prudent 2%, Équilibré 4%, Dynamique 6%) + saisie libre
- Frais de gestion annuels du contrat (%) — défaut 0,6%

### Calcul (dans `/lib/simulateurs/assuranceVie.ts`, fonction pure, testable)
Taux net mensuel : `r_mensuel = (tauxAnnuel - fraisGestion) / 12`

Pour chaque mois `m` de 1 à `duree*12` :
```
capital[m] = capital[m-1] * (1 + r_mensuel) + versementMensuel
```
avec `capital[0] = capitalInitial`.

Résultats à afficher :
- **Capital final estimé** (gros chiffre serif)
- **Total versé** (capital initial + somme des versements)
- **Gains générés** (capital final − total versé)
- **Graphique** (recharts, `AreaChart`) montrant l'évolution du capital dans le temps, avec deux séries superposées : "Total versé" (ligne pointillée) et "Capital total" (aire pleine, couleur `--gold`)

### Avertissement obligatoire (pied du simulateur)
Afficher en petit texte : *"Simulation à titre pédagogique, hors fiscalité et hors aléas de marché. Les performances passées ne préjugent pas des performances futures. Ne constitue pas un conseil en investissement personnalisé."*

---

## 5 bis. Intégration des simulateurs déjà développés

Trois outils existent déjà en dehors du projet Next.js et doivent être intégrés :

1. **Comparateur de contrats** — appli déployée sur `https://incoval.github.io/simulateur-assurance-vie/`
2. **Acheter ou louer** — appli déployée sur `https://incoval.github.io/achat-ou-location-simulation/`
3. **Une pierre deux coups** — fichier HTML autonome fourni par le client (`Strate_gie_une_pierre_deux_coups.html`, vanilla JS + Chart.js CDN, sliders + tableau + graphique)

Deux niveaux d'intégration possibles — **retenir le niveau 1 pour le lancement**, et prévoir le niveau 2 comme amélioration continue une fois le site en ligne :

### Niveau 1 — Embed rapide (recommandé pour le lancement)
- Créer une page dédiée pour chaque outil : `/simulateurs/comparateur-contrats`, `/simulateurs/acheter-louer`, `/simulateurs/une-pierre-deux-coups`
- Chaque page reprend le header/footer et l'habillage du site (titre, eyebrow, texte d'intro, avertissement légal — cf. section 5) puis embarque l'outil dans un `<iframe>` responsive (hauteur adaptable, `width: 100%`, pas de bordure, coins arrondis pour rester cohérent visuellement)
- **Comparateur de contrats** et **Acheter ou louer** : iframe pointant directement vers les URLs GitHub Pages existantes
- **Une pierre deux coups** : copier le fichier HTML fourni tel quel dans `/public/simulateurs/une-pierre-deux-coups.html` (fichier statique servi par Next.js) puis l'embarquer en iframe interne (`src="/simulateurs/une-pierre-deux-coups.html"`) — pas de modification du fichier pour ne pas casser sa logique JS
- Limite connue de ce niveau : l'habillage visuel interne de chaque outil (polices, couleurs) reste celui de l'outil d'origine, pas celui du design system du site (cream/ink/gold). C'est un compromis assumé pour aller vite.

### Niveau 2 — Portage natif (roadmap post-lancement)
- Réécrire la logique de calcul de chaque outil en TypeScript pur dans `/lib/simulateurs/` (ex. `comparateurContrats.ts`, `acheterLouer.ts`, `unePierreDeuxCoups.ts`), en s'inspirant fidèlement des formules déjà présentes dans le code source de chaque outil
- Reconstruire l'interface avec les composants du design system (`Card`, sliders stylés aux couleurs `--ink`/`--gold`, graphiques en `recharts` au lieu de Chart.js) pour une expérience 100% cohérente avec le reste du site
- À faire un outil à la fois, sans urgence — le niveau 1 reste fonctionnel en attendant

---

## 6. Exigences transverses

- **Responsive** : mobile-first, la nav se transforme en menu burger sous 900px (reprendre le comportement de la maquette)
- **Accessibilité** : contrastes AA minimum, focus visible au clavier sur tous les éléments interactifs, `prefers-reduced-motion` respecté partout
- **SEO** : métadonnées par page (title, description), `sitemap.xml`, `robots.txt`, données structurées `Organization`/`FinancialService` en JSON-LD sur l'accueil
- **Performance** : images en `next/image`, polices en `next/font` (pas de FOUC), Lighthouse Performance ≥ 90 visé
- **Variables d'environnement à prévoir** (`.env.example`) : `NEXT_PUBLIC_GCAL_BOOKING_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`

---

## 7. Ordre de construction recommandé

1. Setup projet (Next.js + Tailwind + polices + variables CSS du design system)
2. Layout global (Header, Footer, RevealOnScroll)
3. Page Accueil complète avec animations
4. Page Simulateurs (grille) + page détail Assurance Vie (formulaire + calcul + graphique)
5. Page Ressources (partenaires + diplômes, structure extensible pour articles futurs)
6. Page À propos + Page RDV (embed Google Calendar + formulaire contact + route API)
7. Mentions légales / confidentialité
8. Passes de finition : responsive, accessibilité, SEO, performance

---

## 8. Ce qui reste à fournir par le client (à ne pas inventer)

- Contenu réel de la page À propos (parcours, photo)
- Logos et noms des partenaires
- Liste précise des diplômes/certifications + n° ORIAS, SIREN, assureur RCP (pour mentions légales)
- Coordonnées de contact définitives
- URL de réservation Google Calendar
- Logique de calcul détaillée du simulateur PER et du simulateur SCPI (encore "en préparation")
- Confirmation du statut du simulateur "AV/SCPI" (`simulateur-av-scpi`) : 7ᵉ outil à ajouter à la grille, ou variante d'un outil existant ?
- Décision sur le passage au niveau 2 (portage natif) des 3 outils intégrés en iframe, une fois le lancement passé

Pour tout champ non fourni, utiliser un texte de type `[À COMPLÉTER PAR LE CLIENT]` visible en front, jamais de fausses données inventées (faux numéros ORIAS, faux partenaires, etc.).
