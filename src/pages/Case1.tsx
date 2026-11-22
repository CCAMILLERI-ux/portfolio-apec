import { Badge } from '../components/Badge'
import { CrBlock, CroGrid } from '../components/Coulisses'
import { ArrowRight, Calendar, Chat, Compass, Graduation, Handshake, Search, TrendUp } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ModalityChips } from '../components/Modalities'
import { ProtoLayout } from '../components/ProtoLayout'
import { ObservedServiceCard, PhotoVisual, ServiceAction, ServiceCard } from '../components/ServiceCard'
import { Picto } from '../components/Picto'
import { WORKSHOP_SESSIONS } from '../data/slots'
import { ADVICE_BY_SITUATION, IDEAL_IF } from '../data/piste2'
import { getService, SERVICES, type Service } from '../data/services'
import { ALL_DEMO_SERVICE_IDS, FORMAT_LABEL, groupBySituation, otherSituations, SITUATIONS } from '../data/situations'
import { Link, navigate, type Route } from '../lib/router'
import { nb } from '../lib/text'

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
    navigate(`/cas-02-ab-test?${q.toString()}`, { replace: true })
  }
  const resultLabel = isAll ? 'Tous nos services' : situation.label
  const groups = groupBySituation((id) => getService(id)!.kind)

  /** Rendu d'une liste de services dans la variante affichée. */
  const renderVariant = (
    list: Service[],
    level: 3 | 4,
    meta?: (s: Service) => React.ReactNode,
    primaryId?: string,
    withHelp = false,
  ) => {
    if (view === 'existant') {
      return (
        <div className="observed-band">
          <div className="observed-grid">
            {list.map((s) => <ObservedServiceCard key={s.id} service={s} from="cas-1" level={level} meta={meta?.(s)} />)}
          </div>
        </div>
      )
    }
    if (view === 'piste') {
      return (
        <div className="svc-grid">
          {list.map((s) => <ServiceCard key={s.id} service={s} from="cas-1" level={level} meta={meta?.(s)} />)}
        </div>
      )
    }
    if (view === 'piste3') return <Piste3 services={list} level={level} meta={meta} keepOrder={!!meta} />
    return (
      <ul className="dlist" aria-label="Services, avec la situation où chacun est le plus utile">
        {list.map((s) => <DecisionRow key={s.id} service={s} level={level} primaryId={primaryId} />)}
        {withHelp && <HelpRow level={level} />}
      </ul>
    )
  }

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
      }}
      barControl={variantSwitch}
      events={['service_view', 'service_cta_click', 'booking_start', 'booking_complete_demo']}
      onReset={() => navigate('/cas-02-ab-test', { replace: true })}
      coulisses={<Case1Coulisses />}
    >
      <div className="band band--tall">
        <div className="container">
          <p className="band__kicker">Nos services</p>
          <h1 className="band__title band__title--xl" tabIndex={-1}>Quelle est votre situation ?</h1>
          <p className="band__lead">Choisissez votre point de départ : nous vous montrons les services qui vous correspondent.</p>
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

        {isAll && (
          <nav className="grp-nav" aria-label="Aller à une situation">
            <ul>
              {groups.map((g) => {
                const Icon = SITUATION_ICON[g.situation.id]
                return (
                  <li key={g.situation.id}>
                    <a href={`#/cas-02-ab-test?${new URLSearchParams({ situation: ALL, vue: view })}#grp-${g.situation.id}`} className="grp-nav__link">
                      <Icon size={18} /> {g.situation.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}

        {isAll
          ? groups.map((g) => {
              const Icon = SITUATION_ICON[g.situation.id]
              const recruiter = g.situation.id === 'recruter-aide'
              const list = g.serviceIds.map(getService).filter(Boolean) as Service[]
              return (
                <section key={g.situation.id} className={`grp${recruiter ? ' grp--recruiter' : ''}`} aria-labelledby={`grp-${g.situation.id}`}>
                  {recruiter && <p className="grp__audience">Pour les recruteurs</p>}
                  <h3 id={`grp-${g.situation.id}`} className="grp__title" tabIndex={-1}>
                    <Icon size={28} className="grp__icon" /> {nb(g.situation.label)}
                  </h3>
                  {renderVariant(list, 4, (sv) => <GroupMeta service={sv} primaryId={g.situation.id} />, g.situation.id)}
                </section>
              )
            })
          : renderVariant(services, 3, undefined, undefined, view === 'piste2')}

        {view === 'piste2' && (
          <>
            {isAll && (
              <ul className="dlist dlist--help" aria-label="Aide d’un consultant">
                <HelpRow level={3} />
              </ul>
            )}

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
                        <span className="advice-card__excerpt">{nb(a.excerpt)}</span>
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

/** Autres situations d'un service, en minuscule initiale, sans mot seul en fin de ligne. */
function alsoLabel(serviceId: string, primaryId: string) {
  const others = otherSituations(serviceId, primaryId)
  if (others.length === 0) return null
  return others.map((o) => o.label.charAt(0).toLowerCase() + o.label.slice(1)).join(' ; ').replace(/ (\S+)$/, '\u00a0$1')
}

/**
 * Piste 2 — ligne de la liste de décision : pictogramme, accroche en titre, « Idéal si »,
 * format, puis le bouton d'action principal (seul élément cliquable de la ligne).
 */
function DecisionRow({ service, level, primaryId }: { service: Service; level: 3 | 4; primaryId?: string }) {
  const H = `h${level}` as 'h3' | 'h4'
  const also = primaryId ? alsoLabel(service.id, primaryId) : null
  return (
    <li className="drow">
      <span className="drow__icon"><Picto kind={service.kind} size={36} /></span>
      <div className="drow__main">
        <H className="drow__title">{nb(service.hook)}</H>
        {IDEAL_IF[service.id] && <p className="drow__ideal"><strong>Idéal si</strong> {nb(IDEAL_IF[service.id])}</p>}
        {also && <p className="drow__also">Aussi utile si{'\u00a0'}: {also}</p>}
      </div>
      <div className="drow__foot">
        <p className="drow__format"><span className="visually-hidden">Format{'\u00a0'}: </span>{FORMAT_LABEL[service.kind]}</p>
        <div className="drow__action">
          <ServiceAction service={service} from="cas-1" className="btn btn--primary btn--sm" />
        </div>
      </div>
    </li>
  )
}

/** Dernière ligne : l'aide d'un consultant, au même format, sur fond bleu nuit. */
function HelpRow({ level }: { level: 3 | 4 }) {
  const H = `h${level}` as 'h3' | 'h4'
  return (
    <li className="drow drow--help">
      <span className="drow__icon"><Picto kind="aide" size={36} /></span>
      <div className="drow__main">
        <H className="drow__title">Aucun ne vous correspond vraiment{'\u00a0'}?</H>
        <p className="drow__ideal"><strong>Idéal si</strong> vous hésitez ou votre situation est{'\u00a0'}particulière</p>
      </div>
      <div className="drow__foot">
        <p className="drow__format"><span className="visually-hidden">Format{'\u00a0'}: </span>Avec un consultant</p>
        <div className="drow__action">
          <Link to="/reserver/cep?from=cas-1" className="btn btn--primary btn--sm">Échanger avec un consultant</Link>
        </div>
      </div>
    </li>
  )
}

/** Étiquette de format et autres usages d'un service, dans la vue « Tous ». */
function GroupMeta({ service, primaryId }: { service: Service; primaryId: string }) {
  const also = alsoLabel(service.id, primaryId)
  return (
    <p className="grp-meta">
      <span className="grp-format">{FORMAT_LABEL[service.kind]}</span>
      {also && <span className="grp-also">Aussi utile si{'\u00a0'}: {also}</span>}
    </p>
  )
}

/** Piste 3 : de l'humain. Ateliers mis en avant, photos à la place des pictogrammes. */
function Piste3({ services, level = 3, meta, keepOrder = false }: { services: Service[]; level?: 3 | 4; meta?: (s: Service) => React.ReactNode; keepOrder?: boolean }) {
  const H = `h${level}` as 'h3' | 'h4'
  // Vue « Tous » : on garde l'ordre rendez-vous, atelier, outil ; sinon l'atelier passe en tête.
  const workshops = services.filter((s) => s.kind === 'atelier')
  const others = services.filter((s) => s.kind !== 'atelier')
  if (keepOrder) {
    return (
      <div className="svc-grid">
        {services.map((s) => (
          <article key={s.id} className={`svc svc--${s.kind}`}>
            <PhotoVisual service={s} />
            <div className="svc__body">
              <p className="svc__official">{nb(s.officialTitle)}</p>
              {meta?.(s)}
              <H className="svc__title">{nb(s.hook)}</H>
              <p className="svc__benefit">{nb(s.benefit)}</p>
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
    )
  }
  return (
    <>
      {workshops.map((s) => (
        <article key={s.id} className="workshop">
          <PhotoVisual service={s} className="workshop__photo" />
          <div className="workshop__body">
            <p className="workshop__kicker">Atelier collectif</p>
            <p className="svc__official">{nb(s.officialTitle)}</p>
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
                <p className="svc__official">{nb(s.officialTitle)}</p>
                <h3 className="svc__title">{s.hook}</h3>
                <p className="svc__benefit">{nb(s.benefit)}</p>
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
      <CrBlock title="Hypothèses des trois pistes">
        <ul>
          <li><strong>Piste 1 :</strong> des tuiles visuelles avec icônes facilitent le{'\u00a0'}repérage.</li>
          <li><strong>Piste 2 :</strong> une liste de décision (« Idéal si ») aide à choisir entre des services{'\u00a0'}proches.</li>
          <li><strong>Piste 3 :</strong> des photos rendent l’offre plus humaine et{'\u00a0'}rassurante.</li>
        </ul>
        <p>
          Chaque piste teste une seule hypothèse face à l’existant{'\u00a0'}; l’indicateur principal est le taux de clic
          vers un service, puis le taux d’inscription ou de rendez-vous{'\u00a0'}finalisé.
        </p>
      </CrBlock>
      <CrBlock title="Vue « Tous nos services »">
        <p>
          Variante testée : un classement par situation de l’utilisateur, avec le format en second niveau, plutôt qu’un
          classement par nature d’outil. Chaque service apparaît une seule fois, avec ses autres usages signalés.
          Indicateurs : clics vers un service depuis la vue Tous, puis inscriptions ou rendez-vous finalisés, comparés
          à la version{'\u00a0'}actuelle.
        </p>
      </CrBlock>
      <CrBlock title="Les pistes : ce que chacune change">
        <div className="table-scroll">
          <table className="data-table">
            <caption className="visually-hidden">Comparaison des pistes</caption>
            <thead><tr><th scope="col">Élément</th><th scope="col">Existant observé</th><th scope="col">Piste 1 — valoriser</th><th scope="col">Piste 2 — aider à choisir</th><th scope="col">Piste 3 — montrer l’humain</th></tr></thead>
            <tbody>
              <tr><td>Entrée</td><td>Par thème</td><td>Par situation</td><td>Par situation</td><td>Par situation</td></tr>
              <tr><td>Carte</td><td>Pictogramme, intitulé, phrase</td><td>Visuel coloré, accroche bénéfice, intitulé conservé</td><td><strong>Liste de décision</strong> : une ligne par service, pictogramme, accroche, <strong>« Idéal si… »</strong>, format</td><td><strong>Photo</strong> + étiquette du type d’aide</td></tr>
              <tr><td>Modalités</td><td>Sur la fiche</td><td>Pastilles sur la carte (vérifiées)</td><td>Sur la fiche</td><td>Sur la carte (vérifiées)</td></tr>
              <tr><td>Ateliers</td><td>Encadré texte, comme les autres</td><td>Visuel jaune + étiquette</td><td>Ligne de la liste, étiquette « Atelier »</td><td><strong>Carte vedette</strong> : grande photo, « Atelier collectif », prochaines sessions</td></tr>
              <tr><td>Actions</td><td>« En savoir plus » + action</td><td>Une action principale + lien</td><td>Un seul bouton par ligne</td><td>Une action principale + lien</td></tr>
              <tr><td>Aide humaine</td><td>—</td><td>Lien à côté du titre</td><td>Dernière ligne de la liste, fond bleu nuit</td><td>Lien à côté du titre</td></tr>
              <tr><td>Contenus conseils</td><td>Bloc séparé, plus bas</td><td>—</td><td><strong>« Nos conseils »</strong> reliés à la situation</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Repères visuels :</strong> chaque piste reprend un composant du mini-kit — carte service blanche
          (piste 1), liste de décision compacte avec pictogrammes bicolores (piste 2), carte éditoriale avec
          photo (piste 3).
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
          Les dates de sessions affichées sont fictives. Détail des sources : page « Design system ».
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
      <CrBlock title="Personas de travail">
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
