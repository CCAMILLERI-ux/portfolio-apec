/**
 * Cas 1 — contenus propres à la « piste exploratoire 2 ».
 * Rédaction de la candidate : aides au choix, pas des informations officielles.
 */

/** « Idéal si… » : la situation dans laquelle chaque service est le plus utile. */
export const IDEAL_IF: Record<string, string> = {
  'atelier-entretiens': 'vous voulez vous préparer avant d’être convoqué',
  'entretien-programme': 'vous avez un entretien dans les prochains jours',
  'simulateur-entretien': 'vous préférez vous entraîner seul, à votre rythme',
  candidature: 'vous voulez un avis sur votre CV avant de postuler',
  'atelier-iag': 'vous voulez utiliser l’IA générative avec méthode',
  'creer-cv': 'vous voulez mettre votre CV à jour en autonomie',
  odiapazon: 'vous voulez savoir quelles questions poser au recruteur',
  cep: 'vous voulez faire le point sur votre projet',
  'cles-emploi': 'vous terminez vos études ou cherchez votre premier poste',
  'jeunes-diplomes-confiance': 'vous débutez et voulez présenter vos atouts avec assurance',
  'quel-job': 'vous cherchez les métiers ouverts par votre diplôme',
  'changement-poste': 'une opportunité se présente',
  'evolution-interne': 'vous visez un nouveau poste dans votre entreprise',
  trajectoires: 'vous voulez explorer les évolutions possibles de votre métier',
  reconversion: 'vous envisagez un autre métier',
  'fiches-metiers': 'vous voulez découvrir des métiers avant de vous décider',
  'offre-attractive': 'vous rédigez une offre et voulez attirer les bons candidats',
  osim: 'vous voulez évaluer les candidats sur des situations concrètes',
  'conseil-recrutement': 'vous recrutez un cadre sans service RH dédié',
}

export interface Advice {
  to: string
  kicker: string
  title: string
  excerpt: string
}

const ADVICE_INTERVIEW: Advice = {
  to: '/cas-01-seo',
  kicker: 'Conseils',
  title: 'Comment préparer un entretien de recrutement ?',
  excerpt: 'La méthode en 5 étapes, des exemples de questions et une checklist pour la veille.',
}
const ADVICE_SALARY: Advice = {
  to: '/conseil/remuneration',
  kicker: 'Repères',
  title: 'Aborder la rémunération en entretien',
  excerpt: 'Préparer une fourchette et formuler sa réponse sereinement.',
}

/** Contenus conseils reliés à chaque situation (uniquement ceux qui existent dans la démo). */
export const ADVICE_BY_SITUATION: Record<string, Advice[]> = {
  'nouvel-emploi': [ADVICE_INTERVIEW, ADVICE_SALARY],
  'premier-emploi': [ADVICE_SALARY, ADVICE_INTERVIEW],
  tous: [ADVICE_INTERVIEW, ADVICE_SALARY],
}
