import { useState } from 'react'
import { ArrowRight, Check, Info } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { SeoJourney } from '../components/SeoJourney'
import { GUIDE_AI_NOTE, GUIDE_EXAMPLE, GUIDE_MEASURE, GUIDE_STEPS, ROADMAP, SEO_SITUATIONS } from '../data/seoPlan'
import { Link, type Route } from '../lib/router'

const CHAIN = ['Besoin utilisateur', 'Intention de recherche', 'Contenu utile', 'Service pertinent', 'Utilisation effective']

function Accordion({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <details className="seo-acc" id={id}>
      <summary><span>{title}</span></summary>
      <div className="seo-acc__body">{children}</div>
    </details>
  )
}

export function SeoPlan({ route }: { route: Route }) {
  const [sitId, setSitId] = useState(SEO_SITUATIONS[0].id)
  const sit = SEO_SITUATIONS.find((s) => s.id === sitId)!

  return (
    <PortfolioLayout>
      <section className="pf-hero pf-hero--compact seo-hero">
        <div className="pf-container">
          <p className="pf-kicker">Module · Acquisition SEO orientée services</p>
          <h1 className="pf-hero__title" tabIndex={-1}>Du besoin au service : une acquisition SEO utile</h1>
          <p className="pf-hero__lead">
            Attirer les bons publics, répondre à leurs questions et faciliter l’accès aux services adaptés à leur situation.
          </p>
          <p className="seo-mention">
            <Info size={16} /> Proposition exploratoire de Caroline Camilleri — prototype indépendant, non officiel.
            Hypothèses à valider avec les équipes et les données de l’Apec.
          </p>

          <ol className="seo-chain" aria-label="Fil conducteur">
            {CHAIN.map((c, i) => (
              <li key={c}><span className="seo-chain__n">{i + 1}</span>{c}</li>
            ))}
          </ol>

          <div className="seo-levels">
            <Link to="/plan-seo" anchor="parcours" className="pf-btn pf-btn--primary">Voir le parcours <ArrowRight size={18} /></Link>
            <Link to="/plan-seo" anchor="methode" className="pf-btn">Comprendre ma méthode</Link>
            <Link to="/plan-seo" anchor="matrice" className="pf-link">Les six situations <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ---------------- Bloc 1 ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="matrice">
        <p className="seo-block__num">1</p>
        <h2 id="matrice" tabIndex={-1}>Des besoins aux services</h2>
        <p className="seo-block__lead">Six situations, une même logique. Choisissez une situation pour voir le besoin, les recherches, le contenu et le service qui peut y répondre.</p>
        <p className="seo-caveat">Exemples de requêtes exploratoires : volumes, concurrence et priorités non validés.</p>

        <fieldset className="seo-tabs">
          <legend className="visually-hidden">Situation utilisateur</legend>
          {SEO_SITUATIONS.map((s) => (
            <label key={s.id} className={`seo-tab${sitId === s.id ? ' is-selected' : ''}`}>
              <input type="radio" name="seo-situation" value={s.id} checked={sitId === s.id} onChange={() => setSitId(s.id)} className="visually-hidden" />
              {sitId === s.id && <Check size={16} />}
              <span>{s.short}</span>
            </label>
          ))}
        </fieldset>

        <article className="seo-matrix" aria-live="polite" aria-labelledby="seo-sit-title">
          <h3 id="seo-sit-title" className="seo-matrix__title">{sit.persona}</h3>
          <dl className="seo-matrix__grid">
            <div><dt>Besoin</dt><dd>{sit.need}</dd></div>
            <div>
              <dt>Exemples de recherches</dt>
              <dd><ul className="seo-queries">{sit.queries.map((q) => <li key={q}>« {q} »</li>)}</ul></dd>
            </div>
            <div><dt>Intention</dt><dd>{sit.intent}</dd></div>
            <div><dt>Contenu à optimiser ou à envisager</dt><dd>{sit.content}</dd></div>
            <div>
              <dt>Services pertinents</dt>
              <dd>
                <ul className="seo-services">
                  {sit.services.map((sv) => (
                    <li key={sv.label}>
                      {sv.label}{' '}
                      <span className={`badge ${sv.observed ? 'badge--ok' : 'badge--warn'}`}>
                        {sv.observed ? 'Intitulé observé' : 'Intitulé générique à vérifier'}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div><dt>Conversion finale recherchée</dt><dd>{sit.conversion}</dd></div>
          </dl>
          {sit.note && <p className="seo-note"><Info size={16} /> {sit.note}</p>}
          {sit.hasJourney ? (
            <Link to="/plan-seo" anchor="parcours" className="pf-btn pf-btn--primary pf-btn--sm">
              Voir le parcours de cette situation <ArrowRight size={16} />
            </Link>
          ) : (
            <p className="seo-note">Parcours non développé : la démonstration détaille une seule situation (recherche d’emploi), la même logique s’applique ici.</p>
          )}
        </article>

        <Accordion title="Comprendre ma méthode : comment lire cette matrice">
          <ul className="pf-list">
            <li>Un même besoin peut concerner plusieurs personas (ex. préparer un entretien : recherche d’emploi, premier emploi, reconversion).</li>
            <li>Le SEO ne se limite pas aux offres d’emploi : ici, il s’agit des besoins autour de la candidature, de la carrière et du recrutement.</li>
            <li>Commencer par examiner et optimiser les pages existantes avant de créer de nouveaux contenus.</li>
            <li>Ne pas confondre trafic, clic vers un service et service réellement utilisé : la conversion visée est la dernière colonne.</li>
            <li>SEO et accès direct se complètent : une personne qui connaît déjà l’Apec ira directement au service.</li>
            <li>Ces rapprochements sont des pistes à valider ; les intitulés génériques et conditions sont à vérifier sur les sources officielles.</li>
          </ul>
        </Accordion>
      </section>

      {/* ---------------- Bloc 2 ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="parcours">
        <p className="seo-block__num">2</p>
        <h2 id="parcours" tabIndex={-1}>Un parcours démonstrateur : « Préparer mon entretien de recrutement »</h2>
        <p className="seo-block__lead">De la recherche à l’inscription, en quatre écrans. Le contenu reste utile même si la personne ne choisit aucun service.</p>
        <SeoJourney route={route} />

        <Accordion title="Comprendre mes choix sur ce parcours">
          <dl className="seo-why">
            <div><dt>Besoin utilisateur</dt><dd>Se préparer efficacement à un entretien, avec ou sans entretien déjà fixé.</dd></div>
            <div><dt>Hypothèse</dt><dd>« Une réponse utile, accompagnée de propositions contextualisées, pourrait faciliter la découverte et l’utilisation des services. » C’est une hypothèse à tester, pas un résultat démontré.</dd></div>
            <div><dt>Réponse proposée</dt><dd>Une page conseil qui répond d’abord (méthode, checklist), puis trois aides selon la situation : seul, en groupe, avec un consultant.</dd></div>
            <div><dt>Maillage</dt><dd>Liens placés dans la section où ils répondent à un besoin (entraînement → simulateur, accompagnement → atelier et consultant, rémunération → ressource) ; retour des fiches vers la checklist. Bouton « Voir la logique de maillage » ci-dessus.</dd></div>
            <div><dt>Conversion recherchée</dt><dd>Inscription finalisée, rendez-vous confirmé ou entraînement terminé ; puis participation effective.</dd></div>
            <div><dt>Mesure</dt><dd>Entrées SEO sur la page, clics vers chaque aide, conversions finalisées rapportées aux sessions d’entrée, participation ; à comparer à l’état initial, avec prudence (saisonnalité, délai).</dd></div>
            <div><dt>Points à valider avec les équipes</dt><dd>Intitulés, formats, durées, publics et conditions des services ; capacité d’accueil des ateliers et consultants ; exactitude des conseils ; faisabilité dans le CMS ; plan de marquage.</dd></div>
          </dl>
        </Accordion>
      </section>

      {/* ---------------- Bloc 3 ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="methode">
        <p className="seo-block__num">3</p>
        <h2 id="methode" tabIndex={-1}>Ma méthode de mise en œuvre</h2>
        <p className="seo-caveat">Calendrier de travail proposé, à adapter au contexte ; ne constitue pas une promesse de résultats SEO sous trois mois.</p>

        <ol className="seo-roadmap">
          {ROADMAP.map((r) => (
            <li key={r.period} className="seo-phase">
              <p className="seo-phase__period">{r.period}</p>
              <h3 className="seo-phase__title">{r.title}</h3>
              <p className="seo-phase__label">Livrables</p>
              <ul className="seo-phase__deliv">{r.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
              <details className="seo-phase__more">
                <summary>Voir les actions</summary>
                <ul className="pf-list">{r.actions.map((a) => <li key={a}>{a}</li>)}</ul>
              </details>
            </li>
          ))}
        </ol>

        <section className="seo-guide" aria-labelledby="seo-guide-title">
          <h3 id="seo-guide-title" className="seo-guide__title">Partir des questions des cadres pour les guider vers les services de l’Apec</h3>
          <p className="seo-guide__intro">
            L’idée : répondre aux recherches concrètes des utilisateurs avec des contenus utiles, puis leur proposer un
            accompagnement adapté.
          </p>

          <ol className="seo-steps">
            {GUIDE_STEPS.map((step, i) => (
              <li key={step.title} className="seo-step">
                <span className="seo-step__n" aria-hidden="true">{i + 1}</span>
                <h4 className="seo-step__title">{step.title}</h4>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="seo-example">
            <p className="seo-example__label">Exemple de parcours proposé <span>· proposition pour le portfolio</span></p>
            <p className="seo-example__q">« {GUIDE_EXAMPLE.question} »</p>
            <p>{GUIDE_EXAMPLE.explanation}</p>
            <Link to="/reserver/cep?from=plan-seo" className="pf-btn pf-btn--primary">
              {GUIDE_EXAMPLE.cta} <ArrowRight size={18} />
            </Link>
            <p className="seo-example__hint">Ouvre la prise de rendez-vous de démonstration du prototype.</p>
          </div>

          <p className="seo-measure"><strong>Pour mesurer l’efficacité :</strong> {GUIDE_MEASURE}</p>
          <p className="seo-ai-note">{GUIDE_AI_NOTE}</p>
        </section>
      </section>

      <section className="pf-container seo-block seo-end">
        <p className="small">
          Ce portfolio indépendant est en <code>noindex</code> : les éléments SEO présentés sont une démonstration de méthode,
          pas un dispositif destiné à positionner ce portfolio sur les requêtes de l’Apec. Aucune donnée interne de l’Apec
          n’a été utilisée. Intitulés observés sur des captures d’apec.fr ; les autres sont génériques et à vérifier.
        </p>
        <Link to="/" className="pf-link">Revenir aux cas du portfolio <ArrowRight size={16} /></Link>
      </section>
    </PortfolioLayout>
  )
}
