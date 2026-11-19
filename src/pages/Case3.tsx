import { useState } from 'react'
import { Badge } from '../components/Badge'
import { ExplainPanel } from '../components/ExplainPanel'
import { ArrowRight, Plus } from '../components/Icons'
import { PageBand } from '../components/PageBand'
import { Link } from '../lib/router'

const TOC = [
  { id: 'etapes', label: 'Les 5 étapes de préparation' },
  { id: 'questions', label: 'Exemples de questions et pistes de réponse' },
  { id: 'checklist', label: 'Checklist de la veille' },
  { id: 'accompagnement', label: 'Se faire accompagner' },
]

const CHECKLIST = [
  'J’ai relu l’offre et surligné les 3 attentes principales.',
  'Je peux présenter mon parcours en 2 minutes.',
  'J’ai préparé 3 exemples concrets de réalisations.',
  'J’ai noté 2 ou 3 questions à poser au recruteur.',
  'Je connais l’heure, le lieu ou le lien de connexion, et le nom de mon interlocuteur.',
  'J’ai une fourchette de rémunération en tête.',
]

const QUESTIONS = [
  {
    q: 'Présentez-vous.',
    a: 'Un fil conducteur en trois temps : ce que vous faites aujourd’hui, une ou deux réalisations marquantes, pourquoi ce poste est la suite logique.',
  },
  {
    q: 'Pourquoi notre entreprise ?',
    a: 'Reliez un élément précis (projet, marché, valeurs affichées) à ce que vous pouvez y apporter.',
  },
  {
    q: 'Parlez-moi d’une difficulté que vous avez surmontée.',
    a: 'Situation, action, résultat : décrivez ce que vous avez fait personnellement et ce que vous en avez retenu.',
  },
  {
    q: 'Quelles sont vos prétentions salariales ?',
    a: 'Donnez une fourchette préparée à partir de repères de marché et de votre expérience.',
    link: true,
  },
  {
    q: 'Avez-vous des questions ?',
    a: 'Oui, toujours : sur les priorités du poste, l’équipe, les critères de réussite à six mois.',
  },
]

