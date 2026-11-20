import { Badge } from '../components/Badge'
import { CrBlock, CroGrid } from '../components/Coulisses'
import { ArrowRight, Calendar, Chat, Compass, Graduation, Handshake, Search, TrendUp } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ModalityChips, verified } from '../components/Modalities'
import { ProtoLayout } from '../components/ProtoLayout'
import { ObservedServiceCard, PhotoVisual, ServiceAction, ServiceCard } from '../components/ServiceCard'
import { Picto } from '../components/Picto'
import { WORKSHOP_SESSIONS } from '../data/slots'
import { ADVICE_BY_SITUATION, IDEAL_IF } from '../data/piste2'
import { getService, KIND_LABEL, SERVICES, type Service } from '../data/services'
import { ALL_DEMO_SERVICE_IDS, SITUATIONS } from '../data/situations'
import { Link, navigate, type Route } from '../lib/router'

type View = 'existant' | 'piste' | 'piste2' | 'piste3'
const VIEWS: [View, string][] = [
  ['existant', 'Existant observé'],
  ['piste', 'Piste 1'],
  ['piste2', 'Piste 2'],
  ['piste3', 'Piste 3'],
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
  const view: View = rawView === 'existant' || rawView === 'piste2' || rawView === 'piste3' ? rawView : 'piste'
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
          {v === 'existant' ? <>Existant<span className="demo-bar__hide-sm"> observé</span></> : label}
        </label>
      ))}
    </fieldset>
  )

  return (
    <ProtoLayout
      path={route.path}
      caseLabel="Cas 02 · Clarifier l’offre"
      intro={{
        kicker: 'Simulation d’A/B test UX/UI',
        title: 'Optimiser l’expérience utilisateur et la conversion',
        text: 'Comparer deux présentations des services pour faciliter le choix. Test envisageable avec AB Tasty.',
        note: 'Prototype de démonstration — aucun résultat mesuré.',
      }}
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
          {(view === 'piste' || view === 'piste3') && (
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

        {view === 'piste3' && <Piste3 services={services} />}

        {view === 'piste2' && (
          <>
            <ul className="theme-grid" aria-label="Services, avec la situation où chacun est le plus utile">
              {services.map((s) => {
                const shown = verified(s.modalities).filter((m) => m.label !== 'Public')
                return (
                  <li key={s.id} className="theme-card">
                    <Picto kind={s.kind} />
                    <p className="theme-card__kind">{KIND_LABEL[s.kind]}</p>
                    <h3 className="theme-card__title">{s.hook}</h3>
                    <p className="theme-card__official">{s.officialTitle}</p>
                    <ul className="theme-card__bullets">
                      {IDEAL_IF[s.id] && <li><strong>Idéal si</strong> {IDEAL_IF[s.id]}</li>}
                      {shown.map((m) => <li key={m.label}>{m.value}</li>)}
                    </ul>
                    <div className="theme-card__actions">
                      <ServiceAction service={s} from="cas-1" />
                      <Link to={`/service/${s.id}?from=cas-1`} className="theme-card__arrow" aria-label={`En savoir plus : ${s.officialTitle}`}>
                        <ArrowRight size={30} />
                      </Link>
                    </div>
                  </li>
                )
              })}
              <li className="theme-card theme-card--navy">
                <Picto kind="aide" />
                <p className="theme-card__kind">Échange avec un consultant</p>
                <h3 className="theme-card__title">Aucun ne vous correspond vraiment ?</h3>
                <ul className="theme-card__bullets">
                  <li><strong>Idéal si</strong> vous hésitez ou votre situation est particulière</li>
                  <li>Un consultant fait le point avec vous et vous oriente</li>
                </ul>
                <div className="theme-card__actions">
                  <Link to="/reserver/cep?from=cas-1" className="btn btn--primary">Échanger avec un consultant</Link>
                </div>
              </li>
            </ul>

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

/** Piste 3 : de l'humain. Ateliers mis en avant, photos à la place des pictogrammes. */
function Piste3({ services }: { services: Service[] }) {
  const workshops = services.filter((s) => s.kind === 'atelier')
  const others = services.filter((s) => s.kind !== 'atelier')
  return (
    <>
      {workshops.map((s) => (
        <article key={s.id} className="workshop">
          <PhotoVisual service={s} className="workshop__photo" />
          <div className="workshop__body">
            <p className="workshop__kicker">Atelier collectif</p>
            <p className="svc__official">{s.officialTitle}</p>
            <h3 className="workshop__title">{s.hook}</h3>
            <p>{s.benefit}</p>
            <ModalityChips items={s.modalities} />
            {s.action.kind === 'booking' && (
              <div className="workshop__sessions">
                <p className="workshop__sessions-title"><Calendar size={18} /> Prochaines sessions</p>
                <ul>
                  {WORKSHOP_SESSIONS.map((slot) => (
                    <li key={slot.id}><strong>{slot.date}</strong> · {slot.time} · {slot.place}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="svc__actions">
              <ServiceAction service={s} from="cas-1" />
              <Link to={`/service/${s.id}?from=cas-1`} className="link-arrow">
                En savoir plus<span className="visually-hidden"> : {s.officialTitle}</span> <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </article>
      ))}
      {others.length > 0 && (
        <div className={`svc-grid${others.length === 2 ? ' svc-grid--duo' : ''}`}>
          {others.map((s) => (
            <article key={s.id} className={`svc svc--${s.kind}`}>
              <PhotoVisual service={s} />
              <div className="svc__body">
                <p className="svc__official">{s.officialTitle}</p>
                <h3 className="svc__title">{s.hook}</h3>
                <p className="svc__benefit">{s.benefit}</p>
                <ModalityChips items={s.modalities} />
                <div className="svc__actions">
                  <ServiceAction service={s} from="cas-1" />
                  <Link to={`/service/${s.id}?from=cas-1`} className="link-arrow">
                    En savoir plus<span className="visually-hidden"> : {s.officialTitle}</span> <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}

function Case1Coulisses() {
  const tbc = SERVICES.filter((s) => s.titleProvenance === 'a-verifier')
  return (
    <>
      <h3 className="coulisses__case">Cas 02 — Clarifier l’offre pour faciliter le choix</h3>
      <CrBlock title="Comment lire cette démo">
        <p>
          La barre du haut bascule entre quatre variantes sur les mêmes services : <strong>Existant observé</strong>,
          <strong> Piste 1</strong>, <strong>Piste 2</strong> et <strong>Piste 3</strong>. C’est une simulation : aucun test A/B n’a été mené.
        </p>
        <p>
          La vue « existant » reprend la présentation actuelle des services sur apec.fr (rubrique « Entretiens de
          recrutement », novembre 2026). Le regroupement par situation n’existe pas aujourd’hui : c’est lui-même une
          piste.
        </p>
      </CrBlock>
      <CrBlock title="Les pistes : ce que chacune change">
        <div className="table-scroll">
          <table className="data-table">
            <caption className="visually-hidden">Comparaison des pistes</caption>
            <thead><tr><th scope="col">Élément</th><th scope="col">Existant observé</th><th scope="col">Piste 1 — valoriser</th><th scope="col">Piste 2 — aider à choisir</th><th scope="col">Piste 3 — montrer l’humain</th></tr></thead>
            <tbody>
              <tr><td>Entrée</td><td>Par thème</td><td>Par situation</td><td>Par situation</td><td>Par situation</td></tr>
              <tr><td>Carte</td><td>Pictogramme, intitulé, phrase</td><td>Visuel coloré, accroche bénéfice, intitulé conservé</td><td><strong>Carte thématique bleue</strong> (kit) : pictogramme bicolore, puces jaunes <strong>« Idéal si… »</strong>, format et durée</td><td><strong>Photo</strong> + étiquette du type d’aide</td></tr>
              <tr><td>Modalités</td><td>Sur la fiche</td><td>Pastilles sur la carte (vérifiées)</td><td>Puces sur la carte (vérifiées)</td><td>Sur la carte (vérifiées)</td></tr>
              <tr><td>Ateliers</td><td>Encadré texte, comme les autres</td><td>Visuel jaune + étiquette</td><td>Carte bleue, pictogramme « groupe »</td><td><strong>Carte vedette</strong> : grande photo, « Atelier collectif », prochaines sessions</td></tr>
              <tr><td>Actions</td><td>« En savoir plus » + action</td><td>Une action principale + lien</td><td>Une action principale + lien</td><td>Une action principale + lien</td></tr>
              <tr><td>Aide humaine</td><td>—</td><td>Lien à côté du titre</td><td>Carte bleu nuit dans la grille, comme une option</td><td>Lien à côté du titre</td></tr>
              <tr><td>Contenus conseils</td><td>Bloc séparé, plus bas</td><td>—</td><td><strong>« Nos conseils »</strong> reliés à la situation</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Repères visuels :</strong> chaque piste reprend un type de carte du mini-kit — carte service blanche
          (piste 1), carte thématique bleue inspirée des cartes « Nos consultantes et nos consultants » d’apec.fr
          (piste 2), carte éditoriale avec photo (piste 3).
        </p>
        <p>
          <strong>Ce que la piste 2 cherche à améliorer :</strong> la piste 1 montre mieux chaque service, mais laisse le
          visiteur comparer seul. La piste 2 formule le critère de choix (« Idéal si… »), présente les services comme des
          options comparables, traite l’aide humaine comme une option à part entière et relie le choix à des contenus
          utiles (maillage vers le cas 01). Hypothèse à tester : moins d’hésitation, pas forcément plus de clics.
        </p>
        <p>
          <strong>Ce que la piste 3 explore :</strong> les ateliers sont aujourd’hui présentés comme les autres services,
          dans un encadré texte. La piste 3 les rend plus repérables et plus attrayants : carte vedette, grande photo de
          groupe, étiquette « Atelier collectif » et prochaines sessions visibles sans clic. Les photographies, déjà
          présentes dans les contenus et réseaux sociaux de l’Apec, montrent la dimension humaine des accompagnements.
          Hypothèse à tester : davantage d’inscriptions aux ateliers, à surveiller avec la présence effective.
        </p>
      </CrBlock>
      <CrBlock title="Photographies de la piste 3">
        <p>
          Photos Unsplash, licence Unsplash (usage gratuit, sans autorisation requise). Elles
          illustrent des situations et ne représentent ni des salariés, ni des consultants, ni des usagers de l’Apec.
          Les dates de sessions affichées sont fictives. Détail des sources : page « Sources et limites ».
        </p>
      </CrBlock>
      <CroGrid
        rubrics={{
          constat: (
            <p>
              Sur apec.fr, les services sont présentés par thème, avec un intitulé, une phrase et deux
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
              <li>Visuels en aplats et étiquette carrée, reprenant le langage graphique d’apec.fr.</li>
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
      <CrBlock title={<>Points à confirmer avec les équipes <Badge tone="warn">Provisoire</Badge></>}>
        <p>
          Les formats, durées et conditions ne sont affichés que lorsqu’ils figurent sur apec.fr. Les intitulés
          suivants sont provisoires ; leurs fiches renvoient vers le site officiel. Les formulations « Idéal si… » sont
          des propositions rédactionnelles.
        </p>
        <ul className="inline-list">{tbc.map((s) => <li key={s.id}>{s.officialTitle}</li>)}</ul>
        <p>La présélection est soumise à des conditions (TPE/PME notamment), à préciser : elle n’est pas présentée comme ouverte à tous.</p>
      </CrBlock>
    </>
  )
}
