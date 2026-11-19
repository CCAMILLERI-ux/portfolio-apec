/**
 * Entrées « par situation » du cas 1. Les codes P1–P6 sont des personas de
 * travail (hypothèses de la candidate, non validés par l'Apec). Ils ne sont
 * jamais affichés aux visiteurs dans la démo utilisateur.
 */
export interface Situation {
  id: string
  persona: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6'
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
  {
    id: 'optimiser-recrutements',
    persona: 'P6',
    label: 'Je souhaite optimiser mes recrutements',
    personaNote: 'Recruteur ou RH professionnel',
    serviceIds: ['recherche-profils', 'audit-sourcing', 'marque-employeur'],
  },
]

export const ALL_DEMO_SERVICE_IDS = Array.from(
  new Set(SITUATIONS.flatMap((s) => s.serviceIds)),
)
