import { useState } from 'react'
import { ArrowRight, Check, Info } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { SeoJourney } from '../components/SeoJourney'
import {
  AB_TESTS,
  DIAGNOSTIC,
  KPIS,
  OBJECTIVES,
  PILLARS,
  RITUALS,
  ROADMAP,
  SEO_SITUATIONS,
  nb,
} from '../data/seoPlan'
import { Link, type Route } from '../lib/router'

export function SeoPlan({ route }: { route: Route }) {
  const [sitId, setSitId] = useState(SEO_SITUATIONS[0].id)
  const sit = SEO_SITUATIONS.find((s) => s.id === sitId)!

  return (
    <PortfolioLayout>
      {/* ---------------- 0. Hero ---------------- */}
      <section className="pf-hero pf-hero--compact seo-hero">
        <div className="pf-container">
          <p className="pf-kicker">Plan SEO · apec.fr</p>
          <h1 className="pf-hero__title seo-hero__title" tabIndex={-1}>
            Un plan SEO pour apec.fr : de la recherche au service utilisé
          </h1>
          <p className="pf-hero__lead">
            Faire d’apec.fr la réponse de référence aux questions des cadres et des recruteurs, puis conduire chaque
            visite vers l’offre, l’outil ou l’accompagnement qui lui correspond.
          </p>
          <ul className="seo-goals" aria-label="Objectifs">
            {OBJECTIVES.map((o, i) => (
              <li key={o.title} className="seo-goal">
                <span className="seo-goal__n" aria-hidden="true">{i + 1}</span>
                <p className="seo-goal__title">{o.title}</p>
                <p className="seo-goal__text">{nb(o.text)}</p>
              </li>
            ))}
          </ul>
          <div className="seo-levels">
            <Link to="/plan-seo" anchor="diagnostic" className="pf-btn pf-btn--primary">
              Découvrir le plan <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 1. Diagnostic ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="diagnostic">
        <p className="seo-block__num">1</p>
        <h2 id="diagnostic" tabIndex={-1}>Diagnostic</h2>
        <p className="seo-block__lead">Quatre observations faites sur les pages publiques d’apec.fr, et le levier associé.</p>
        <ul className="seo-diag">
          {DIAGNOSTIC.map((d) => (
            <li key={d.title} className="seo-diag__item">
              <h3 className="seo-diag__title">{d.title}</h3>
              <p>{nb(d.finding)}</p>
              <p className="seo-diag__lever"><strong>Levier :</strong> {nb(d.lever)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- 2. Stratégie ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="strategie">
        <p className="seo-block__num">2</p>
        <h2 id="strategie" tabIndex={-1}>Stratégie en quatre piliers</h2>
        <p className="seo-block__lead">Tout le SEO d’apec.fr : offres, fiches métiers, outils, études, conseils et services.</p>
        <ol className="seo-pillars">
          {PILLARS.map((p, i) => (
            <li key={p.id} className="seo-pillar">
              <p className="seo-pillar__n">{String.fromCharCode(97 + i)}</p>
              <h3 className="seo-pillar__title">{p.title}</h3>
              <ul className="seo-pillar__points">
                {p.points.map((pt) => <li key={pt}>{nb(pt)}</li>)}
              </ul>
              {p.cocon && (
                <ol className="seo-cocon" aria-label="Cocon sémantique autour d’un métier">
                  {p.cocon.map((c) => <li key={c}>{c}</li>)}
                </ol>
              )}
              {p.link && (
                <Link to="/plan-seo" anchor={p.link.anchor} className="pf-link">
                  {p.link.label} <ArrowRight size={16} />
                </Link>
              )}
            </li>
          ))}
        </ol>

        <h3 id="matrice" tabIndex={-1} className="seo-sub">Contenus et intentions : six situations</h3>
        <p className="seo-block__lead">Choisissez une situation pour voir le besoin, les recherches, le contenu et les services qui y répondent.</p>
        <p className="seo-caveat">Exemples de requêtes : volumes et priorités à confirmer dans Search Console.</p>

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
          <h4 id="seo-sit-title" className="seo-matrix__title">{sit.persona}</h4>
          <dl className="seo-matrix__grid">
            <div><dt>Besoin</dt><dd>{nb(sit.need)}</dd></div>
            <div>
              <dt>Exemples de recherches</dt>
              <dd><ul className="seo-queries">{sit.queries.map((q) => <li key={q}>« {q} »</li>)}</ul></dd>
            </div>
            <div><dt>Intention</dt><dd>{nb(sit.intent)}</dd></div>
            <div><dt>Contenu à optimiser ou à envisager</dt><dd>{nb(sit.content)}</dd></div>
            <div>
              <dt>Services pertinents</dt>
              <dd>
                <ul className="seo-services">
                  {sit.services.map((sv) => (
                    <li key={sv.label}>
                      {sv.label}{' '}
                      <span className={`badge ${sv.observed ? 'badge--ok' : 'badge--warn'}`}>
                        {sv.observed ? 'Service existant' : 'Intitulé provisoire'}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div><dt>Conversion finale recherchée</dt><dd>{nb(sit.conversion)}</dd></div>
          </dl>
          {sit.note && <p className="seo-note"><Info size={16} /> {nb(sit.note)}</p>}
          {sit.hasJourney && (
            <Link to="/plan-seo" anchor="parcours" className="pf-btn pf-btn--primary pf-btn--sm">
              Voir la démonstration de cette situation <ArrowRight size={16} />
            </Link>
          )}
        </article>
      </section>

      {/* ---------------- 3. Démonstration ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="parcours">
        <p className="seo-block__num">3</p>
        <h2 id="parcours" tabIndex={-1}>Démonstration : « Préparer mon entretien de recrutement »</h2>
        <p className="seo-block__lead">
          La méthode appliquée à un besoin fréquent : une recherche Google, une page conseil utile, une fiche service et
          une inscription. Le contenu reste utile même sans inscription.
        </p>
        <SeoJourney route={route} />

        <details className="seo-acc">
          <summary><span>Comprendre mes choix sur ce parcours</span></summary>
          <div className="seo-acc__body">
            <dl className="seo-why">
              <div><dt>Besoin utilisateur</dt><dd>Se préparer à un entretien, avec ou sans entretien déjà fixé.</dd></div>
              <div><dt>Hypothèse</dt><dd>Une réponse utile, accompagnée de propositions contextualisées, facilite la découverte et l’utilisation des services.</dd></div>
              <div><dt>Réponse proposée</dt><dd>Une page conseil qui répond d’abord (méthode, checklist), puis trois aides selon la situation : seul, en groupe, avec un consultant.</dd></div>
              <div><dt>Maillage</dt><dd>Liens placés dans la section où ils répondent à un besoin (entraînement → simulateur, accompagnement → atelier et consultant, rémunération → ressource) ; retour des fiches vers la checklist.</dd></div>
              <div><dt>Conversion recherchée</dt><dd>Inscription finalisée, rendez-vous confirmé ou entraînement terminé, puis participation effective.</dd></div>
              <div><dt>Mesure</dt><dd>Entrées SEO sur la page, clics vers chaque aide, conversions rapportées aux sessions d’entrée, comparées à l’état initial.</dd></div>
            </dl>
          </div>
        </details>
      </section>

      {/* ---------------- 4. Plan 90 jours ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="methode">
        <p className="seo-block__num">4</p>
        <h2 id="methode" tabIndex={-1}>Plan 90 jours</h2>
        <ol className="seo-roadmap">
          {ROADMAP.map((r) => (
            <li key={r.period} className="seo-phase">
              <p className="seo-phase__period">{r.period}</p>
              <h3 className="seo-phase__title">{r.title}</h3>
              <ul className="seo-phase__actions">{r.actions.map((a) => <li key={a}>{nb(a)}</li>)}</ul>
              <p className="seo-phase__label">Livrables</p>
              <ul className="seo-phase__deliv">{r.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- 5. Pilotage ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="pilotage">
        <p className="seo-block__num">5</p>
        <h2 id="pilotage" tabIndex={-1}>Pilotage</h2>
        <div className="seo-pilot">
          <section className="seo-pilot__col" aria-labelledby="kpi">
            <h3 id="kpi" className="seo-sub">Indicateurs clés</h3>
            <dl className="seo-kpis">
              {KPIS.map((k) => (
                <div key={k.family}>
                  <dt>{k.family}</dt>
                  <dd><ul>{k.items.map((i) => <li key={i}>{nb(i)}</li>)}</ul></dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="seo-pilot__col" aria-labelledby="abtests">
            <h3 id="abtests" className="seo-sub">A/B tests</h3>
            <ul className="pf-list">{AB_TESTS.map((t) => <li key={t}>{nb(t)}</li>)}</ul>
            <h3 className="seo-sub">Rituels</h3>
            <dl className="seo-rituals">
              {RITUALS.map((r) => (
                <div key={r.who}><dt>{r.who}</dt><dd>{nb(r.what)}</dd></div>
              ))}
            </dl>
          </section>
        </div>
      </section>

      <section className="pf-container seo-block seo-end">
        <Link to="/" anchor="realisations" className="pf-link">Revenir aux réalisations <ArrowRight size={16} /></Link>
      </section>
    </PortfolioLayout>
  )
}
