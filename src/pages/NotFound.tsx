import { PortfolioLayout } from '../components/PortfolioLayout'
import { Link } from '../lib/router'

export function NotFound() {
  return (
    <PortfolioLayout>
      <div className="pf-container pf-section">
        <h1 tabIndex={-1}>Page introuvable</h1>
        <p>Cette page n’existe pas dans le portfolio.</p>
        <Link to="/" className="pf-btn pf-btn--primary">Revenir aux trois cas</Link>
      </div>
    </PortfolioLayout>
  )
}
