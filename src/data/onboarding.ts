/**
 * Cas 2 — moteur de recommandation déterministe et explicable.
 * Pas d'IA, pas d'API : des règles lisibles, chacune produisant une raison
 * affichée à l'utilisateur dans « Pourquoi ce service ? ».
 * L'âge n'est ni demandé ni utilisé.
 */

export type SituationChoice = 'recherche' | 'evolution' | 'changement'
export type Need = 'valoriser' | 'cv' | 'entretien' | 'possibilites'

export const SITUATION_OPTIONS: { id: SituationChoice; label: string; hint: string }[] = [
  { id: 'recherche', label: 'Je recherche un emploi', hint: 'Vous êtes en recherche active.' },
  { id: 'evolution', label: 'Je veux évoluer', hint: 'Dans votre entreprise ou ailleurs.' },
  { id: 'changement', label: 'Je veux changer de voie', hint: 'Vous envisagez un autre métier.' },
]

export const NEED_OPTIONS: { id: Need; label: string }[] = [
  { id: 'valoriser', label: 'Valoriser mon expérience' },
  { id: 'cv', label: 'Actualiser mon CV' },
  { id: 'entretien', label: 'Préparer un entretien' },
  { id: 'possibilites', label: 'Identifier mes possibilités' },
]

export interface Answers {
  situation: SituationChoice | null
  needs: Need[]
  /** Sous-question affichée si « Préparer un entretien » est coché. */
  interviewScheduled: boolean
}

export interface Recommendation {
  serviceId: string
  score: number
  reasons: string[]
}

interface Rule {
  serviceId: string
  points: number
  when: (a: Answers) => boolean
  reason: string
}

const has = (a: Answers, n: Need) => a.needs.includes(n)

export const RULES: Rule[] = [
  {
    serviceId: 'entretien-programme',
    points: 6,
    when: (a) => has(a, 'entretien') && a.interviewScheduled,
    reason: 'Vous avez un entretien déjà programmé : une simulation individuelle d’1 h permet de le répéter avec un consultant.',
  },
  {
    serviceId: 'atelier-entretiens',
    points: 5,
    when: (a) => has(a, 'entretien') && !a.interviewScheduled,
    reason: 'Vous voulez préparer vos entretiens en amont : l’atelier couvre les différents types d’entretien.',
  },
  {
    serviceId: 'simulateur-entretien',
    points: 2,
    when: (a) => has(a, 'entretien'),
    reason: 'Pour vous entraîner seul, à votre rythme, en complément.',
  },
  {
    serviceId: 'candidature',
    points: 4,
    when: (a) => has(a, 'cv'),
    reason: 'Vous souhaitez actualiser votre CV : un conseil personnalisé avant de postuler.',
  },
  {
    serviceId: 'candidature',
    points: 3,
    when: (a) => has(a, 'valoriser'),
    reason: 'Vous souhaitez valoriser votre expérience : le conseil porte sur la mise en avant de vos réalisations.',
  },
  {
    serviceId: 'candidature',
    points: 1,
    when: (a) => a.situation === 'recherche' && (has(a, 'cv') || has(a, 'valoriser')),
    reason: 'Vous êtes en recherche active : un CV ciblé est utile dès les premières candidatures.',
  },
  {
    serviceId: 'creer-cv',
    points: 2,
    when: (a) => has(a, 'cv'),
    reason: 'Un outil pour mettre votre CV à jour en autonomie.',
  },
  {
    serviceId: 'atelier-iag',
    points: 1,
    when: (a) => has(a, 'valoriser') || has(a, 'cv'),
    reason: 'Pour vous appuyer sur l’IA générative dans vos candidatures, avec méthode.',
  },
  {
    serviceId: 'cep',
    points: 4,
    when: (a) => has(a, 'possibilites'),
    reason: 'Vous voulez identifier vos possibilités : un consultant vous aide à clarifier vos options.',
  },
  {
    serviceId: 'cep',
    points: 2,
    when: (a) => a.situation === 'evolution' || a.situation === 'changement',
    reason: 'Votre situation (évolution ou changement de voie) se prête à un temps de recul sur votre projet.',
  },
]

/** Ordre de départage fixe, pour un résultat stable. */
const TIE_ORDER = [
  'entretien-programme',
  'atelier-entretiens',
  'candidature',
  'cep',
  'simulateur-entretien',
  'creer-cv',
  'atelier-iag',
]

export function recommend(a: Answers, max = 3): Recommendation[] {
  const byId = new Map<string, Recommendation>()
  for (const rule of RULES) {
    if (!rule.when(a)) continue
    const rec = byId.get(rule.serviceId) ?? { serviceId: rule.serviceId, score: 0, reasons: [] }
    rec.score += rule.points
    rec.reasons.push(rule.reason)
    byId.set(rule.serviceId, rec)
  }
  return [...byId.values()]
    .sort(
      (x, y) => y.score - x.score || TIE_ORDER.indexOf(x.serviceId) - TIE_ORDER.indexOf(y.serviceId),
    )
    .slice(0, max)
}

/** Scénario fictif d'Alex : présélection modifiable. */
export const ALEX_PRESET: Answers = {
  situation: 'recherche',
  needs: ['valoriser', 'entretien'],
  interviewScheduled: false,
}

export const EMPTY_ANSWERS: Answers = { situation: null, needs: [], interviewScheduled: false }
