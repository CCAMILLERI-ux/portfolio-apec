import { Badge } from '../components/Badge'
import { CrBlock, CroGrid } from '../components/Coulisses'
import { ArrowRight, Chart, Chat, Compass, Graduation, Handshake, Search, TrendUp } from '../components/Icons'
import { ProtoLayout } from '../components/ProtoLayout'
import { ObservedServiceCard, ServiceCard } from '../components/ServiceCard'
import { getService, SERVICES, type Service } from '../data/services'
import { ALL_DEMO_SERVICE_IDS, SITUATIONS } from '../data/situations'
import { Link, navigate, type Route } from '../lib/router'

type View = 'piste' | 'existant'
const ALL = 'tous'

const SITUATION_ICON: Record<string, typeof Search> = {
  'nouvel-emploi': Search,
  'premier-emploi': Graduation,
  evoluer: TrendUp,
  reconversion: Compass,
  'recruter-aide': Handshake,
  'optimiser-recrutements': Chart,
}

export function Case1({ route }: { route: Route }) {
  const view: View = route.query.get('vue') === 'existant' ? 'existant' : 'piste'
  const situationId = route.query.get('situation') ?? SITUATIONS[0].id
  const situation = SITUATIONS.find((s) => s.id === situationId)
  const isAll = situationId === ALL || !situation
  const current = isAll ? ALL : situationId

  const ids = isAll ? ALL_DEMO_SERVICE_IDS : situation.serviceIds
  const services = ids.map(getService).filter(Boolean) as Service[]

  const update = (next: { vue?: View; situation?: string }) => {
    const q = new URLSearchParams({ situation: next.situation ?? current, vue: next.vue ?? view })
    navigate(`/cas-1?${q.toString()}`, { replace: true })
  }
  const resultLabel = isAll ? 'Tous nos services' : situation.label

  const variantSwitch = (
    <fieldset className="bar-switch">
      <legend className="visually-hidden">Variante affichée</legend>
      {(
        [
          ['existant', 'Existant observé'],
          ['piste', 'Piste exploratoire'],
        ] as const
      ).map(([v, label]) => (
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
                  <input
                    type="radio"
                    name="situation"
                    value={s.id}
                    checked={current === s.id}
                    onChange={() => update({ situation: s.id })}
                    className="visually-hidden"
                  />
                  <Icon size={34} className="sit-tile__icon" />
                  <span className="sit-tile__label">{s.label}</span>
                </label>
              )
            })}
          </fieldset>
          <label className={`sit-all${current === ALL ? ' is-selected' : ''}`}>
            <input
              type="radio"
              name="situation"
              value={ALL}
              checked={current === ALL}
              onChange={() => update({ situation: ALL })}
              className="visually-hidden"
            />
            Voir tous nos services <ArrowRight size={18} />
          </label>
        </div>
      </div>

      <div className="container section">
        <p className="visually-hidden" role="status" aria-live="polite">
          {`${services.length} services affichés pour : ${resultLabel}.`}
        </p>
        <h2 className="results-title">
          {isAll ? resultLabel : <>Pour vous : <span className="results-title__sit">{resultLabel}</span></>}
        </h2>

        {view === 'existant' ? (
          <div className="observed-band">
            <div className="observed-grid">
              {services.map((s) => (
                <ObservedServiceCard key={s.id} service={s} from="cas-1" />
              ))}
            </div>
          </div>
        ) : (
          <div className="svc-grid">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} from="cas-1" />
            ))}
          </div>
        )}
      </div>

      <div className="cta-band">
        <div className="container cta-band__inner">
          <Chat size={44} className="cta-band__icon" />
          <div className="cta-band__text">
            <p className="cta-band__title">Vous hésitez entre plusieurs services ?</p>
            <p>Un consultant fait le point avec vous et vous oriente vers l’accompagnement adapté.</p>
          </div>
          <Link to="/reserver/cep?from=cas-1" className="btn btn--primary">Prendre rendez-vous</Link>
        </div>
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
          La barre du bas bascule entre <strong>« Existant observé »</strong> et <strong>« Piste exploratoire »</strong> sur
          les mêmes services. C’est une comparaison de variantes, <strong>pas un test A/B</strong>.
        </p>
        <p>
          La vue « existant » reconstruit le motif de cartes vu sur apec.fr (rubrique « Entretiens de recrutement »,
          captures de novembre 2026). Le regroupement par situation n’existe pas dans les captures : c’est lui-même une
          piste. Les descriptions absentes des captures ne sont pas inventées.
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
              Si un visiteur entre par sa situation et voit, dès la carte, le bénéfice, le type d’aide et les
              modalités, alors il pourrait choisir plus facilement un service adapté. Aucun gain n’est affirmé.
            </p>
          ),
          modification: (
            <ul>
              <li>Six entrées par situation, modifiables, et une vue « tous nos services ».</li>
              <li>Accroche orientée bénéfice, distincte de l’intitulé existant, conservé au-dessus.</li>
              <li>Visuel coloré et étiquette carrée « Atelier / Rendez-vous / Outil », reprenant les aplats et le motif « Repères » des captures.</li>
              <li>Une seule action principale par carte ; aide humaine dans un bandeau bleu.</li>
            </ul>
          ),
          kpi: (
            <>
              <p><strong>KPI principal :</strong> inscriptions finalisées / visiteurs exposés au module.</p>
              <p><strong>Qualité :</strong> présence effective, satisfaction, adéquation du service.</p>
              <p><strong>Garde-fous :</strong> abandon, accessibilité, performance ; ne pas dégrader la recherche d’offres.</p>
              <p>La piste change plusieurs éléments à la fois : un test global ne permettrait pas d’isoler l’effet de chacun.</p>
            </>
          ),
          equipes: (
            <ul>
              <li>Produit et Digital : arbitrage des entrées, roadmap.</li>
              <li>Équipes métier : intitulés, modalités, conditions (ex. présélection TPE/PME).</li>
              <li>Webanalyste : marquage, répartition aléatoire stable, échantillon et durée.</li>
              <li>DSI / CMS : faisabilité des composants.</li>
            </ul>
          ),
        }}
      />
      <CrBlock title="Personas de travail (hypothèses, non validées par l’Apec)">
        <p>Jamais affichés aux visiteurs. Aucune situation n’est déduite de l’âge.</p>
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
          Seules les modalités lisibles sur les captures sont affichées dans les cartes. Les intitulés suivants n’ont
          pas pu être contrôlés sur apec.fr ; leurs fiches renvoient vers le site officiel :
        </p>
        <ul className="inline-list">
          {tbc.map((s) => <li key={s.id}>{s.officialTitle}</li>)}
        </ul>
        <p>La présélection est soumise à des conditions (TPE/PME notamment) à vérifier : elle n’est pas présentée comme ouverte à tous.</p>
      </CrBlock>
    </>
  )
}
