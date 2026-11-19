import { useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { EventLog } from './EventLog'
import { DISCLAIMER, SIGNATURE } from './PortfolioLayout'
import { Home, Reset } from './Icons'

/** Pied de page « Coulisses du prototype » : seul endroit où le prototype s'explique. */
export function Coulisses({ events, onReset, children }: { events: string[]; onReset: () => void; children: ReactNode }) {
  const [status, setStatus] = useState('')
  return (
    <section id="coulisses" className="coulisses" tabIndex={-1} aria-labelledby="coulisses-titre">
      <div className="pf-container">
        <p className="coulisses__kicker">{SIGNATURE}</p>
        <h2 id="coulisses-titre" className="coulisses__title">Coulisses du prototype</h2>
        <p className="coulisses__disclaimer">{DISCLAIMER}</p>
        <div className="coulisses__tools">
          <Link to="/" className="pf-btn"><Home size={18} /> Retour au portfolio</Link>
          <button
            type="button"
            className="pf-btn"
            onClick={() => {
              onReset()
              setStatus('Démo réinitialisée : choix, réservations simulées et journal local effacés.')
            }}
          >
            <Reset size={18} /> Réinitialiser la démo
          </button>
          <Link to="/sources" className="pf-link">Sources, limites et mini-kit UI</Link>
          <span className="coulisses__status" role="status" aria-live="polite">{status}</span>
        </div>

        <div className="coulisses__content">{children}</div>

        <section className="cr-block cr-block--wide">
          <h3>Plan d’événements de la démo</h3>
          <p>
            Événements prévus ici : {events.map((e, i) => (
              <span key={e}>{i > 0 && ', '}<code>{e}</code></span>
            ))}. Enregistrés uniquement dans ce navigateur, sans donnée personnelle ni traceur externe.
            Ce journal vérifie l’instrumentation : ce ne sont <strong>pas</strong> des résultats d’expérimentation.
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
