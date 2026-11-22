import { ArrowRight, Clock, LinkedIn } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { Link } from '../lib/router'

const LINKEDIN = 'https://www.linkedin.com/in/caroline-camilleri-pro/'

/** Les quatre réalisations : même format de carte. */
const WORKS = [
  {
    n: '01',
    to: '/cas-01-seo',
    mission: 'Acquisition',
    title: 'De la recherche Google aux services',
    text: 'Un article SEO qui oriente vers les outils et accompagnements adaptés.',
    skills: ['SEO éditorial', 'Maillage interne', 'Intention de recherche'],
    duration: '1 min 30',
    cta: 'Explorer la démo',
  },
  {
    n: '02',
    to: '/cas-02-ab-test',
    mission: 'Performance & conversion',
    title: 'Clarifier l’offre pour faciliter le choix',
    text: 'Un A/B test UX/UI pour rendre l’offre de services plus lisible.',
    skills: ['A/B testing', 'KPI', 'Design system'],
    duration: '1 min 30',
    cta: 'Explorer la démo',
  },
  {
    n: '03',
    to: '/cas-03-inscription',
    mission: 'Performance & conversion\u00a0·\u00a0Animation',
    title: 'Inscription accompagnée',
    text: 'Un tunnel guidé, de la création de compte au premier service utilisé.',
    skills: ['Parcours utilisateur', 'Activation', 'Recommandation'],
    duration: '2 min',
    cta: 'Explorer la démo',
  },
  {
    n: '04',
    to: '/plan-seo',
    mission: 'Acquisition',
    title: 'Plan SEO pour apec.fr',
    text: 'Diagnostic, stratégie en quatre piliers et feuille de route sur 90 jours.',
    skills: ['SEO technique', 'Stratégie de contenus', 'Visibilité IA'],
    duration: '2 min',
    cta: 'Découvrir le plan',
  },
]

/** Résultats de la candidate (sans nom d'employeur). */
const RESULTS = [
  { figure: '83 %', text: 'conformité SEO technique d’un site de marque dont j’ai piloté la stratégie SEO' },
  { figure: '× 2', text: 'conversion d’un tunnel de création de compte B2B' },
  { figure: '7 sites', text: 'et plus de 25 services digitaux pilotés avec la DSI et 6 agences' },
]

export function Home() {
  return (
    <PortfolioLayout isHome>
      <section className="pf-container pf-accroche" aria-labelledby="accroche">
        <p className="pf-accroche__kicker">Candidature · Chef de projet Animation{'\u00a0'}Web</p>
        <p className="pf-accroche__name">
          Caroline Camilleri
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="pf-accroche__linkedin"
            aria-label="Profil LinkedIn de Caroline Camilleri (nouvel onglet)"
          >
            <LinkedIn size={22} />
          </a>
        </p>
        <h1 id="accroche" className="pf-accroche__h1" tabIndex={-1}>
          Faire venir les bons publics sur apec.fr et les guider vers le bon{' '}service
        </h1>
        <p className="pf-accroche__text">
          Quatre réalisations pour illustrer les missions du poste{' '}: acquisition SEO, performance et
          conversion, animation du site. Chacune se parcourt en deux{' '}minutes.
        </p>
        <Link to="/" anchor="realisations" className="pf-btn pf-btn--primary">
          Découvrir mes réalisations <ArrowRight size={18} />
        </Link>
      </section>

      <section className="pf-container pf-works-wrap" aria-labelledby="realisations">
        <h2 id="realisations" className="pf-works-title" tabIndex={-1}>Réalisations</h2>
        <ol className="pf-works">
          {WORKS.map((w) => (
            <li key={w.n} className={`pf-work${w.n === '04' ? ' pf-work--wide' : ''}`}>
              <p className="pf-work__meta">
                <span className="pf-work__num" aria-hidden="true">{w.n}</span>
                <span className="pf-work__duration"><Clock size={14} /> {w.duration}<span className="visually-hidden"> (durée indicative)</span></span>
              </p>
              <p className="pf-work__mission"><span className="visually-hidden">Mission{' '}: </span>{w.mission}</p>
              <h3 className="pf-work__title">{w.title}</h3>
              <p className="pf-work__text">{w.text}</p>
              <ul className="pf-tags" aria-label="Compétences illustrées">
                {w.skills.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <Link to={w.to} className="pf-btn pf-btn--primary pf-btn--sm">
                {w.cta}<span className="visually-hidden"> — réalisation {w.n}{' '}: {w.title}</span> <ArrowRight size={16} />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="pf-results" aria-labelledby="resultats">
        <div className="pf-container">
          <h2 id="resultats" className="pf-results__title">Mes résultats</h2>
          <ul className="pf-results__list">
            {RESULTS.map((r) => (
              <li key={r.figure}>
                <span className="pf-results__figure">{r.figure}</span>
                <span className="pf-results__text">{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PortfolioLayout>
  )
}
