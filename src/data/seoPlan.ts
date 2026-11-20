/**
 * Module « Du besoin au service : une acquisition SEO utile ».
 * Contenus centralisés : proposition exploratoire de la candidate, à valider avec
 * les équipes et les données de l'Apec. Aucune donnée interne de l'Apec n'est utilisée.
 *
 * Règles :
 * - les requêtes sont des exemples exploratoires (aucun volume, aucun classement) ;
 * - un service « observé » a un intitulé lisible sur les captures d'apec.fr ;
 *   sinon l'intitulé est générique et signalé « à vérifier » ;
 * - aucune URL officielle, disponibilité ou condition d'éligibilité n'est inventée.
 */

export interface SeoService {
  label: string
  /** true : intitulé observé sur une capture d'apec.fr ; false : intitulé générique à vérifier. */
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
      { label: 'Outil d’estimation de salaire', observed: false },
      { label: 'Conseil en évolution professionnelle', observed: false },
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
      { label: 'Accompagnement au projet professionnel', observed: false },
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
      { label: 'Conseil en recrutement', observed: false },
      { label: 'Dépôt d’offre', observed: false },
    ],
    conversion: 'Demande d’accompagnement envoyée ou offre effectivement déposée.',
    note: 'Certains services aux entreprises sont soumis à conditions : à vérifier avant toute mise en avant.',
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
      'Analyser Search Console et analytics, si l’accès est donné.',
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
      'Sélectionner une thématique (ex. entretiens de recrutement).',
      'Optimiser un petit ensemble cohérent de pages existantes.',
      'Préparer les briefs éditoriaux.',
      'Faire valider les contenus par les métiers.',
      'Améliorer le maillage et les appels à l’action.',
      'Mettre en place le suivi avec l’analyste.',
      'Réaliser la recette fonctionnelle, mobile et accessibilité.',
    ],
    deliverables: ['Briefs éditoriaux', 'Pages et composants optimisés', 'Plan de marquage', 'Recette'],
  },
  {
    period: 'Jours 61–90',
    title: 'Observer et ajuster',
    actions: [
      'Contrôler l’indexation des pages modifiées.',
      'Examiner les premiers signaux, avec prudence.',
      'Analyser les parcours vers les services.',
      'Recueillir des retours qualitatifs (consultants, utilisateurs).',
      'Corriger ce qui bloque.',
      'Décider d’étendre, d’adapter ou d’arrêter certaines actions.',
    ],
    deliverables: ['Bilan du pilote', 'Enseignements', 'Priorités suivantes'],
  },
]

/* Synthèse de la méthode : présentation courte pour l'entretien. */
export const GUIDE_STEPS = [
  {
    title: 'Comprendre les recherches',
    text: 'Identifier les questions des cadres et les sujets sur lesquels renforcer la visibilité de l’Apec.',
  },
  {
    title: 'Apporter une réponse utile',
    text: 'Améliorer les contenus existants : réponses claires, conseils concrets et liens vers les ressources pertinentes.',
  },
  {
    title: 'Faciliter le passage à l’action',
    text: 'Proposer une suite logique : découvrir un outil, s’inscrire à un atelier ou échanger avec un consultant.',
  },
]

export const GUIDE_EXAMPLE = {
  question: 'Comment préparer une reconversion quand on est cadre ?',
  explanation:
    'Une page qui explique les premières étapes, renvoie vers les ressources utiles et propose un échange avec un consultant.',
  cta: 'Faire le point avec un consultant',
}

export const GUIDE_MEASURE = 'visites depuis Google, clics vers les services et rendez-vous pris à la suite du parcours.'

export const GUIDE_AI_NOTE =
  'L’IA peut aider à explorer les questions et préparer les contenus, avec validation des équipes Apec.'
