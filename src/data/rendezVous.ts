/**
 * Prise de rendez-vous individuel (côté candidat) : 17 motifs, regroupés en 5 besoins.
 *
 * Intitulés relevés sur la page « Tous nos services » d'apec.fr. Trois motifs réutilisent
 * des services déjà présents dans la démo (candidature, entretien-programme, cep) ; les
 * quatorze autres sont déclarés ici et ajoutés au catalogue des services (fiche + réservation).
 *
 * Aucune durée, aucun prix ni aucune modalité n'est inventé : seules indications affichées,
 * « 45 min » pour « Réussir sa candidature » et « Gratuit » pour le CEP.
 * Les phrases « Idéal si… » sont des aides au choix rédigées par la candidate, pas des
 * informations officielles.
 */
import type { Modality, Service } from './services'

export type RdvNeedId = 'poste' | 'evoluer' | 'point' | 'former' | 'creer'

export interface RdvMotif {
  serviceId: string
  /** Aide au choix (rédaction de la candidate). */
  ideal: string
  /** Seule information pratique affichée, lorsqu'elle est relevée sur apec.fr. */
  tag?: string
}

export interface RdvNeed {
  id: RdvNeedId
  label: string
  motifs: RdvMotif[]
}

const TBC = (label: Modality['label']): Modality => ({ label, value: `${label} à confirmer`, provenance: 'a-verifier' })

const NOTE =
  'Fiche d’aperçu : intitulé repris de la page « Tous nos services » d’apec.fr ; le contenu du rendez-vous n’est pas détaillé dans la démo.'

/** Rendez-vous individuel déclaré pour le panneau : intitulé officiel, rien d'autre d'affirmé. */
const rdv = (id: string, officialTitle: string, ideal: string, illustration: Service['illustration'] = 'echange'): Service => ({
  id,
  audience: 'candidat',
  officialTitle,
  titleProvenance: 'capture',
  hook: 'Un rendez-vous individuel avec un consultant Apec',
  benefit: `Idéal si ${ideal}.`,
  kind: 'individuel',
  modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
  illustration,
  action: { kind: 'booking', label: 'Prendre rendez-vous' },
  depth: 'synthese',
  scopeNote: NOTE,
})

const IDEAL = {
  candidature: 'vous voulez un avis sur votre CV et votre lettre',
  'entretien-programme': 'vous avez un entretien dans les prochains jours',
  'potentiel-marche': 'vous voulez savoir si votre profil est recherché',
  'experience-talents': 'vous voulez valoriser votre parcours',
  doctorat: 'vous êtes docteur et visez l’entreprise',
  'cles-emploi': 'votre premier emploi tarde à venir',
  'changement-poste': 'une opportunité se présente',
  'mi-carriere': 'vous cherchez un nouveau défi',
  international: 'vous visez un poste à l’étranger',
  cep: 'vous voulez construire votre projet',
  'rendez-vous-conseil': 'vous voulez faire le point sur votre situation',
  'solution-formation': 'vous voulez structurer et financer une formation',
  'diagnostic-formation': 'vous hésitez entre plusieurs formations',
  'formation-embauche': 'un poste vous attend, avec des compétences à acquérir',
  'pret-creation': 'vous vous posez la question',
  'challenger-idee': 'vous avez un projet à confronter',
  'accompagnement-creation': 'vous vous lancez',
} as const

/** Les quatorze rendez-vous qui n'existaient pas encore dans la démo. */
export const RDV_SERVICES: Service[] = [
  rdv('potentiel-marche', 'Votre Potentiel Marché', IDEAL['potentiel-marche'], 'boussole'),
  rdv('experience-talents', 'Faire de son expérience un atout - Expérience et talents', IDEAL['experience-talents']),
  rdv('doctorat', 'Comment valoriser votre doctorat ?', IDEAL.doctorat, 'document'),
  rdv('cles-emploi', 'Clés d’Emploi', IDEAL['cles-emploi']),
  rdv('changement-poste', 'Concrétiser son changement de poste', IDEAL['changement-poste'], 'boussole'),
  rdv('mi-carriere', 'Evoluer à mi-carrière', IDEAL['mi-carriere'], 'boussole'),
  rdv('international', 'Rendez-vous conseil international', IDEAL.international, 'boussole'),
  rdv('rendez-vous-conseil', 'Rendez-vous conseil', IDEAL['rendez-vous-conseil']),
  rdv('solution-formation', 'Solution Formation', IDEAL['solution-formation'], 'document'),
  rdv('diagnostic-formation', 'Diagnostic Formation', IDEAL['diagnostic-formation'], 'document'),
  rdv('formation-embauche', 'Une prise de poste efficace avec une formation avant l’embauche', IDEAL['formation-embauche'], 'document'),
  rdv('pret-creation', 'Etes-vous prêt pour la création d’entreprise ?', IDEAL['pret-creation'], 'boussole'),
  rdv('challenger-idee', 'Créer son entreprise : challenger son idée', IDEAL['challenger-idee'], 'boussole'),
  rdv('accompagnement-creation', 'Etre accompagné dans sa création d’entreprise', IDEAL['accompagnement-creation'], 'boussole'),
]

const m = (serviceId: keyof typeof IDEAL, tag?: string): RdvMotif => ({ serviceId, ideal: IDEAL[serviceId], tag })

export const RDV_NEEDS: RdvNeed[] = [
  {
    id: 'poste',
    label: 'Décrocher un poste',
    motifs: [m('candidature', '45 min'), m('entretien-programme'), m('potentiel-marche'), m('experience-talents'), m('doctorat'), m('cles-emploi')],
  },
  { id: 'evoluer', label: 'Évoluer, changer de poste', motifs: [m('changement-poste'), m('mi-carriere'), m('international')] },
  { id: 'point', label: 'Faire le point, me reconvertir', motifs: [m('cep', 'Gratuit'), m('rendez-vous-conseil')] },
  { id: 'former', label: 'Me former', motifs: [m('solution-formation'), m('diagnostic-formation'), m('formation-embauche')] },
  { id: 'creer', label: 'Créer mon entreprise', motifs: [m('pret-creation'), m('challenger-idee'), m('accompagnement-creation')] },
]

export const RDV_COUNT = RDV_NEEDS.reduce((n, g) => n + g.motifs.length, 0)

/** Porte d'entrée pour les candidats qui ne savent pas par où commencer. */
export const RDV_START_ID = 'rendez-vous-conseil'
