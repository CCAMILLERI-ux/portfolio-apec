# Portfolio de prototypes — Exploration UX, acquisition & conversion

**Exploration UX, acquisition & conversion — Caroline Camilleri**

> Prototype de candidature indépendant — propositions exploratoires, sans affiliation officielle à l’Apec. Aucune inscription réelle.

Portfolio de candidature au poste de Chef de projet animation web. Un seul site présente trois démonstrations courtes :

| Cas | Démo | Compétences illustrées |
| --- | --- | --- |
| 1 | **Rendre les services plus faciles à choisir** : entrée par situation, cartes de services, bascule « Existant observé / Piste exploratoire » | UX/UI, animation du site, hypothèse CRO |
| 2 | **Guider un nouvel inscrit** : accueil guidé d’« Alex » (personnage fictif), recommandations explicables, réservation simulée, « Mes prochaines étapes » | Parcours, activation, recommandation déterministe |
| 3 | **Relier une recherche à un accompagnement** : page conseil « Comment préparer un entretien de recrutement ? », maillage interne, compléments SEO, GEO et coordination multicanale | SEO éditorial, maillage, acquisition |

## Organisation de l’interface

- **Portfolio** (accueil, sources) : identité propre à la candidate (fond crème, DM Serif Display + Inter, accent terracotta), volontairement distincte de l’univers Apec.
- **Prototypes** : univers inspiré d’apec.fr (bleu nuit, jaune, bleu ; Montserrat), **sans aucune explication dans les écrans utilisateur**.
- **Coulisses du prototype** : sous le pied de page de chaque prototype, dans l’univers portfolio. Elles regroupent la mention d’indépendance, le retour au portfolio, la réinitialisation, la méthode (constat, hypothèse, modification, KPI et garde-fous, équipes), la provenance des informations et le journal local.
- **Barre fixe du prototype** (univers portfolio) : rappel « Prototype · sans affiliation Apec », accès aux coulisses et au portfolio. Au cas 1, elle porte la bascule « Existant observé / Piste exploratoire ». Pendant et après une réservation, elle affiche « Réservation simulée… » puis « Simulation terminée — aucun rendez-vous réel n’a été réservé ».

## Installation et lancement

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

`npm run build` produit un dossier `dist/` statique. Le routage par hash (`#/cas-1`) et la base relative (`base: './'`) permettent d’ouvrir le site sur n’importe quel hébergement statique, y compris dans un sous-dossier, sans règle de réécriture. Aucun déploiement n’a été effectué.

## Publication sur GitHub Pages

Le fichier `.github/workflows/deploy-pages.yml` construit et publie le site à chaque push sur `main`. On peut aussi le lancer à la main depuis l’onglet **Actions** → « Publier sur GitHub Pages » → **Run workflow**.

Une seule fois, dans le dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**. Sur un compte gratuit, le dépôt doit être public.

Adresse : `https://ccamilleri-ux.github.io/portfolio-apec/`

Le `noindex` est porté par la balise meta de chaque page. Le `robots.txt` du dossier n’a pas d’effet sous un sous-chemin `github.io` : c’est la balise meta qui empêche l’indexation.

## Parcours de démo en cinq minutes

1. **Accueil** : trois cartes, un clic par cas.
2. **Cas 2 (≈ 2 min)** : « Me guider » → la situation est présélectionnée (modifiable) → cocher « Préparer un entretien », puis « Oui, dans les prochains jours » → les recommandations changent et s’expliquent (« Pourquoi ce service ? ») → « Commencer par ce service » → choisir un créneau fictif → récapitulatif → valider → « Simulation terminée — aucun rendez-vous réel n’a été réservé » → « Mes prochaines étapes » (retirer, modifier ses besoins, reprendre, remettre à zéro).
3. **Cas 1 (≈ 1 min 30)** : changer de situation (« Je recrute et j’ai besoin d’aide ») puis utiliser la bascule « Existant observé » de la barre du bas.
4. **Cas 3 (≈ 1 min 30)** : lire l’introduction, suivre « simulation individuelle d’1 h » puis revenir avec la flèche du bandeau ; bouton « Coulisses » de la barre pour le maillage, l’aperçu du titre, le GEO et la coordination.

La barre et les coulisses proposent « Portfolio » et « Réinitialiser la démo » ; chaque fiche a une flèche de retour contextuelle (le lien d’origine est transmis par `?from=`).

## Choix techniques

- React + TypeScript + Vite, CSS simple (`src/styles.css`), sans backend, sans API ni clé.
- Contenus dans des fichiers de données typés : `src/data/services.ts`, `situations.ts`, `onboarding.ts` (règles de recommandation) et `slots.ts` (créneaux fictifs).
- Recommandation **déterministe** : chaque règle ajoute des points et une raison affichée ; départage dans un ordre fixe ; l’âge n’est ni demandé ni utilisé.
- Sauvegarde locale de démonstration (`localStorage`, préfixe `portfolio-demo:`), protégée par try/catch et effacée par « Réinitialiser la démo ».
- Plan d’événements **local** (`service_view`, `service_cta_click`, `onboarding_start`, `onboarding_step_complete`, `recommendation_view`, `booking_start`, `booking_complete_demo`), visible dans le « Journal local » de chaque panneau. Aucun analytics ni traceur externe. Ce ne sont pas des résultats d’expérimentation.
- `noindex, nofollow` sur toutes les pages (balise meta) et `robots.txt` en `Disallow: /`. Les métadonnées de partage identifient un portfolio indépendant.

## Provenance des contenus et des assets

