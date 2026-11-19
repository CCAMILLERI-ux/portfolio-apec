/** Retour contextuel : chaque lien du maillage transmet sa page source (?from=). */
export interface BackTarget {
  to: string
  label: string
  anchor?: string
}

const ORIGINS: Record<string, BackTarget> = {
  'cas-1': { to: '/cas-1', label: 'Choisir un service' },
  'cas-3': { to: '/cas-3', label: 'Conseil : préparer un entretien de recrutement' },
  'cas-3-accompagnement': { to: '/cas-3', label: 'Conseil : préparer un entretien de recrutement', anchor: 'accompagnement' },
  remuneration: { to: '/conseil/remuneration', label: 'Aborder la rémunération en entretien' },
  etapes: { to: '/cas-2/prochaines-etapes', label: 'Mes prochaines étapes' },
  espace: { to: '/espace', label: 'Mon espace' },
}

export function backFor(from: string | null): BackTarget {
  return (from && ORIGINS[from]) || ORIGINS['cas-1']
}

/** Libellé du cas pour la barre de démo, selon la page d'origine. */
export function caseLabelFor(from: string): string {
  if (from.startsWith('cas-3') || from === 'remuneration') return 'Cas 3 · Conseil & maillage'
  if (from === 'etapes' || from === 'espace') return 'Cas 2 · Accueil guidé'
  return 'Cas 1 · Choisir un service'
}

export function safeFrom(from: string | null): string {
  return from && ORIGINS[from] ? from : 'cas-1'
}
