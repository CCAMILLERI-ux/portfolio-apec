/**
 * Module « Du besoin au service : une acquisition SEO utile ».
 * Contenus centralisés : proposition de la candidate, à valider avec
 * les équipes et les données de l'Apec. Aucune donnée interne de l'Apec n'est utilisée.
 *
 * Règles :
 * - les requêtes sont des exemples (aucun volume, aucun classement) ;
 * - un service « observé » a un intitulé lisible sur les captures d'apec.fr ;
 *   sinon l'intitulé est générique et signalé « à vérifier » ;
 * - aucune URL officielle, disponibilité ou condition d'éligibilité n'est inventée.
 */

export interface SeoService {
  label: string
  /** true : service existant sur apec.fr ; false : intitulé provisoire. */
  observed: boolean
}

export interface SeoSituation {
  id: string
  persona: string
  short: string
  need: string
  queries: string[]
  intent: string
  content: string
  services: SeoService[]
  conversion: string
  note?: string
  /** Le parcours démonstrateur (bloc 2) part de cette situation. */
  hasJourney?: boolean
}

export const SEO_SITUATIONS: SeoSituation[] = [
  {
    id: 'recherche',
    persona: 'Cadre en recherche d’emploi',
    short: 'Recherche d’emploi',
    need: 'Améliorer ses candidatures et préparer ses entretiens.',
    queries: ['préparer entretien embauche', 'CV cadre expérimenté', 'expliquer une période sans emploi'],
    intent: 'Informationnelle, avec un prolongement pratique : la personne veut une méthode, puis souvent un entraînement.',
    content: 'Guide pratique, exemples de réponses, checklist de préparation.',
    services: [
      { label: 'Entretien programmé : entrainez vous avec un consultant ! (simulation d’entretien)', observed: true },
      { label: 'Réussir vos entretiens de recrutement (atelier)', observed: true },
      { label: 'Réussir sa candidature (rendez-vous candidature)', observed: true },
    ],
    conversion: 'Inscription finalisée ou rendez-vous confirmé ; participation effective à suivre ensuite.',
    hasJourney: true,
  },
  {
    id: 'jeune-diplome',
    persona: 'Jeune diplômé',
    short: 'Premier emploi',
    need: 'Valoriser une première expérience et accéder au premier emploi.',
    queries: ['premier emploi sans expérience', 'préparer premier entretien', 'valoriser stage sur CV'],
    intent: 'Informationnelle : se rassurer et trouver des exemples adaptés au début de carrière.',
    content: 'Conseils et exemples adaptés au début de carrière (stages, alternance, projets).',
    services: [
      { label: 'Fiches métiers', observed: true },
      { label: 'Accompagnement au premier emploi', observed: false },
      { label: 'Atelier candidature pour jeunes diplômés', observed: false },
    ],
    conversion: 'Inscription ou rendez-vous finalisé.',
  },
  {
    id: 'evolution',
    persona: 'Cadre en poste souhaitant évoluer',
    short: 'Évolution',
    need: 'Se situer sur le marché et préparer une évolution.',
    queries: ['négocier son salaire', 'demander une mobilité interne', 'faire le point sur sa carrière'],
    intent: 'Informationnelle et réflexive : comparer, se situer, préparer un échange avec son employeur.',
    content: 'Guide rémunération ou guide évolution professionnelle.',
    services: [
      { label: 'Simulateur de salaire', observed: true },
      { label: 'Conseil en évolution professionnelle (CEP)', observed: true },
    ],
    conversion: 'Simulation terminée ou rendez-vous confirmé.',
  },
  {
    id: 'reconversion',
    persona: 'Cadre en reconversion',
    short: 'Reconversion',
    need: 'Clarifier et structurer un projet professionnel.',
    queries: ['reconversion professionnelle cadre', 'changer de métier à 50 ans', 'identifier ses compétences transférables'],
    intent: 'Exploratoire : comprendre les options et les étapes, souvent sur plusieurs semaines.',
    content: 'Dossier pour explorer les options et les prochaines étapes.',
    services: [
      { label: 'Conseil en évolution professionnelle (CEP)', observed: true },
      { label: 'Fiches métiers', observed: true },
      { label: 'Outils d’orientation', observed: false },
    ],
    conversion: 'Rendez-vous confirmé ou outil terminé.',
    note: 'Une requête peut mentionner un âge : la réponse porte sur le projet, pas sur l’âge. Ce public ne se réduit pas à une tranche d’âge.',
  },
  {
    id: 'tpe-pme',
    persona: 'Dirigeant de TPE/PME recrutant occasionnellement',
    short: 'TPE/PME qui recrute',
    need: 'Réussir un recrutement avec des ressources limitées.',
    queries: ['comment recruter un cadre', 'rédiger une offre attractive', 'salaire pour recruter un commercial'],
    intent: 'Pratique : obtenir une méthode rapide et savoir où se faire aider.',
    content: 'Guide pratique de recrutement (définir le poste, rédiger l’offre, sélectionner).',
    services: [
      { label: 'Dépôt d’offre', observed: true },
      { label: 'Conseil en recrutement', observed: false },
    ],
    conversion: 'Demande d’accompagnement envoyée ou offre effectivement déposée.',
    note: 'Certains services aux entreprises sont soumis à des conditions d’accès, à rappeler dans les contenus.',
  },
  {
    id: 'rh',
    persona: 'Professionnel RH / recruteur régulier',
    short: 'RH / recruteur',
    need: 'Améliorer l’attractivité, le sourcing et l’intégration.',
    queries: ['sourcing cadres', 'attirer candidats pénuriques', 'réussir intégration cadre'],
    intent: 'Expertise : méthodes, données de marché, retours d’expérience.',
    content: 'Méthodes, études et données (contenus d’expertise existants à valoriser).',
    services: [
      { label: 'Candidapec (CVthèque)', observed: true },
      { label: 'Conseil sourcing', observed: false },
      { label: 'Accompagnement au recrutement et à l’intégration', observed: false },
    ],
    conversion: 'Demande d’accompagnement finalisée.',
  },
]

