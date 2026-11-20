import { useEffect, useRef, useState } from 'react'
import { getService, KIND_LABEL, type Service } from '../data/services'
import { JOURNEY_OPTIONS, LINK_LOGIC, SERP, SIMULATOR_CHOICES, type JourneyServiceKey } from '../data/seoPlan'
import { INDIVIDUAL_SLOTS, WORKSHOP_SESSIONS } from '../data/slots'
import { Link, navigate, type Route } from '../lib/router'
import { load, save, track } from '../lib/storage'
import { ArrowLeft, ArrowRight, Check, Info, Plus, Reset, Search } from './Icons'
import { verified } from './Modalities'
import { KindTag } from './ServiceCard'

export type Screen = 'a' | 'b' | 'c' | 'd' | 'r'
const BASE = '/plan-seo'
const STEPS: { id: Screen; label: string }[] = [
  { id: 'a', label: 'Recherche' },
  { id: 'b', label: 'Page conseil' },
  { id: 'c', label: 'Fiche service' },
  { id: 'd', label: 'Inscription' },
]
const CHECKLIST_KEY = 'seo-checklist'
const CHECKLIST = [
  'J’ai relu l’offre et repéré les trois attentes principales.',
  'J’ai trois exemples de réalisations, avec le contexte, mon action et le résultat.',
  'Je peux présenter mon parcours en deux minutes.',
  'Je me suis entraîné à voix haute sur les questions les plus probables.',
  'J’ai préparé deux ou trois questions sur le poste et l’équipe.',
  'J’ai une fourchette de rémunération argumentée.',
  'Je connais le format, l’horaire et le nom de mon interlocuteur.',
]

export function journeyHref(screen: Screen, service?: JourneyServiceKey | null) {
  const q = new URLSearchParams({ ecran: screen })
  if (service) q.set('service', service)
  return `${BASE}?${q.toString()}`
}

function readScreen(route: Route): { screen: Screen; key: JourneyServiceKey | null } {
  const s = route.query.get('ecran')
  const k = route.query.get('service')
  const key = JOURNEY_OPTIONS.some((o) => o.key === k) ? (k as JourneyServiceKey) : null
  let screen: Screen = s === 'b' || s === 'c' || s === 'd' || s === 'r' ? s : 'a'
  if ((screen === 'c' || screen === 'd') && !key) screen = 'b' // pas d'impasse sans service choisi
  return { screen, key }
}

/** Modalités à afficher : vérifiées, sinon mention explicite « à confirmer ». */
function ModalityLines({ service }: { service: Service }) {
  const ok = verified(service.modalities)
  const missing = service.modalities.filter((m) => m.provenance !== 'capture').map((m) => m.label.toLowerCase())
  return (
    <ul className="sj-modal">
      {ok.map((m) => (
        <li key={m.label}><strong>{m.label} :</strong> {m.value}</li>
      ))}
      {missing.length > 0 && (
        <li className="sj-modal__tbc"><strong>À confirmer :</strong> {missing.join(', ')} (non vérifiés, non affichés)</li>
      )}
    </ul>
  )
}

