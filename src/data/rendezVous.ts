/**
 * Prise de rendez-vous individuel (côté candidat) : 17 motifs, regroupés selon les 4 situations
 * candidat de la page « Nos services » (mêmes intitulés et icônes, importés de situations.ts),
 * plus le « Rendez-vous conseil » réservé à l'encart « Je ne sais pas par où commencer ».
 *
 * Intitulés relevés sur la page « Tous nos services » d'apec.fr. Cinq motifs réutilisent des
 * services de « Nos services » ou du cas 01 (candidature, entretien-programme, cles-emploi, cep ;
 * changement-poste est déclaré ici et repris sur « Nos services ») : même identifiant, même intitulé et même « Idéal si » (piste2.ts).
 * Les douze autres sont déclarés ici et ajoutés au catalogue des services (fiche + réservation).
 *
 * Aucune durée, aucun prix ni aucune modalité n'est inventé : seules indications affichées,
 * « 45 min » pour « Réussir sa candidature » et « Gratuit » pour le CEP.
 * Les phrases « Idéal si… » sont des aides au choix rédigées par la candidate, pas des
 * informations officielles.
 */
import { IDEAL_IF } from './piste2'
import type { Modality, Service } from './services'

/** Les 4 situations candidat de « Nos services » (identifiants de situations.ts). */
export type RdvNeedId = 'nouvel-emploi' | 'premier-emploi' | 'evoluer' | 'reconversion'

export interface RdvMotif {
  serviceId: string
  /** Aide au choix (rédaction de la candidate). */
  ideal: string
  /** Seule information pratique affichée, lorsqu'elle est relevée sur apec.fr. */
  tag?: string
}

export interface RdvNeed {
  /** Identifiant de la situation (libellé et icône lus dans situations.ts). */
  id: RdvNeedId
  motifs: RdvMotif[]
}

const TBC = (label: Modality['label']): Modality => ({ label, value: `${label} à confirmer`, provenance: 'a-verifier' })

const NOTE =
  'Fiche d’aperçu : intitulé repris de la page « Tous nos services » d’apec.fr ; le contenu du rendez-vous n’est pas détaillé dans la démo.'

/** Rendez-vous individuel déclaré pour le panneau : intitulé officiel, rien d'autre d'affirmé. */
const rdv = (
  id: string,
  officialTitle: string,
  ideal: string,
  illustration: Service['illustration'] = 'echange',
  text?: { hook: string; benefit: string },
): Service => ({
  id,
  audience: 'candidat',
  officialTitle,
  titleProvenance: 'capture',
  hook: text?.hook ?? 'Un rendez-vous individuel avec un consultant Apec',
  benefit: text?.benefit ?? `Idéal si ${ideal}.`,
  kind: 'individuel',
  modalities: [TBC('Format'), TBC('Durée'), TBC('Tarif'), TBC('Public')],
  illustration,
  action: { kind: 'booking', label: 'Prendre rendez-vous' },
  depth: 'synthese',
  scopeNote: NOTE,
})

/** « Idéal si » propres au panneau ; ceux des services de « Nos services » viennent de piste2.ts. */
const IDEAL = {
  'potentiel-marche': 'vous voulez savoir si votre profil est recherché',
  'experience-talents': 'vous voulez valoriser votre parcours',
  doctorat: 'vous êtes docteur et visez l’entreprise',
  'mi-carriere': 'vous cherchez un nouveau défi',
  international: 'vous visez un poste à l’étranger',
  'rendez-vous-conseil': 'vous voulez faire le point sur votre situation',
  'solution-formation': 'vous voulez structurer et financer une formation',
  'diagnostic-formation': 'vous hésitez entre plusieurs formations',
  'formation-embauche': 'un poste vous attend, avec des compétences à acquérir',
  'pret-creation': 'vous vous posez la question',
  'challenger-idee': 'vous avez un projet à confronter',
  'accompagnement-creation': 'vous vous lancez',
} as const

/** Les rendez-vous déclarés pour le panneau (changement-poste est aussi affiché sur « Nos services »). */
export const RDV_SERVICES: Service[] = [
  rdv('potentiel-marche', 'Votre Potentiel Marché', IDEAL['potentiel-marche'], 'boussole'),
  rdv('experience-talents', 'Faire de son expérience un atout - Expérience et talents', IDEAL['experience-talents']),
  rdv('doctorat', 'Comment valoriser votre doctorat ?', IDEAL.doctorat, 'document'),
  // Aussi affiché sur « Nos services » (situation « évoluer ») : accroche propre.
  rdv('changement-poste', 'Concrétiser son changement de poste', IDEAL_IF['changement-poste'], 'boussole', {
    hook: 'Concrétisez votre changement de poste',
    benefit: 'Un rendez-vous individuel avec un consultant pour passer de l’opportunité au nouveau poste.',
  }),
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

/** Un seul « Idéal si » par service : celui de « Nos services » s'il existe, sinon celui du panneau. */
const m = (serviceId: string, tag?: string): RdvMotif => ({
  serviceId,
  ideal: IDEAL_IF[serviceId] ?? IDEAL[serviceId as keyof typeof IDEAL],
  tag,
})

/** Le premier motif de chaque situation est le rendez-vous mis en avant sur « Nos services ». */
export const RDV_NEEDS: RdvNeed[] = [
  {
    id: 'nouvel-emploi',
    motifs: [m('candidature', '45 min'), m('entretien-programme'), m('potentiel-marche'), m('experience-talents'), m('formation-embauche')],
  },
  { id: 'premier-emploi', motifs: [m('cles-emploi'), m('doctorat')] },
  { id: 'evoluer', motifs: [m('changement-poste'), m('mi-carriere'), m('international')] },
  {
    id: 'reconversion',
    motifs: [m('cep', 'Gratuit'), m('diagnostic-formation'), m('solution-formation'), m('pret-creation'), m('challenger-idee'), m('accompagnement-creation')],
  },
]

/** Porte d'entrée « Je ne sais pas par où commencer » (hors tuiles). */
export const RDV_START: RdvMotif = m('rendez-vous-conseil')

/** Total affiché dans « Voir les 17 motifs » : motifs des situations + Rendez-vous conseil. */
export const RDV_COUNT = RDV_NEEDS.reduce((n, g) => n + g.motifs.length, 0) + 1

/** Porte d'entrée pour les candidats qui ne savent pas par où commencer. */
export const RDV_START_ID = RDV_START.serviceId
