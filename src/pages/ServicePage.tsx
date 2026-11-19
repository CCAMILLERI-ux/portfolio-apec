import { useEffect } from 'react'
import { Badge } from '../components/Badge'
import { ArrowRight, External, Info, Plus } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { Modalities } from '../components/Modalities'
import { PageBand } from '../components/PageBand'
import { ServiceAction } from '../components/ServiceCard'
import { getService, KIND_LABEL, OFFICIAL_SERVICES_URL } from '../data/services'
import { backFor, safeFrom } from '../lib/nav'
import { Link, type Route } from '../lib/router'
import { track } from '../lib/storage'
import { NotFound } from './NotFound'

/** Liens contextuels de la colonne latérale — différents selon le service. */
const RELATED: Record<string, { to: string; anchor?: string; label: string; text: string }[]> = {
  'atelier-entretiens': [
    { to: '/cas-3', anchor: 'etapes', label: 'Lire nos conseils pour préparer votre séance', text: 'Arriver à l’atelier avec vos exemples déjà repérés.' },
  ],
  'entretien-programme': [
    { to: '/service/simulateur-entretien?from=cas-3', label: 'S’entraîner seul avant le rendez-vous', text: 'Le simulateur d’entretien, en autonomie.' },
    { to: '/cas-3', anchor: 'checklist', label: 'Checklist de la veille de l’entretien', text: 'Les points à vérifier avant le jour J.' },
  ],
  'simulateur-entretien': [
    { to: '/service/entretien-programme?from=cas-3', label: 'Un entretien fixé ? Répétez-le avec un consultant', text: 'Simulation individuelle d’1 h.' },
  ],
  candidature: [
    { to: '/cas-3', anchor: 'etapes', label: 'Préparer ensuite l’entretien en 5 étapes', text: 'Conseil complet, utile avant même d’être convoqué.' },
  ],
}

export function ServicePage({ id, route }: { id: string; route: Route }) {
  const service = getService(id)
  const from = safeFrom(route.query.get('from'))
  const back = backFor(from)

  useEffect(() => {
    if (service) track('service_view', service.id)
  }, [service])

  if (!service) return <NotFound />
  const related = RELATED[service.id] ?? []

  return (
    <>
      <PageBand back={back} kicker={KIND_LABEL[service.kind]} title={service.officialTitle} titleIsHeading={false} />
      <div className="container overlap">
        <div className="article-layout">
          <article className="sheet" aria-labelledby="titre-service">
            <div className="service-head">
              <h1 id="titre-service" tabIndex={-1}>{service.officialTitle}</h1>
              <div className="service-card__badges">
                <Badge tone="kind">{KIND_LABEL[service.kind]}</Badge>
                {service.titleProvenance === 'a-verifier' ? (
                  <Badge tone="warn">Intitulé et modalités à vérifier</Badge>
                ) : (
                  <Badge tone="ok">Intitulé observé sur apec.fr</Badge>
                )}
              </div>
            </div>
            <Modalities items={service.modalities} />
            {service.observedSummary && <p className="small">{service.observedSummary}</p>}
            <p className="service-hook"><strong>{service.hook}.</strong> {service.benefit}</p>

            {service.details && (
              <ul className="plus-list">
                {service.details.points.map((p) => (
                  <li key={p}><Plus size={18} className="plus" /> {p}</li>
                ))}
              </ul>
            )}

            <div className="service-actions">
              <ServiceAction service={service} from={from} />
            </div>

            {service.scopeNote && (
              <p className="observed-note">
                <Info size={20} /> <span>{service.scopeNote}</span>
              </p>
            )}

            {service.details && (
              <>
                <h2>À qui s’adresse ce service ?</h2>
                <p>{service.details.forWhom}</p>
                {service.details.prepare && (
                  <>
                    <h2>Comment s’y préparer ?</h2>
                    <p>{service.details.prepare}</p>
                  </>
                )}
              </>
            )}

            {service.depth === 'synthese' && service.action.kind !== 'external' && (
              <p>
                <a href={OFFICIAL_SERVICES_URL} target="_blank" rel="noopener noreferrer">
                  Voir l’offre officielle sur apec.fr <External size={16} />
                  <span className="visually-hidden"> (site externe, nouvel onglet)</span>
                </a>
              </p>
            )}
            <p className="muted small">
              Texte de la fiche : rédaction du prototype. Les phrases citées des captures sont reprises
              uniquement pour l’intitulé et la description courte.
            </p>
          </article>

          <aside className="sidebar" aria-label="Pour aller plus loin">
            <Illustration name={service.illustration} className="side-visual" />
            {related.map((r) => (
              <div key={r.label} className="side-card side-card--navy">
                <h2 className="side-card__title">{r.label}</h2>
                <p>{r.text}</p>
                <Link to={r.to} anchor={r.anchor} className="link-arrow link-arrow--light">
                  Y aller<span className="visually-hidden"> : {r.label}</span> <ArrowRight size={18} />
                </Link>
              </div>
            ))}
            <div className="side-card">
              <h2 className="side-card__title side-card__title--dark">Pas sûr que ce soit le bon service ?</h2>
              <Link to="/cas-1" className="link-arrow">
                Comparer les services par situation <ArrowRight size={18} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
