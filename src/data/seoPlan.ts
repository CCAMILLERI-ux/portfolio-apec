/**
 * Module « Ma démarche SEO / GEO ».
 * Ma façon de travailler, illustrée par quelques pistes à discuter avec l'équipe.
 * Aucun constat sur apec.fr, aucun plan d'action, aucune donnée interne de l'Apec.
 *
 * Règles :
 * - les recherches et les questions posées aux IA sont des exemples (aucun volume, aucun classement) ;
 * - les services portent les intitulés utilisés dans « Nos services » (src/data/services.ts) ;
 * - aucune URL officielle, disponibilité ou condition d'éligibilité n'est inventée.
 */

export interface SeoSituation {
  id: string
  persona: string
  short: string
  need: string
  queries: string[]
  /** Exemples de questions posées aux assistants IA. */
  aiQuestions: string[]
  intent: string
  content: string
  services: string[]
  conversion: string
  note?: string
  /** Le parcours démonstrateur (bloc 4) part de cette situation. */
  hasJourney?: boolean
}

export const SEO_SITUATIONS: SeoSituation[] = [
  {
    id: 'recherche',
    persona: 'Cadre en recherche d’emploi',
    short: 'Recherche d’emploi',
    need: 'Améliorer ses candidatures et préparer ses entretiens.',
    queries: ['préparer entretien embauche', 'CV cadre expérimenté', 'expliquer une période sans emploi'],
    aiQuestions: ['Comment préparer un entretien pour un poste de cadre ?', 'Comment expliquer une période sans emploi en entretien ?'],
    intent: 'Informationnelle, avec un prolongement pratique : la personne veut une méthode, puis souvent un entraînement.',
    content: 'Guide pratique, exemples de réponses, checklist de préparation.',
    services: [
      'Entretien programmé : entrainez vous avec un consultant !',
      'Réussir vos entretiens de recrutement',
      'Réussir sa candidature',
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
    aiQuestions: ['Comment trouver un premier emploi de cadre sans expérience ?', 'Comment valoriser un stage sur son CV ?'],
    intent: 'Informationnelle : se rassurer et trouver des exemples adaptés au début de carrière.',
    content: 'Conseils et exemples adaptés au début de carrière (stages, alternance, projets).',
    services: [
      'Fiches métiers cadres',
      'Clés d’Emploi',
      'Jeunes diplômés : gagnez en confiance, même sans expérience',
    ],
    conversion: 'Inscription ou rendez-vous finalisé.',
  },
  {
    id: 'evolution',
    persona: 'Cadre en poste souhaitant évoluer',
    short: 'Évolution',
    need: 'Se situer sur le marché et préparer une évolution.',
    queries: ['négocier son salaire', 'demander une mobilité interne', 'faire le point sur sa carrière'],
    aiQuestions: ['Comment savoir si mon salaire est au niveau du marché ?', 'Comment préparer une demande de mobilité interne ?'],
    intent: 'Informationnelle et réflexive : comparer, se situer, préparer un échange avec son employeur.',
    content: 'Guide rémunération ou guide évolution professionnelle.',
    services: ['Simulateur de salaire cadre', 'Conseil en évolution professionnelle'],
    conversion: 'Simulation terminée ou rendez-vous confirmé.',
  },
  {
    id: 'reconversion',
    persona: 'Cadre en reconversion',
    short: 'Reconversion',
    need: 'Clarifier et structurer un projet professionnel.',
    queries: ['reconversion professionnelle cadre', 'reconversion après 15 ans de carrière', 'identifier ses compétences transférables'],
    aiQuestions: ['Qui peut m’accompagner gratuitement dans ma reconversion ?', 'Quelles compétences puis-je transférer vers un nouveau métier ?'],
    intent: 'Exploratoire : comprendre les options et les étapes, souvent sur plusieurs semaines.',
    content: 'Dossier pour explorer les options et les prochaines étapes.',
    services: ['Conseil en évolution professionnelle', 'Fiches métiers cadres', 'Trajectoires'],
    conversion: 'Rendez-vous confirmé ou outil terminé.',
  },
  {
    id: 'tpe-pme',
    persona: 'Dirigeant de TPE/PME recrutant occasionnellement',
    short: 'TPE/PME qui recrute',
    need: 'Réussir un recrutement avec des ressources limitées.',
    queries: ['comment recruter un cadre', 'rédiger une offre attractive', 'salaire pour recruter un commercial'],
    aiQuestions: ['Comment rédiger une offre d’emploi attractive pour un cadre ?', 'Quel salaire proposer pour recruter un cadre commercial ?'],
    intent: 'Pratique : obtenir une méthode rapide et savoir où se faire aider.',
    content: 'Guide pratique de recrutement (définir le poste, rédiger l’offre, sélectionner).',
    services: ['Rédiger une offre d’emploi attractive, les incontournables', 'Rencontrer un consultant'],
    conversion: 'Demande d’accompagnement envoyée ou offre effectivement déposée.',
    note: 'Certains services aux entreprises sont soumis à des conditions d’accès, à rappeler dans les contenus.',
  },
  {
    id: 'rh',
    persona: 'Professionnel RH / recruteur régulier',
    short: 'RH / recruteur',
    need: 'Améliorer l’attractivité, le sourcing et l’intégration.',
    queries: ['sourcing cadres', 'attirer candidats pénuriques', 'réussir intégration cadre'],
    aiQuestions: ['Comment attirer des cadres sur un métier en tension ?', 'Comment réussir l’intégration d’un cadre recruté ?'],
    intent: 'Expertise : méthodes, données de marché, retours d’expérience.',
    content: 'Méthodes, études et données (contenus d’expertise existants à valoriser).',
    services: ['Rencontrer un consultant', 'Rédiger une offre d’emploi attractive, les incontournables'],
    conversion: 'Demande d’accompagnement finalisée.',
  },
]

/* ------------------------------ Bloc 4 : une piste illustrée ------------------------------ */

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
  query: 'Comment préparer un entretien de recrutement ?',
  url: 'site-de-demonstration.example › conseils › entretien',
  title: 'Préparer un entretien de recrutement : méthode et prochaines étapes',
  description:
    'Comprendre le poste, préparer vos exemples, vous entraîner, poser vos questions et aborder la rémunération : une méthode en six étapes et une checklist.',
}

