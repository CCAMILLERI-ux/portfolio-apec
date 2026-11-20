import { ArrowRight, Clock } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { Link } from '../lib/router'

const CASES = [
  {
    n: 1,
    to: '/cas-01-seo',
    title: 'De la recherche Google à l’utilisation des services',
    need: 'Un article optimisé pour le SEO qui oriente vers les outils et accompagnements adaptés.',
    skills: ['SEO éditorial', 'Maillage interne', 'Acquisition'],
    duration: '1 min 30',
    thumb: 'article',
  },
  {
    n: 2,
    to: '/cas-02-ab-test',
    title: 'Clarifier l’offre pour faciliter le choix',
    need: 'Un A/B test UX/UI pour clarifier l’offre de services et améliorer la conversion.',
    skills: ['A/B testing', 'KPI', 'Conversion', 'Design system / Figma'],
    duration: '1 min 30',
    thumb: 'services',
  },
  {
    n: 3,
    to: '/cas-03-inscription',
    title: 'Accompagner l’utilisateur à chaque étape de son inscription',
    need: 'Un tunnel guidé pour faciliter la création de compte et l’accès aux services.',
    skills: ['Parcours utilisateur', 'Activation', 'Conversion'],
    duration: '2 min',
    thumb: 'onboarding',
  },
] as const

/** Miniature schématique de l'écran prototype (purement décorative). */
function Thumb({ kind }: { kind: (typeof CASES)[number]['thumb'] }) {
  return (
    <div className={`thumb thumb--${kind}`} aria-hidden="true">
      <div className="thumb__bar" />
      {kind === 'services' && (
        <>
          <div className="thumb__band">
            <span className="thumb__tile is-on" /><span className="thumb__tile" /><span className="thumb__tile" />
            <span className="thumb__tile" /><span className="thumb__tile" /><span className="thumb__tile" />
          </div>
          <div className="thumb__cards">
            <span className="thumb__card thumb__card--y" /><span className="thumb__card thumb__card--b" /><span className="thumb__card thumb__card--n" />
          </div>
        </>
      )}
      {kind === 'onboarding' && (
        <>
          <div className="thumb__band thumb__band--short" />
          <div className="thumb__sheet">
            <div className="thumb__progress"><span className="is-on" /><span className="is-on" /><span className="is-cur" /><span /><span /></div>
            <span className="thumb__line thumb__line--title" />
            <span className="thumb__choice is-on" /><span className="thumb__choice" />
            <span className="thumb__btn" />
          </div>
        </>
      )}
      {kind === 'article' && (
        <>
          <div className="thumb__band thumb__band--short" />
          <div className="thumb__article">
            <div className="thumb__main">
              <span className="thumb__line thumb__line--title" />
              <span className="thumb__hero" />
              <span className="thumb__line" /><span className="thumb__line" /><span className="thumb__line thumb__line--short" />
            </div>
            <div className="thumb__side"><span className="thumb__card thumb__card--b" /><span className="thumb__card thumb__card--n" /></div>
          </div>
        </>
      )}
    </div>
  )
}

/** Résultats de la candidate (sans nom d'employeur), projetés sur le poste. */
const IMPACT = [
  {
    axis: 'Acquisition',
    figure: '83 %',
    done: 'de conformité SEO technique sur un site de marque, dont j’ai piloté toute la stratégie SEO (technique, contenus, maillage).',
    apec: 'faire de la recherche naturelle un levier d’accès aux services.',
  },
  {
    axis: 'Conversion',
    figure: '× 2',
    done: 'sur la conversion du tunnel de création de compte d’un espace client B2B, grâce à l’optimisation UX et aux A/B tests.',
    apec: 'transformer les visites en comptes, candidatures et rendez-vous.',
  },
  {
    axis: 'Animation',
    figure: '7 sites',
    done: 'et plus de 25 services digitaux pilotés en BUILD et en RUN, avec la DSI et 6 agences.',
    apec: 'une roadmap d’animation tenue, déployée dans le CMS avec les équipes.',
  },
]

