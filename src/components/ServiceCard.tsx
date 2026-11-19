import type { ReactNode } from 'react'
import { KIND_LABEL, type Service, type ServiceKind } from '../data/services'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { ArrowRight, Chat, External, Group, Laptop } from './Icons'
import { Illustration, type Tone } from './Illustration'
import { ModalityChips } from './Modalities'

export const KIND_TONE: Record<ServiceKind, Tone> = { atelier: 'yellow', individuel: 'blue', outil: 'navy' }
export const KIND_SHORT: Record<ServiceKind, string> = { atelier: 'Atelier', individuel: 'Rendez-vous', outil: 'Outil' }
const KIND_ICON = { atelier: Group, individuel: Chat, outil: Laptop }

/** Étiquette carrée, d'après le motif « Repères » observé sur les visuels. */
export function KindTag({ kind }: { kind: ServiceKind }) {
  const Icon = KIND_ICON[kind]
  return (
    <span className="kind-tag">
      <Icon size={26} className="kind-tag__icon" />
      <span className="kind-tag__label">{KIND_SHORT[kind]}</span>
      <span className="visually-hidden"> — {KIND_LABEL[kind]}</span>
    </span>
  )
}

export function ServiceVisual({ service, children }: { service: Service; children?: ReactNode }) {
  return (
    <div className="svc-visual">
      <Illustration name={service.illustration} tone={KIND_TONE[service.kind]} className="svc-visual__img" />
      <KindTag kind={service.kind} />
      {children}
    </div>
  )
}

export function serviceActionTarget(s: Service, from: string) {
  return s.action.kind === 'booking' ? `/reserver/${s.id}?from=${from}` : `/service/${s.id}?from=${from}`
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
        <span className="visually-hidden"> (nouvel onglet)</span>
      </a>
    )
  }
  return (
    <Link className={className} to={serviceActionTarget(service, from)} onClick={() => track('service_cta_click', service.id)}>
      {service.action.label}
      <span className="visually-hidden"> — {service.officialTitle}</span>
    </Link>
  )
}

/** Carte « piste exploratoire ». */
export function ServiceCard({ service, from }: { service: Service; from: string }) {
  return (
    <article className={`svc svc--${service.kind}`}>
      <ServiceVisual service={service} />
      <div className="svc__body">
        <p className="svc__official">{service.officialTitle}</p>
        <h3 className="svc__title">{service.hook}</h3>
        <p className="svc__benefit">{service.benefit}</p>
        <ModalityChips items={service.modalities} />
        <div className="svc__actions">
          <ServiceAction service={service} from={from} />
          <Link to={`/service/${service.id}?from=${from}`} className="link-arrow">
            En savoir plus<span className="visually-hidden"> : {service.officialTitle}</span>
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
 */
export function ObservedServiceCard({ service, from }: { service: Service; from: string }) {
  return (
    <article className="observed-card">
      <svg className="observed-card__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M30 8a16 16 0 1 0 10 28" fill="none" stroke="var(--brand-navy)" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 14a10 10 0 1 1 10 18" fill="none" stroke="var(--brand-yellow)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <h3 className="observed-card__title">{service.officialTitle}</h3>
      {service.observedSummary && <p className="observed-card__text">{service.observedSummary}</p>}
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
            {service.observedCta}<span className="visually-hidden"> : {service.officialTitle}</span>
          </Link>
        ) : (
          <ServiceAction service={service} from={from} className="btn btn--primary btn--sm" />
        )}
      </div>
    </article>
  )
}