/** Choix fictifs pour la conversion simulée du simulateur (outil, pas de réservation). */
export const SIMULATOR_CHOICES = ['Entretien de motivation', 'Entretien technique', 'Entretien en visioconférence']

/** Logique de maillage : page source → destination, ancre et section. */
export const LINK_LOGIC = [
  { from: 'Page conseil', section: 'S’entraîner à répondre', to: 'Simulateur d’entretien', anchor: 's’entraîner seul avec le simulateur d’entretien' },
  { from: 'Page conseil', section: 'Se faire accompagner', to: 'Atelier entretiens', anchor: 'participer à l’atelier « Réussir vos entretiens de recrutement »' },
  { from: 'Page conseil', section: 'Se faire accompagner', to: 'Entretien programmé', anchor: 'préparer un entretien prévu avec un consultant' },
  { from: 'Page conseil', section: 'Aborder la rémunération', to: 'Ressource rémunération', anchor: 'repères pour préparer votre fourchette' },
  { from: 'Fiches service', section: 'Préparation', to: 'Checklist (page conseil)', anchor: 'utiliser la checklist de préparation' },
]

/* ------------------------------ Hero ------------------------------ */

/** Ce que je vise dans mes projets SEO / GEO. */
export const OBJECTIVES = [
  { title: 'Visibilité hors marque', text: 'Être trouvé sur les moteurs et cité par les IA par les personnes qui ne cherchent pas encore la marque.' },
  { title: 'Trafic qualifié vers les services', text: 'Conduire chaque visite vers l’offre, l’outil ou l’accompagnement qui répond à sa situation.' },
  { title: 'Conversion mesurée', text: 'Suivre ce que le SEO / GEO produit vraiment : comptes, inscriptions, rendez-vous, candidatures.' },
]

/* ------------------------------ Ma façon de travailler ------------------------------ */

