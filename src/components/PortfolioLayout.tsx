import type { ReactNode } from 'react'
import { Link } from '../lib/router'

export const DISCLAIMER =
  'Prototype de candidature indépendant — propositions exploratoires, sans affiliation officielle à l’Apec. Aucune inscription réelle.'
export const SIGNATURE = 'Exploration UX, acquisition & conversion — Caroline Camilleri'

/** Habillage du portfolio : identité propre, volontairement distincte de l'univers Apec. */
export function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pf">
      <a className="skip-link" href="#contenu" onClick={(e) => {
        e.preventDefault()
        document.getElementById('contenu')?.focus()
      }}>
        Aller au contenu
      </a>
      <header className="pf-header">
        <div className="pf-container pf-header__inner">
          <Link to="/" className="pf-brand">
            <span className="pf-brand__name">Caroline Camilleri</span>
            <span className="pf-brand__role">Portfolio · Exploration UX, acquisition & conversion</span>
          </Link>
          <nav aria-label="Portfolio">
            <ul className="pf-nav">
              <li><Link to="/">Les trois cas</Link></li>
              <li><Link to="/sources">Sources et limites</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="contenu" tabIndex={-1}>{children}</main>
      <footer className="pf-footer">
        <div className="pf-container">
          <p className="pf-footer__sig">{SIGNATURE}</p>
          <p>{DISCLAIMER}</p>
          <p>Aucun traceur externe, aucune donnée collectée. Pages non indexées.</p>
        </div>
      </footer>
    </div>
  )
}
