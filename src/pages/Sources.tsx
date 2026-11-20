import { Badge } from '../components/Badge'
import { ArrowRight, External, Search } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ModalityChips, Modalities } from '../components/Modalities'
import { PortfolioLayout } from '../components/PortfolioLayout'
import { KindTag } from '../components/ServiceCard'
import {
  getService,
  OFFICIAL_CANDIDATE_URL,
  OFFICIAL_RECRUITER_URL,
  OFFICIAL_SERVICES_URL,
  OFFICIAL_TOOLS_URL,
  SERVICES,
} from '../data/services'
import { Link } from '../lib/router'

const TOKENS = [
  ['--brand-navy', '#252555', 'Texte principal, en-tête, pied de page, bandeaux'],
  ['--brand-yellow', '#FFC400', 'Boutons, aplats de visuels, pictogrammes sur bleu nuit'],
  ['--brand-blue', '#006699', 'Cartes thématiques, bandeau d’appel à l’action'],
  ['--surface-white', '#FFFFFF', 'Fond'],
  ['--surface-muted', '#F5F5FA', 'Fonds secondaires'],
  ['--border-neutral', '#D1D3DB', 'Bordures'],
  ['--accent-cyan-light', '#99E8FA', 'Accent léger dans les illustrations'],
  ['--text-secondary', '#6B7280', 'Valeur de départ ; #5F6673 utilisé pour le texte'],
]

const EXTERNAL = [OFFICIAL_CANDIDATE_URL, OFFICIAL_RECRUITER_URL, OFFICIAL_SERVICES_URL, OFFICIAL_TOOLS_URL]

