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

export const PRIORITY_CRITERIA = [
  { criterion: 'Utilité pour les publics et la mission de l’Apec', question: 'Le contenu répond-il à un vrai besoin des cadres ou des recruteurs ?' },
  { criterion: 'Demande observée ou estimée', question: 'Quels signaux : Search Console, recherche interne, questions remontées par les consultants ?' },
  { criterion: 'Potentiel de progression de l’existant', question: 'Une page existe-t-elle déjà et peut-elle être améliorée plutôt que recréée ?' },
  { criterion: 'Pertinence du service proposé', question: 'Le service relié répond-il vraiment à la situation de la personne ?' },
  { criterion: 'Effort et dépendances', question: 'Quelles équipes, quel délai, quelles contraintes techniques ?' },
  { criterion: 'Capacité du service à accueillir la demande', question: 'Le service peut-il absorber un surcroît de demandes (places, consultants) ?' },
]

export const DATA_SOURCES = [
  {
    title: 'Sources internes nécessaires',
    items: ['Search Console', 'Analytics (parcours, conversions)', 'Recherche interne du site', 'Retours des métiers et des consultants'],
    note: 'Je ne dispose pas de ces données : elles conditionnent la priorisation réelle.',
  },
  {
    title: 'Recherche exploratoire publique',
    items: ['Pages de résultats des moteurs', 'Outils d’estimation de mots-clés', 'Questions associées affichées'],
    note: 'Utile pour formuler des hypothèses, jamais suffisant pour décider seul.',
  },
  {
    title: 'Observations qualitatives',
    items: ['Entretiens utilisateurs', 'Tests de parcours', 'Écoute des consultants'],
    note: 'Pour comprendre le « pourquoi » derrière les chiffres.',
  },
]

export const ROLES = [
  { who: 'Cheffe de projet animation web', what: 'Cadrage, priorisation, briefs, coordination, recette, suivi.' },
  { who: 'Experts métiers et éditorial', what: 'Exactitude des contenus, validation, formulation des services.' },
  { who: 'Produit / DSI', what: 'Faisabilité et mise en œuvre technique (gabarits, CMS, performance).' },
  { who: 'Analyste', what: 'Qualité du suivi, plan de marquage, interprétation des résultats.' },
]

export const RELAYS = ['Newsletter', 'Réseaux sociaux', 'Autres dispositifs gérés avec leurs responsables']

export const INDICATORS = [
  { family: 'Acquisition', items: ['Impressions et clics organiques', 'Distinction marque / hors marque', 'Pages et thématiques concernées'] },
  { family: 'Découverte', items: ['Sessions d’entrée SEO conduisant vers une fiche service'] },
  { family: 'Conversion', items: ['Inscriptions et rendez-vous finalisés', 'Outils terminés', 'Taux avec dénominateur explicite (ex. inscriptions / sessions d’entrée sur la thématique)'] },
  { family: 'Utilité', items: ['Participation effective', 'Rendez-vous honorés', 'Satisfaction, si mesurable'] },
  { family: 'Efficience', items: ['Résultats rapportés aux ressources éditoriales et techniques mobilisées'] },
]

export const MEASURE_CAVEATS = ['Saisonnalité', 'Délai d’observation (le SEO met du temps)', 'Attribution imparfaite entre canaux', 'Corrélation ≠ causalité']

export const GEO_STEPS = [
  'Constituer un petit panel de questions par situation.',
  'Observer les réponses des assistants avec recherche web.',
  'Distinguer mention de l’Apec et citation d’une page Apec.',
  'Vérifier l’exactitude des services décrits dans les réponses.',
  'Renforcer les réponses utiles, les sources et la clarté des contenus.',
  'Vérifier l’accessibilité technique des pages avec les équipes.',
  'Suivre les citations observées et les visites identifiables.',
]

export const GEO_CAVEATS = [
  'Visibilité non garantie.',
  'Réponses variables selon le moteur, la date et le contexte.',
  'Aucune mesure exhaustive de toutes les IA.',
  'Aucun balisage « magique ».',
  'Entraînement des modèles et accès pour la recherche sont deux sujets distincts.',
]
