import { useEffect, useRef, useState } from 'react'
import { Booking } from '../components/Booking'
import { Case2Coulisses, CASE2_EVENTS } from '../components/Case2Coulisses'
import { ArrowLeft, ArrowRight, Calendar, Chat, Check, Clock, Compass, Doc, External, Plus, Search, Target, TrendUp } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ModalityChips, Modalities } from '../components/Modalities'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { KindTag, KIND_TONE } from '../components/ServiceCard'
import { SERVICE_PHOTO } from '../data/photos'
import { FORMAT_LABEL } from '../data/situations'
import { nb } from '../lib/text'
import { ALEX_PRESET, NEED_OPTIONS, SITUATION_OPTIONS, recommend, TOP_COUNT, type Need } from '../data/onboarding'
import { Picto } from '../components/Picto'
import type { Service } from '../data/services'
import { getService } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding, type OnboardingStep } from '../lib/demoState'
import { Link } from '../lib/router'
import { track } from '../lib/storage'

/** Grandes icônes au trait des tuiles de choix (même famille que la boussole et les tuiles du cas 02). */
const SITUATION_ICON = { recherche: Search, evolution: TrendUp, changement: Compass } as const
const NEED_ICON = { valoriser: Target, cv: Doc, entretien: Chat, possibilites: Compass } as const

