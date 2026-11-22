import type { Service } from '../data/services'
import type { Slot } from '../data/slots'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { Check } from './Icons'

/**
 * Action d'un service du programme (cas 03), identique sur l'écran Confirmation et sur
 * « Mes prochaines étapes » : la date si le service est réservé, sinon le bouton propre
 * à son type (créneau, session ou outil externe).
 */

/** Le service se réserve dans la démo : rendez-vous (créneau) ou atelier (session). Un outil ne se réserve pas. */
export const isBookable = (s: Service) => s.kind !== 'outil'

/** Services du programme qui restent à réserver (les outils n'en font pas partie). */
export const toBook = (ids: string[], bookings: Record<string, Slot>, get: (id: string) => Service | undefined) =>
  ids.filter((id) => {
    const s = get(id)
    return !!s && isBookable(s) && !bookings[id]
  })

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
      onClick={() => track('service_cta_click', `${s.id} (programme, outil)`)}>
      Accéder à l’outil<span className="visually-hidden">{'\u00a0'}: {s.officialTitle}</span>
    </Link>
  )
}
