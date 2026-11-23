import { useState } from 'react'
import { ArrowRight, Check, Info } from '../components/Icons'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { SeoJourney } from '../components/SeoJourney'
import {
  KPI_CONVERSION,
  KPI_GEO,
  KPI_SEO,
  OBJECTIVES,
  PILLARS,
  SEO_SITUATIONS,
  WAYS,
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
          <p className="pf-kicker">Acquisition · SEO / GEO</p>
          <h1 className="pf-hero__title seo-hero__title" tabIndex={-1}>
            SEO / GEO{'\u00a0'}: quelques{'\u00a0'}pistes
          </h1>
          <p className="pf-hero__lead">
            {nb('Mes habitudes de travail, de la recherche au service utilisé, et quelques pistes pour l’illustrer, à discuter avec l’équipe.')}
          </p>
          <ul className="seo-goals" aria-label="Ce que je vise dans mes projets SEO / GEO">
            {OBJECTIVES.map((o, i) => (
              <li key={o.title} className="seo-goal">
                <span className="seo-goal__n" aria-hidden="true">{i + 1}</span>
                <p className="seo-goal__title">{o.title}</p>
                <p className="seo-goal__text">{nb(o.text)}</p>
              </li>
            ))}
          </ul>
          <div className="seo-levels">
            <Link to="/plan-seo" anchor="facon" className="pf-btn pf-btn--primary">
              Découvrir les pistes <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 1. Mes habitudes de travail ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="facon">
        <p className="seo-block__num">1</p>
        <h2 id="facon" tabIndex={-1}>Mes habitudes de{'\u00a0'}travail</h2>
        <p className="seo-block__lead">{nb('Quatre étapes que j’essaie de suivre sur mes projets, en complément de l’existant et avec les équipes concernées.')}</p>
        <ol className="seo-start">
          {WAYS.map((w, i) => (
            <li key={w.title} className="seo-start__item">
              <span className="seo-start__n" aria-hidden="true">{i + 1}</span>
              <p><strong>{w.title}</strong>{' '}: {nb(w.text)}</p>
            </li>
          ))}
        </ol>
        <p className="seo-start__end">{nb('Résultat sur les sites dont je pilote la stratégie SEO / GEO : 83 % de conformité SEO technique.')}</p>
      </section>

      {/* ---------------- 2. Quatre piliers ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="strategie">
        <p className="seo-block__num">2</p>
        <h2 id="strategie" tabIndex={-1}>Quatre piliers SEO / GEO</h2>
        <p className="seo-block__lead">{nb('Mes repères de travail. Chacun couvre les deux dimensions : être bien classé par les moteurs (SEO) et être compris, repris et cité par les IA (GEO).')}</p>
        <ol className="seo-pillars">
          {PILLARS.map((p, i) => (
            <li key={p.id} className="seo-pillar">
              <p className="seo-pillar__n">{String.fromCharCode(97 + i)}</p>
              <h3 className="seo-pillar__title">{p.title}</h3>
              <p className="seo-pillar__summary">{nb(p.summary)}</p>
              <dl className="seo-dims">
                <div>
                  <dt>SEO</dt>
                  <dd><ul className="seo-pillar__points">{p.seo.map((pt) => <li key={pt}>{nb(pt)}</li>)}</ul></dd>
                </div>
                <div>
                  <dt>GEO</dt>
                  <dd><ul className="seo-pillar__points">{p.geo.map((pt) => <li key={pt}>{nb(pt)}</li>)}</ul></dd>
                </div>
              </dl>
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
      </section>

      {/* ---------------- 3. Contenus et intentions ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="matrice">
        <p className="seo-block__num">3</p>
        <h2 id="matrice" tabIndex={-1}>Contenus et intentions{' '}: six situations</h2>
        <p className="seo-block__lead">{nb('Des pistes pour illustrer la démarche, à discuter avec l’équipe. Choisissez une situation pour voir le besoin, les recherches, les questions posées aux IA, une piste de contenu et les services qui y répondent.')}</p>
        <p className="seo-caveat">{nb('Exemples pour illustrer la démarche. Volumes et priorités à confirmer avec les données.')}</p>

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
              <dd><ul className="seo-queries">{sit.queries.map((q) => <li key={q}>{nb(`« ${q} »`)}</li>)}</ul></dd>
            </div>
            <div>
              <dt>Questions posées aux IA</dt>
              <dd><ul className="seo-queries">{sit.aiQuestions.map((q) => <li key={q}>{nb(`« ${q} »`)}</li>)}</ul></dd>
            </div>
            <div><dt>Intention</dt><dd>{nb(sit.intent)}</dd></div>
            <div><dt>Piste de contenu</dt><dd>{nb(sit.content)}</dd></div>
            <div>
              <dt>Services pertinents</dt>
              <dd><ul className="seo-services">{sit.services.map((sv) => <li key={sv}>{nb(sv)}</li>)}</ul></dd>
            </div>
            <div><dt>Conversion finale recherchée</dt><dd>{nb(sit.conversion)}</dd></div>
          </dl>
          {sit.note && <p className="seo-note"><Info size={16} /> {nb(sit.note)}</p>}
          {sit.hasJourney && (
            <Link to="/plan-seo" anchor="parcours" className="pf-btn pf-btn--primary pf-btn--sm">
              Voir la piste illustrée <ArrowRight size={16} />
            </Link>
          )}
        </article>
      </section>

      {/* ---------------- 4. Une piste illustrée ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="parcours">
        <p className="seo-block__num">4</p>
        <h2 id="parcours" tabIndex={-1}>Une piste illustrée{' '}: préparer un entretien de{' '}recrutement</h2>
        <p className="seo-block__lead">
          {nb('Une proposition pour relier une recherche, un contenu et les services de l’Apec. Une recherche Google, une page conseil utile, une fiche service et une inscription : le contenu reste utile même sans inscription.')}
        </p>
        <SeoJourney route={route} />

        <details className="seo-acc">
          <summary><span>Comprendre mes choix sur ce parcours</span></summary>
          <div className="seo-acc__body">
            <dl className="seo-why">
              <div><dt>Besoin utilisateur</dt><dd>{nb('Se préparer à un entretien, avec ou sans entretien déjà fixé.')}</dd></div>
              <div><dt>Hypothèse à tester avec l’équipe</dt><dd>{nb('Une réponse utile, accompagnée de propositions contextualisées, facilite la découverte et l’utilisation des services.')}</dd></div>
              <div><dt>Réponse proposée</dt><dd>{nb('Une page conseil qui répond d’abord (méthode, checklist), puis trois aides selon la situation : seul, en groupe, avec un consultant.')}</dd></div>
              <div><dt>Maillage</dt><dd>{nb('Liens placés dans la section où ils répondent à un besoin (entraînement → simulateur, accompagnement → atelier et consultant, rémunération → ressource) ; retour des fiches vers la checklist.')}</dd></div>
              <div><dt>GEO</dt><dd>{nb('Une réponse structurée (méthode, checklist, questions-réponses) peut être reprise par les IA, avec un lien vers les services de l’Apec.')}</dd></div>
              <div><dt>Conversion recherchée</dt><dd>{nb('Inscription finalisée, rendez-vous confirmé ou entraînement terminé, puis participation effective.')}</dd></div>
              <div><dt>Mesure</dt><dd>{nb('Entrées SEO / GEO sur la page, clics vers chaque aide, conversions rapportées aux sessions d’entrée, comparées à l’état initial.')}</dd></div>
            </dl>
          </div>
        </details>
      </section>

      {/* ---------------- 5. Indicateurs ---------------- */}
      <section className="pf-container seo-block" aria-labelledby="indicateurs">
        <p className="seo-block__num">5</p>
        <h2 id="indicateurs" tabIndex={-1}>Les indicateurs auxquels je suis{' '}attentive</h2>
        <p className="seo-block__lead">{nb('Des repères de suivi, sans objectif chiffré, à croiser avec les outils et les tableaux de bord déjà en place.')}</p>
        <div className="seo-kpi2">
          <section className="seo-kpi2__col" aria-labelledby="kpi-seo">
            <h3 id="kpi-seo" className="seo-kpi2__title">SEO</h3>
            <ul>{KPI_SEO.map((k) => <li key={k}>{nb(k)}</li>)}</ul>
          </section>
          <section className="seo-kpi2__col" aria-labelledby="kpi-geo">
            <h3 id="kpi-geo" className="seo-kpi2__title">GEO</h3>
            <ul>{KPI_GEO.map((k) => <li key={k}>{nb(k)}</li>)}</ul>
          </section>
          <section className="seo-kpi2__col seo-kpi2__col--wide" aria-labelledby="kpi-conv">
            <h3 id="kpi-conv" className="seo-kpi2__title">Conversion</h3>
            <ul className="seo-kpi2__inline">{KPI_CONVERSION.map((k) => <li key={k}>{k}</li>)}</ul>
          </section>
        </div>
      </section>

      <section className="pf-container seo-block seo-end">
        <Link to="/" anchor="realisations" className="pf-link">Revenir aux réalisations <ArrowRight size={16} /></Link>
      </section>
    </PortfolioLayout>
  )
}
