import { ArrowRight, Clock } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { Link } from '../lib/router'

const CASES = [
  {
    n: 1,
    to: '/cas-3',
    title: 'De la recherche Google à l’utilisation des services',
    need: 'Un article optimisé pour le SEO qui oriente vers les outils et accompagnements adaptés.',
    skills: ['SEO éditorial', 'Maillage interne', 'Acquisition'],
    duration: '1 min 30',
    thumb: 'article',
  },
  {
    n: 2,
    to: '/cas-1',
    title: 'Clarifier l’offre pour faciliter le choix',
    need: 'Une simulation d’A/B test UX/UI pour optimiser la conversion.',
    skills: ['UX/UI', 'Animation du site', 'Hypothèse CRO'],
    duration: '1 min 30',
    thumb: 'services',
  },
  {
    n: 3,
    to: '/cas-2',
    title: 'Accompagner l’utilisateur à chaque étape de son inscription',
    need: 'Un tunnel guidé pour faciliter la création de compte et l’accès aux services.',
    skills: ['Parcours utilisateur', 'Recommandation explicable', 'Activation'],
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
            Développer le trafic qualifié, animer les contenus et optimiser les parcours pour favoriser l’utilisation des services.
          </p>
        </div>
        <div className="pf-intro__about">
          <h2 className="pf-intro__h2">À propos de moi</h2>
          <p>
            Ma double expérience en marketing digital et en pilotage de services web associe SEO, animation éditoriale et
            optimisation de la conversion. Habituée à coordonner métiers, DSI et agences, je m’appuie sur les données et
            l’analyse des usages pour prioriser les améliorations et les déployer dans le CMS.
          </p>
        </div>
      </section>

      <section className="pf-container pf-cases-wrap" aria-labelledby="cas">
        <h2 id="cas" className="pf-cases-title">Trois cas concrets pour apec.fr</h2>
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
              réinitialiser et d’ouvrir « Comprendre ce cas » : mes choix, hypothèses et indicateurs sont regroupés en bas
              de page, dans <em>« Coulisses du prototype »</em>.
            </p>
            <p>
              Ces prototypes sont des pistes exploratoires à discuter et à tester : attirer par une réponse utile, orienter
              par un maillage pertinent, proposer une aide adaptée, puis mesurer l’utilisation effective.
            </p>
          </div>
        </details>
      </section>

      <section className="pf-container pf-module" aria-labelledby="module-seo">
        <div className="pf-module__inner">
          <div>
            <p className="pf-case__num">Module complémentaire</p>
            <h2 id="module-seo" className="pf-module__title">Du besoin au service : une acquisition SEO utile</h2>
            <p className="pf-case__need">
              Un plan d’acquisition SEO orienté vers l’utilisation des services : six situations, un parcours
              démonstrateur de la recherche à l’inscription, et ma méthode sur 90 jours (priorisation, coordination, mesure).
            </p>
            <ul className="pf-tags" aria-label="Compétences illustrées">
              <li>SEO</li><li>Maillage interne</li><li>Priorisation</li><li>Coordination</li><li>Mesure</li>
            </ul>
          </div>
          <Link to="/plan-seo" className="pf-btn pf-btn--primary">
            Explorer le module<span className="visually-hidden"> : plan d’acquisition SEO</span> <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="pf-container pf-section pf-columns">
        <div className="pf-panel">
          <h2>Parcours conseillé en cinq minutes</h2>
          <ol className="pf-steps">
            <li><strong>Cas 01 · 1 min 30</strong> — lisez l’introduction, suivez un lien vers un accompagnement et revenez ; cliquez sur « Comprendre ce cas ».</li>
            <li><strong>Cas 02 · 1 min 30</strong> — changez de situation, puis comparez « Existant observé » et les pistes 1 à 3 depuis la barre de démo, en haut de page.</li>
            <li><strong>Cas 03 · 2 min</strong> — « Me guider », cochez « Préparer un entretien », réservez une session, puis ouvrez « Mes prochaines étapes ».</li>
          </ol>
        </div>
        <div className="pf-panel pf-panel--soft">
          <h2>Cadre de ce prototype</h2>
          <ul className="pf-list">
            <li>Ni refonte officielle d’apec.fr, ni audit : des pistes à tester.</li>
            <li>Aucune inscription, aucun rendez-vous réel, aucune donnée collectée.</li>
            <li>Les informations sur les services reprennent apec.fr ; ce qui reste à confirmer n’est pas affiché.</li>
          </ul>
          <Link to="/sources" className="pf-link">Sources, limites et mini-kit UI <ArrowRight size={16} /></Link>
        </div>
      </section>
    </PortfolioLayout>
  )
}
