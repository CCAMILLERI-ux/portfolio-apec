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
import { ALL_PHOTOS } from '../data/photos'
import { Link } from '../lib/router'

const TOKENS = [
  ['--brand-navy', '#252555', 'Texte principal, en-tête, pied de page, bandeaux'],
  ['--brand-yellow', '#FFC400', 'Boutons, aplats de visuels, pictogrammes sur bleu nuit'],
  ['--brand-blue', '#026096', 'Bleu secondaire : cartes, bandeaux, liens (relevé sur apec.fr)'],
  ['--brand-blue-hover', '#024D78', 'Survol et état actif des éléments bleus'],
  ['--brand-blue-tint', '#EBF2F7', 'Fonds clairs teintés (encadrés, « Pourquoi ce service ? »)'],
  ['--brand-blue-soft', '#8DB7D0', 'Accent clair des illustrations (remplace l’ancien cyan)'],
  ['--surface-white', '#FFFFFF', 'Fond'],
  ['--surface-muted', '#F5F5FA', 'Fonds secondaires'],
  ['--border-neutral', '#D1D3DB', 'Bordures'],
  ['--text-secondary', '#6B7280', 'Gris secondaire ; #5F6673 pour le texte, plus lisible'],
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
            <li>Portfolio de candidature indépendant : propositions exploratoires, sans affiliation officielle à l’Apec. Ni refonte officielle d’apec.fr, ni audit : des pistes à tester.</li>
            <li>Aucune inscription, aucun rendez-vous réel, aucune donnée collectée. Les choix faits dans les démonstrations sont seulement gardés dans votre navigateur.</li>
            <li>Les écrans des prototypes restent dédiés à l’expérience utilisateur. Une barre de démonstration, en haut de page, permet de revenir au portfolio, de changer de variante, de réinitialiser et d’ouvrir « Comprendre ce cas », où sont présentés mes choix.</li>
            <li>Le portfolio n’est pas destiné à être référencé par les moteurs de recherche. Aucun outil de mesure d’audience ni traceur externe.</li>
            <li>La comparaison « Existant observé » et pistes illustre une démarche d’A/B test ; aucun test n’a été mené.</li>
          </ul>
        </section>

        <section aria-labelledby="parcours-5min">
          <h2 id="parcours-5min">Parcours conseillé en cinq minutes</h2>
          <ol className="pf-steps">
            <li><strong>Cas 01 · 1 min 30</strong> — lisez l’introduction, suivez un lien vers un accompagnement et revenez ; cliquez sur « Comprendre ce cas ».</li>
            <li><strong>Cas 02 · 1 min 30</strong> — changez de situation, puis comparez « Existant observé » et les pistes 1 à 3 depuis la barre de démo, en haut de page.</li>
            <li><strong>Cas 03 · 2 min</strong> — « Me guider », cochez « Préparer un entretien », réservez une session, puis ouvrez « Mes prochaines étapes ».</li>
          </ol>
        </section>

        <section aria-labelledby="provenance">
          <h2 id="provenance">Provenance des informations</h2>
          <p>
            Les prototypes s’appuient sur les pages d’apec.fr consultées en novembre 2026. Les formats, durées et
            conditions des services ne sont affichés que lorsqu’ils figurent sur ces pages ; les autres sont à confirmer
            avec les équipes de l’Apec.
          </p>
          <h3>Services repris d’apec.fr</h3>
          <ul className="inline-list">{observed.map((s) => <li key={s.id}>{s.officialTitle}</li>)}</ul>
          <h3>Intitulés provisoires, à confirmer avec les équipes</h3>
          <ul className="inline-list">{tbc.map((s) => <li key={s.id}>{s.officialTitle}</li>)}</ul>
          <h3>Pages officielles de référence</h3>
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
            <li>Illustrations et pictogrammes dessinés pour ce prototype, dans les couleurs d’apec.fr. Aucun logo ni visuel de l’Apec n’est reproduit.</li>
            <li>
              Photographies (piste 3 du cas 02 et cartes d’accompagnement du cas 01) : <strong>Unsplash, licence Unsplash</strong> (usage
              gratuit, sans autorisation requise —{' '}
              <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">unsplash.com/license<span className="visually-hidden"> (site externe, nouvel onglet)</span></a>).
              Elles illustrent des situations et ne représentent ni des salariés, ni des consultants, ni des usagers de l’Apec.
            </li>
            <li>Pas de témoignage ni de chiffre de satisfaction : je n’en présente que s’ils sont réels et sourcés.</li>
            <li>Prototypes : Montserrat (SIL Open Font License), choisie pour sa proximité avec la typographie d’apec.fr.</li>
            <li>Portfolio : DM Serif Display et Inter (SIL Open Font License), volontairement distincts de l’univers Apec.</li>
          </ul>
        </section>

        <section aria-labelledby="photos">
          <h2 id="photos">Crédits photo</h2>
          <p>Photographies Unsplash, licence Unsplash :</p>
          <ul className="pf-list">
            {ALL_PHOTOS.map((p) => <li key={p.file}>{p.alt}</li>)}
          </ul>
        </section>

        <section aria-labelledby="kit">
          <h2 id="kit">Mini-kit UI des prototypes</h2>
          <p><Badge tone="warn">Non officiel</Badge> Styles relevés sur apec.fr et composants proposés — valeurs indicatives, pas une charte officielle.</p>
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
            Contrastes contrôlés : bleu nuit sur jaune ≈ 8,9:1 ; bleu nuit sur blanc ≈ 14,2:1 ; blanc sur bleu #026096 ≈ 6,7:1 ; bleu #026096 sur blanc ≈ 6,7:1. Le bleu nuit n’est jamais utilisé en texte sur le bleu (≈ 2,1:1) : le texte y est blanc. #6B7280 donne 4,45:1 sur #F5F5FA : le texte secondaire utilise #5F6673 (≥ 5,3:1). Le
            jaune n’est jamais une couleur de texte sur fond blanc. Ces contrôles ne remplacent pas un audit RGAA.
          </p>

          <h3>Éléments graphiques repris d’apec.fr</h3>
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
          <p className="small">Aplats jaune / bleu / bleu nuit selon le type d’aide ; étiquette carrée inspirée du motif « Repères » des articles d’apec.fr.</p>
          <div className="kit-navy">
            <label className="sit-tile is-selected"><Search size={34} className="sit-tile__icon" /><span className="sit-tile__label">Tuile sélectionnée</span></label>
            <label className="sit-tile"><Search size={34} className="sit-tile__icon" /><span className="sit-tile__label">Tuile au repos</span></label>
          </div>

          <h3>Boutons et états</h3>
          <p className="small muted">Survol et focus clavier : à tester à la souris et avec Tab. Certains états sont des propositions.</p>
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
          <h2 id="restant">À valider avec les équipes</h2>
          <ul className="pf-list">
            <li>Intitulés et modalités des services provisoires, dont les conditions de la présélection pour les TPE/PME.</li>
            <li>Alignement sur la charte officielle : couleurs, typographie et composants.</li>
            <li>Audit d’accessibilité complet (lecteurs d’écran, RGAA) : seuls des contrôles de base ont été faits.</li>
            <li>Hypothèses SEO (requêtes, intentions) avec les outils et les données de l’équipe.</li>
          </ul>
          <Link to="/" className="pf-link">Revenir aux trois cas <ArrowRight size={16} /></Link>
        </section>
      </div>
    </PortfolioLayout>
  )
}