/* ------------------------------ Bloc 2 : parcours ------------------------------ */

export type JourneyServiceKey = 'simulateur' | 'atelier' | 'consultant'

/** Les trois aides proposées dans la page conseil, reliées aux services de données existants. */
export const JOURNEY_OPTIONS: {
  key: JourneyServiceKey
  serviceId: string
  choice: string
  cta: string
  section: string
}[] = [
  { key: 'simulateur', serviceId: 'simulateur-entretien', choice: 'Je souhaite m’entraîner seul', cta: 'Découvrir le simulateur', section: 'S’entraîner à répondre' },
  { key: 'atelier', serviceId: 'atelier-entretiens', choice: 'Je préfère participer à un atelier', cta: 'Voir l’atelier', section: 'Se faire accompagner' },
  { key: 'consultant', serviceId: 'entretien-programme', choice: 'J’ai un entretien prévu et je souhaite un retour personnalisé', cta: 'Préparer mon entretien avec un consultant', section: 'Se faire accompagner' },
]

export const SERP = {
  query: 'Comment préparer un entretien de recrutement ?',
  url: 'site-de-demonstration.example › conseils › entretien',
  title: 'Préparer un entretien de recrutement : méthode et prochaines étapes',
  description:
    'Comprendre le poste, préparer vos exemples, vous entraîner, poser vos questions et aborder la rémunération : une méthode en six étapes et une checklist.',
}

/** Choix fictifs pour la conversion simulée du simulateur (outil, pas de réservation). */
export const SIMULATOR_CHOICES = ['Entretien de motivation', 'Entretien technique', 'Entretien en visioconférence']