const PROGRESS: { step: OnboardingStep; label: string }[] = [
  { step: 'situation', label: 'Situation' },
  { step: 'needs', label: 'Besoins' },
  { step: 'results', label: 'Suggestions' },
  { step: 'program', label: 'Mon programme' },
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
  const [status, setStatus] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const { step, answers } = state

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step, state.chosenId])

  const recs = recommend(answers)
  const top = recs.slice(0, TOP_COUNT)
  const more = recs.slice(TOP_COUNT)
  const program = state.program
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
  const countLabel = (n: number) => `${n} service${n > 1 ? 's' : ''} dans mon programme`

  /** Ajoute ou retire un service du programme (plusieurs choix possibles). */
  const toggle = (s: Service) => {
    const on = program.includes(s.id)
    const next = on ? program.filter((x) => x !== s.id) : [...program, s.id]
    track('service_cta_click', `${s.id} (accueil guidé, ${on ? 'retiré' : 'ajouté'})`)
    setStatus(`${s.officialTitle} ${on ? 'retiré de' : 'ajouté à'} votre programme. ${countLabel(next.length)}.`)
    setState((st) => ({ ...st, program: next, removed: st.removed.filter((x) => x !== s.id) }))
  }

  const ToggleButton = ({ s, compact = false }: { s: Service; compact?: boolean }) => {
    const on = program.includes(s.id)
    return (
      <button type="button" aria-pressed={on} onClick={() => toggle(s)}
        className={`btn ${on ? 'btn--added' : 'btn--primary'}${compact ? ' btn--sm' : ''}`}>
        {on ? <><Check size={16} /> Ajouté</> : compact ? 'Ajouter' : 'Ajouter à mon programme'}
        <span className="visually-hidden"> : {s.officialTitle}</span>
      </button>
    )
  }

  /** Action propre à chaque service du programme. */
  const actionLabel = (s: Service) =>
    s.action.kind === 'external'
      ? (s.kind === 'outil' ? 'Ouvrir l’outil sur apec.fr' : s.action.label)
      : s.kind === 'atelier' ? 'Choisir une session' : 'Choisir un créneau'
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
            {heading(<>Bienvenue Alex !</>, 'welcome__title')}
            <p className="lead">
              Ateliers, rendez-vous avec un consultant, outils en ligne : en trois questions, nous vous proposons par
              où commencer. Vous pouvez aussi parcourir tous nos services.
            </p>
            <div className="step__actions">
              <button type="button" className="btn btn--primary btn--lg" onClick={() => { track('onboarding_start'); go('situation') }}>
                Me guider <ArrowRight size={18} />
              </button>
              <Link to="/cas-02-ab-test" className="btn btn--outline btn--lg">Explorer librement</Link>
            </div>
            <p className="small">
              Vous préférez en parler à quelqu’un ?{' '}
              <Link to="/reserver/rendez-vous-conseil?from=etapes">Prendre rendez-vous avec un consultant</Link>
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
          {heading(<>Quelle est votre situation ?</>)}
          <fieldset aria-describedby={error ? 'err-situation' : 'help-situation'}>
            <legend className="visually-hidden">Votre situation</legend>
            <p id="help-situation" className="muted small">
              {prefilled ? 'Pré-rempli d’après votre inscription — vous pouvez le modifier.' : 'Une seule réponse.'}
            </p>
            <div className="choices choices--3">
              {SITUATION_OPTIONS.map((o) => (
                <label key={o.id} className={`choice choice--tile choice--icon${answers.situation === o.id ? ' is-selected' : ''}`}>
                  <input type="radio" name="situation" value={o.id} checked={answers.situation === o.id}
                    onChange={() => { setError(''); setState((s) => ({ ...s, answers: { ...s.answers, situation: o.id } })) }} />
                  {(() => { const Icon = SITUATION_ICON[o.id]; return <Icon size={44} className="choice__icon" /> })()}
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
          {heading(<>De quoi avez-vous besoin en ce moment ?</>)}
          <fieldset aria-describedby={error ? 'err-needs' : 'help-needs'}>
            <legend className="visually-hidden">Vos besoins</legend>
            <p id="help-needs" className="muted small">Plusieurs réponses possibles.</p>
            <div className="choices choices--2">
              {NEED_OPTIONS.map((o) => (
                <label key={o.id} className={`choice choice--tile choice--icon${answers.needs.includes(o.id) ? ' is-selected' : ''}`}>
                  <input type="checkbox" name="needs" value={o.id} checked={answers.needs.includes(o.id)}
                    onChange={() => { setError(''); toggleNeed(o.id) }} />
                  {(() => { const Icon = NEED_ICON[o.id]; return <Icon size={44} className="choice__icon" /> })()}
                  <span className="choice__body"><span className="choice__title">{o.label}</span></span>
                </label>
              ))}
            </div>
            {error && <p id="err-needs" className="field-error" role="alert">{error}</p>}
          </fieldset>

          {answers.needs.includes('entretien') && (
            <fieldset className="subquestion">
              <legend>Avez-vous déjà un entretien programmé ?</legend>
              <div className="choices choices--inline">
                {([[false, 'Pas encore'], [true, 'Oui, dans les prochains jours']] as const).map(([v, label]) => (
                  <label key={String(v)} className={`choice choice--chip choice--icon choice--icon-row${answers.interviewScheduled === v ? ' is-selected' : ''}`}>
                    <input type="radio" name="interview" checked={answers.interviewScheduled === v}
                      onChange={() => setState((s) => ({ ...s, answers: { ...s.answers, interviewScheduled: v } }))} />
                    {v ? <Calendar size={32} className="choice__icon" /> : <Clock size={32} className="choice__icon" />}
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
          <p className="muted">Sélectionnées d’après vos réponses. Ajoutez à votre programme tous les services qui vous{'\u00a0'}intéressent.</p>
          <Link to="/reserver/rendez-vous-conseil?from=etapes" className="help-link help-link--block">
            <Chat size={22} /> Vous préférez un rendez-vous individuel{'\u00a0'}? <strong>Échanger avec un consultant</strong>
          </Link>
          <ol className="rec-list">
            {top.map((r, i) => {
              const s = getService(r.serviceId)!
              return (
                <li key={r.serviceId} className={`rec rec--photo rec--${KIND_TONE[s.kind]}${i === 0 ? ' rec--first' : ''}${program.includes(s.id) ? ' is-added' : ''}`}>
                  <div className="rec__photo">
                    {SERVICE_PHOTO[s.id] ? (
                      <img src={SERVICE_PHOTO[s.id].file} alt="" width={960} height={600}
                        loading={i === 0 ? 'eager' : 'lazy'} decoding="async" className="rec__photo-img" />
                    ) : (
                      <Illustration name={s.illustration} tone={KIND_TONE[s.kind]} className="rec__photo-img" />
                    )}
                    <span className="rec__rank" aria-hidden="true">{i + 1}</span>
                  </div>
                  <div className="rec__body">
                    <p className="grp-meta"><span className="grp-format">{FORMAT_LABEL[s.kind]}</span></p>
                    <p className="svc__official">{nb(s.officialTitle)}</p>
                    <h3 className="rec__title">{nb(s.hook)}</h3>
                    <div className="rec__why">
                      <h4>Pourquoi ce service ?</h4>
                      <ul>
                        {r.reasons.map((reason) => (
                          <li key={reason}><Plus size={16} className="plus" /> <span>{nb(reason)}</span></li>
                        ))}
                      </ul>
                    </div>
                    <ModalityChips items={s.modalities.filter((m) => m.label !== 'Format')} />
                    <div className="rec__actions"><ToggleButton s={s} /></div>
                  </div>
                </li>
              )
            })}
          </ol>

          {more.length > 0 && (
            <section className="rec-more" aria-labelledby="rec-more-titre">
              <h3 id="rec-more-titre" className="rec-more__title">Également utiles pour vous</h3>
              <ul className="dlist rec-more__list">
                {more.map((r) => {
                  const s = getService(r.serviceId)!
                  return (
                    <li key={r.serviceId} className={`drow rec-row${program.includes(s.id) ? ' is-added' : ''}`}>
                      <span className="drow__icon"><Picto kind={s.kind} size={30} /></span>
                      <div className="drow__main">
                        <h4 className="drow__title">{nb(s.officialTitle)}</h4>
                        <p className="drow__ideal">{nb(r.reasons[0])}</p>
                      </div>
                      <div className="drow__foot">
                        <p className="drow__format"><span className="visually-hidden">Format{'\u00a0'}: </span>{FORMAT_LABEL[s.kind]}</p>
                        <div className="drow__action"><ToggleButton s={s} compact /></div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          <p className="visually-hidden" role="status" aria-live="polite">{status}</p>
          {program.length > 0 && (
            <div className="program-bar">
              <p className="program-bar__count"><strong>{program.length}</strong> service{program.length > 1 ? 's' : ''} dans mon{'\u00a0'}programme</p>
              <button type="button" className="btn btn--primary" onClick={() => { setStatus(''); go('program', 'results') }}>
                Continuer <ArrowRight size={18} />
              </button>
            </div>
          )}
          <div className="step__actions">
            <button type="button" className="btn btn--link" onClick={() => go('needs')}><ArrowLeft size={18} /> Modifier mes réponses</button>
            <Link to="/cas-03-inscription/prochaines-etapes" className="btn btn--outline">Mon espace</Link>
          </div>
        </div>
      )
      break

    case 'program':
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
            cancelLabel="Revenir à mon programme"
            onCancel={() => setState((st) => ({ ...st, chosenId: null }))}
            onComplete={({ serviceId, slot }) => {
              setBookings((b) => ({ ...b, [serviceId]: slot }))
              setStatus(`${chosen.officialTitle} : réservé le ${slot.date} à ${slot.time}.`)
              setState((st) => ({ ...st, chosenId: null }))
            }}
          />
        </div>
      ) : (
        <div className="step">
          {heading(<>Mon programme</>)}
          <p className="muted">Réservez chaque service quand vous le souhaitez, puis revenez ici pour le{'\u00a0'}suivant.</p>
          <p className="visually-hidden" role="status" aria-live="polite">{status}</p>
          {program.length === 0 ? (
            <div className="empty">
              <p>Votre programme est vide.</p>
              <button type="button" className="btn btn--primary" onClick={() => go('results')}>Revenir aux suggestions</button>
            </div>
          ) : (
            <ul className="next-list program-list">
              {program.map((id) => {
                const s = getService(id)!
                const slot = bookings[id]
                return (
                  <li key={id} className={`next-item next-item--${KIND_TONE[s.kind]}`}>
                    <div className="next-item__tag"><KindTag kind={s.kind} /></div>
                    <div className="next-item__main">
                      <p className="grp-meta"><span className="grp-format">{FORMAT_LABEL[s.kind]}</span></p>
                      <h3 className="next-item__title">{nb(s.officialTitle)}</h3>
                      <p className="muted">{nb(s.hook)}</p>
                      {slot ? (
                        <p className="next-item__status">
                          <Check size={18} /> <span><strong>Réservé{'\u00a0'}:</strong> {slot.date} à {slot.time} — {slot.place}</span>
                        </p>
                      ) : (
                        <div className="next-item__actions">
                          {s.action.kind === 'booking' ? (
                            <button type="button" className="btn btn--primary btn--sm" onClick={() => setState((st) => ({ ...st, chosenId: s.id }))}>
                              {actionLabel(s)}<span className="visually-hidden"> : {s.officialTitle}</span>
                            </button>
                          ) : (
                            <a className="btn btn--outline btn--sm" href={s.action.url} target="_blank" rel="noopener noreferrer"
                              onClick={() => track('service_cta_click', `${s.id} (programme, externe)`)}>
                              {actionLabel(s)} <External size={16} />
                              <span className="visually-hidden"> — {s.officialTitle} (nouvel onglet)</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
          <div className="step__actions">
            {program.length > 0 && (
              <button type="button" className="btn btn--primary" onClick={() => go('confirm', 'program')}>
                Terminer <ArrowRight size={18} />
              </button>
            )}
            <button type="button" className="btn btn--link" onClick={() => go('results')}><ArrowLeft size={18} /> Modifier mes choix</button>
          </div>
        </div>
      )
      break

    case 'confirm':
      body = (
        <div className="step confirm">
          <span className="confirm__check" aria-hidden="true"><Check size={44} /></span>
          {heading(<>C’est noté, Alex{'\u00a0'}!</>, 'step__title confirm__title')}
          <p>Votre programme compte {countLabel(program.length).replace(' dans mon programme', '')}{'\u00a0'}:</p>
          <ul className="program-recap">
            {program.map((id) => {
              const s = getService(id)!
              const slot = bookings[id]
              return (
                <li key={id}>
                  <span className="program-recap__title">{nb(s.officialTitle)}</span>
                  <span className={`program-recap__status${slot ? ' is-done' : ''}`}>
                    {slot ? <>Réservé{'\u00a0'}: {slot.date} à {slot.time}</> : 'À faire'}
                  </span>
                </li>
              )
            })}
          </ul>
          <p>Retrouvez votre programme dans «{'\u00a0'}Mes prochaines étapes{'\u00a0'}» : vous pouvez réserver les services restants, en retirer ou reprendre le{'\u00a0'}guidage.</p>
          <div className="step__actions">
            <Link to="/cas-03-inscription/prochaines-etapes" className="btn btn--primary" onClick={() => track('onboarding_step_complete', 'confirm')}>
              Mes prochaines étapes <ArrowRight size={18} />
            </Link>
            <button type="button" className="btn btn--link" onClick={() => go('program')}><ArrowLeft size={18} /> Revenir à mon programme</button>
          </div>
        </div>
      )
      break
  }

  const barNotice =
    step === 'confirm' || step === 'program' ? 'Démonstration\u00a0: aucune inscription réelle.' : undefined

  return (
    <ProtoLayout
      path={path}
      caseLabel="Cas 03 · Inscription accompagnée"
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
