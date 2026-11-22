import type { ReactNode } from 'react'
import { Link } from '../lib/router'

/** Habillage du portfolio : identité propre, volontairement distincte de l'univers Apec. */
export function PortfolioLayout({ children, isHome = false }: { children: ReactNode; isHome?: boolean }) {
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
          <Link to="/" className="pf-brand pf-brand--compact" aria-current={isHome ? 'page' : undefined}>
            <span className="pf-brand__name">Portfolio</span>
          </Link>
          <nav aria-label="Portfolio">
            <ul className="pf-nav">
              <li><Link to="/" anchor="realisations">Réalisations</Link></li>
              <li><Link to="/design-system">Design system</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="contenu" tabIndex={-1}>{children}</main>
      <footer className="pf-footer">
        <div className="pf-container">
          <p className="pf-footer__line">
            Portfolio de candidature indépendant, sans affiliation à{'\u00a0'}l’Apec ·{' '}
            <Link to="/design-system" anchor="sources">Sources et mentions</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
