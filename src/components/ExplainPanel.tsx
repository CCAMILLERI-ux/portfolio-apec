import type { ReactNode } from 'react'
import { EventLog } from './EventLog'

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

/**
 * Second niveau de lecture, replié par défaut : la démo d'abord, la méthode ensuite.
 */
export function ExplainPanel({
  rubrics,
  events,
  children,
  id = 'comprendre',
}: {
  rubrics: CroRubrics
  events: string[]
  children?: ReactNode
  id?: string
}) {
  return (
    <details className="explain" id={id}>
      <summary>
        <span className="explain__title">Comprendre mes choix</span>
        <span className="explain__hint">Méthode, hypothèses et mesure — lecture facultative</span>
      </summary>
      <div className="explain__body">
        <div className="explain__grid">
          {LABELS.map(([key, label]) => (
            <section key={key} className="explain__rubric">
              <h3>{label}</h3>
              <div>{rubrics[key]}</div>
            </section>
          ))}
        </div>
        {children}
        <section className="explain__rubric explain__rubric--wide">
          <h3>Plan d’événements de la démo</h3>
          <p>
            Événements prévus pour ce cas : {events.map((e, i) => (
              <span key={e}>{i > 0 && ', '}<code>{e}</code></span>
            ))}. Ils sont enregistrés uniquement dans ce navigateur, sans donnée personnelle ni traceur
            externe. Ce journal sert à vérifier l’instrumentation : ce ne sont <strong>pas</strong> des
            résultats d’expérimentation.
          </p>
          <EventLog />
        </section>
      </div>
    </details>
  )
}
