import { Badge } from '../components/Badge'
import { ArrowRight } from '../components/Icons'
import { PageBand } from '../components/PageBand'
import { Link } from '../lib/router'

/** Contenu connexe court, clairement identifié — pas une page de remplissage. */
export function Remuneration() {
  return (
    <>
      <PageBand
        back={{ to: '/cas-3', label: 'Conseil : préparer un entretien de recrutement' }}
        kicker="Conseils · Contenu connexe court"
        title="Aborder la rémunération en entretien"
        titleIsHeading={false}
      />
      <div className="container overlap">
        <article className="sheet article sheet--narrow" aria-labelledby="titre-remu">
          <h1 id="titre-remu" tabIndex={-1}>Aborder la rémunération en entretien : trois repères</h1>
          <p className="article__meta">
            Contenu original rédigé pour ce portfolio — 19/11/2026 · <Badge tone="demo">Page de démonstration</Badge>
          </p>
          <p className="article__intro">
            La question du salaire arrive souvent en fin d’entretien. La préparer à l’avance permet d’y
            répondre calmement, avec une fourchette argumentée plutôt qu’un chiffre improvisé.
          </p>
          <h2>1. Préparer une fourchette</h2>
          <p>
            Croisez plusieurs repères : grilles publiées dans votre secteur, offres comparables, niveau de
            responsabilité du poste et votre rémunération actuelle. Retenez un plancher et une cible.
          </p>
          <h2>2. Formuler votre réponse</h2>
          <p>
            Annoncez la fourchette puis reliez-la à ce que vous apportez au poste. Pensez aussi aux éléments
            hors salaire fixe : variable, télétravail, formation.
          </p>
          <h2>3. S’exercer avant le jour J</h2>
          <p>
            Cette question se prépare avec les autres : retrouvez{' '}
            <Link to="/cas-3" anchor="questions">les autres questions fréquentes d’un entretien de recrutement</Link>, ou{' '}
            <Link to="/service/atelier-entretiens?from=remuneration">exercez-vous à la question du salaire en atelier collectif</Link>.
          </p>
          <p className="muted small">Aucun chiffre de salaire n’est avancé ici : les repères dépendent du métier, du secteur et de la région.</p>
          <Link to="/cas-3" className="link-arrow">
            Revenir au conseil complet sur la préparation d’entretien <ArrowRight size={18} />
          </Link>
        </article>
      </div>
    </>
  )
}