export function Home() {
  return (
    <PortfolioLayout compactBrand>
      <section className="pf-container pf-intro" aria-labelledby="identite">
        <div className="pf-intro__id">
          <p className="pf-intro__kicker">Candidature à l’Apec</p>
          <h1 id="identite" className="pf-intro__h1" tabIndex={-1}>
            <span className="pf-intro__name">Caroline Camilleri</span>
            <span className="pf-intro__role">Cheffe de projet Animation Web</span>
          </h1>
          <p className="pf-intro__baseline">
            Développer le trafic qualifié, animer les contenus et optimiser les parcours pour favoriser l’utilisation des services.
          </p>
        </div>
        <div className="pf-intro__about">
          <h2 className="pf-intro__h2">À propos de moi</h2>
          <p>
            Référente de la performance de sites à fort trafic de services, je relie SEO, animation éditoriale et
            optimisation de la conversion. Je pilote la roadmap d’animation, je maquette les variantes sur Figma à partir du design system, je teste, je mesure et je déploie dans le CMS
            avec la DSI, les équipes produit et les agences. Ici, trois cas concrets pour apec.fr et mon plan SEO.
          </p>
          <ul className="pf-contact" aria-label="Me contacter">
            <li>
              <a href="https://www.linkedin.com/in/caroline-camilleri-pro/" target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="visually-hidden"> (nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="pf-container pf-cases-wrap" aria-labelledby="cas">
        <h2 id="cas" className="pf-cases-title">Trois cas concrets pour apec.fr</h2>
        <ol className="pf-cases">
          {CASES.map((c) => (
            <li key={c.n} className="pf-case">
              <Thumb kind={c.thumb} />
              <div className="pf-case__body">
                <p className="pf-case__meta">
                  <span className="pf-case__num">Cas 0{c.n}</span>
                  <span className="pf-case__duration"><Clock size={14} /> {c.duration}<span className="visually-hidden"> (durée indicative)</span></span>
                </p>
                <h3 className="pf-case__title">{c.title}</h3>
                <p className="pf-case__need">{c.need}</p>
                <ul className="pf-tags" aria-label="Compétences illustrées">
                  {c.skills.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <Link to={c.to} className="pf-btn pf-btn--primary pf-btn--sm">
                  Explorer la démo<span className="visually-hidden"> — cas {c.n} : {c.title}</span> <ArrowRight size={16} />
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <details className="seo-acc pf-howto-acc">
          <summary><span>Comment explorer les prototypes</span></summary>
          <div className="seo-acc__body">
            <p>
              Chaque prototype s’ouvre dans un univers inspiré d’apec.fr et se parcourt comme un utilisateur. Une barre de
              démo, en haut de page et hors maquette, permet de revenir au portfolio, de changer de variante, de
              réinitialiser et d’ouvrir « Comprendre ce cas » : mes choix, hypothèses et indicateurs sont regroupés en bas
              de page, dans <em>« Coulisses du prototype »</em>.
            </p>
          </div>
        </details>
        <p className="pf-frame-note">
          Prototypes indépendants inspirés d’apec.fr, sans affiliation officielle : aucune inscription réelle, aucune donnée collectée.{' '}
          <Link to="/design-system" anchor="sources" className="pf-link">Sources et mentions <ArrowRight size={16} /></Link>
        </p>
      </section>

      <section className="pf-container pf-plan" aria-labelledby="plan-seo">
        <article className="pf-case pf-case--wide">
          <div className="pf-plan__visual" aria-hidden="true">
            <span>Diagnostic</span><span>4 piliers</span><span>Démonstration</span><span>90 jours</span>
          </div>
          <div className="pf-case__body">
            <h2 id="plan-seo" className="pf-case__title">Stratégie SEO – Méthode de travail</h2>
            <p className="pf-case__need">
              Un plan SEO complet pour apec.fr : diagnostic, stratégie en quatre piliers (technique, contenus, maillage,
              visibilité IA), démonstration et feuille de route sur 90 jours.
            </p>
            <ul className="pf-tags" aria-label="Compétences illustrées">
              <li>SEO technique</li><li>Contenus</li><li>Maillage interne</li><li>Visibilité IA</li><li>Pilotage</li>
            </ul>
            <Link to="/plan-seo" className="pf-btn pf-btn--primary pf-btn--sm">
              Découvrir la méthode<span className="visually-hidden"> : stratégie SEO pour apec.fr</span> <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      </section>

      <section className="pf-proof" aria-labelledby="apport">
        <div className="pf-container">
          <h2 id="apport" className="pf-proof__title">Des résultats déjà obtenus, au service d’apec.fr</h2>
          <ul className="pf-impact__grid">
            {IMPACT.map((i) => (
              <li key={i.axis} className="pf-impact__card">
                <p className="pf-impact__axis">{i.axis}</p>
                <p className="pf-impact__figure">{i.figure}</p>
                <p className="pf-impact__done">{i.done}</p>
                <p className="pf-impact__apec"><strong>Pour apec.fr :</strong> {i.apec}</p>
              </li>
            ))}
          </ul>
          <p className="pf-proof__cta">
            <a href="https://www.linkedin.com/in/caroline-camilleri-pro/" target="_blank" rel="noopener noreferrer" className="pf-link">
              Échanger sur LinkedIn<span className="visually-hidden"> (nouvel onglet)</span> <ArrowRight size={16} />
            </a>
          </p>
        </div>
      </section>
    </PortfolioLayout>
  )
}
