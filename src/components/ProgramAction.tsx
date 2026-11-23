import type { Service } from '../data/services'
import type { Slot } from '../data/slots'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { Check } from './Icons'

/**
 * Action d'un service sélectionné (cas 03), identique sur l'écran Confirmation et sur
 * « Mes services sélectionnés » : la date si le service est réservé, sinon le bouton propre
 * à son type (créneau, session ou outil externe).
 */

/** Le service se réserve dans la démo : rendez-vous (créneau) ou atelier (session). Un outil ne se réserve pas. */
export const isBookable = (s: Service) => s.kind !== 'outil'

/** Services sélectionnés qui restent à réserver (les outils n'en font pas partie). */
export const toBook = (ids: string[], bookings: Record<string, Slot>, get: (id: string) => Service | undefined) =>
  ids.filter((id) => {
    const s = get(id)
    return !!s && isBookable(s) && !bookings[id]
  })

/** Adresse de la page « Mes services sélectionnés ». */
export const SELECTION_PATH = '/cas-03-inscription/services-selectionnes'

export interface SelectionCounts {
  /** Rendez-vous et ateliers réservés. */
  reserved: number
  /** Rendez-vous et ateliers restant à réserver. */
  toReserve: number
  /** Outils : à utiliser, jamais réservables. */
  tools: number
}

/** Répartition des services sélectionnés : réservés, à réserver, outils. */
export function selectionCounts(ids: string[], bookings: Record<string, Slot>, get: (id: string) => Service | undefined): SelectionCounts {
  const c: SelectionCounts = { reserved: 0, toReserve: 0, tools: 0 }
  for (const id of ids) {
    const s = get(id)
    if (!s) continue
    if (!isBookable(s)) c.tools++
    else if (bookings[id]) c.reserved++
    else c.toReserve++
  }
  return c
}

const NB = '\u00a0'

/**
 * Phrase de synthèse, commune à « Mon espace », à l'écran Confirmation et à « Mes services sélectionnés ».
 * N'affiche que les compteurs non nuls ; « Tout est réservé » quand plus rien n'est à réserver.
 */
export function selectionSummary({ reserved, toReserve, tools }: SelectionCounts): string {
  if (reserved > 0 && toReserve === 0) {
    return tools > 0 ? `Tout est réservé. Retrouvez vos dates et vos${NB}outils.` : `Tout est réservé. Retrouvez vos${NB}dates.`
  }
  const parts: string[] = []
  if (reserved > 0) parts.push(`${reserved}${NB}réservé${reserved > 1 ? 's' : ''}`)
  if (toReserve > 0) parts.push(`${toReserve}${NB}à${NB}réserver`)
  if (tools > 0) parts.push(`${tools}${NB}outil${tools > 1 ? 's' : ''} à${NB}utiliser`)
  return `${parts.join(', ')}. Vous pouvez modifier votre sélection à tout${NB}moment.`
}

export function bookLabel(s: Service) {
  return s.kind === 'atelier' ? 'Choisir une session' : 'Choisir un créneau'
}

export function ProgramAction({
  service: s,
  slot,
  onChoose,
  from,
}: {
  service: Service
  slot?: Slot
  /** Réservation dans la page (écran Confirmation) ; sinon lien vers la page de réservation. */
  onChoose?: () => void
  from?: string
}) {
  if (slot && s.kind !== 'outil') {
    return (
      <p className="pa-status">
        <Check size={18} /> <span><strong>Réservé{' '}:</strong> {slot.date} à {slot.time}</span>
      </p>
    )
  }
  if (isBookable(s)) {
    const label = (
      <>
        {bookLabel(s)}<span className="visually-hidden">{' '}: {s.officialTitle}</span>
      </>
    )
    return onChoose ? (
      <button type="button" className="btn btn--primary btn--sm pa-btn" onClick={onChoose}>{label}</button>
    ) : (
      <Link to={`/reserver/${s.id}?from=${from ?? 'etapes'}`} className="btn btn--primary btn--sm pa-btn">{label}</Link>
    )
  }
  // Outil : fiche de l'outil dans le prototype (aucun lien vers apec.fr).
  return (
    <Link to={`/service/${s.id}?from=${from ?? 'etapes'}`} className="btn btn--outline btn--sm pa-btn"
      onClick={() => track('service_cta_click', `${s.id} (sélection, outil)`)}>
      Accéder à l’outil<span className="visually-hidden">{'\u00a0'}: {s.officialTitle}</span>
    </Link>
  )
}
