import { useRef, useState } from 'react'
import { Case2Coulisses, CASE2_EVENTS } from '../components/Case2Coulisses'
import { ArrowRight, Calendar, External } from '../components/Icons'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { KindTag, KIND_TONE } from '../components/ServiceCard'
import { getService } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding } from '../lib/demoState'
import { Link, navigate } from '../lib/router'

export function NextSteps({ path }: { path: string }) {
  const [state, setState] = useOnboarding()
  const [bookings] = useBookings()
  const [status, setStatus] = useState('')
  const listRef = useRef<HTMLHeadingElement>(null)

  const kept = state.recs.filter((id) => !state.removed.includes(id))
  const removed = state.recs.filter((id) => state.removed.includes(id))
  const hasBooking = kept.some((id) => bookings[id])

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
    <ProtoLayout
      path={path}
      caseLabel="Cas 2 · Accueil guidé"
      events={CASE2_EVENTS}
      barNotice={hasBooking ? 'Rendez-vous simulés — aucun rendez-vous réel n’a été réservé.' : undefined}
      onReset={() => setState(INITIAL_ONBOARDING)}
      coulisses={<Case2Coulisses />}
    >
      <PageBand back={{ to: '/espace', label: 'Mon espace' }} title="Mes prochaines étapes" />
      <div className="container overlap">
        <div className="sheet sheet--narrow">
          <p className="visually-hidden" role="status" aria-live="polite">{status}</p>
          <h2 ref={listRef} tabIndex={-1} className="step__title">
            Services conservés ({kept.length})
          </h2>

          {kept.length === 0 ? (
            <div className="empty">
              <p>Vous n’avez pas encore de service dans votre liste.</p>
              <button type="button" className="btn btn--primary" onClick={() => {
                setState((s) => ({ ...s, step: s.answers.needs.length ? 'needs' : 'welcome' }))
                navigate('/cas-2')
              }}>
                Me guider
              </button>
            </div>
          ) : (
            <ul className="next-list">
              {kept.map((id) => {
                const s = getService(id)!
                const slot = bookings[id]
                return (
                  <li key={id} className={`next-item next-item--${KIND_TONE[s.kind]}`}>
                    <div className="next-item__tag"><KindTag kind={s.kind} /></div>
                    <div className="next-item__main">
                      <h3 className="next-item__title">{s.officialTitle}</h3>
                      <p className="muted">{s.hook}</p>
                      {slot ? (
                        <p className="next-item__status">
                          <Calendar size={18} /> <span><strong>Réservé :</strong> {slot.date} à {slot.time} — {slot.place}</span>
                        </p>
                      ) : (
                        <p className="next-item__status next-item__status--todo">À faire</p>
                      )}
                      <div className="next-item__actions">
                        {!slot && s.action.kind === 'booking' && (
                          <Link to={`/reserver/${id}?from=etapes`} className="btn btn--primary btn--sm">
                            {s.action.label}<span className="visually-hidden"> : {s.officialTitle}</span>
                          </Link>
                        )}
                        {s.action.kind === 'external' && (
                          <a className="btn btn--outline btn--sm" href={s.action.url} target="_blank" rel="noopener noreferrer">
                            {s.action.label} <External size={16} />
                            <span className="visually-hidden"> (nouvel onglet)</span>
                          </a>
                        )}
                        <Link to={`/service/${id}?from=etapes`} className="link-arrow">
                          En savoir plus<span className="visually-hidden"> : {s.officialTitle}</span> <ArrowRight size={16} />
                        </Link>
                        <button type="button" className="btn btn--link btn--sm" onClick={() => remove(id)}>
                          Retirer<span className="visually-hidden"> {s.officialTitle}</span>
                        </button>
                      </div>
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
            <button type="button" className="btn btn--outline" onClick={() => {
              setState((s) => ({ ...s, step: 'needs' }))
              navigate('/cas-2')
            }}>
              Modifier mes besoins
            </button>
            {state.recs.length > 0 && (
              <button type="button" className="btn btn--outline" onClick={() => {
                setState((s) => ({ ...s, step: 'results' }))
                navigate('/cas-2')
              }}>
                Reprendre le guidage
              </button>
            )}
            <Link to="/cas-1" className="link-arrow">Voir tous nos services <ArrowRight size={18} /></Link>
          </div>
        </div>
      </div>
    </ProtoLayout>
  )
}
