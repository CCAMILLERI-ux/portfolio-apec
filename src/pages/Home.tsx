import { ArrowRight, Clock } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { Link } from '../lib/router'

const CASES = [
  {
    n: 1,
    to: '/cas-1',
    title: 'Rendre les services plus faciles à choisir',
    need: 'Un visiteur doit trouver en quelques secondes les services qui correspondent à sa situation.',
    skills: ['UX/UI', 'Animation du site', 'Hypothèse CRO'],
    duration: '1 min 30',
    thumb: 'services',
  },
  {
    n: 2,
    to: '/cas-2',
    title: 'Guider un nouvel inscrit',
    need: 'Une personne qui vient de créer son compte doit savoir par quoi commencer, sans être obligée de suivre un guidage.',
    skills: ['Parcours utilisateur', 'Recommandation explicable', 'Activation'],
    duration: '2 min',
    thumb: 'onboarding',
  },
  {
    n: 3,
    to: '/cas-3',
    title: 'Relier une recherche à un accompagnement',
    need: 'Une personne qui cherche « comment préparer un entretien » doit obtenir une réponse utile, puis découvrir l’aide adaptée.',
    skills: ['SEO éditorial', 'Maillage interne', 'Acquisition'],
    duration: '1 min 30',
    thumb: 'article',
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

export function Home() {
  return (
    <PortfolioLayout>
      <section className="pf-hero">
        <div className="pf-container">
          <p className="pf-kicker">Candidature · Chef de projet animation web</p>
          <h1 className="pf-hero__title" tabIndex={-1}>
            Trois prototypes pour mieux faire découvrir, choisir et utiliser une offre de services
          </h1>
          <p className="pf-hero__lead">
            Attirer par une réponse utile, orienter par un maillage pertinent, proposer une aide adaptée, puis mesurer
            l’utilisation effective. Des pistes exploratoires à discuter et à tester.
          </p>
          <div className="pf-howto">
            <p>
              <strong>Comment les lire :</strong> chaque prototype s’ouvre dans un univers inspiré d’apec.fr et se
              parcourt comme un utilisateur. Une barre de démo, en haut de page et hors maquette, permet de revenir au
              portfolio, de changer de variante, de réinitialiser et d’ouvrir « Comprendre ce cas » : mes choix,
              hypothèses et indicateurs sont regroupés en bas de page, dans <em>« Coulisses du prototype »</em>.
            </p>
          </div>
        </div>
      </section>

      <section className="pf-container pf-section" aria-labelledby="cas">
        <h2 id="cas" className="visually-hidden">Les trois cas</h2>
        <ol className="pf-cases">
          {CASES.map((c) => (
            <li key={c.n} className="pf-case">
              <Thumb kind={c.thumb} />
              <div className="pf-case__body">
                <p className="pf-case__num">Cas 0{c.n}</p>
                <h3 className="pf-case__title">{c.title}</h3>
                <p className="pf-case__need">{c.need}</p>
                <ul className="pf-tags" aria-label="Compétences illustrées">
                  {c.skills.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <p className="pf-case__duration"><Clock size={16} /> Durée indicative : {c.duration}</p>
                <Link to={c.to} className="pf-btn pf-btn--primary">
                  Explorer la démo<span className="visually-hidden"> — cas {c.n} : {c.title}</span> <ArrowRight size={18} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pf-container pf-section pf-columns">
        <div className="pf-panel">
          <h2>Parcours conseillé en cinq minutes</h2>
          <ol className="pf-steps">
            <li><strong>Cas 2 · 2 min</strong> — « Me guider », cochez « Préparer un entretien », réservez une session, puis ouvrez « Mes prochaines étapes ».</li>
            <li><strong>Cas 1 · 1 min 30</strong> — changez de situation, puis comparez « Existant observé », « Piste 1 » et « Piste 2 » depuis la barre de démo, en haut de page.</li>
            <li><strong>Cas 3 · 1 min 30</strong> — lisez l’introduction, suivez un lien vers un accompagnement et revenez ; cliquez sur « Comprendre ce cas ».</li>
          </ol>
        </div>
        <div className="pf-panel pf-panel--soft">
          <h2>Cadre de ce prototype</h2>
          <ul className="pf-list">
            <li>Ni refonte officielle d’apec.fr, ni audit : des pistes à tester.</li>
            <li>Aucune inscription, aucun rendez-vous réel, aucune donnée collectée.</li>
            <li>Seules les modalités lisibles sur des captures d’écran sont affichées ; le reste est signalé « à vérifier ».</li>
          </ul>
          <Link to="/sources" className="pf-link">Sources, limites et mini-kit UI <ArrowRight size={16} /></Link>
        </div>
      </section>
    </PortfolioLayout>
  )
}
