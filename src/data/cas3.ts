/**
 * Cas 3 — solutions recommandées en fin d'article et en colonne latérale.
 * Une seule source pour les deux emplacements : même ordre, mêmes destinations.
 *
 * Ordre imposé : accompagnements humains (photos), puis outils en autonomie (icônes).
 * Descriptions alignées sur ce qui est observable dans les captures d'apec.fr :
 * - « Entretien programmé » : simulation sur mesure et retour d'un professionnel,
 *   pour les cadres ayant un entretien prévu (et non un coaching général) ;
 * - atelier « Réussir vos entretiens de recrutement » : maîtriser chaque type d'entretien ;
 * - simulateur d'entretien : s'entraîner, vivre l'entretien des deux côtés ;
 * - Odiapazon : se projeter pour préparer une collaboration réussie.
 * Le simulateur de salaire cadre n'apparaît sur aucune capture : intitulé à vérifier.
 */
import { PHOTOS, type Photo } from './photos'

export type SolutionIcon = 'chat' | 'questions' | 'calculator'

export interface Solution {
  id: string
  /** Catégorie affichée (titre de la solution). */
  title: string
  /** Service du prototype vers lequel pointe la solution (même destination dans les deux blocs). */
  serviceId: string
  /** Intitulé du service tel qu'observé (ou à vérifier). */
  official: string
  description: string
  cta: string
  group: 'humain' | 'outil'
  photo?: Photo
  icon?: SolutionIcon
  /** Repère qui distingue les deux outils d'entraînement. */
  focus?: string
}

export const CAS3_SOLUTIONS: Solution[] = [
  {
    id: 'consultant',
    title: 'Accompagnement personnalisé',
    serviceId: 'entretien-programme',
    official: 'Entretien programmé : entrainez vous avec un consultant !',
    description: 'Un entretien prévu ? Préparez-le avec un consultant : simulation sur mesure et retour personnalisé.',
    cta: 'Échanger avec un consultant',
    group: 'humain',
    photo: PHOTOS.entretienFaceAFace,
  },
  {
    id: 'atelier',
    title: 'Atelier collectif',
    serviceId: 'atelier-entretiens',
    official: 'Réussir vos entretiens de recrutement',
    description: 'Préparez en groupe les différents types d’entretien d’embauche.',
    cta: 'Découvrir les ateliers',
    group: 'humain',
    photo: PHOTOS.atelierPostIt,
  },
  {
    id: 'simulateur',
    title: 'Simulateur d’entretien',
    serviceId: 'simulateur-entretien',
    official: 'Simulateur d’entretien',
    description: 'Entraînez-vous à répondre aux questions du recruteur, en vivant l’entretien des deux côtés.',
    cta: 'M’entraîner à l’entretien',
    group: 'outil',
    icon: 'chat',
    focus: 'Préparer vos réponses',
  },
  {
    id: 'odiapazon',
    title: 'Odiapazon',
    serviceId: 'odiapazon',
    official: 'Odiapazon',
    description: 'Clarifiez vos attentes sur le poste et l’environnement de travail pour préparer les questions à poser au recruteur.',
    cta: 'Préparer mes questions',
    group: 'outil',
    icon: 'questions',
    focus: 'Préparer vos questions',
  },
  {
    id: 'salaire',
    title: 'Simulateur de salaire cadre',
    serviceId: 'simulateur-salaire',
    official: 'Simulateur de salaire cadre',
    description: 'Situez votre rémunération par rapport au marché pour préparer vos prétentions salariales.',
    cta: 'Estimer mon salaire',
    group: 'outil',
    icon: 'calculator',
    focus: 'Préparer vos prétentions',
  },
]

export const CAS3_SOLUTIONS_TITLE = 'L’Apec vous accompagne pour préparer vos entretiens'
export const CAS3_SOLUTIONS_INTRO = 'Avec un consultant, en groupe ou en autonomie : choisissez la solution adaptée à votre besoin.'

/** Lien contextuel externe vérifié (page consultée le 20/11/2026, titre « Salaire brut / net : le convertisseur Urssaf »). */
export const URSSAF_BRUT_NET = 'https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net'

export function solutionHref(s: Solution, from = 'cas-3') {
  return `/service/${s.serviceId}?from=${from}`
}