/** Logique de maillage : page source → destination, ancre et section. */
export const LINK_LOGIC = [
  { from: 'Page conseil', section: 'S’entraîner à répondre', to: 'Simulateur d’entretien', anchor: 's’entraîner seul avec le simulateur d’entretien' },
  { from: 'Page conseil', section: 'Se faire accompagner', to: 'Atelier entretiens', anchor: 'participer à l’atelier « Réussir vos entretiens de recrutement »' },
  { from: 'Page conseil', section: 'Se faire accompagner', to: 'Rendez-vous consultant', anchor: 'préparer un entretien prévu avec un consultant' },
  { from: 'Page conseil', section: 'Aborder la rémunération', to: 'Ressource rémunération', anchor: 'repères pour préparer votre fourchette' },
  { from: 'Fiches service', section: 'Préparation', to: 'Checklist (page conseil)', anchor: 'utiliser la checklist de préparation' },
]

/* ------------------------------ Bloc 3 : méthode ------------------------------ */

export const ROADMAP = [
  {
    period: 'Jours 1–30',
    title: 'Comprendre et prioriser',
    actions: [
      'Cadrer les services et publics prioritaires.',
      'Vérifier les capacités d’accueil et les conditions d’accès des services.',
      'Définir les conversions (inscription, rendez-vous, outil terminé).',
      'Analyser Search Console et analytics : requêtes hors marque, gabarits, pages en perte.',
      'Auditer la technique : indexation, gabarits title/H1, données structurées, offres expirées.',
      'Recueillir les questions des consultants et des utilisateurs.',
      'Auditer les contenus existants avant d’envisager de nouvelles pages.',
      'Examiner les principaux freins techniques avec les équipes.',
    ],
    deliverables: ['Matrice besoins / intentions / pages / services', 'État initial', 'Backlog priorisé'],
  },
  {
    period: 'Jours 31–60',
    title: 'Mettre en œuvre un pilote',
    actions: [
      'Corriger les pages en 2e page de Google, au plus près du top 10.',
      'Sélectionner une thématique pilote (ex. entretiens de recrutement).',
      'Optimiser un petit ensemble cohérent de pages existantes.',
      'Préparer les briefs éditoriaux.',
      'Faire valider les contenus par les métiers.',
      'Améliorer le maillage et les appels à l’action.',
      'Mettre en place le suivi avec l’analyste.',
      'Lancer un premier A/B test (title, appel à l’action ou module de maillage).',
      'Réaliser la recette fonctionnelle, mobile et accessibilité.',
    ],
    deliverables: ['Briefs éditoriaux', 'Pages et composants optimisés', 'Plan de marquage', 'Recette'],
  },
  {
    period: 'Jours 61–90',
    title: 'Observer et ajuster',
    actions: [
      'Contrôler l’indexation des pages modifiées.',
      'Examiner les premiers signaux et le résultat du premier A/B test.',
      'Analyser les parcours vers les services.',
      'Recueillir des retours qualitatifs (consultants, utilisateurs).',
      'Corriger ce qui bloque.',
      'Décider d’étendre, d’adapter ou d’arrêter certaines actions.',
    ],
    deliverables: ['Bilan du pilote', 'Enseignements', 'Priorités suivantes'],
  },
]

/* ------------------------------ Hero ------------------------------ */

export const OBJECTIVES = [
  { title: 'Visibilité hors marque', text: 'Être trouvé par les cadres et les recruteurs qui ne cherchent pas encore « Apec ».' },
  { title: 'Trafic qualifié vers les services', text: 'Conduire chaque visite vers l’offre, l’outil ou l’accompagnement qui répond à sa situation.' },
  { title: 'Conversion mesurée', text: 'Suivre ce que le SEO produit vraiment : comptes, candidatures, rendez-vous et offres déposées.' },
]

/* ------------------------------ Diagnostic ------------------------------ */

