import { useEffect, useRef, useState } from 'react'
import { Booking } from '../components/Booking'
import { Case2Coulisses, CASE2_EVENTS } from '../components/Case2Coulisses'
import { ArrowLeft, ArrowRight, Chat, Check, External, Plus } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ModalityChips, Modalities } from '../components/Modalities'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { KindTag, KIND_TONE } from '../components/ServiceCard'
import { ALEX_PRESET, NEED_OPTIONS, SITUATION_OPTIONS, recommend, type Need } from '../data/onboarding'
import { getService } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding, type OnboardingStep } from '../lib/demoState'
import { Link } from '../lib/router'
import { track } from '../lib/storage'

const PROGRESS: { step: OnboardingStep; label: string }[] = [
  { step: 'situation', label: 'Situation' },
  { step: 'needs', label: 'Besoins' },
  { step: 'results', label: 'Suggestions' },
  { step: 'action', label: 'Première action' },
  { step: 'confirm', label: 'Confirmation' },
]

function Progress({ step }: { step: OnboardingStep }) {
  const index = PROGRESS.findIndex((p) => p.step === step)
  if (index < 0) return null
  return (
    <nav className="progress" aria-label="Progression">
      <p className="progress__count">Étape {index + 1} sur {PROGRESS.length}</p>
      <ol>
        {PROGRESS.map((p, i) => (
          <li
            key={p.step}
            className={i < index ? 'is-done' : i === index ? 'is-current' : ''}
            aria-current={i === index ? 'step' : undefined}
          >
            <span className="progress__dot" aria-hidden="true">{i < index ? <Check size={14} /> : i + 1}</span>
            <span className="progress__label">
              {p.label}
              {i < index && <span className="visually-hidden"> (terminée)</span>}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Case2({ path }: { path: string }) {
  const [state, setState] = useOnboarding()
  const [bookings, setBookings] = useBookings()
  const [error, setError] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const { step, answers } = state

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  const recs = recommend(answers)
  const recKey = step === 'results' ? recs.map((r) => r.serviceId).join(',') : ''
  useEffect(() => {
    if (recKey) track('recommendation_view', recKey)
  }, [recKey])

  const go = (next: OnboardingStep, completed?: string) => {
    if (completed) track('onboarding_step_complete', completed)
    setError('')
    setState((s) => ({ ...s, step: next }))
  }

  const toggleNeed = (n: Need) =>
    setState((s) => {
      const needs = s.answers.needs.includes(n) ? s.answers.needs.filter((x) => x !== n) : [...s.answers.needs, n]
      return { ...s, answers: { ...s.answers, needs } }
    })

  const chosen = state.chosenId ? getService(state.chosenId) : undefined
  const prefilled = answers.situation === ALEX_PRESET.situation

  const heading = (children: React.ReactNode, className = 'step__title') => (
    <h2 ref={headingRef} tabIndex={-1} className={className}>{children}</h2>
  )

  let body: React.ReactNode
  switch (step) {
    case 'welcome':
      body = (
        <div className="welcome">
          <div className="welcome__text">
            <p className="welcome__kicker">Votre compte est créé</p>
            {heading(<>Bienvenue Alex !</>, 'welcome__title')}
            <p className="lead">
              Ateliers, rendez-vous avec un consultant, outils en ligne : en trois questions, nous vous proposons par
              où commencer. Vous pouvez aussi parcourir tous nos services.
            </p>
            <div className="step__actions">
              <button type="button" className="btn btn--primary btn--lg" onClick={() => { track('onboarding_start'); go('situation') }}>
                Me guider <ArrowRight size={18} />
              </button>
              <Link to="/cas-1" className="btn btn--outline btn--lg">Explorer librement</Link>
            </div>
            <p className="small">
              Vous préférez en parler à quelqu’un ?{' '}
              <Link to="/reserver/cep?from=etapes">Prendre rendez-vous avec un consultant</Link>
            </p>
          </div>
          <div className="welcome__visual">
            <Illustration name="boussole" tone="yellow" className="welcome__img" />
          </div>
        </div>
      )
      break

    case 'situation':
      body = (
        <form className="step" noValidate onSubmit={(e) => {
          e.preventDefault()
          if (!answers.situation) return setError('Choisissez la situation qui vous correspond le mieux.')
          go('needs', 'situation')
        }}>
          {heading(<>Quelle est votre situation ?</>)}
          <fieldset aria-describedby={error ? 'err-situation' : 'help-situation'}>
            <legend className="visually-hidden">Votre situation</legend>
            <p id="help-situation" className="muted small">
              {prefilled ? 'Pré-rempli d’après votre inscription — vous pouvez le modifier.' : 'Une seule réponse.'}
            </p>
            <div className="choices choices--3">
              {SITUATION_OPTIONS.map((o) => (
                <label key={o.id} className={`choice choice--tile${answers.situation === o.id ? ' is-selected' : ''}`}>
                  <input type="radio" name="situation" value={o.id} checked={answers.situation === o.id}
                    onChange={() => { setError(''); setState((s) => ({ ...s, answers: { ...s.answers, situation: o.id } })) }} />
                  <span className="choice__body">
                    <span className="choice__title">{o.label}</span>
                    <span className="choice__meta">{o.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            {error && <p id="err-situation" className="field-error" role="alert">{error}</p>}
          </fieldset>
          <div className="step__actions">
            <button type="submit" className="btn btn--primary">Continuer <ArrowRight size={18} /></button>
            <button type="button" className="btn btn--link" onClick={() => go('welcome')}><ArrowLeft size={18} /> Retour</button>
          </div>
        </form>
      )
      break

    case 'needs':
      body = (
        <form className="step" noValidate onSubmit={(e) => {
          e.preventDefault()
          if (answers.needs.length === 0) return setError('Sélectionnez au moins un besoin pour voir nos suggestions.')
          setState((s) => ({ ...s, recs: recommend(s.answers).map((r) => r.serviceId), removed: [] }))
          go('results', 'needs')
        }}>
          {heading(<>De quoi avez-vous besoin en ce moment ?</>)}
          <fieldset aria-describedby={error ? 'err-needs' : 'help-needs'}>
            <legend className="visually-hidden">Vos besoins</legend>
            <p id="help-needs" className="muted small">Plusieurs réponses possibles.</p>
            <div className="choices choices--2">
              {NEED_OPTIONS.map((o) => (
                <label key={o.id} className={`choice choice--tile${answers.needs.includes(o.id) ? ' is-selected' : ''}`}>
                  <input type="checkbox" name="needs" value={o.id} checked={answers.needs.includes(o.id)}
                    onChange={() => { setError(''); toggleNeed(o.id) }} />
                  <span className="choice__body"><span className="choice__title">{o.label}</span></span>
                </label>
              ))}
            </div>
            {error && <p id="err-needs" className="field-error" role="alert">{error}</p>}
          </fieldset>

          {answers.needs.includes('entretien') && (
            <fieldset className="subquestion">
              <legend>Avez-vous déjà un entretien programmé ?</legend>
              <div className="choices choices--inline">
                {([[false, 'Pas encore'], [true, 'Oui, dans les prochains jours']] as const).map(([v, label]) => (
                  <label key={String(v)} className={`choice choice--chip${answers.interviewScheduled === v ? ' is-selected' : ''}`}>
                    <input type="radio" name="interview" checked={answers.interviewScheduled === v}
                      onChange={() => setState((s) => ({ ...s, answers: { ...s.answers, interviewScheduled: v } }))} />
                    <span className="choice__title">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <div className="step__actions">
            <button type="submit" className="btn btn--primary">Voir mes suggestions <ArrowRight size={18} /></button>
            <button type="button" className="btn btn--link" onClick={() => go('situation')}><ArrowLeft size={18} /> Retour</button>
          </div>
        </form>
      )
      break

    case 'results':
      body = (
        <div className="step">
          {heading(<>Nos suggestions pour bien démarrer</>)}
          <p className="muted">Sélectionnées d’après vos réponses. Retrouvez-les à tout moment dans « Mon espace ».</p>
          <Link to="/reserver/cep?from=etapes" className="help-link help-link--block">
            <Chat size={22} /> Vous préférez être conseillé par une personne ? <strong>Échanger avec un consultant</strong>
          </Link>
          <ol className="rec-list">
            {recs.map((r, i) => {
              const s = getService(r.serviceId)!
              return (
                <li key={r.serviceId} className={`rec rec--${KIND_TONE[s.kind]}`}>
                  <div className="rec__visual">
                    <Illustration name={s.illustration} tone={KIND_TONE[s.kind]} className="rec__img" />
                    <KindTag kind={s.kind} />
                    <span className="rec__rank" aria-hidden="true">{i + 1}</span>
                  </div>
                  <div className="rec__body">
                    <p className="svc__official">{s.officialTitle}</p>
                    <h3 className="rec__title">{s.hook}</h3>
                    <div className="rec__why">
                      <h4>Pourquoi ce service ?</h4>
                      <ul>
                        {r.reasons.map((reason) => (
                          <li key={reason}><Plus size={16} className="plus" /> {reason}</li>
                        ))}
                      </ul>
                    </div>
                    <ModalityChips items={s.modalities} />
                    <div className="rec__actions">
                      {s.action.kind === 'booking' ? (
                        <button type="button" className="btn btn--primary" onClick={() => {
                          track('service_cta_click', `${s.id} (accueil guidé)`)
                          setState((st) => ({ ...st, chosenId: s.id }))
                          go('action', 'results')
                        }}>
                          Commencer par ce service<span className="visually-hidden"> : {s.officialTitle}</span>
                        </button>
                      ) : (
                        <a className="btn btn--outline" href={s.action.url} target="_blank" rel="noopener noreferrer"
                          onClick={() => track('service_cta_click', `${s.id} (externe)`)}>
                          {s.action.label} <External size={18} />
                          <span className="visually-hidden"> (nouvel onglet)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="step__actions">
            <button type="button" className="btn btn--link" onClick={() => go('needs')}><ArrowLeft size={18} /> Modifier mes réponses</button>
            <Link to="/cas-2/prochaines-etapes" className="btn btn--outline">Mon espace</Link>
          </div>
        </div>
      )
      break

    case 'action':
      body = chosen ? (
        <div className="step">
          <div className="action-head">
            <div className="action-head__visual">
              <Illustration name={chosen.illustration} tone={KIND_TONE[chosen.kind]} className="action-head__img" />
              <KindTag kind={chosen.kind} />
            </div>
            <div>
              <p className="svc__official">{chosen.officialTitle}</p>
              {heading(<>{chosen.hook}</>)}
              <p>{chosen.benefit}</p>
            </div>
          </div>
          <Modalities items={chosen.modalities} />
          {chosen.details && (
            <ul className="plus-list">
              {chosen.details.points.map((p) => <li key={p}><Plus size={18} className="plus" /> {p}</li>)}
            </ul>
          )}
          <Booking
            key={chosen.id}
            service={chosen}
            cancelLabel="Revenir aux suggestions"
            onCancel={() => go('results')}
            onComplete={({ serviceId, slot }) => {
              setBookings((b) => ({ ...b, [serviceId]: slot }))
              go('confirm', 'action')
            }}
          />
        </div>
      ) : (
        <div className="step">
          {heading(<>Aucun service choisi</>)}
          <button type="button" className="btn btn--primary" onClick={() => go('results')}>Revenir aux suggestions</button>
        </div>
      )
      break

    case 'confirm': {
      const slot = chosen ? bookings[chosen.id] : undefined
      body = (
        <div className="step confirm">
          <span className="confirm__check" aria-hidden="true"><Check size={44} /></span>
          {heading(<>C’est noté, Alex !</>, 'step__title confirm__title')}
          {chosen && slot && (
            <dl className="recap">
              <div><dt>Service</dt><dd>{chosen.officialTitle}</dd></div>
              <div><dt>{chosen.kind === 'atelier' ? 'Session' : 'Rendez-vous'}</dt><dd>{slot.date} à {slot.time}</dd></div>
              <div><dt>Lieu</dt><dd>{slot.place}</dd></div>
            </dl>
          )}
          <p>Vos suggestions restent disponibles dans votre espace : vous pouvez les modifier, en retirer ou reprendre le guidage.</p>
          <div className="step__actions">
            <Link to="/cas-2/prochaines-etapes" className="btn btn--primary" onClick={() => track('onboarding_step_complete', 'confirm')}>
              Mes prochaines étapes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )
      break
    }
  }

  const barNotice =
    step === 'confirm'
      ? 'Simulation terminée — aucun rendez-vous réel n’a été réservé.'
      : step === 'action'
        ? 'Réservation simulée : créneaux fictifs, rien n’est envoyé.'
        : undefined

  return (
    <ProtoLayout
      path={path}
      caseLabel="Cas 2 · Accueil guidé"
      events={CASE2_EVENTS}
      barNotice={barNotice}
      onReset={() => setState(INITIAL_ONBOARDING)}
      coulisses={<Case2Coulisses />}
    >
      <PageBand back={{ to: '/espace', label: 'Mon espace' }} title="Bien démarrer" titleIsHeading={false} />
      <div className="container overlap">
        <div className={`sheet${step === 'welcome' ? ' sheet--flush' : ' sheet--narrow'}`}>
          <h1 className="visually-hidden" tabIndex={-1}>Bien démarrer — accueil après inscription</h1>
          <Progress step={step} />
          {body}
        </div>
      </div>
    </ProtoLayout>
  )
}
