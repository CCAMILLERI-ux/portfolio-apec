import { Badge } from '../components/Badge'
import { ArrowRight, External } from '../components/Icons'
import { Modalities } from '../components/Modalities'
import { PageBand } from '../components/PageBand'
import {
  OFFICIAL_CANDIDATE_URL,
  OFFICIAL_RECRUITER_URL,
  OFFICIAL_SERVICES_URL,
  OFFICIAL_TOOLS_URL,
  SERVICES,
} from '../data/services'
import { Link } from '../lib/router'

const TOKENS = [
  ['--brand-navy', '#252555', 'Texte principal, en-tête, pied de page, bandeaux'],
  ['--brand-yellow', '#FFC400', 'Boutons principaux, accents (texte bleu nuit dessus)'],
  ['--brand-blue', '#006699', 'Cartes thématiques, recommandations'],
  ['--surface-white', '#FFFFFF', 'Fond'],
  ['--surface-muted', '#F5F5FA', 'Fonds secondaires'],
  ['--border-neutral', '#D1D3DB', 'Bordures'],
  ['--accent-cyan-light', '#99E8FA', 'Accent léger'],
  ['--text-secondary', '#6B7280', 'Métadonnées'],
]

const EXTERNAL = [OFFICIAL_CANDIDATE_URL, OFFICIAL_RECRUITER_URL, OFFICIAL_SERVICES_URL, OFFICIAL_TOOLS_URL]