export function SeoJourney({ route }: { route: Route }) {
  const { screen, key } = readScreen(route)
  const option = JOURNEY_OPTIONS.find((o) => o.key === key)
  const service = option ? getService(option.serviceId)! : null
  const [checked, setChecked] = useState<number[]>(() => load<number[]>(CHECKLIST_KEY, []))
  const [choice, setChoice] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [showMap, setShowMap] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)

  // À chaque changement d'écran (hors ancre), on garde le cadre en vue et on place le focus sur son titre.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (route.anchor) return
    frameRef.current?.scrollIntoView({ block: 'start' })
    headingRef.current?.focus({ preventScroll: true })
  }, [screen, key, route.anchor])

  const go = (s: Screen, k: JourneyServiceKey | null = key) => {
    setError('')
    if (s !== 'd') {
      setDone(false)
      setChoice(null)
    }
    navigate(journeyHref(s, k))
  }

  const toggle = (i: number) =>
    setChecked((c) => {
      const next = c.includes(i) ? c.filter((x) => x !== i) : [...c, i]
      save(CHECKLIST_KEY, next)
      return next
    })

  const reset = () => {
    save(CHECKLIST_KEY, [])
    setChecked([])
    setChoice(null)
    setDone(false)
    setError('')
    setShowMap(false)
    navigate(journeyHref('a'))
  }

  const stepIndex = STEPS.findIndex((s) => s.id === (screen === 'r' ? 'b' : screen))
  const prev: Screen | null = screen === 'b' ? 'a' : screen === 'c' ? 'b' : screen === 'd' ? 'c' : screen === 'r' ? 'b' : null

  const h = (text: string) => (
    <h3 ref={headingRef} tabIndex={-1} className="sj-title">{text}</h3>
  )
  const inPage = (anchor: string) => ({ to: journeyHref('b', key), anchor })

  let body: React.ReactNode
  if (screen === 'a') {
    body = (
      <div className="sj-serp">
        <div className="sj-serp__box" role="search" aria-label="Requête illustrative">
          <Search size={20} /> <span>{SERP.query}</span>
        </div>
        {h('Résultat de recherche (aperçu)')}
        <article className="sj-serp__result">
          <p className="sj-serp__url">{SERP.url}</p>
          <p className="sj-serp__rtitle">
            <button type="button" className="sj-serp__link" onClick={() => { track('service_view', 'seo:page-conseil'); go('b') }}>
              {SERP.title}
            </button>
          </p>
          <p className="sj-serp__desc">{SERP.description}</p>
        </article>
        <button type="button" className="btn btn--primary" onClick={() => go('b')}>
          Découvrir la page proposée <ArrowRight size={18} />
        </button>
      </div>
    )
  } else if (screen === 'b') {
    body = (
      <div className="sj-article">
        <p className="sj-kicker">Conseils · Entretiens de recrutement</p>
        {h('Préparer un entretien de recrutement : méthode et prochaines étapes')}
        <p className="sj-intro">
          Un entretien se prépare en quelques heures réparties sur plusieurs jours : comprendre ce que l’on attend de
          vous, choisir vos exemples, vous entraîner à voix haute, préparer vos questions et votre réponse sur la
          rémunération. Voici une méthode en six étapes et une checklist utilisable dès maintenant.
        </p>
        <nav className="sj-toc" aria-label="Sommaire de la page conseil">
          <ol>
            <li><Link {...inPage('sj-poste')}>Comprendre le poste et l’entreprise</Link></li>
            <li><Link {...inPage('sj-exemples')}>Préparer des exemples de réalisations</Link></li>
            <li><Link {...inPage('sj-presentation')}>Structurer sa présentation</Link></li>
            <li><Link {...inPage('sj-entrainement')}>S’entraîner à répondre</Link></li>
            <li><Link {...inPage('sj-questions')}>Préparer ses questions</Link></li>
            <li><Link {...inPage('sj-remuneration')}>Aborder la rémunération</Link></li>
            <li><Link {...inPage('sj-checklist')}>Checklist</Link></li>
            <li><Link {...inPage('sj-aide')}>Se faire accompagner</Link></li>
          </ol>
        </nav>

        <h4 id="sj-poste" tabIndex={-1}>1. Comprendre le poste et l’entreprise</h4>
        <p>Relisez l’offre et notez les trois attentes qui reviennent le plus. Cherchez pourquoi le poste est ouvert maintenant : croissance, remplacement, nouveau projet. Ce contexte oriente tout le reste.</p>

        <h4 id="sj-exemples" tabIndex={-1}>2. Préparer des exemples de réalisations</h4>
        <p>Pour chaque attente, choisissez une réalisation : le contexte, ce que vous avez fait personnellement, le résultat. Trois exemples solides valent mieux qu’une longue liste.</p>

        <h4 id="sj-presentation" tabIndex={-1}>3. Structurer sa présentation</h4>
        <p>Deux minutes suffisent : ce que vous faites aujourd’hui, une ou deux réalisations marquantes, pourquoi ce poste est la suite logique. Avec un parcours long, privilégiez ce qui est proche du poste visé.</p>

        <h4 id="sj-entrainement" tabIndex={-1}>4. S’entraîner à répondre</h4>
        <p>
          Dire ses réponses à voix haute révèle ce qui reste flou. Entraînez-vous sur les questions probables :
          motivation, difficulté surmontée, points d’amélioration. Pour vous exercer à votre rythme, vous pouvez{' '}
          <Link to={journeyHref('c', 'simulateur')}>vous entraîner seul avec le simulateur d’entretien</Link>.
        </p>

        <h4 id="sj-questions" tabIndex={-1}>5. Préparer ses questions</h4>
        <p>Préparez deux ou trois questions sur les priorités du poste, l’équipe et les critères de réussite à six mois. Elles montrent votre intérêt et vous aident à décider.</p>

        <h4 id="sj-remuneration" tabIndex={-1}>6. Aborder la rémunération</h4>
        <p>
          Arrivez avec une fourchette argumentée plutôt qu’un chiffre improvisé, et pensez aux éléments hors salaire
          fixe. Quelques{' '}
          <Link to={journeyHref('r', key)}>repères pour préparer votre fourchette</Link>.
        </p>

        <section className="sj-checklist" aria-labelledby="sj-checklist">
          <h4 id="sj-checklist" tabIndex={-1}>Checklist de préparation</h4>
          <fieldset>
            <legend className="visually-hidden">Points de préparation</legend>
            {CHECKLIST.map((item, i) => (
              <label key={item} className={`checklist__item${checked.includes(i) ? ' is-selected' : ''}`}>
                <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <p className="muted small" aria-live="polite">{checked.length} point{checked.length > 1 ? 's' : ''} sur {CHECKLIST.length}</p>
        </section>

        <section aria-labelledby="sj-aide" className="sj-help">
          <h4 id="sj-aide" tabIndex={-1}>Se faire accompagner</h4>
          <p>Si vous souhaitez aller plus loin, trois possibilités selon votre situation :</p>
          <ul className="sj-options">
            {JOURNEY_OPTIONS.map((o) => {
              const s = getService(o.serviceId)!
              return (
                <li key={o.key} className={`sj-option sj-option--${s.kind}`}>
                  <p className="sj-option__choice">{o.choice}</p>
                  <p className="sj-option__name">{s.officialTitle} <span className="sj-option__kind">· {KIND_LABEL[s.kind]}</span></p>
                  <p>{s.benefit}</p>
                  <ModalityLines service={s} />
                  {s.details?.forWhom && <p className="small"><strong>Pour qui :</strong> {s.details.forWhom}</p>}
                  <Link to={journeyHref('c', o.key)} className="btn btn--primary btn--sm">
                    {o.cta}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    )
  } else if (screen === 'r') {
    body = (
      <div className="sj-article">
        <p className="sj-kicker">Ressource rémunération · aperçu</p>
        {h('Rémunération : préparer votre fourchette')}
        <ul className="plus-list">
          <li><Plus size={18} className="plus" /> Croiser plusieurs repères : offres comparables, grilles publiées, niveau de responsabilité.</li>
          <li><Plus size={18} className="plus" /> Fixer un plancher et une cible, et préparer l’argument qui les justifie.</li>
          <li><Plus size={18} className="plus" /> Penser aux éléments hors salaire fixe : variable, télétravail, formation.</li>
        </ul>
        <Link to={journeyHref('b', key)} anchor="sj-remuneration" className="link-arrow">
          Revenir à la page conseil, section rémunération <ArrowRight size={18} />
        </Link>
      </div>
    )
  } else if (screen === 'c' && service && option) {
    body = (
      <div className="sj-sheet">
        <div className="sj-sheet__head">
          <span className="sj-sheet__tag"><KindTag kind={service.kind} /></span>
          <div>
            <p className="sj-kicker">{KIND_LABEL[service.kind]}</p>
            {h(service.officialTitle)}
          </div>
        </div>
        <h4>À qui s’adresse ce service ?</h4>
        <p>{service.details?.forWhom}</p>
        <h4>Ce qu’il apporte</h4>
        <p>{service.benefit}</p>
        {service.details && (
          <ul className="plus-list">
            {service.details.points.map((p) => <li key={p}><Plus size={18} className="plus" /> {p}</li>)}
          </ul>
        )}
        <h4>Modalités</h4>
        <ModalityLines service={service} />
        <h4>Préparation</h4>
        <p>
          {service.details?.prepare ?? 'Avoir sous la main l’offre visée, pour s’entraîner sur un cas concret.'}{' '}
          <Link to={journeyHref('b', option.key)} anchor="sj-checklist">Utiliser la checklist de préparation</Link>.
        </p>
        <div className="step__actions">
          <button type="button" className="btn btn--primary" onClick={() => { track('booking_start', `seo:${service.id}`); setDone(false); setChoice(null); go('d') }}>
            {option.key === 'simulateur' ? 'Démarrer une session d’entraînement' : option.key === 'atelier' ? 'Choisir une session' : 'Choisir un rendez-vous'}
          </button>
          <Link to={journeyHref('b', option.key)} anchor="sj-aide" className="link-arrow">Comparer les autres aides <ArrowRight size={18} /></Link>
        </div>
      </div>
    )
  } else if (screen === 'd' && service && option) {
    const choices =
      option.key === 'simulateur'
        ? SIMULATOR_CHOICES.map((c) => ({ id: c, label: c }))
        : (option.key === 'atelier' ? WORKSHOP_SESSIONS : INDIVIDUAL_SLOTS).map((s) => ({ id: s.id, label: `${s.date} — ${s.time} · ${s.place}` }))
    const chosen = choices.find((c) => c.id === choice)
    body = done && chosen ? (
      <div className="sj-sheet">
        <span className="confirm__check" aria-hidden="true"><Check size={40} /></span>
        {h('Votre demande de démonstration est terminée.')}
        <dl className="recap">
          <div><dt>Service</dt><dd>{service.officialTitle}</dd></div>
          <div><dt>{option.key === 'simulateur' ? 'Type d’entretien' : 'Créneau'}</dt><dd>{chosen.label}</dd></div>
          <div><dt>Participant</dt><dd>Alex (identité fictive)</dd></div>
        </dl>
        <div className="step__actions step__actions--wrap">
          <button type="button" className="btn btn--primary" onClick={() => go('b')}>Revenir à la page conseil</button>
          <button type="button" className="btn btn--outline" onClick={reset}><Reset size={18} /> Recommencer le parcours</button>
        </div>
      </div>
    ) : (
      <form
        className="sj-sheet"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (!choice) return setError(option.key === 'simulateur' ? 'Choisissez un type d’entretien pour continuer.' : 'Choisissez un créneau pour continuer.')
          track('booking_complete_demo', `seo:${service.id}`)
          setDone(true)
          headingRef.current?.focus()
        }}
      >
        {h(option.key === 'simulateur' ? 'Démarrer une session d’entraînement' : option.key === 'atelier' ? 'Choisir une session' : 'Choisir un rendez-vous')}
        <p className="muted">{service.officialTitle} · Participant : Alex (identité fictive)</p>
        <fieldset aria-describedby={error ? 'sj-err' : undefined}>
          <legend className="sj-legend">{option.key === 'simulateur' ? 'Type d’entretien à simuler' : 'Créneaux de démonstration'}</legend>
          <div className="slots__grid">
            {choices.map((c) => (
              <label key={c.id} className={`choice choice--slot${choice === c.id ? ' is-selected' : ''}`}>
                <input type="radio" name="sj-choice" value={c.id} checked={choice === c.id} onChange={() => { setChoice(c.id); setError('') }} />
                <span className="choice__body"><span className="choice__title">{c.label}</span></span>
              </label>
            ))}
          </div>
          {error && <p id="sj-err" className="field-error" role="alert">{error}</p>}
        </fieldset>
        <div className="step__actions">
          <button type="submit" className="btn btn--primary"><Check size={18} /> Valider</button>
          <button type="button" className="btn btn--link" onClick={() => go('c')}><ArrowLeft size={18} /> Revenir à la fiche</button>
        </div>
      </form>
    )
  }

  const notice =
    screen === 'a'
      ? 'Aperçu illustratif — ne représente pas une position réelle dans Google.'
      : screen === 'c' || screen === 'd'
        ? 'Démonstration : aucune inscription ni réservation réelle n’est effectuée.'
        : screen === 'r'
          ? 'Aperçu léger d’un contenu secondaire, non développé dans la démonstration.'
          : 'Page conseil rédigée pour la démonstration (contenu original).'

  return (
    <div className="sj">
      <div className="sj-bar">
        <ol className="sj-steps" aria-label="Étapes du parcours">
          {STEPS.map((s, i) => (
            <li key={s.id} className={i < stepIndex ? 'is-done' : i === stepIndex ? 'is-current' : ''} aria-current={i === stepIndex ? 'step' : undefined}>
              <span className="sj-steps__n" aria-hidden="true">{i < stepIndex ? <Check size={14} /> : String.fromCharCode(65 + i)}</span>
              <span>{s.label}{i < stepIndex && <span className="visually-hidden"> (étape passée)</span>}</span>
            </li>
          ))}
        </ol>
        <div className="sj-bar__actions">
          {prev && (
            <button type="button" className="pf-btn pf-btn--sm" onClick={() => go(prev)}>
              <ArrowLeft size={16} /> Retour
            </button>
          )}
          <button type="button" className="pf-btn pf-btn--sm" onClick={reset}>
            <Reset size={16} /> Réinitialiser
          </button>
        </div>
        <p className="sj-notice" role="note"><Info size={18} /> {notice}</p>
      </div>

      <div className="proto sj-frame" ref={frameRef} aria-label="Maquette du parcours" role="region">
        <div className="sj-frame__top" aria-hidden="true"><span /><span /><span /></div>
        <div className="sj-frame__body">{body}</div>
      </div>

      <div className="sj-after">
        <button type="button" className="pf-btn" aria-expanded={showMap} aria-controls="sj-map" onClick={() => setShowMap((v) => !v)}>
          {showMap ? 'Masquer la logique de maillage' : 'Voir la logique de maillage'}
        </button>
        <div id="sj-map" hidden={!showMap} className="sj-map">
          <p className="sj-map__lead">Chaque lien part d’une section où il répond à un besoin précis. Cliquez sur un élément pour l’ouvrir dans le parcours.</p>
          <div className="sj-map__diagram">
            <Link to={journeyHref('b', key)} className="sj-node sj-node--hub">Page conseil<br /><span>Préparer un entretien</span></Link>
            <ul className="sj-map__targets">
              <li><Link to={journeyHref('c', 'simulateur')} className="sj-node">Simulateur<span>depuis « S’entraîner à répondre »</span></Link></li>
              <li><Link to={journeyHref('c', 'atelier')} className="sj-node">Atelier<span>depuis « Se faire accompagner »</span></Link></li>
              <li><Link to={journeyHref('c', 'consultant')} className="sj-node">Rendez-vous consultant<span>depuis « Se faire accompagner »</span></Link></li>
              <li><Link to={journeyHref('r', key)} className="sj-node sj-node--light">Ressource rémunération<span>depuis « Aborder la rémunération »</span></Link></li>
            </ul>
            <p className="sj-map__back">↩ Chaque fiche service renvoie vers la <Link to={journeyHref('b', key)} anchor="sj-checklist">checklist de préparation</Link>.</p>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <caption className="visually-hidden">Liens internes du parcours</caption>
              <thead><tr><th scope="col">Depuis</th><th scope="col">Section</th><th scope="col">Vers</th><th scope="col">Ancre descriptive</th></tr></thead>
              <tbody>
                {LINK_LOGIC.map((l) => (
                  <tr key={l.to + l.section}><td>{l.from}</td><td>{l.section}</td><td>{l.to}</td><td>« {l.anchor} »</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
