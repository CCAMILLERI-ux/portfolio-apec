import { Badge } from '../components/Badge'
import { ExplainPanel } from '../components/ExplainPanel'
import { ArrowRight, Info } from '../components/Icons'
import { PageBand } from '../components/PageBand'
import { ObservedServiceCard, ServiceCard } from '../components/ServiceCard'
import { getService, type Service } from '../data/services'
import { ALL_DEMO_SERVICE_IDS, SITUATIONS } from '../data/situations'
import { Link, navigate, type Route } from '../lib/router'

type View = 'piste' | 'existant'
const ALL = 'tous'

export function Case1({ route }: { route: Route }) {
  const view: View = route.query.get('vue') === 'existant' ? 'existant' : 'piste'
  const situationId = route.query.get('situation') ?? SITUATIONS[0].id
  const situation = SITUATIONS.find((s) => s.id === situationId)
  const isAll = situationId === ALL || !situation

  const ids = isAll ? ALL_DEMO_SERVICE_IDS : situation.serviceIds
  const services = ids.map(getService).filter(Boolean) as Service[]

  const update = (next: { vue?: View; situation?: string }) => {
    const q = new URLSearchParams({ situation: next.situation ?? situationId, vue: next.vue ?? view })
    navigate(`/cas-1?${q.toString()}`, { replace: true })
  }

  const resultLabel = isAll ? 'Tous les services de la démo' : situation.label

  return (
    <>
      <PageBand
        back={{ to: '/', label: 'Portfolio · Cas 1' }}
        title="Trouvez le service adapté à votre situation"
        onReset={() => navigate('/cas-1', { replace: true })}
      />

      <div className="container overlap">
        <div className="sheet">
          <fieldset className="segmented" aria-describedby="compare-help">
            <legend className="segmented__legend">Comparer les présentations</legend>
            {(
              [
                ['existant', 'Existant observé'],
                ['piste', 'Piste exploratoire'],
              ] as const
            ).map(([v, label]) => (
              <label key={v} className={`segmented__opt${view === v ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name="vue"
                  value={v}
                  checked={view === v}
                  onChange={() => update({ vue: v })}
                />
                {label}
              </label>
            ))}
            <p id="compare-help" className="segmented__help">
              Comparaison de variantes sur les mêmes services — ce n’est pas un test A/B.
            </p>
          </fieldset>

          <fieldset className="situations">
            <legend className="h2-like">Quelle est votre situation ?</legend>
            <p className="muted situations__help">Vous pouvez changer de situation à tout moment.</p>
            <div className="situations__grid">
              {[...SITUATIONS.map((s) => ({ id: s.id, label: s.label })), { id: ALL, label: 'Tous les services de la démo' }].map(
                (s) => (
                  <label
                    key={s.id}
                    className={`choice choice--chip${(isAll ? ALL : situationId) === s.id ? ' is-selected' : ''}${s.id === ALL ? ' choice--all' : ''}`}
                  >
                    <input
                      type="radio"
                      name="situation"
                      value={s.id}
                      checked={(isAll ? ALL : situationId) === s.id}
                      onChange={() => update({ situation: s.id })}
                    />
                    <span className="choice__title">{s.label}</span>
                  </label>
                ),
              )}
            </div>
          </fieldset>

          <section aria-labelledby="resultats">
            <p className="visually-hidden" role="status" aria-live="polite">
              {`${services.length} services affichés pour : ${resultLabel}. Vue ${view === 'existant' ? 'existant observé' : 'piste exploratoire'}.`}
            </p>
            <h2 id="resultats" className="results-title">
              {isAll ? resultLabel : <>Pour vous : <span className="results-title__sit">{resultLabel}</span></>}
              <span className="results-title__count"> — {services.length} service{services.length > 1 ? 's' : ''}</span>
            </h2>

            {view === 'existant' ? (
              <>
                <p className="observed-note">
                  <Info size={20} />
                  <span>
                    <strong>Existant observé</strong> — reconstruction du motif de cartes vu sur apec.fr
                    (rubrique « Entretiens de recrutement », captures de novembre 2026) appliqué aux mêmes
                    services. Le regroupement par situation n’existe pas dans les captures : c’est lui-même
                    une piste. Les descriptions absentes des captures ne sont pas inventées.
                  </span>
                </p>
                <div className="observed-band">
                  <div className="observed-grid">
                    {services.map((s) => (
                      <ObservedServiceCard key={s.id} service={s} from="cas-1" />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="service-grid">
                {services.map((s) => (
                  <ServiceCard key={s.id} service={s} from="cas-1" />
                ))}
              </div>
            )}
          </section>

          <aside className="human-help" aria-labelledby="aide-humaine">
            <h2 id="aide-humaine" className="h3-like">Vous hésitez entre plusieurs services ?</h2>
            <p>
              Un échange avec un consultant permet de faire le point avant de choisir. Dans la démo, la
              prise de rendez-vous est simulée.
            </p>
            <Link to="/reserver/cep?from=cas-1" className="link-arrow">
              Prendre un rendez-vous de conseil (simulé) <ArrowRight size={18} />
            </Link>
          </aside>
        </div>

        <ExplainPanel
          events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
          rubrics={{
            constat: (
              <p>
                Sur les pages observées, les services sont présentés par thème, avec un intitulé, une
                phrase et deux boutons (« En savoir plus » et une action). Les modalités (format, durée,
                gratuité, public) n’apparaissent qu’une fois la fiche ouverte. Ce constat ne prouve pas une
                baisse de conversion.
              </p>
            ),
            hypothese: (
              <p>
                Si un visiteur entre par sa situation et voit, dès la carte, le bénéfice, le type d’aide et
                les modalités, alors il pourrait choisir plus facilement un service adapté. Hypothèse à
                tester, aucun gain n’est affirmé.
              </p>
            ),
            modification: (
              <ul>
                <li>Six entrées par situation, modifiables, et une vue « tous les services ».</li>
                <li>Accroche orientée bénéfice, distincte de l’intitulé existant, conservé.</li>
                <li>Repère « atelier / individuel / outil » et bloc modalités sur la carte.</li>
                <li>Une seule action principale contextualisée par carte ; aide humaine proposée.</li>
              </ul>
            ),
            kpi: (
              <>
                <p><strong>KPI principal :</strong> inscriptions finalisées / visiteurs exposés au module.</p>
                <p><strong>Qualité :</strong> présence effective aux ateliers et rendez-vous, satisfaction, adéquation du service.</p>
                <p><strong>Garde-fous :</strong> taux d’abandon, accessibilité, performance ; ne pas dégrader l’accès à la recherche d’offres.</p>
                <p className="muted">
                  La piste change plusieurs éléments à la fois : un test global ne permettrait pas d’isoler
                  l’effet de chacun. Prévoir ensuite des tests ciblés (ex. modalités visibles ou non).
                </p>
              </>
            ),
            equipes: (
              <ul>
                <li>Produit et Digital : arbitrage des entrées par situation, priorisation roadmap.</li>
                <li>Équipes métier : intitulés, modalités et conditions d’éligibilité (ex. présélection TPE/PME).</li>
                <li>Webanalyste : plan de marquage, répartition aléatoire stable, échantillon et durée.</li>
                <li>DSI / CMS : faisabilité des composants dans l’outil de gestion de contenu.</li>
              </ul>
            ),
          }}
        >
          <section className="explain__rubric explain__rubric--wide">
            <h3>Personas de travail (hypothèses, non validées par l’Apec)</h3>
            <p className="muted">Non affichés aux visiteurs. Aucune situation n’est déduite de l’âge.</p>
            <table className="data-table">
              <caption className="visually-hidden">Correspondance entre situations et personas de travail</caption>
              <thead>
                <tr><th scope="col">Code</th><th scope="col">Entrée affichée</th><th scope="col">Persona</th></tr>
              </thead>
              <tbody>
                {SITUATIONS.map((s) => (
                  <tr key={s.id}>
                    <td>{s.persona}</td><td>{s.label}</td><td>{s.personaNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <Badge tone="warn">À vérifier</Badge> Les intitulés des services P2 à P6 n’ont pas pu être
              contrôlés sur apec.fr : leurs fiches sont des aperçus avec lien vers le site officiel.
            </p>
          </section>
        </ExplainPanel>
      </div>
    </>
  )
}