export function Sources() {
  const observed = SERVICES.filter((s) => s.titleProvenance === 'capture')
  const tbc = SERVICES.filter((s) => s.titleProvenance === 'a-verifier')

  return (
    <>
      <PageBand back={{ to: '/', label: 'Portfolio' }} title="Sources, limites et mini-kit UI" />
      <div className="container overlap">
        <div className="sheet">
          <section aria-labelledby="statut">
            <h2 id="statut">Statut du prototype</h2>
            <ul className="plain-list">
              <li>Portfolio de candidature indépendant : propositions exploratoires, sans affiliation officielle à l’Apec.</li>
              <li>Aucune inscription, aucune réservation réelle, aucune donnée envoyée. Sauvegarde locale de démonstration uniquement.</li>
              <li>Toutes les pages portent une consigne <code>noindex</code> : le prototype n’a pas vocation à être référencé.</li>
              <li>Aucun analytics ni traceur externe. Le « journal local » n’est pas un résultat d’expérimentation.</li>
              <li>La bascule « Existant observé / Piste exploratoire » compare des variantes ; ce n’est pas un test A/B.</li>
            </ul>
          </section>

          <section aria-labelledby="provenance">
            <h2 id="provenance">Provenance des informations</h2>
            <p>
              Références : captures d’écran de pages d’apec.fr (consultées en novembre 2026), utilisées comme
              références visuelles et non intégrées au site, car elles contiennent des données personnelles.
              Les pages publiques n’étaient pas accessibles depuis l’environnement de développement :
              les modalités non visibles sur les captures sont marquées « à vérifier ».
            </p>
            <h3>Intitulés observés sur les captures ({observed.length})</h3>
            <ul className="inline-list">
              {observed.map((s) => <li key={s.id}>{s.officialTitle}</li>)}
            </ul>
            <h3>Intitulés à vérifier ({tbc.length})</h3>
            <p className="muted small">Formulés d’après le brief ; fiches d’aperçu avec lien vers le site officiel.</p>
            <ul className="inline-list">
              {tbc.map((s) => <li key={s.id}>{s.officialTitle}</li>)}
            </ul>
            <h3>Pages officielles à consulter</h3>
            <ul className="plain-list">
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
            <ul className="plain-list">
              <li>Illustrations et pictogrammes : dessinés en SVG pour ce prototype. Aucune photographie, aucun portrait, aucun logo de l’Apec.</li>
              <li>Pas de témoignage ni de chiffre de satisfaction : aucune source autorisée n’était disponible.</li>
              <li>Police : Montserrat (licence SIL Open Font License, paquet <code>@fontsource/montserrat</code>, servie localement), substitution provisoire — la police exacte d’apec.fr n’est pas confirmée.</li>
            </ul>
          </section>

          <section aria-labelledby="kit">
            <h2 id="kit">Mini-kit UI</h2>
            <p>
              <Badge tone="warn">Non officiel</Badge> Styles observés sur apec.fr et composants proposés —
              valeurs estimées à partir des captures, pas des tokens officiels.
            </p>
            <h3>Palette</h3>
            <ul className="swatches">
              {TOKENS.map(([name, hex, use]) => (
                <li key={name}>
                  <span className="swatch" style={{ background: hex }} aria-hidden="true" />
                  <span><code>{name}</code> {hex}<br /><span className="muted small">{use}</span></span>
                </li>
              ))}
            </ul>
            <p className="small">
              Contrastes calculés (formule WCAG 2) : bleu nuit sur jaune ≈ 8,9:1 ; bleu nuit sur blanc ≈ 14,2:1 ;
              blanc sur bleu moyen ≈ 6,3:1. Le gris #6B7280 donne 4,8:1 sur blanc mais 4,45:1 sur
              #F5F5FA : le texte secondaire utilise donc #5F6673 (≥ 5,3:1 sur les deux fonds). Le jaune
              n’est jamais utilisé comme couleur de texte sur fond blanc. Ces calculs ne valent pas audit RGAA.
            </p>

            <h3>Boutons et états</h3>
            <p className="muted small">Survol et focus clavier : à tester à la souris et avec Tab. Les états non visibles sur les captures sont des propositions.</p>
            <div className="kit-row">
              <button type="button" className="btn btn--primary">Principal</button>
              <button type="button" className="btn btn--outline">Secondaire</button>
              <button type="button" className="btn btn--primary" disabled>Désactivé</button>
              <Link to="/sources" anchor="kit" className="link-arrow">Lien avec flèche <ArrowRight size={18} /></Link>
            </div>

            <h3>Choix, sélection et erreur</h3>
            <div className="kit-grid">
              <label className="choice is-selected">
                <input type="radio" name="kit-demo" defaultChecked />
                <span className="choice__body"><span className="choice__title">Option sélectionnée</span></span>
              </label>
              <label className="choice">
                <input type="radio" name="kit-demo" />
                <span className="choice__body"><span className="choice__title">Option non sélectionnée</span></span>
              </label>
            </div>
            <div className="field">
              <label htmlFor="kit-field">Champ en erreur (exemple)</label>
              <input id="kit-field" className="input is-invalid" aria-invalid="true" aria-describedby="kit-field-err" defaultValue="" />
              <p id="kit-field-err" className="field-error">Message d’erreur explicite, non porté par la seule couleur.</p>
            </div>

            <h3>Badges</h3>
            <div className="kit-row">
              <Badge tone="kind">Atelier collectif</Badge>
              <Badge tone="warn">À vérifier</Badge>
              <Badge tone="demo">Données fictives</Badge>
              <Badge tone="ok">Observé</Badge>
            </div>

            <h3>Bloc modalités</h3>
            <Modalities items={SERVICES.find((s) => s.id === 'entretien-programme')!.modalities} />
          </section>

          <section aria-labelledby="restant">
            <h2 id="restant">Ce qui reste à vérifier</h2>
            <ul className="plain-list">
              <li>Intitulés et modalités des services marqués « à vérifier », dont les conditions de la présélection pour les TPE/PME.</li>
              <li>Valeurs CSS exactes, police et états d’interface d’apec.fr.</li>
              <li>Audit d’accessibilité complet (lecteurs d’écran, RGAA) : seuls des contrôles de base ont été faits.</li>
              <li>Hypothèses SEO (requêtes, intentions) avec les outils et données de l’équipe.</li>
            </ul>
            <Link to="/" className="link-arrow">Revenir à l’accueil du portfolio <ArrowRight size={18} /></Link>
          </section>
        </div>
      </div>
    </>
  )
}
