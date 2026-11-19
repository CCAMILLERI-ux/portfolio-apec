import { useRef, useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { Close, Menu } from './Icons'

export const DISCLAIMER =
  'Prototype de candidature indépendant — propositions exploratoires, sans affiliation officielle à l’Apec. Aucune inscription réelle.'
export const SIGNATURE = 'Exploration UX, acquisition & conversion — Caroline Camilleri'

const NAV = [
  { to: '/', label: 'Portfolio' },
  { to: '/cas-1', label: 'Choisir un service' },
  { to: '/cas-2', label: 'Accueil guidé' },
  { to: '/cas-3', label: 'Conseil & maillage' },
  { to: '/sources', label: 'Sources et limites' },
]

export function Layout({ path, children }: { path: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const isActive = (to: string) =>
    to === '/' ? path === '/' : path === to || path.startsWith(to + '/')

  return (
    <>
      <a className="skip-link" href="#contenu" onClick={(e) => {
        e.preventDefault()
        document.getElementById('contenu')?.focus()
      }}>
        Aller au contenu
      </a>
      <div className="disclaimer" role="note">
        <div className="container">
          <span>{DISCLAIMER}</span>{' '}
          <Link to="/sources">Sources et limites</Link>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            <span className="brand__mark" aria-hidden="true">CC</span>
            <span className="brand__text">
              Portfolio <span className="brand__sub">prototypes de candidature</span>
            </span>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-principale"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
            <span>Menu</span>
          </button>
          <nav
            id="nav-principale"
            ref={navRef}
            className={`site-nav${open ? ' is-open' : ''}`}
            aria-label="Navigation principale"
          >
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} aria-current={isActive(n.to) ? 'page' : undefined} onClick={() => setOpen(false)}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="contenu" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p className="site-footer__sig">{SIGNATURE}</p>
          <p className="site-footer__note">{DISCLAIMER}</p>
          <p className="site-footer__note">
            Univers visuel inspiré des styles observés sur apec.fr (valeurs estimées, non officielles).
            Aucun logo, photographie ou témoignage de l’Apec n’est reproduit. Aucun traceur externe.
          </p>
          <ul className="site-footer__links">
            <li><Link to="/">Accueil du portfolio</Link></li>
            <li><Link to="/sources">Sources et limites</Link></li>
          </ul>
        </div>
      </footer>
    </>
  )
}
