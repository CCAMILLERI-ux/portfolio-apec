import { useEffect, useRef, useState } from 'react'
import { Badge } from '../components/Badge'
import { Booking, SimulationNotice } from '../components/Booking'
import { Case2Explain } from '../components/Case2Explain'
import { ArrowLeft, ArrowRight, Check, External, Info, Plus } from '../components/Icons'
import { Modalities } from '../components/Modalities'
import { PageBand } from '../components/PageBand'
import {
  ALEX_PRESET,
  NEED_OPTIONS,
  SITUATION_OPTIONS,
  recommend,
  type Need,
} from '../data/onboarding'
import { getService, KIND_LABEL } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding, type OnboardingStep } from '../lib/demoState'
import { Link } from '../lib/router'
import { track } from '../lib/storage'

const PROGRESS: { step: OnboardingStep; label: string }[] = [
  { step: 'situation', label: 'Situation' },
  { step: 'needs', label: 'Besoins' },
  { step: 'results', label: 'Recommandations' },
  { step: 'action', label: 'Première action' },
  { step: 'confirm', label: 'Confirmation' },
]

function Progress({ step }: { step: OnboardingStep }) {
  const index = PROGRESS.findIndex((p) => p.step === step)
  if (index < 0) return null
  return (
    <nav className="progress" aria-label="Progression du guidage">
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

export function Case2() {
  const [state, setState] = useOnboarding()
  const [, setBookings] = useBookings()
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

  // Une vue de recommandations = un événement, à l'arrivée sur l'écran.
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
      const needs = s.answers.needs.includes(n)
        ? s.answers.needs.filter((x) => x !== n)
        : [...s.answers.needs, n]
      return { ...s, answers: { ...s.answers, needs } }
    })

  const chosen = state.chosenId ? getService(state.chosenId) : undefined
  const isPreset =
    answers.situation === ALEX_PRESET.situation &&
    answers.needs.join() === ALEX_PRESET.needs.join()

  const heading = (children: React.ReactNode) => (
    <h2 ref={headingRef} tabIndex={-1} className="step__title">{children}</h2>
  )

  let body: React.ReactNode
  switch (step) {
    case 'welcome':
      body = (
        <div className="step">
          <p className="scenario">
            <Badge tone="demo">Scénario fictif</Badge> Alex, cadre expérimenté, vient de créer son compte
            pour chercher un emploi. Il connaît peu les ateliers, outils et accompagnements.
            <span className="muted"> Création de compte simulée : aucun email ni mot de passe demandé.</span>
          </p>
          {heading(<>Bienvenue, Alex. Votre compte est créé.</>)}
          <p className="lead">
            Voulez-vous une découverte guidée ? Trois questions rapides pour vous proposer jusqu’à trois
            services adaptés. Le guidage est facultatif : tous les services restent accessibles.
          </p>
          <div className="step__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                track('onboarding_start')
                go('situation')
              }}
            >
              Me guider <ArrowRight size={18} />
            </button>
            <Link to="/cas-1" className="btn btn--outline">Explorer librement</Link>
          </div>
          <p className="muted small">
            Vous préférez en parler à quelqu’un ?{' '}
            <Link to="/reserver/cep?from=etapes">Prendre un rendez-vous avec un consultant (simulé)</Link>
          </p>
        </div>
      )
      break

    case 'situation':
      body = (
        <form
          className="step"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            if (!answers.situation) return setError('Choisissez la situation qui vous correspond le mieux.')
            go('needs', 'situation')
          }}
        >
          {heading(<>Quelle est votre situation ?</>)}
          <fieldset aria-describedby={error ? 'err-situation' : 'help-situation'}>
            <legend className="visually-hidden">Votre situation</legend>
            <p id="help-situation" className="muted small">
              {answers.situation === ALEX_PRESET.situation
                ? 'Présélectionné d’après le scénario d’Alex — vous pouvez le modifier.'
                : 'Une seule réponse.'}
            </p>
            <div className="choices">
              {SITUATION_OPTIONS.map((o) => (
                <label key={o.id} className={`choice${answers.situation === o.id ? ' is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="situation"
                    value={o.id}
                    checked={answers.situation === o.id}
                    onChange={() => {
                      setError('')
                      setState((s) => ({ ...s, answers: { ...s.answers, situation: o.id } }))
                    }}
                  />
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
            <button type="button" className="btn btn--link" onClick={() => go('welcome')}>
              <ArrowLeft size={18} /> Retour
            </button>
          </div>
        </form>
      )
      break

    case 'needs':
      body = (
        <form
          className="step"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            if (answers.needs.length === 0) return setError('Sélectionnez au moins un besoin pour obtenir des recommandations.')
            setState((s) => ({ ...s, recs: recommend(s.answers).map((r) => r.serviceId), removed: [] }))
            go('results', 'needs')
          }}
        >
          {heading(<>De quoi avez-vous besoin en ce moment ?</>)}
          <fieldset aria-describedby={error ? 'err-needs' : 'help-needs'}>
            <legend className="visually-hidden">Vos besoins</legend>
            <p id="help-needs" className="muted small">
              Plusieurs réponses possibles.
              {isPreset && ' Présélection du scénario d’Alex, modifiable.'}
            </p>
            <div className="choices choices--2">
              {NEED_OPTIONS.map((o) => (
                <label key={o.id} className={`choice choice--check${answers.needs.includes(o.id) ? ' is-selected' : ''}`}>
                  <input
                    type="checkbox"
                    name="needs"
                    value={o.id}
                    checked={answers.needs.includes(o.id)}
                    onChange={() => {
                      setError('')
                      toggleNeed(o.id)
                    }}
                  />
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
                {[
                  [false, 'Pas encore'],
                  [true, 'Oui, dans les prochains jours'],
                ].map(([v, label]) => (
                  <label key={String(v)} className={`choice choice--chip${answers.interviewScheduled === v ? ' is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="interview"
                      checked={answers.interviewScheduled === v}
                      onChange={() =>
                        setState((s) => ({ ...s, answers: { ...s.answers, interviewScheduled: v as boolean } }))
                      }
                    />
                    <span className="choice__title">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <p className="muted small">
            <Info size={16} /> Votre âge n’est pas demandé : les recommandations reposent uniquement sur vos réponses.
          </p>
          <div className="step__actions">
            <button type="submit" className="btn btn--primary">Voir mes recommandations <ArrowRight size={18} /></button>
            <button type="button" className="btn btn--link" onClick={() => go('situation')}>
              <ArrowLeft size={18} /> Retour
            </button>
          </div>
        </form>
      )
      break

    case 'results':
      body = (
        <div className="step">
          {heading(<>Nos suggestions pour commencer</>)}
          <p className="muted">
            {recs.length} service{recs.length > 1 ? 's' : ''} sélectionné{recs.length > 1 ? 's' : ''} d’après vos réponses.
            Ils sont conservés dans « Mes prochaines étapes ».
          </p>
          <ol className="rec-list">
            {recs.map((r, i) => {
              const s = getService(r.serviceId)!
              return (
                <li key={r.serviceId} className="rec">
                  <div className="rec__head">
                    <span className="rec__rank" aria-hidden="true">{i + 1}</span>
                    <div>
                      <Badge tone="kind">{KIND_LABEL[s.kind]}</Badge>
                      <h3 className="rec__title">{s.hook}</h3>
                      <p className="rec__official">Service existant : {s.officialTitle}</p>
                    </div>
                  </div>
                  <div className="rec__why">
                    <h4>Pourquoi ce service ?</h4>
                    <ul>
                      {r.reasons.map((reason) => (
                        <li key={reason}><Plus size={16} className="plus" /> {reason}</li>
                      ))}
                    </ul>
                  </div>
                  <Modalities items={s.modalities} compact />
                  <div className="rec__actions">
                    {s.action.kind === 'booking' ? (
                      <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() => {
                          track('service_cta_click', `${s.id} (accueil guidé)`)
                          setState((st) => ({ ...st, chosenId: s.id }))
                          go('action', 'results')
                        }}
                      >
                        Commencer par ce service<span className="visually-hidden"> : {s.officialTitle}</span>
                      </button>
                    ) : (
                      <a className="btn btn--outline" href={s.action.url} target="_blank" rel="noopener noreferrer"
                        onClick={() => track('service_cta_click', `${s.id} (externe)`)}>
                        {s.action.label} <External size={18} />
                        <span className="visually-hidden"> (site externe, nouvel onglet)</span>
                      </a>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
          <aside className="human-help">
            <h3 className="h3-like">Vous préférez être conseillé par une personne ?</h3>
            <p>Un consultant peut vous aider à choisir. Rendez-vous simulé dans cette démo.</p>
            <Link to="/reserver/cep?from=etapes" className="link-arrow">
              Échanger avec un consultant (simulé) <ArrowRight size={18} />
            </Link>
          </aside>
          <div className="step__actions">
            <button type="button" className="btn btn--link" onClick={() => go('needs')}>
              <ArrowLeft size={18} /> Modifier mes réponses
            </button>
            <Link to="/cas-2/prochaines-etapes" className="btn btn--outline">Mes prochaines étapes</Link>
          </div>
        </div>
      )
      break

    case 'action':
      body = chosen ? (
        <div className="step">
          {heading(<>{chosen.hook}</>)}
          <p className="rec__official">Service existant : {chosen.officialTitle}</p>
          <Modalities items={chosen.modalities} />
          <p>{chosen.benefit}</p>
          {chosen.details && (
            <ul className="plus-list">
              {chosen.details.points.map((p) => (
                <li key={p}><Plus size={18} className="plus" /> {p}</li>
              ))}
            </ul>
          )}
          <Booking
            key={chosen.id}
            service={chosen}
            cancelLabel="Revenir aux recommandations"
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
          <button type="button" className="btn btn--primary" onClick={() => go('results')}>Revenir aux recommandations</button>
        </div>
      )
      break

    case 'confirm':
      body = (
        <div className="step">
          <SimulationNotice after />
          {heading(<>C’est noté, Alex — dans la simulation.</>)}
          {chosen && <ConfirmRecap serviceId={chosen.id} />}
          <p>
            Vos recommandations sont conservées dans « Mes prochaines étapes ». Vous pouvez les modifier,
            en retirer ou reprendre le guidage.
          </p>
          <div className="step__actions">
            <Link
              to="/cas-2/prochaines-etapes"
              className="btn btn--primary"
              onClick={() => track('onboarding_step_complete', 'confirm')}
            >
              Mes prochaines étapes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )
      break
  }

  return (
    <>
      <PageBand
        back={{ to: '/', label: 'Portfolio · Cas 2' }}
        title="Accueil guidé après une première inscription"
        onReset={() => setState(INITIAL_ONBOARDING)}
      />
      <div className="container overlap">
        <div className="sheet sheet--narrow">
          <Progress step={step} />
          {body}
        </div>
        <Case2Explain />
      </div>
    </>
  )
}

function ConfirmRecap({ serviceId }: { serviceId: string }) {
  const [bookings] = useBookings()
  const slot = bookings[serviceId]
  const s = getService(serviceId)
  if (!slot || !s) return null
  return (
    <dl className="recap">
      <div><dt>Service</dt><dd>{s.officialTitle}</dd></div>
      <div><dt>{s.kind === 'atelier' ? 'Session' : 'Rendez-vous'}</dt><dd>{slot.date} à {slot.time} <Badge tone="demo">Fictif</Badge></dd></div>
      <div><dt>Lieu</dt><dd>{slot.place}</dd></div>
    </dl>
  )
}