/** Observations faites sur les pages publiques d'apec.fr. Aucun chiffre. */
export const DIAGNOSTIC = [
  {
    title: 'Un titre de connexion à la place du contenu',
    finding: 'Des pages apparaissent dans les moteurs sous des titres comme « Vous avez déjà un compte ? » : le bloc de connexion est placé avant le contenu dans le code.',
    lever: 'Placer le contenu principal en premier dans le code et fixer un title explicite par gabarit.',
  },
  {
    title: 'Title et H1 qui ne disent pas la même chose',
    finding: 'La page Conseils a pour title « L’actualité du marché de l’emploi cadres » et pour H1 « Tous nos conseils ».',
    lever: 'Aligner title, H1 et intention de recherche, gabarit par gabarit.',
  },
  {
    title: 'Peu de données structurées',
    finding: 'Pas de données structurées repérées (fil d’Ariane, Article, FAQ). Le balisage JobPosting des offres reste à auditer.',
    lever: 'Baliser les gabarits clés et contrôler la conformité JobPosting pour Google for Jobs.',
  },
  {
    title: 'Des actifs riches encore isolés',
    finding: 'Fiches métiers, offres, simulateur de salaire et études sont encore peu reliés entre eux.',
    lever: 'Construire un maillage qui fait circuler l’autorité et l’utilisateur d’un actif à l’autre.',
  },
]

/* ------------------------------ Stratégie : 4 piliers ------------------------------ */

export const PILLARS = [
  {
    id: 'technique',
    title: 'Technique et indexation',
    points: [
      'Offres expirées : redirection vers des offres proches et date de fin renseignée dans JobPosting.',
      'Google for Jobs : balisage JobPosting complet et conforme.',
      'Gabarits : règles de title et de H1 par type de page.',
      'Sitemaps par type de page, suivis dans Search Console.',
      'Vitesse (Core Web Vitals) et rendu mobile.',
    ],
  },
  {
    id: 'contenus',
    title: 'Contenus et intentions',
    points: [
      'Partir des situations des cadres et des recruteurs, pas seulement des mots-clés.',
      'Optimiser l’existant avant de créer de nouvelles pages.',
      'Relier chaque contenu au service qui prolonge la réponse.',
    ],
    link: { anchor: 'matrice', label: 'Voir les six situations' },
  },
  {
    id: 'maillage',
    title: 'Maillage',
    points: [
      'Un cocon autour de chaque métier, conçu avec les équipes produit.',
      'Des liens placés là où ils répondent à un besoin, avec des ancres descriptives.',
    ],
    cocon: ['Fiche métier', 'Offres du métier', 'Salaires', 'Conseils', 'Services'],
  },
  {
    id: 'geo',
    title: 'Popularité et visibilité IA (GEO)',
    points: [
      'Contenus structurés en questions-réponses, faciles à citer.',
      'Données et études de l’Apec mises en avant comme sources citables.',
      'Suivi des mentions de l’Apec dans les réponses des IA, et des liens qu’elles renvoient.',
    ],
  },
]

/* ------------------------------ Pilotage ------------------------------ */

export const KPIS = [
  { family: 'Visibilité', items: ['Impressions et clics hors marque'] },
  { family: 'Pertinence', items: ['CTR par gabarit : offres, fiches métiers, conseils, services'] },
  { family: 'Santé technique', items: ['Pages indexées par gabarit', 'Core Web Vitals'] },
  { family: 'Conversions issues du SEO', items: ['Comptes créés', 'Candidatures', 'Rendez-vous', 'Offres déposées'] },
]

export const AB_TESTS = [
  'Titles et méta-descriptions d’un gabarit, pour améliorer le CTR.',
  'Place et libellé des appels à l’action vers les services.',
  'Modules de maillage entre fiches métiers, offres et conseils.',
]

export const RITUALS = [
  { who: 'Webanalyste', what: 'Point régulier sur le tableau de bord SEO et lecture des A/B tests.' },
  { who: 'DSI et produit', what: 'Backlog technique priorisé : gabarits, données structurées, performance.' },
  { who: 'Contributeurs et experts métiers', what: 'Comité éditorial : briefs, mises à jour et validation des contenus.' },
]

/** Insère une espace insécable entre les deux derniers mots : pas de mot seul en fin de paragraphe. */
export function nb(text: string): string {
  return text.replace(/\s+(\S+)\s*$/, '\u00a0$1')
}
