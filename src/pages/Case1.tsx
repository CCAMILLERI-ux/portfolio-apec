import { Badge } from '../components/Badge'
import { CrBlock, CroGrid } from '../components/Coulisses'
import { ArrowRight, Chat, Compass, Graduation, Handshake, Search, TrendUp } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ModalityChips } from '../components/Modalities'
import { ProtoLayout } from '../components/ProtoLayout'
import { KIND_TONE, ObservedServiceCard, ServiceAction, ServiceCard, ServiceVisual } from '../components/ServiceCard'
import { ADVICE_BY_SITUATION, IDEAL_IF } from '../data/piste2'
import { getService, SERVICES, type Service } from '../data/services'
import { ALL_DEMO_SERVICE_IDS, SITUATIONS } from '../data/situations'
import { Link, navigate, type Route } from '../lib/router'

type View = 'existant' | 'piste' | 'piste2'
const VIEWS: [View, string][] = [
  ['existant', 'Existant observé'],
  ['piste', 'Piste 1'],
  ['piste2', 'Piste 2'],
]
const ALL = 'tous'

const SITUATION_ICON: Record<string, typeof Search> = {
  'nouvel-emploi': Search,
  'premier-emploi': Graduation,
  evoluer: TrendUp,
  reconversion: Compass,
  'recruter-aide': Handshake,
}