export function Case3() {
  const [checked, setChecked] = useState<number[]>([])
  const toggle = (i: number) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))

  return (
    <>
      <PageBand
        back={{ to: '/', label: 'Portfolio · Cas 3' }}
        kicker="Conseils · Entretiens de recrutement"
        title="Comment préparer un entretien de recrutement ?"
        titleIsHeading={false}
      />

      <div className="container overlap">
        <div className="article-layout">
          <article className="sheet article" aria-labelledby="titre-conseil">
            <h1 id="titre-conseil" tabIndex={-1}>Comment préparer un entretien de recrutement ?</h1>
            <p className="article__meta">
              Contenu original rédigé pour ce portfolio — mis à jour le 19/11/2026 ·{' '}
              <Badge tone="demo">Page de démonstration</Badge>
            </p>

            <p className="article__intro">
              Pour préparer un entretien de recrutement, concentrez-vous sur cinq points : analyser l’offre,
              vous renseigner sur l’entreprise, construire votre présentation et vos exemples, vous entraîner
              à voix haute, puis régler la logistique et vos questions. Comptez quelques heures réparties sur
              plusieurs jours plutôt qu’une seule soirée.
            </p>

            <nav className="toc" aria-labelledby="sommaire">
              <h2 id="sommaire" className="toc__title">Sommaire</h2>
              <ol>
                {TOC.map((t) => (
                  <li key={t.id}>
                    <Link to="/cas-3" anchor={t.id}>{t.label}</Link>
                  </li>
                ))}
              </ol>
            </nav>

            <section aria-labelledby="etapes">
              <h2 id="etapes" tabIndex={-1}>Les 5 étapes de préparation</h2>

              <h3>1. Décrypter l’offre</h3>
              <p>
                Repérez les trois attentes qui reviennent le plus dans l’annonce (compétences, contexte,
                résultats attendus). Pour chacune, notez une expérience qui y répond. C’est la base de tout
                l’entretien.
              </p>

              <h3>2. Comprendre l’entreprise</h3>
              <p>
                Site, actualités récentes, rapports publics, profils des futurs collègues : cherchez ce qui
                explique pourquoi le poste est ouvert maintenant. Une question informée sur ce contexte vaut
                mieux qu’une liste de chiffres récités.
              </p>

              <h3>3. Préparer votre présentation et vos exemples</h3>
              <p>
                Construisez une présentation de deux minutes et trois exemples concrets, structurés en
                situation, action, résultat. Avec un parcours long, choisissez les réalisations les plus
                proches du poste plutôt que de tout raconter.
              </p>

              <h3>4. S’entraîner à voix haute</h3>
              <p>
                Formuler ses réponses à voix haute révèle ce qui reste flou. Vous pouvez commencer seul avec
                le <Link to="/service/simulateur-entretien?from=cas-3">simulateur d’entretien en ligne, pour vous entraîner en autonomie</Link>.
                Si vous préférez apprendre avec d’autres, l’
                <Link to="/service/atelier-entretiens?from=cas-3">atelier collectif « Réussir vos entretiens de recrutement »</Link>{' '}
                passe en revue les différents types d’entretien.
              </p>
              <p className="callout">
                <strong>Votre entretien est déjà fixé ?</strong>{' '}
                <Link to="/service/entretien-programme?from=cas-3">Répétez-le lors d’une simulation individuelle d’1 h avec un consultant</Link>,
                adaptée au poste visé.
              </p>

              <h3>5. Régler la logistique et vos questions</h3>
              <p>
                Vérifiez le format (sur place, visio, téléphone), le nom de votre interlocuteur et la durée
                prévue. Préparez deux ou trois questions sur les priorités du poste. Pensez aussi à la
                rémunération : <Link to="/conseil/remuneration">quelques repères pour aborder le salaire sereinement</Link>.
              </p>
            </section>

            <section aria-labelledby="questions">
              <h2 id="questions" tabIndex={-1}>Exemples de questions et pistes de réponse</h2>
              <dl className="qa">
                {QUESTIONS.map((x) => (
                  <div key={x.q} className="qa__item">
                    <dt>« {x.q} »</dt>
                    <dd>
                      {x.a}
                      {x.link && (
                        <> <Link to="/conseil/remuneration">Voir comment préparer votre fourchette</Link>.</>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="checklist">
              <h2 id="checklist" tabIndex={-1}>Checklist de la veille</h2>
              <fieldset className="checklist">
                <legend className="visually-hidden">Checklist de préparation (non enregistrée)</legend>
                {CHECKLIST.map((item, i) => (
                  <label key={item} className={`checklist__item${checked.includes(i) ? ' is-selected' : ''}`}>
                    <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} />
                    <span>{item}</span>
                  </label>
                ))}
              </fieldset>
              <p className="muted small" aria-live="polite">
                {checked.length} point{checked.length > 1 ? 's' : ''} sur {CHECKLIST.length} — rien n’est enregistré.
              </p>
            </section>

            <section aria-labelledby="accompagnement" className="accompany">
              <h2 id="accompagnement" tabIndex={-1}>Se faire accompagner selon votre situation</h2>
              <ul className="accompany__list">
                <li>
                  <p className="accompany__when">Vous voulez vous préparer en amont, sans entretien fixé</p>
                  <Link to="/service/atelier-entretiens?from=cas-3-accompagnement" className="link-arrow">
                    Découvrir l’atelier sur les entretiens de recrutement <ArrowRight size={18} />
                  </Link>
                </li>
                <li>
                  <p className="accompany__when">Vous avez un entretien dans les prochains jours</p>
                  <Link to="/service/entretien-programme?from=cas-3-accompagnement" className="link-arrow">
                    Préparer cet entretien avec un consultant <ArrowRight size={18} />
                  </Link>
                </li>
                <li>
                  <p className="accompany__when">Vous préférez vous entraîner seul, quand vous voulez</p>
                  <Link to="/service/simulateur-entretien?from=cas-3-accompagnement" className="link-arrow">
                    Essayer le simulateur d’entretien <ArrowRight size={18} />
                  </Link>
                </li>
              </ul>
            </section>

            <p className="article__sources muted small">
              Sources : contenu original de démonstration, sans statistique citée. Les services mentionnés
              renvoient aux fiches du prototype, établies d’après des captures d’apec.fr.
            </p>
          </article>

          <aside className="sidebar" aria-label="Pour aller plus loin">
            <div className="side-card side-card--blue">
              <p className="side-card__kicker">Contenu connexe</p>
              <h2 className="side-card__title">Aborder la rémunération en entretien</h2>
              <p>Préparer une fourchette et formuler sa réponse.</p>
              <Link to="/conseil/remuneration" className="link-arrow link-arrow--light">
                Lire les repères <ArrowRight size={18} />
              </Link>
            </div>
          </aside>
        </div>

        <Case3Explain />
      </div>
    </>
  )
}

const SEO_TITLE = 'Comment préparer un entretien de recrutement ? 5 étapes'
const SEO_DESC =
  'Analyser l’offre, préparer vos exemples, vous entraîner : la méthode en 5 étapes, des exemples de questions et une checklist pour la veille de l’entretien.'

const LINK_MAP = [
  ['Conseil — préparer un entretien', 'Simulateur d’entretien', '« simulateur d’entretien en ligne, pour vous entraîner en autonomie »', 'S’entraîner seul'],
  ['Conseil — préparer un entretien', 'Atelier « Réussir vos entretiens »', '« atelier collectif Réussir vos entretiens de recrutement »', 'Se préparer en groupe'],
  ['Conseil — préparer un entretien', 'Entretien programmé (simulation)', '« Répétez-le lors d’une simulation individuelle d’1 h »', 'Entretien déjà fixé'],
  ['Conseil — préparer un entretien', 'Repères rémunération', '« quelques repères pour aborder le salaire »', 'Question fréquente'],
  ['Fiche atelier', 'Conseil — étapes', '« Lire nos conseils pour préparer votre séance »', 'Préparer la séance'],
  ['Repères rémunération', 'Conseil — questions', '« les autres questions fréquentes »', 'Retour au besoin principal'],
  ['Repères rémunération', 'Atelier « Réussir vos entretiens »', '« s’exercer à la question du salaire en atelier »', 'Passer à la pratique'],
]

function Case3Explain() {
  return (
    <ExplainPanel
      events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
      rubrics={{
        constat: (
          <p>
            Une personne qui tape « comment préparer un entretien » cherche d’abord une réponse, pas un
            service. Sur les captures, les contenus et les services existent mais sont reliés surtout par
            des blocs latéraux génériques.
          </p>
        ),
        hypothese: (
          <p>
            Si la page répond directement au besoin puis propose, au bon endroit du texte, l’accompagnement
            qui correspond à la situation (seul, en groupe, entretien fixé), alors davantage de lecteurs
            pourraient utiliser un service. Hypothèse à tester.
          </p>
        ),
        modification: (
          <ul>
            <li>Introduction qui répond en quelques lignes, puis sommaire.</li>
            <li>Liens intégrés au texte, avec ancres descriptives et différenciées selon la situation.</li>
            <li>Bloc final « Se faire accompagner » en trois cas, sans liste de liens artificielle.</li>
            <li>Contenu connexe court (rémunération) plutôt que des pages de remplissage.</li>
          </ul>
        ),
        kpi: (
          <>
            <p><strong>KPI principal :</strong> conversions issues des entrées SEO (inscription à un atelier, rendez-vous réservé, usage d’un outil), pas seulement les visites.</p>
            <p><strong>Diagnostics :</strong> impressions, clics et CTR (Search Console), clics sur les liens contextuels.</p>
            <p><strong>Qualité :</strong> présence effective, satisfaction. <strong>Garde-fous :</strong> accessibilité, temps de chargement.</p>
          </>
        ),
        equipes: (
          <ul>
            <li>Rédaction / experts métier : exactitude des conseils, date de mise à jour.</li>
            <li>Équipes produit : maillage interne et gabarits dans le CMS.</li>
            <li>SEO / webanalyste : suivi Search Console et attribution des conversions.</li>
            <li>Juridique / conformité : mentions sur les services et leurs conditions.</li>
          </ul>
        ),
      }}
    >
      <section className="explain__rubric explain__rubric--wide">
        <h3>Persona et intention de recherche</h3>
        <p>
          P1, cadre en recherche active, souvent juste après une convocation ou en anticipation.
          Intention informationnelle avec un prolongement pratique possible.
        </p>
        <h4>Requêtes envisagées <Badge tone="warn">Hypothèses à valider</Badge></h4>
        <ul className="inline-list">
          <li>comment préparer un entretien de recrutement</li>
          <li>préparer un entretien d’embauche cadre</li>
          <li>questions entretien d’embauche</li>
          <li>s’entraîner entretien d’embauche</li>
        </ul>
        <p className="muted small">Aucun volume de recherche ni classement : à vérifier avec les outils SEO de l’équipe.</p>
      </section>

      <section className="explain__rubric explain__rubric--wide">
        <h3>Aperçu pédagogique du titre et de la description</h3>
        <p className="muted small">Illustration de la longueur et du ton visés — pas un résultat de moteur réel, aucune promesse de classement.</p>
        <div className="serp-preview" aria-label="Aperçu pédagogique">
          <p className="serp-preview__url">exemple.fr › conseils › entretien</p>
          <p className="serp-preview__title">{SEO_TITLE}</p>
          <p className="serp-preview__desc">{SEO_DESC}</p>
        </div>
        <p className="muted small">
          Titre : {SEO_TITLE.length} caractères · Description : {SEO_DESC.length} caractères (ordres de
          grandeur usuels, la troncature dépend de l’affichage).
        </p>
      </section>

      <section className="explain__rubric explain__rubric--wide">
        <h3>Structure de la page</h3>
        <ul className="outline">
          <li>H1 — Comment préparer un entretien de recrutement ?
            <ul>
              <li>Introduction (réponse directe) · Sommaire</li>
              <li>H2 — Les 5 étapes (5 × H3)</li>
              <li>H2 — Exemples de questions</li>
              <li>H2 — Checklist</li>
              <li>H2 — Se faire accompagner</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="explain__rubric explain__rubric--wide">
        <h3>Carte du maillage interne</h3>
        <div className="table-scroll">
          <table className="data-table">
            <caption className="visually-hidden">Liens internes : source, destination, ancre, intention</caption>
            <thead>
              <tr><th scope="col">Page source</th><th scope="col">Destination</th><th scope="col">Ancre</th><th scope="col">Intention</th></tr>
            </thead>
            <tbody>
              {LINK_MAP.map((r) => (
                <tr key={r.join()}>{r.map((c) => <td key={c}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>Conversion visée :</strong> service utilisé, inscription ou réservation finalisée — la visite
          d’une fiche n’est qu’une étape.
        </p>
      </section>

      <section className="explain__rubric explain__rubric--wide">
        <h3>Complément : anticiper la recherche avec IA</h3>
        <ul className="plus-list">
          <li><Plus size={16} className="plus" /> Réponse claire dès l’introduction, reformulable telle quelle.</li>
          <li><Plus size={16} className="plus" /> Expertise identifiable : auteur ou équipe, date de mise à jour.</li>
          <li><Plus size={16} className="plus" /> Sources et dates vérifiées ; données originales (études de l’organisation) lorsqu’elles existent.</li>
          <li><Plus size={16} className="plus" /> Contenu textuel accessible, structuré, sans information enfermée dans une image.</li>
        </ul>
        <p className="muted">
          L’accessibilité aux robots et l’indexation sont nécessaires pour certains systèmes, mais ne
          garantissent aucune citation. Aucun score ni résultat d’assistant n’est présenté ici.
        </p>
      </section>

      <section className="explain__rubric explain__rubric--wide">
        <h3>Complément : coordination multicanale <Badge tone="warn">Organisation à confirmer</Badge></h3>
        <div className="table-scroll">
          <table className="data-table">
            <caption className="visually-hidden">Coordination des canaux autour du thème entretien</caption>
            <thead>
              <tr><th scope="col">Canal</th><th scope="col">Message</th><th scope="col">Destination</th><th scope="col">Contributeur à mobiliser</th><th scope="col">Marquage</th></tr>
            </thead>
            <tbody>
              <tr><td>SEO</td><td>La méthode en 5 étapes</td><td>Page conseil</td><td>Rédaction, SEO</td><td>— (organique)</td></tr>
              <tr><td>SEA</td><td>S’entraîner avant un entretien</td><td>Page conseil, ancre accompagnement</td><td>Équipe acquisition</td><td><code>utm_source</code>, <code>utm_campaign</code></td></tr>
              <tr><td>CRM</td><td>Un entretien prévu ? Préparez-le</td><td>Fiche simulation individuelle</td><td>Marketing relationnel</td><td><code>utm_medium=email</code></td></tr>
              <tr><td>Réseaux sociaux</td><td>3 questions à préparer</td><td>Page conseil, section questions</td><td>Communication</td><td><code>utm_medium=social</code></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </ExplainPanel>
  )
}
