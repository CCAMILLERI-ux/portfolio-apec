import { ArrowRight, Clock } from '../components/Icons'
import { Illustration, type Tone } from '../components/Illustration'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { Link } from '../lib/router'

const LINKEDIN = 'https://www.linkedin.com/in/caroline-camilleri-pro/'

type Scene = 'conseil' | 'boussole' | 'echange' | 'document'

/** Les quatre réalisations : une couleur du design system par carte. */
const WORKS: {
  n: string
  to: string
  mission: string
  title: string
  text: string
  duration: string
  cta: string
  color: 'navy' | 'yellow' | 'blue' | 'tint'
  scene: Scene
  tone: Tone
}[] = [
  {
    n: '01',
    to: '/cas-01-seo',
    mission: 'Acquisition',
    title: 'De la recherche Google aux services',
    text: 'Un article SEO qui oriente vers les outils et accompagnements adaptés.',
    duration: '1 min 30',
    cta: 'Explorer la démo',
    color: 'navy',
    scene: 'conseil',
    tone: 'navy',
  },
  {
    n: '02',
    to: '/cas-02-ab-test',
    mission: 'Performance &\u00a0conversion',
    title: 'Clarifier l’offre pour faciliter le choix',
    text: 'Un A/B test UX/UI pour rendre l’offre de services plus lisible.',
    duration: '1 min 30',
    cta: 'Explorer la démo',
    color: 'yellow',
    scene: 'boussole',
    tone: 'yellow',
  },
  {
    n: '03',
    to: '/cas-03-inscription',
    mission: 'Performance &\u00a0conversion · Animation',
    title: 'Inscription accompagnée',
    text: 'Un tunnel guidé, de la création de compte au premier service utilisé.',
    duration: '2 min',
    cta: 'Explorer la démo',
    color: 'blue',
    scene: 'echange',
    tone: 'blue',
  },
  {
    n: '04',
    to: '/plan-seo',
    mission: 'Acquisition',
    title: 'Plan SEO pour apec.fr',
    text: 'Diagnostic, stratégie en quatre piliers et feuille de route sur 90 jours.',
    duration: '2 min',
    cta: 'Découvrir le plan',
    color: 'tint',
    scene: 'document',
    tone: 'blue',
  },
]

/** Résultats de la candidate (sans nom d'employeur). */
const RESULTS = [
  { figure: '83 %', text: 'conformité SEO technique des sites dont je pilote la stratégie SEO' },
  { figure: '× 2', text: 'conversion du tunnel de création de compte d’un espace client B2B, grâce à l’UX et aux A/B tests' },
  { figure: '70 %', text: 'des comptes clients de cet espace créés en ligne' },
  { figure: '3,6 M€', text: 'de chiffre d’affaires digital généré par cet espace client' },
  { figure: '17 000', text: 'contacts par an générés par la refonte du moteur de recherche des grossistes, devenu levier de génération de leads' },
  { figure: '7 sites', text: 'et plus de 25 services digitaux pilotés avec la DSI et 6 agences' },
]

export function Home() {
  return (
    <PortfolioLayout isHome>
      <section className="pf-container pf-hero2" aria-labelledby="accroche">
        <p className="pf-hero2__kicker">Candidature · Chef de projet Animation{' '}Web</p>
        <h1 id="accroche" className="pf-hero2__h1" tabIndex={-1}>
          Rendre apec.fr toujours plus fluide, utile et{' '}performant
        </h1>
        <p className="pf-hero2__text">
          Quatre réalisations autour des missions du poste{' '}: acquisition SEO, performance et conversion,
          animation du{' '}site.
        </p>
      </section>

      <section className="pf-container pf-real" aria-labelledby="realisations">
        <h2 id="realisations" className="pf-real__title" tabIndex={-1}>Réalisations</h2>
        <ol className="pf-real__grid">
          {WORKS.map((w) => (
            <li key={w.n} className={`pf-rcard pf-rcard--${w.color}`}>
              <Illustration name={w.scene} tone={w.tone} className="pf-rcard__illu" />
              <p className="pf-rcard__meta">
                <span className="pf-rcard__num" aria-hidden="true">{w.n}</span>
                <span className="pf-rcard__mission"><span className="visually-hidden">Mission{' '}: </span>{w.mission}</span>
              </p>
              <h3 className="pf-rcard__title">{w.title}</h3>
              <p className="pf-rcard__text">{w.text}</p>
              <div className="pf-rcard__foot">
                <span className="pf-rcard__duration"><Clock size={14} /> {w.duration}<span className="visually-hidden"> (durée indicative)</span></span>
                <Link to={w.to} className="pf-rcard__btn">
                  {w.cta}<span className="visually-hidden"> — réalisation {w.n}{' '}: {w.title}</span> <ArrowRight size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pf-container pf-about" aria-labelledby="a-propos">
        <h2 id="a-propos" className="pf-about__title" tabIndex={-1}>À propos de moi</h2>
        <p className="pf-about__text">
          Cheffe de projet digital et Product Owner, je pilote des sites et services web de bout en bout{' '}: roadmap
          d’animation, SEO, parcours utilisateurs, A/B tests et déploiement dans le CMS. Je coordonne les métiers, la DSI
          et les agences, avec un fil rouge{' '}: améliorer l’expérience utilisateur, mesures à{' '}l’appui.
        </p>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="pf-about__btn">
          Voir mon profil LinkedIn<span className="visually-hidden"> (nouvel onglet)</span> <ArrowRight size={16} />
        </a>
      </section>

      <section className="pf-proof2" aria-labelledby="resultats">
        <div className="pf-container">
          <h2 id="resultats" className="pf-proof2__title">Des résultats concrets sur les projets que je{' '}pilote</h2>
          <ul className="pf-proof2__list">
            {RESULTS.map((r) => (
              <li key={r.figure}>
                <span className="pf-proof2__figure">{r.figure}</span>
                <span className="pf-proof2__text">{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PortfolioLayout>
  )
}
