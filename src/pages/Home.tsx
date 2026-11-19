import { Badge } from '../components/Badge'
import { ArrowRight, Clock } from '../components/Icons'
import { SIGNATURE } from '../components/Layout'
import { PageBand } from '../components/PageBand'
import { Link } from '../lib/router'

const CASES = [
  {
    n: 1,
    to: '/cas-1',
    title: 'Rendre les services plus faciles à choisir',
    need: 'Un visiteur doit pouvoir trouver en quelques secondes les services qui correspondent à sa situation.',
    skills: ['UX/UI', 'Animation du site', 'Hypothèse CRO'],
    duration: '≈ 1 min 30',
  },
  {
    n: 2,
    to: '/cas-2',
    title: 'Guider un nouvel inscrit',
    need: 'Une personne qui vient de créer son compte doit savoir par quoi commencer, sans être obligée de suivre un guidage.',
    skills: ['Parcours utilisateur', 'Recommandation explicable', 'Activation'],
    duration: '≈ 2 min',
  },
  {
    n: 3,
    to: '/cas-3',
    title: 'Relier une recherche à un accompagnement',
    need: 'Une personne qui cherche « comment préparer un entretien » doit obtenir une réponse utile, puis découvrir l’aide adaptée.',
    skills: ['SEO éditorial', 'Maillage interne', 'Acquisition'],
    duration: '≈ 1 min 30',
  },
]

export function Home() {
  return (
    <>
      <PageBand
        showToolbar={false}
        kicker={SIGNATURE}
        title="Trois prototypes pour mieux faire découvrir, choisir et utiliser une offre de services"
      >
        <p className="band__lead">
          Pistes exploratoires pour le poste de Chef de projet animation web : attirer par une réponse
          utile, orienter par un maillage pertinent, proposer une aide adaptée et mesurer l’utilisation
          effective. Chaque démo se parcourt d’abord comme un utilisateur ; la méthode est repliée dans
          « Comprendre mes choix ».
        </p>
      </PageBand>

      <div className="container overlap">
        <ul className="case-grid" aria-label="Les trois démonstrations">
          {CASES.map((c) => (
            <li key={c.n} className="case-card">
              <p className="case-card__num">Cas {c.n}</p>
              <h2 className="case-card__title">{c.title}</h2>
              <p className="case-card__need">{c.need}</p>
              <ul className="tag-list" aria-label="Compétences illustrées">
                {c.skills.map((s) => (
                  <li key={s}><Badge tone="kind">{s}</Badge></li>
                ))}
              </ul>
              <p className="case-card__duration">
                <Clock size={18} /> Durée indicative : {c.duration}
              </p>
              <Link to={c.to} className="btn btn--primary">
                Explorer la démo<span className="visually-hidden"> — cas {c.n} : {c.title}</span>
                <ArrowRight size={18} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="home-columns">
          <section className="panel" aria-labelledby="parcours-5min">
            <h2 id="parcours-5min">Parcours conseillé en cinq minutes</h2>
            <ol className="steps-list">
              <li><strong>Cas 2 (2 min)</strong> — « Me guider », cochez « Préparer un entretien », réservez une session simulée, puis ouvrez « Mes prochaines étapes ».</li>
              <li><strong>Cas 1 (1 min 30)</strong> — changez de situation, puis basculez « Existant observé / Piste exploratoire ».</li>
              <li><strong>Cas 3 (1 min 30)</strong> — lisez l’introduction, suivez un lien vers un accompagnement et revenez ; ouvrez « Comprendre mes choix ».</li>
            </ol>
          </section>
          <section className="panel panel--muted" aria-labelledby="cadre">
            <h2 id="cadre">Cadre de ce prototype</h2>
            <ul className="plain-list">
              <li>Ni refonte officielle d’apec.fr, ni audit : des pistes à discuter et à tester.</li>
              <li>Aucune inscription, aucun rendez-vous réel, aucune donnée collectée.</li>
              <li>Modalités issues de captures d’écran ; celles non vérifiées sont signalées « à vérifier ».</li>
            </ul>
            <Link to="/sources" className="link-arrow">
              Sources, limites et mini-kit UI <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}