export function Case1({ route }: { route: Route }) {
  const rawView = route.query.get('vue')
  const view: View = rawView === 'existant' || rawView === 'piste2' ? rawView : 'piste'
  const situationId = route.query.get('situation') ?? SITUATIONS[0].id
  const situation = SITUATIONS.find((s) => s.id === situationId)
  const isAll = situationId === ALL || !situation
  const current = isAll ? ALL : situationId

  const ids = isAll ? ALL_DEMO_SERVICE_IDS : situation.serviceIds
  const services = ids.map(getService).filter(Boolean) as Service[]
  const advice = ADVICE_BY_SITUATION[current] ?? []

  const update = (next: { vue?: View; situation?: string }) => {
    const q = new URLSearchParams({ situation: next.situation ?? current, vue: next.vue ?? view })
    navigate(`/cas-1?${q.toString()}`, { replace: true })
  }
  const resultLabel = isAll ? 'Tous nos services' : situation.label

  const variantSwitch = (
    <fieldset className="bar-switch">
      <legend className="visually-hidden">Variante affichée</legend>
      {VIEWS.map(([v, label]) => (
        <label key={v} className={`bar-switch__opt${view === v ? ' is-selected' : ''}`}>
          <input type="radio" name="vue" value={v} checked={view === v} onChange={() => update({ vue: v })} />
          {label}
        </label>
      ))}
    </fieldset>
  )

  return (
    <ProtoLayout
      path={route.path}
      caseLabel="Cas 1 · Choisir un service"
      barControl={variantSwitch}
      events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
      onReset={() => navigate('/cas-1', { replace: true })}
      coulisses={<Case1Coulisses />}
    >
      <div className="band band--tall">
        <div className="container">
          <p className="band__kicker">Nos services</p>
          <h1 className="band__title band__title--xl" tabIndex={-1}>Quelle est votre situation ?</h1>
          <p className="band__lead">Choisissez votre point de départ : nous vous montrons les services qui vous correspondent.</p>
          <fieldset className="sit-grid">
            <legend className="visually-hidden">Votre situation</legend>
            {SITUATIONS.map((s) => {
              const Icon = SITUATION_ICON[s.id]
              return (
                <label key={s.id} className={`sit-tile${current === s.id ? ' is-selected' : ''}`}>
                  <input type="radio" name="situation" value={s.id} checked={current === s.id}
                    onChange={() => update({ situation: s.id })} className="visually-hidden" />
                  <Icon size={34} className="sit-tile__icon" />
                  <span className="sit-tile__label">{s.label}</span>
                </label>
              )
            })}
            <label className={`sit-tile sit-tile--all${current === ALL ? ' is-selected' : ''}`}>
              <input type="radio" name="situation" value={ALL} checked={current === ALL}
                onChange={() => update({ situation: ALL })} className="visually-hidden" />
              <ArrowRight size={34} className="sit-tile__icon" />
              <span className="sit-tile__label">Voir tous nos services</span>
            </label>
          </fieldset>
        </div>
      </div>

      <div className="container section">
        <p className="visually-hidden" role="status" aria-live="polite">
          {`${services.length} services affichés pour : ${resultLabel}.`}
        </p>
        <div className="results-head">
          <h2 className="results-title">
            {isAll ? resultLabel : <>Pour vous : <span className="results-title__sit">{resultLabel}</span></>}
          </h2>
          {view === 'piste' && (
            <Link to="/reserver/cep?from=cas-1" className="help-link">
              <Chat size={22} /> Vous hésitez ? <strong>Échanger avec un consultant</strong>
            </Link>
          )}
        </div>

        {view === 'existant' && (
          <div className="observed-band">
            <div className="observed-grid">
              {services.map((s) => <ObservedServiceCard key={s.id} service={s} from="cas-1" />)}
            </div>
          </div>
        )}

        {view === 'piste' && (
          <div className="svc-grid">
            {services.map((s) => <ServiceCard key={s.id} service={s} from="cas-1" />)}
          </div>
        )}

        {view === 'piste2' && (
          <>
            <ol className="pick-list" aria-label="Services, avec la situation où chacun est le plus utile">
              {services.map((s) => (
                <li key={s.id} className={`pick pick--${KIND_TONE[s.kind]}`}>
                  <div className="pick__visual"><ServiceVisual service={s} /></div>
                  <div className="pick__body">
                    <p className="svc__official">{s.officialTitle}</p>
                    <h3 className="pick__title">{s.hook}</h3>
                    {IDEAL_IF[s.id] && (
                      <p className="pick__ideal"><span className="pick__ideal-label">Idéal si</span> {IDEAL_IF[s.id]}</p>
                    )}
                    <ModalityChips items={s.modalities} />
                  </div>
                  <div className="pick__actions">
                    <ServiceAction service={s} from="cas-1" />
                    <Link to={`/service/${s.id}?from=cas-1`} className="link-arrow">
                      En savoir plus<span className="visually-hidden"> : {s.officialTitle}</span> <ArrowRight size={18} />
                    </Link>
                  </div>
                </li>
              ))}
              <li className="pick pick--help">
                <div className="pick__help-icon"><Chat size={40} /></div>
                <div className="pick__body">
                  <h3 className="pick__title">Aucun ne vous correspond vraiment ?</h3>
                  <p className="pick__ideal pick__ideal--light">Un consultant fait le point avec vous et vous oriente vers l’accompagnement adapté.</p>
                </div>
                <div className="pick__actions">
                  <Link to="/reserver/cep?from=cas-1" className="btn btn--primary">Échanger avec un consultant</Link>
                </div>
              </li>
            </ol>

            {advice.length > 0 && (
              <section className="advice" aria-labelledby="nos-conseils">
                <h2 id="nos-conseils" className="advice__title">Nos conseils</h2>
                <p className="advice__sub">Pour bien utiliser ces services</p>
                <ul className="advice__grid">
                  {advice.map((a, i) => (
                    <li key={a.to}>
                      <Link to={a.to} className="advice-card">
                        <span className="advice-card__visual">
                          <Illustration name={i === 0 ? 'conseil' : 'document'} tone={i === 0 ? 'yellow' : 'blue'} className="advice-card__img" />
                          <span className="advice-card__tag">{a.kicker}</span>
                        </span>
                        <span className="advice-card__title">{a.title}</span>
                        <span className="advice-card__excerpt">{a.excerpt}</span>
                        <ArrowRight size={22} className="advice-card__arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </ProtoLayout>
  )
}

function Case1Coulisses() {
  const tbc = SERVICES.filter((s) => s.titleProvenance === 'a-verifier')
  return (
    <>
      <h3 className="coulisses__case">Cas 1 — Rendre les services plus faciles à choisir</h3>
      <CrBlock title="Comment lire cette démo">
        <p>
          La barre du haut bascule entre trois variantes sur les mêmes services : <strong>Existant observé</strong>,
          <strong> Piste 1</strong> et <strong>Piste 2</strong>. C’est une comparaison de variantes, <strong>pas un test A/B</strong>.
        </p>
        <p>
          La vue « existant » reconstruit le motif de cartes vu sur apec.fr (rubrique « Entretiens de recrutement »,
          captures de novembre 2026). Le regroupement par situation n’existe pas dans les captures : c’est lui-même une
          piste. Les descriptions absentes des captures ne sont pas inventées.
        </p>
      </CrBlock>
      <CrBlock title="Piste 1 et piste 2 : ce que chacune change">
        <div className="table-scroll">
          <table className="data-table">
            <caption className="visually-hidden">Comparaison des pistes</caption>
            <thead><tr><th scope="col">Élément</th><th scope="col">Existant observé</th><th scope="col">Piste 1 — valoriser</th><th scope="col">Piste 2 — aider à choisir</th></tr></thead>
            <tbody>
              <tr><td>Entrée</td><td>Par thème</td><td>Par situation</td><td>Par situation</td></tr>
              <tr><td>Carte</td><td>Pictogramme, intitulé, phrase</td><td>Visuel coloré, accroche bénéfice, intitulé conservé</td><td>Ligne comparable : visuel, accroche, <strong>« Idéal si… »</strong></td></tr>
              <tr><td>Modalités</td><td>Sur la fiche</td><td>Sur la carte (vérifiées)</td><td>Sur la ligne (vérifiées)</td></tr>
              <tr><td>Actions</td><td>« En savoir plus » + action</td><td>Une action principale + lien</td><td>Une action principale + lien</td></tr>
              <tr><td>Aide humaine</td><td>—</td><td>Lien à côté du titre</td><td>Intégrée à la liste, comme une option</td></tr>
              <tr><td>Contenus conseils</td><td>Bloc séparé, plus bas</td><td>—</td><td><strong>« Nos conseils »</strong> reliés à la situation</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Ce que la piste 2 cherche à améliorer :</strong> la piste 1 montre mieux chaque service, mais laisse le
          visiteur comparer seul. La piste 2 formule le critère de choix (« Idéal si… »), présente les services comme des
          options comparables, traite l’aide humaine comme une option à part entière et relie le choix à des contenus
          utiles (maillage vers le cas 3). Hypothèse à tester : moins d’hésitation, pas forcément plus de clics.
        </p>
      </CrBlock>
      <CroGrid
        rubrics={{
          constat: (
            <p>
              Sur les pages observées, les services sont présentés par thème, avec un intitulé, une phrase et deux
              boutons. Les modalités (format, durée, gratuité, public) n’apparaissent qu’une fois la fiche ouverte.
              Ce constat ne prouve pas une baisse de conversion.
            </p>
          ),
          hypothese: (
            <p>
              Si un visiteur entre par sa situation et voit, dès la liste, le bénéfice, le type d’aide, les modalités
              et le cas où chaque service est utile, alors il pourrait choisir plus facilement. Aucun gain n’est affirmé.
            </p>
          ),
          modification: (
            <ul>
              <li>Cinq entrées par situation, modifiables, et une vue « tous nos services ».</li>
              <li>Accroche orientée bénéfice, distincte de l’intitulé existant, conservé.</li>
              <li>Visuels en aplats et étiquette carrée, reprenant le langage des captures.</li>
              <li>Piste 2 : critère « Idéal si… », aide humaine en option, conseils reliés.</li>
            </ul>
          ),
          kpi: (
            <>
              <p><strong>KPI principal :</strong> inscriptions finalisées / visiteurs exposés au module.</p>
              <p><strong>Qualité :</strong> présence effective, satisfaction, adéquation du service.</p>
              <p><strong>Garde-fous :</strong> abandon, accessibilité, performance ; ne pas dégrader la recherche d’offres.</p>
              <p>Chaque piste change plusieurs éléments : un test global n’isolerait pas l’effet de chacun. Tester ensuite des éléments isolés (ex. « Idéal si… »).</p>
            </>
          ),
          equipes: (
            <ul>
              <li>Produit et Digital : arbitrage des entrées, roadmap.</li>
              <li>Équipes métier et consultants : intitulés, modalités, formulations « Idéal si… ».</li>
              <li>Webanalyste : marquage, répartition aléatoire stable, échantillon et durée.</li>
              <li>DSI / CMS : faisabilité des composants.</li>
            </ul>
          ),
        }}
      />
      <CrBlock title="Personas de travail (hypothèses, non validées par l’Apec)">
        <p>Jamais affichés aux visiteurs. Aucune situation n’est déduite de l’âge. La situation « optimiser mes recrutements » (recruteur RH professionnel) a été retirée : elle ne relève pas de cet espace orienté cadres.</p>
        <table className="data-table">
          <caption className="visually-hidden">Correspondance entre situations et personas</caption>
          <thead><tr><th scope="col">Code</th><th scope="col">Entrée affichée</th><th scope="col">Persona</th></tr></thead>
          <tbody>
            {SITUATIONS.map((s) => (
              <tr key={s.id}><td>{s.persona}</td><td>{s.label}</td><td>{s.personaNote}</td></tr>
            ))}
          </tbody>
        </table>
      </CrBlock>
      <CrBlock title={<>Informations à vérifier <Badge tone="warn">Non contrôlé</Badge></>}>
        <p>
          Seules les modalités lisibles sur les captures sont affichées. Les intitulés suivants n’ont pas pu être
          contrôlés sur apec.fr ; leurs fiches renvoient vers le site officiel. Les formulations « Idéal si… » sont des
          propositions rédactionnelles.
        </p>
        <ul className="inline-list">{tbc.map((s) => <li key={s.id}>{s.officialTitle}</li>)}</ul>
        <p>La présélection est soumise à des conditions (TPE/PME notamment) à vérifier : elle n’est pas présentée comme ouverte à tous.</p>
      </CrBlock>
    </>
  )
}
