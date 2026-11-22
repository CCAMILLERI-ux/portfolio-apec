import type { ReactNode } from 'react'
import { Link } from '../lib/router'
import { EventLog } from './EventLog'

/** Pied de page « Coulisses du prototype » : seul endroit où le prototype s'explique. */
export function Coulisses({ events, hidden, children }: { events: string[]; hidden?: boolean; children: ReactNode }) {
  return (
    <section id="coulisses" className="coulisses" tabIndex={-1} aria-labelledby="coulisses-titre" hidden={hidden}>
      <div className="pf-container">
        <h2 id="coulisses-titre" className="coulisses__title">Coulisses du prototype</h2>
        <p className="coulisses__hint">
          Retour au portfolio, réinitialisation et fermeture de ces explications : barre en haut de page.{' '}
          <Link to="/design-system" className="pf-link">Design system et sources</Link>
        </p>

        <div className="coulisses__content">{children}</div>

        <section className="cr-block cr-block--wide">
          <h3>Plan d’événements de la démo</h3>
          <p>
            Événements prévus ici : {events.map((e, i) => (
              <span key={e}>{i > 0 && ', '}<code>{e}</code></span>
            ))}.
            Ce journal illustre le plan de marquage : ce ne sont <strong>pas</strong> des résultats d’expérimentation.
          </p>
          <EventLog />
        </section>
      </div>
    </section>
  )
}

export interface CroRubrics {
  constat: ReactNode
  hypothese: ReactNode
  modification: ReactNode
  kpi: ReactNode
  equipes: ReactNode
}

const LABELS: [keyof CroRubrics, string][] = [
  ['constat', '1. Besoin utilisateur et constat observable'],
  ['hypothese', '2. Hypothèse (à tester, sans gain affirmé)'],
  ['modification', '3. Modification proposée'],
  ['kpi', '4. KPI et garde-fous'],
  ['equipes', '5. Équipes et vérifications nécessaires'],
]

export function CroGrid({ rubrics }: { rubrics: CroRubrics }) {
  return (
    <div className="cr-grid">
      {LABELS.map(([key, label]) => (
        <section key={key} className="cr-block">
          <h3>{label}</h3>
          <div>{rubrics[key]}</div>
        </section>
      ))}
    </div>
  )
}

/** Bloc libre des coulisses. */
export function CrBlock({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className="cr-block cr-block--wide">
      <h3>{title}</h3>
      {children}
    </section>
  )
}
