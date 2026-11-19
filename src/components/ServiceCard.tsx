import { KIND_LABEL, type Service } from '../data/services'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { Badge } from './Badge'
import { ArrowRight, External } from './Icons'
import { Illustration } from './Illustration'
import { Modalities } from './Modalities'

/** Destination de l'action contextualisée d'une carte. */
export function serviceActionTarget(s: Service, from: string) {
  return s.action.kind === 'booking'
    ? `/reserver/${s.id}?from=${from}`
    : `/service/${s.id}?from=${from}`
}

export function ServiceAction({ service, from, className = 'btn btn--primary' }: { service: Service; from: string; className?: string }) {
  if (service.action.kind === 'external') {
    return (
      <a
        className={className}
        href={service.action.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('service_cta_click', `${service.id} (externe)`)}
      >
        {service.action.label}
        <External size={18} />
        <span className="visually-hidden"> (site externe apec.fr, nouvel onglet)</span>
      </a>
    )
  }
  return (
    <Link
      className={className}
      to={serviceActionTarget(service, from)}
      onClick={() => track('service_cta_click', service.id)}
    >
      {service.action.label}
      <span className="visually-hidden"> — {service.officialTitle} (simulation)</span>
    </Link>
  )
}

/** Carte « piste exploratoire » : bénéfice, intitulé existant, repère, modalités, une action. */
export function ServiceCard({ service, from, headingLevel = 3 }: { service: Service; from: string; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <article className="service-card">
      <Illustration name={service.illustration} className="service-card__visual" />
      <div className="service-card__body">
        <div className="service-card__badges">
          <Badge tone="kind">{KIND_LABEL[service.kind]}</Badge>
          {service.titleProvenance === 'a-verifier' && <Badge tone="warn">Intitulé à vérifier</Badge>}
        </div>
        <H className="service-card__hook">{service.hook}</H>
        <p className="service-card__benefit">{service.benefit}</p>
        <p className="service-card__official">
          <span className="service-card__official-label">Service existant :</span>{' '}
          {service.officialTitle}
        </p>
        <Modalities items={service.modalities} compact />
        <div className="service-card__actions">
          <ServiceAction service={service} from={from} />
          <Link to={`/service/${service.id}?from=${from}`} className="link-arrow">
            Lire la fiche<span className="visually-hidden"> {service.officialTitle}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  )
}

/**
 * Carte « existant observé » : reconstruction du motif vu sur les captures
 * (pictogramme, intitulé, description courte, « En savoir plus » + action).
 * Aucun défaut n'est ajouté ; les éléments absents des captures ne sont pas inventés.
 */
export function ObservedServiceCard({ service, from }: { service: Service; from: string }) {
  return (
    <article className="observed-card">
      <svg className="observed-card__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M30 8a16 16 0 1 0 10 28" fill="none" stroke="var(--brand-navy)" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 14a10 10 0 1 1 10 18" fill="none" stroke="var(--brand-yellow)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <h3 className="observed-card__title">{service.officialTitle}</h3>
      <p className="observed-card__text">
        {service.observedSummary ?? (
          <em>Description courte non disponible sur les captures — non reproduite.</em>
        )}
      </p>
      <div className="observed-card__actions">
        <Link to={`/service/${service.id}?from=${from}`} className="btn btn--outline btn--sm">
          En savoir plus<span className="visually-hidden"> : {service.officialTitle}</span>
        </Link>
        {service.observedCta ? (
          <Link
            to={serviceActionTarget(service, from)}
            className="btn btn--primary btn--sm"
            onClick={() => track('service_cta_click', `${service.id} (vue existante)`)}
          >
            {service.observedCta}<span className="visually-hidden"> : {service.officialTitle} (simulation)</span>
          </Link>
        ) : (
          <ServiceAction service={service} from={from} className="btn btn--primary btn--sm" />
        )}
      </div>
    </article>
  )
}
