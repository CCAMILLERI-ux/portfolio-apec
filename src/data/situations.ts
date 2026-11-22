/**
 * Entrées « par situation » du cas 1. Les codes P1–P5 sont des personas de
 * travail (hypothèses de la candidate, non validés par l'Apec). Ils ne sont
 * jamais affichés aux visiteurs dans la démo utilisateur.
 */
import { Compass, Graduation, Handshake, Search, TrendUp } from '../components/Icons'
import type { ServiceKind } from './services'

export interface Situation {
  id: string
  persona: 'P1' | 'P2' | 'P3' | 'P4' | 'P5'
  label: string
  personaNote: string
  serviceIds: [string, string, string]
}

export const SITUATIONS: Situation[] = [
  {
    id: 'nouvel-emploi',
    persona: 'P1',
    label: 'Je cherche un nouvel emploi',
    personaNote: 'Cadre en recherche active',
    serviceIds: ['candidature', 'atelier-entretiens', 'entretien-programme'],
  },
  {
    id: 'premier-emploi',
    persona: 'P2',
    label: 'Je prépare mon premier emploi',
    personaNote: 'Jeune diplômé ou étudiant',
    serviceIds: ['premier-emploi', 'profil-debutant', 'premier-salaire'],
  },
  {
    id: 'evoluer',
    persona: 'P3',
    label: 'Je souhaite évoluer dans ma carrière',
    personaNote: 'Cadre en poste',
    serviceIds: ['cep', 'evolution-interne', 'formation'],
  },
  {
    id: 'reconversion',
    persona: 'P4',
    label: 'Je réfléchis à une reconversion',
    personaNote: 'Cadre en transition',
    serviceIds: ['cep', 'reconversion', 'formation'],
  },
  {
    id: 'recruter-aide',
    persona: 'P5',
    label: 'Je recrute et j’ai besoin d’aide',
    personaNote: 'Dirigeant de TPE/PME ou recruteur occasionnel',
    serviceIds: ['conseil-recrutement', 'publication-offre', 'preselection'],
  },
]

/** Icône de chaque tuile de situation (page « Nos services » et panneau de rendez-vous). */
export const SITUATION_ICON: Record<string, typeof Search> = {
  'nouvel-emploi': Search,
  'premier-emploi': Graduation,
  evoluer: TrendUp,
  reconversion: Compass,
  'recruter-aide': Handshake,
}

export const ALL_DEMO_SERVICE_IDS = Array.from(
  new Set(SITUATIONS.flatMap((s) => s.serviceIds)),
)

/* ---------- Vue « Tous » : regroupement par situation ---------- */


/** Ordre de second niveau dans chaque groupe : rendez-vous, atelier, outil. */
export const KIND_ORDER: ServiceKind[] = ['individuel', 'atelier', 'outil']

export const FORMAT_LABEL: Record<ServiceKind, string> = {
  individuel: 'Rendez-vous individuel',
  atelier: 'Atelier',
  outil: 'Outil en ligne',
}

export interface SituationGroup {
  situation: Situation
  /** Services dont cette situation est la situation principale (première qui les contient). */
  serviceIds: string[]
}

/** Chaque service n'apparaît qu'une fois, dans sa situation principale. */
export function groupBySituation(kindOf: (id: string) => ServiceKind): SituationGroup[] {
  const seen = new Set<string>()
  return SITUATIONS.map((situation) => {
    const ids = situation.serviceIds.filter((id) => !seen.has(id))
    ids.forEach((id) => seen.add(id))
    ids.sort((a, b) => KIND_ORDER.indexOf(kindOf(a)) - KIND_ORDER.indexOf(kindOf(b)))
    return { situation, serviceIds: ids }
  })
}

/** Autres situations où un service est aussi proposé. */
export function otherSituations(serviceId: string, primaryId: string): Situation[] {
  return SITUATIONS.filter((s) => s.id !== primaryId && s.serviceIds.includes(serviceId))
}
