import { useRef, useState } from 'react'
import { Badge } from '../components/Badge'
import { Case2Explain } from '../components/Case2Explain'
import { ArrowRight, Calendar, External, Reset } from '../components/Icons'
import { PageBand } from '../components/PageBand'
import { getService, KIND_LABEL } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding } from '../lib/demoState'
import { Link, navigate } from '../lib/router'
import { resetAll } from '../lib/storage'

export function NextSteps() {
  const [state, setState] = useOnboarding()
  const [bookings] = useBookings()
  const [status, setStatus] = useState('')
  const listRef = useRef<HTMLHeadingElement>(null)

  const kept = state.recs.filter((id) => !state.removed.includes(id))
  const removed = state.recs.filter((id) => state.removed.includes(id))

  const remove = (id: string) => {
    setState((s) => ({ ...s, removed: [...s.removed, id] }))
    setStatus(`${getService(id)?.officialTitle} retiré de vos prochaines étapes.`)
    listRef.current?.focus()
  }
  const restore = (id: string) => {
    setState((s) => ({ ...s, removed: s.removed.filter((x) => x !== id) }))
    setStatus(`${getService(id)?.officialTitle} rétabli.`)
  }

  return (
    <>
      <PageBand
        back={{ to: '/cas-2', label: 'Accueil guidé · Cas 2' }}
        title="Mes prochaines étapes"
        onReset={() => setState(INITIAL_ONBOARDING)}
      />
      <div className="container overlap">
        <div className="sheet sheet--narrow">
          <p className="scenario">
            <Badge tone="demo">Démo</Badge> Sauvegarde locale de démonstration, dans ce navigateur
            uniquement. Profil fictif « Alex ».
          </p>
          <p className="visually-hidden" role="status" aria-live="polite">{status}</p>

          <h2 ref={listRef} tabIndex={-1} className="step__title">
            Services conservés ({kept.length})
          </h2>

          {kept.length === 0 ? (
            <div className="empty">
              <p>Aucun service conservé pour l’instant.</p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setState((s) => ({ ...s, step: s.answers.needs.length ? 'needs' : 'welcome' }))
                  navigate('/cas-2')
                }}
              >
                Reprendre le guidage
              </button>
            </div>
          ) : (
            <ul className="next-list">
              {kept.map((id) => {
                const s = getService(id)!
                const slot = bookings[id]
                return (
                  <li key={id} className="next-item">
                    <div className="next-item__main">
                      <Badge tone="kind">{KIND_LABEL[s.kind]}</Badge>
                      <h3 className="next-item__title">{s.officialTitle}</h3>
                      <p className="muted">{s.hook}</p>
                      {slot ? (
                        <p className="next-item__status">
                          <Calendar size={18} />
                          <span>
                            Réservation simulée : {slot.date} à {slot.time}.{' '}
                            <strong>Aucun rendez-vous réel.</strong>
                          </span>
                        </p>
                      ) : (
                        <p className="next-item__status next-item__status--todo">À faire</p>
                      )}
                    </div>
                    <div className="next-item__actions">
                      {!slot && s.action.kind === 'booking' && (
                        <Link to={`/reserver/${id}?from=etapes`} className="btn btn--primary btn--sm">
                          {s.action.label}<span className="visually-hidden"> : {s.officialTitle}</span>
                        </Link>
                      )}
                      {s.action.kind === 'external' && (
                        <a className="btn btn--outline btn--sm" href={s.action.url} target="_blank" rel="noopener noreferrer">
                          {s.action.label} <External size={16} />
                          <span className="visually-hidden"> (site externe, nouvel onglet)</span>
                        </a>
                      )}
                      <Link to={`/service/${id}?from=etapes`} className="link-arrow">
                        Fiche<span className="visually-hidden"> {s.officialTitle}</span> <ArrowRight size={16} />
                      </Link>
                      <button type="button" className="btn btn--link btn--sm" onClick={() => remove(id)}>
                        Retirer<span className="visually-hidden"> {s.officialTitle}</span>
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {removed.length > 0 && (
            <div className="removed">
              <h3 className="h3-like">Retirés</h3>
              <ul>
                {removed.map((id) => (
                  <li key={id}>
                    {getService(id)?.officialTitle}{' '}
                    <button type="button" className="btn btn--link btn--sm" onClick={() => restore(id)}>
                      Rétablir<span className="visually-hidden"> {getService(id)?.officialTitle}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="step__actions step__actions--wrap">
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => {
                setState((s) => ({ ...s, step: 'needs' }))
                navigate('/cas-2')
              }}
            >
              Modifier mes besoins
            </button>
            {state.recs.length > 0 && (
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => {
                  setState((s) => ({ ...s, step: 'results' }))
                  navigate('/cas-2')
                }}
              >
                Reprendre le guidage
              </button>
            )}
            <button
              type="button"
              className="btn btn--link"
              onClick={() => {
                resetAll()
                setState(INITIAL_ONBOARDING)
                setStatus('Démo remise à zéro.')
              }}
            >
              <Reset size={18} /> Remettre à zéro
            </button>
          </div>
          <p className="muted small">
            Envie de voir tous les services ? <Link to="/cas-1">Explorer librement</Link>
          </p>
        </div>
        <Case2Explain />
      </div>
    </>
  )
}