export function Sources() {
  const observed = SERVICES.filter((s) => s.titleProvenance === 'capture')
  const tbc = SERVICES.filter((s) => s.titleProvenance === 'a-verifier')
  const sample = getService('entretien-programme')!

  return (
    <PortfolioLayout>
      <section className="pf-hero pf-hero--compact">
        <div className="pf-container">
          <p className="pf-kicker">Portfolio</p>
          <h1 className="pf-hero__title" tabIndex={-1}>Sources, limites et mini-kit UI</h1>
        </div>
      </section>
      <div className="pf-container pf-section pf-prose">
        <section aria-labelledby="statut">
          <h2 id="statut">Statut du prototype</h2>
          <ul className="pf-list">
            <li>Portfolio de candidature indépendant : propositions exploratoires, sans affiliation officielle à l’Apec.</li>
            <li>Aucune inscription, aucune réservation réelle, aucune donnée envoyée. Sauvegarde locale de démonstration uniquement.</li>
            <li>Les écrans des prototypes ne contiennent aucune explication. Une barre de démo, en haut de page et hors maquette, regroupe le retour au portfolio, le choix de variante, la réinitialisation, l’accès aux explications et les rappels de réservation simulée. Les explications sont en bas de page, dans « Coulisses du prototype ».</li>
            <li>Toutes les pages portent une consigne <code>noindex</code>. Aucun analytics ni traceur externe.</li>
            <li>La bascule « Existant observé / Piste exploratoire » compare des variantes ; ce n’est pas un test A/B.</li>
          </ul>
        </section>

        <section aria-labelledby="provenance">
          <h2 id="provenance">Provenance des informations</h2>
          <p>
            Références : captures d’écran de pages d’apec.fr (novembre 2026), utilisées comme références visuelles et
            non intégrées au site, car elles contiennent des données personnelles. Les pages publiques n’étaient pas
            accessibles depuis l’environnement de développement. <strong>Seules les modalités lisibles sur les captures
            sont affichées</strong> ; les autres ne sont pas montrées et restent à vérifier.
          </p>
          <h3>Intitulés observés sur les captures ({observed.length})</h3>
          <ul className="inline-list">{observed.map((s) => <li key={s.id}>{s.officialTitle}</li>)}</ul>
          <h3>Intitulés à vérifier ({tbc.length})</h3>
          <ul className="inline-list">{tbc.map((s) => <li key={s.id}>{s.officialTitle}</li>)}</ul>
          <h3>Pages officielles à consulter</h3>
          <ul className="pf-list">
            {EXTERNAL.map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noopener noreferrer">
                  {u.replace('https://', '')} <External size={14} />
                  <span className="visually-hidden"> (site externe, nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="assets">
          <h2 id="assets">Visuels et typographie</h2>
          <ul className="pf-list">
            <li>Illustrations en aplats et pictogrammes : dessinés en SVG pour ce prototype, dans les couleurs observées. Aucune photographie, aucun portrait, aucun logo de l’Apec.</li>
            <li>Pas de témoignage ni de chiffre de satisfaction : aucune source autorisée n’était disponible.</li>
            <li>Prototypes : Montserrat (SIL Open Font License), substitution provisoire, la police exacte d’apec.fr n’étant pas confirmée.</li>
            <li>Portfolio : DM Serif Display et Inter (SIL Open Font License), volontairement distincts de l’univers Apec.</li>
          </ul>
        </section>

        <section aria-labelledby="kit">
          <h2 id="kit">Mini-kit UI des prototypes</h2>
          <p><Badge tone="warn">Non officiel</Badge> Styles observés sur apec.fr et composants proposés — valeurs estimées à partir des captures, pas des tokens officiels.</p>
        </section>
      </div>

      <div className="proto kit-frame">
        <div className="container">
          <h3>Palette</h3>
          <ul className="swatches">
            {TOKENS.map(([name, hex, use]) => (
              <li key={name}>
                <span className="swatch" style={{ background: hex.slice(0, 7) }} aria-hidden="true" />
                <span><code>{name}</code> {hex}<br /><span className="muted small">{use}</span></span>
              </li>
            ))}
          </ul>
          <p className="small">
            Contrastes calculés (formule WCAG 2) : bleu nuit sur jaune ≈ 8,9:1 ; bleu nuit sur blanc ≈ 14,2:1 ; blanc
            sur bleu ≈ 6,3:1. #6B7280 donne 4,45:1 sur #F5F5FA : le texte secondaire utilise #5F6673 (≥ 5,3:1). Le
            jaune n’est jamais une couleur de texte sur fond blanc. Ces calculs ne valent pas audit RGAA.
          </p>

          <h3>Éléments graphiques repris des captures</h3>
          <div className="kit-row kit-row--top">
            <div className="kit-visual">
              <Illustration name="groupe" tone="yellow" className="svc-visual__img" />
              <KindTag kind="atelier" />
            </div>
            <div className="kit-visual">
              <Illustration name="echange" tone="blue" className="svc-visual__img" />
              <KindTag kind="individuel" />
            </div>
            <div className="kit-visual">
              <Illustration name="outil" tone="navy" className="svc-visual__img" />
              <KindTag kind="outil" />
            </div>
          </div>
          <p className="small">Aplats jaune / bleu / bleu nuit selon le type d’aide ; étiquette carrée d’après le motif « Repères » observé sur les visuels d’articles.</p>
          <div className="kit-navy">
            <label className="sit-tile is-selected"><Search size={34} className="sit-tile__icon" /><span className="sit-tile__label">Tuile sélectionnée</span></label>
            <label className="sit-tile"><Search size={34} className="sit-tile__icon" /><span className="sit-tile__label">Tuile au repos</span></label>
          </div>

          <h3>Boutons et états</h3>
          <p className="small muted">Survol et focus clavier : à tester à la souris et avec Tab. Les états non visibles sur les captures sont des propositions.</p>
          <div className="kit-row">
            <button type="button" className="btn btn--primary">Principal</button>
            <button type="button" className="btn btn--outline">Secondaire</button>
            <button type="button" className="btn btn--primary" disabled>Désactivé</button>
            <Link to="/sources" anchor="kit" className="link-arrow">Lien avec flèche <ArrowRight size={18} /></Link>
          </div>

          <h3>Choix, sélection et erreur</h3>
          <div className="kit-grid">
            <label className="choice choice--tile is-selected">
              <input type="radio" name="kit-demo" defaultChecked />
              <span className="choice__body"><span className="choice__title">Option sélectionnée</span></span>
            </label>
            <label className="choice choice--tile">
              <input type="radio" name="kit-demo" />
              <span className="choice__body"><span className="choice__title">Option non sélectionnée</span></span>
            </label>
          </div>
          <div className="field">
            <label htmlFor="kit-field">Champ en erreur (exemple)</label>
            <input id="kit-field" className="input is-invalid" aria-invalid="true" aria-describedby="kit-field-err" defaultValue="" />
            <p id="kit-field-err" className="field-error">Message d’erreur explicite, non porté par la seule couleur.</p>
          </div>

          <h3>Modalités</h3>
          <Modalities items={sample.modalities} />
          <ModalityChips items={sample.modalities} />
        </div>
      </div>

      <div className="pf-container pf-section pf-prose">
        <section aria-labelledby="restant">
          <h2 id="restant">Ce qui reste à vérifier</h2>
          <ul className="pf-list">
            <li>Intitulés et modalités des services « à vérifier », dont les conditions de la présélection pour les TPE/PME.</li>
            <li>Valeurs CSS exactes, police et états d’interface d’apec.fr.</li>
            <li>Audit d’accessibilité complet (lecteurs d’écran, RGAA) : seuls des contrôles de base ont été faits.</li>
            <li>Hypothèses SEO (requêtes, intentions) avec les outils et données de l’équipe.</li>
          </ul>
          <Link to="/" className="pf-link">Revenir aux trois cas <ArrowRight size={16} /></Link>
        </section>
      </div>
    </PortfolioLayout>
  )
}