export const WAYS = [
  {
    title: 'Comprendre les données et les usages',
    text: 'Search Console, analytics, pages d’entrée, questions posées aux IA, retours des équipes et des utilisateurs, et ce qui a déjà été testé.',
  },
  {
    title: 'Prioriser avec l’équipe, selon la roadmap',
    text: 'Croiser impact, effort et chantiers en cours, pour proposer des pistes qui s’inscrivent dans les priorités communes.',
  },
  {
    title: 'Déployer dans le CMS avec les équipes',
    text: 'Gabarits, contenus et maillage, mis en ligne avec les contributeurs, le produit et la DSI.',
  },
  {
    title: 'Mesurer et partager',
    text: 'Suivre les effets sur la visibilité et les conversions, les partager régulièrement et ajuster ensemble.',
  },
]

/* ------------------------------ Quatre piliers SEO / GEO ------------------------------ */

export const PILLARS: {
  id: string
  title: string
  summary: string
  seo: string[]
  geo: string[]
  cocon?: string[]
  link?: { anchor: string; label: string }
}[] = [
  {
    id: 'technique',
    title: 'Technique et indexation',
    summary: 'Des pages que les moteurs et les IA lisent facilement.',
    seo: [
      'Gabarits : règles de title et de H1 par type de page.',
      'Vitesse (Core Web Vitals) et rendu mobile.',
      'Offres : balisage JobPosting complet et suivi des offres expirées.',
    ],
    geo: [
      'Données structurées et contenu principal lisible dès le code, pour être compris et repris par les IA.',
    ],
  },
  {
    id: 'contenus',
    title: 'Contenus et intentions',
    summary: 'Répondre aux recherches comme aux questions posées aux IA.',
    seo: [
      'Partir des situations des cadres et des recruteurs, pas seulement des mots-clés.',
      'Valoriser les contenus existants, en complément de nouvelles pages.',
    ],
    geo: [
      'Des réponses claires et structurées : questions-réponses, points clés en tête de page, données sourcées.',
    ],
    link: { anchor: 'matrice', label: 'Voir les six situations' },
  },
  {
    id: 'maillage',
    title: 'Maillage et parcours',
    summary: 'Relier contenus, fiches métiers, offres et services pour transformer une visite en usage.',
    seo: [
      'Un cocon autour de chaque métier, conçu avec les équipes produit.',
      'Des liens placés là où ils répondent à un besoin, avec des ancres descriptives.',
    ],
    geo: [
      'Chaque réponse renvoie vers le service qui la prolonge, pour que la page citée mène à un usage.',
    ],
    cocon: ['Fiche métier', 'Offres du métier', 'Salaires', 'Conseils', 'Services'],
  },
  {
    id: 'autorite',
    title: 'Autorité et citabilité',
    summary: 'Faire des études, des données et de l’expertise des sources de référence.',
    seo: [
      'Valoriser les études et les données pour obtenir des liens et des mentions (presse, partenaires).',
    ],
    geo: [
      'Des données datées et sourcées, faciles à citer par les IA.',
      'Suivi des citations de la marque dans les réponses des IA, et des liens qu’elles renvoient.',
    ],
  },
]

/* ------------------------------ Indicateurs ------------------------------ */

export const KPI_SEO = [
  'Impressions et clics hors marque',
  'Positions',
  'CTR par gabarit',
  'Pages indexées',
]
export const KPI_GEO = [
  'Présence et citations de la marque dans les réponses des IA, sur un panel de questions',
  'Trafic venant des assistants IA',
]
export const KPI_CONVERSION = ['Comptes créés', 'Inscriptions', 'Rendez-vous', 'Candidatures']

/**
 * Typographie : espace insécable avant : ; ? ! % et à l'intérieur des guillemets,
 * et entre les deux derniers mots (pas de mot seul en fin de paragraphe).
 */
export function nb(text: string): string {
  return text
    .replace(/ ([:;?!%»])/g, '\u00a0$1')
    .replace(/« /g, '«\u00a0')
    .replace(/\s+(\S+)\s*$/, '\u00a0$1')
}
