import { PageBand } from '../components/PageBand'
import { Link } from '../lib/router'

export function NotFound() {
  return (
    <>
      <PageBand back={{ to: '/', label: 'Portfolio' }} title="Page introuvable" />
      <div className="container overlap">
        <div className="sheet sheet--narrow">
          <p>Cette page n’existe pas dans le prototype.</p>
          <Link to="/" className="btn btn--primary">Revenir à l’accueil du portfolio</Link>
        </div>
      </div>
    </>
  )
}
