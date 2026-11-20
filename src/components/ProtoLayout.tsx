import { useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { Link } from '../lib/router'
import { resetAll } from '../lib/storage'
import { Coulisses } from './Coulisses'
import { ArrowLeft, ArrowRight, Calendar, Close, Info, Menu, Reset, User } from './Icons'

const PROTO_NAV = [
  { to: '/espace', label: 'Mon espace' },
  { to: '/cas-1', label: 'Nos services' },
  { to: '/cas-3', label: 'Conseils entretien' },
]

interface Props {
  path: string
  /** Nom du cas affiché dans la barre de démo (hors maquette). */
  caseLabel: string
  children: ReactNode
  /** Explications du prototype : section « Coulisses », en bas de page. */
  coulisses: ReactNode
  events: string[]
  /** Commande de démo (ex. choix de la variante), dans la barre du haut. */
  barControl?: ReactNode
  /** Rappel contextuel (ex. réservation simulée), dans la barre du haut. */
  barNotice?: string
  onReset?: () => void
  /** Bloc d'introduction compact, hors maquette, sous la barre de démo. */
  intro?: { kicker: string; title: string; text: string; note?: string }
}

/**
 * Habillage des prototypes.
 * - En haut, HORS maquette : barre de démo (retour portfolio, cas, variante, réinitialiser, explications).
 * - Au centre : la maquette utilisateur, inspirée d'apec.fr, sans aucune explication.
 * - En bas : « Coulisses du prototype » (méthode, provenance, journal).
 */
export function ProtoLayout({ path, caseLabel, children, coulisses, events, barControl, barNotice, onReset, intro }: Props) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')

  // Les coulisses ne sont affichées qu'à la demande ; à l'ouverture, on y descend.
  const [explain, setExplain] = useState(false)
  const toggleExplain = () => {
    if (explain) {
      setExplain(false)
      return
    }
    flushSync(() => setExplain(true))
    const el = document.getElementById('coulisses')
    el?.scrollIntoView({ block: 'start' })
    el?.focus({ preventScroll: true })
  }

  return (
    <div className="proto">
      <a className="skip-link" href="#contenu" onClick={(e) => {
        e.preventDefault()
        document.getElementById('contenu')?.focus()
      }}>
        Aller à la maquette
      </a>

      <div className="demo-bar" role="region" aria-label="Commandes de la démo (hors maquette)">
        <div className="demo-bar__inner">
          <Link to="/" className="demo-bar__btn demo-bar__btn--back">
            <ArrowLeft size={18} /> Retour au portfolio
          </Link>
          <span className="demo-bar__case">{caseLabel}</span>
          {barControl}
          <span className="demo-bar__actions">
            <button
              type="button"
              className={`demo-bar__btn${explain ? ' is-active' : ''}`}
              aria-expanded={explain}
              aria-controls="coulisses"
              onClick={toggleExplain}
            >
              <Info size={18} /> {explain ? 'Masquer les explications' : 'Comprendre ce cas'}
            </button>
            <button
              type="button"
              className="demo-bar__btn"
              onClick={() => {
                resetAll()
                onReset?.()
                setStatus('Démo réinitialisée.')
                window.setTimeout(() => setStatus(''), 4000)
              }}
            >
              <Reset size={18} /> Réinitialiser la démo
            </button>
          </span>
          {(barNotice || status) && (
            <span className="demo-bar__notice" role="status">{status || barNotice}</span>
          )}
        </div>
      </div>

      {intro && (
        <section className="demo-intro" aria-labelledby="demo-intro-title">
          <div className="demo-intro__inner">
            <p className="demo-intro__kicker">{intro.kicker}</p>
            <h2 id="demo-intro-title" className="demo-intro__title">{intro.title}</h2>
            <p className="demo-intro__text">{intro.text}</p>
            {intro.note && <p className="demo-intro__note">{intro.note}</p>}
          </div>
        </section>
      )}

      <div className="maquette">
        <header className="proto-header">
          <div className="container proto-header__inner">
            <button
              type="button"
              className="proto-menu-btn"
              aria-expanded={open}
              aria-controls="proto-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <Close /> : <Menu />} <span>Menu</span>
            </button>
            <Link to="/cas-1" className="proto-wordmark">
              <span className="proto-wordmark__dot" aria-hidden="true" />
              espace cadres
            </Link>
            <span className="proto-header__right">
              <Link to="/reserver/cep?from=espace" className="proto-account">
                <Calendar size={22} /> <span>Prendre rendez-vous</span>
              </Link>
              <Link to="/espace" className="proto-account" aria-current={path === '/espace' ? 'page' : undefined}>
                <User size={22} /> <span>Mon espace</span>
              </Link>
            </span>
          </div>
          <nav id="proto-menu" className={`proto-menu${open ? ' is-open' : ''}`} aria-label="Menu">
            <ul className="container">
              {PROTO_NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} aria-current={path === n.to ? 'page' : undefined} onClick={() => setOpen(false)}>
                    {n.label} <ArrowRight size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main id="contenu" tabIndex={-1}>{children}</main>

        <footer className="proto-footer">
          <div className="container">
            <ul className="proto-footer__links">
              <li><Link to="/espace">Mon espace</Link></li>
              <li><Link to="/cas-1">Nos services</Link></li>
              <li><Link to="/cas-3">Conseils entretien</Link></li>
            </ul>
          </div>
        </footer>
      </div>

      <Coulisses events={events} hidden={!explain}>{coulisses}</Coulisses>
    </div>
  )
}