- **Captures d’écran d’apec.fr** : références visuelles uniquement. Elles ne sont **ni versionnées ni servies**, car elles contiennent des données personnelles. Aucun nom, compte, statistique ou témoignage visible sur ces captures n’est repris.
- **Intitulés et modalités** : chaque information porte une provenance dans `services.ts` (`capture` ou `a-verifier`).
  - Observés sur les captures : « Réussir vos entretiens de recrutement », « Entretien programmé : entrainez vous avec un consultant ! » (individuel, face à face, 1 h, gratuit, cadres et jeunes diplômés), « Simulateur d’entretien », « Réussir sa candidature », « Faire de l’IA générative l’alliée de votre recherche emploi » (en groupe, en salle, 4 h, gratuit, cadres et jeunes diplômés), « Créer mon CV ».
  - **À vérifier** : tous les services des situations P2 à P6 (premier emploi, CEP, évolution interne, formation, reconversion, services recruteurs), ainsi que les durées, tarifs et publics non visibles. Ils sont affichés avec un badge « à vérifier » et des fiches d’aperçu qui renvoient vers le site officiel. La présélection est présentée comme soumise à conditions (TPE/PME notamment), sans reproduire de critères.
- **Textes** : accroches, bénéfices, page conseil et repères rémunération sont des rédactions originales. Seuls les intitulés et descriptions courtes observés sont cités.
- **Visuels** : illustrations et pictogrammes SVG dessinés pour le prototype. Aucune photographie, aucun portrait, aucun logo de l’Apec, aucun témoignage.
- **Polices** (SIL Open Font License, servies localement) : Montserrat pour les prototypes, substitution provisoire car la police exacte d’apec.fr n’est pas confirmée ; DM Serif Display et Inter pour le portfolio.

## Design : ce qui est estimé, ce qui est contrôlé

- **Estimé d’après les captures** : palette (`--brand-navy #252555`, `--brand-yellow #FFC400`, `--brand-blue #006699`, etc.), typographie, bandeau bleu nuit avec flèche de retour jaune, carte blanche qui chevauche le bandeau, colonne latérale « Nos services » (carte bleue) / « Nos outils » (carte bleu nuit, pictogramme jaune), bloc modalités 2×2, puces « + » jaunes, bandeau bleu d’appel à l’action, visuels sur aplat jaune avec étiquette carrée (motif « Repères »). Le CSS public d’apec.fr n’a **pas** pu être consulté.
- **Éléments graphiques proposés à partir de ce langage** : visuels de services en aplats jaune / bleu / bleu nuit selon le type d’aide, étiquette carrée « Atelier / Rendez-vous / Outil », tuiles de situation sur bandeau bleu nuit (jaune quand sélectionnée), tuiles d’accompagnement colorées, pastilles de modalités.
- **Modalités** : seules celles lisibles sur les captures sont affichées à l’utilisateur ; les autres sont listées « à vérifier » dans les coulisses.
- **Proposé (non observé)** : états survol, focus, sélection, désactivé et erreur, badges, étapes de progression, récapitulatif. Le mini-kit est visible sur la page « Sources et limites ».
- **Contrôlé** : ratios de contraste calculés (formule WCAG) : bleu nuit sur jaune 8,9:1, bleu nuit sur blanc 14,2:1, blanc sur bleu 6,3:1. Le gris secondaire est foncé à `#5F6673`, car `#6B7280` ne donne que 4,45:1 sur `#F5F5FA`.

## Tests exécutés

- `npm ci` et `npm run build` (TypeScript + Vite) : OK. `npx oxlint src` : seuls restent des avertissements « fast refresh » sans effet sur le build.
- Contrôle automatique : aucun mot d’explication (« simulée », « fictif », « prototype », « démo », « à vérifier », « hypothèse », « persona »…) dans le contenu principal des 10 écrans de prototype ; coulisses et barre présentes sur chacun.
- Script Playwright de bout en bout (hors dépôt), sur le build de prévisualisation, à 1280 px, 640 px et 375 px :
  - les trois cas sont accessibles depuis l’accueil ;
  - le parcours du cas 2 est complet : erreurs de validation, recommandations différentes selon les réponses, mention de simulation avant et après validation, persistance après rechargement, retrait d’une recommandation, remise à zéro ;
  - au cas 1 : changement de situation et même périmètre de services entre « existant » et « piste » ;
  - au cas 3 : chaque lien du maillage mène à la bonne page, avec retour possible ; le sommaire fait défiler ;
  - les 32 liens internes ont été parcourus, sans lien mort ; les liens externes pointent uniquement vers apec.fr ;
  - aucune erreur ni avertissement console, aucune requête en échec, aucune balise `<img>` ;
  - aucun débordement horizontal à 375 px et 640 px ;
  - navigation clavier : bouton atteint, focus visible, radios aux flèches.
- Revue visuelle des captures desktop et mobile.

## Limites et points à vérifier

- Le site www.apec.fr n’était pas joignable depuis l’environnement de développement : les intitulés et modalités marqués « à vérifier » restent à contrôler, de même que les valeurs CSS et la police.
- Aucun audit d’accessibilité complet (lecteur d’écran, RGAA) : seuls des contrôles de base ont été faits. Aucune conformité n’est revendiquée.
- Les requêtes SEO sont des hypothèses sans volume ; l’aperçu du titre est pédagogique.
- La bascule de comparaison n’est pas un test A/B. Un vrai test demande une répartition aléatoire stable, un public défini, une instrumentation, un échantillon et une durée adaptés, à fixer avec le webanalyste.
- Le prototype n’est relié à aucun outil (AB Tasty, Piano, Google Analytics, Jahia…) : il illustre une méthode.
