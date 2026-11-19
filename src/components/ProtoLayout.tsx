import { useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { resetAll } from '../lib/storage'
import { Coulisses } from './Coulisses'
import { ArrowRight, Close, Home, Menu, User } from './Icons'

const PROTO_NAV = [
  { to: '/cas-1', label: 'Nos services' },
  { to: '/cas-2', label: 'Bien démarrer' },
  { to: '/cas-3', label: 'Conseils entretien' },
]

interface Props {
  path: string
  children: ReactNode
  /** Explications du prototype : affichées uniquement dans le pied de page. */
  coulisses: ReactNode
  events: string[]
  /** Commande de démo (ex. bascule de variantes), placée dans la barre prototype. */
  barControl?: ReactNode
  /** Mention contextuelle dans la barre prototype (ex. réservation simulée). */
  barNotice?: string
  onReset?: () => void
}

/**
 * Habillage des prototypes : univers inspiré d'apec.fr (sans logo officiel),
 * écrans utilisateur sans explication ; tout le « pourquoi » est en pied de page.
 */
export function ProtoLayout({ path, children, coulisses, events, barControl, barNotice, onReset }: Props) {
  const [open, setOpen] = useState(false)
  const toCoulisses = () => {
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
        Aller au contenu
      </a>
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
            <span className="visually-hidden"> (prototype)</span>
          </Link>
          <Link to="/cas-2/prochaines-etapes" className="proto-account">
            <User size={22} /> <span>Mon espace</span>
          </Link>
        </div>
        <nav id="proto-menu" className={`proto-menu${open ? ' is-open' : ''}`} aria-label="Menu du prototype">
          <ul className="container">
            {PROTO_NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  aria-current={path === n.to ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {n.label} <ArrowRight size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="contenu" tabIndex={-1}>{children}</main>

      <footer className="proto-footer">
        <div className="container proto-footer__inner">
          <ul className="proto-footer__links">
            <li><Link to="/cas-1">Nos services</Link></li>
            <li><Link to="/cas-3">Conseils entretien</Link></li>
            <li><Link to="/cas-2/prochaines-etapes">Mon espace</Link></li>
          </ul>
          <div className="proto-footer__cta">
            <p>« Vous avez une question ? »</p>
            <Link to="/reserver/cep?from=cas-1" className="btn btn--primary">Échanger avec un consultant</Link>
          </div>
        </div>
      </footer>

      <Coulisses events={events} onReset={() => { resetAll(); onReset?.() }}>
        {coulisses}
      </Coulisses>

      <div className="proto-bar" role="region" aria-label="Barre du prototype">
        <div className="proto-bar__inner">
          <span className="proto-bar__label">
            <strong>Prototype</strong>
            <span className="proto-bar__hide-sm"> · sans affiliation Apec</span>
          </span>
          {barControl}
          {barNotice && <span className="proto-bar__notice" role="status">{barNotice}</span>}
          <span className="proto-bar__actions">
            <button type="button" className="proto-bar__btn" onClick={toCoulisses}>
              Coulisses<span className="proto-bar__hide-sm"> du prototype</span> ↓
            </button>
            <Link to="/" className="proto-bar__btn">
              <Home size={16} /> Portfolio
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
