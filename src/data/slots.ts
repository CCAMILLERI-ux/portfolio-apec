/**
 * Créneaux et sessions FICTIFS pour la réservation simulée.
 * Aucun lien avec un agenda réel, aucun nom de consultant, aucun centre réel.
 */
export interface Slot {
  id: string
  date: string // libellé lisible
  time: string
  place: string
}

const PLACES = {
  centre: 'Centre de démonstration (fictif)',
  distance: 'À distance — visio (fictif)',
}

export const INDIVIDUAL_SLOTS: Slot[] = [
  { id: 'i1', date: 'Mardi 1er décembre', time: '9 h 30', place: PLACES.centre },
  { id: 'i2', date: 'Mardi 1er décembre', time: '14 h 00', place: PLACES.distance },
  { id: 'i3', date: 'Jeudi 3 décembre', time: '10 h 00', place: PLACES.centre },
  { id: 'i4', date: 'Vendredi 4 décembre', time: '16 h 00', place: PLACES.distance },
]

export const WORKSHOP_SESSIONS: Slot[] = [
  { id: 's1', date: 'Lundi 7 décembre', time: '9 h 30', place: PLACES.centre },
  { id: 's2', date: 'Mercredi 9 décembre', time: '14 h 00', place: PLACES.distance },
  { id: 's3', date: 'Mardi 15 décembre', time: '9 h 30', place: PLACES.centre },
]
