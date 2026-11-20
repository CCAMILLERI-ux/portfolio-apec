import { CAS3_SOLUTIONS, CAS3_SOLUTIONS_INTRO, CAS3_SOLUTIONS_TITLE, solutionHref, type Solution } from '../data/cas3'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { getService } from '../data/services'
import { WORKSHOP_SESSIONS } from '../data/slots'
import { ArrowRight, Calculator, Calendar, Chat, Plus, Questions } from './Icons'
import { ModalityChips } from './Modalities'
import { PhotoVisual } from './ServiceCard'

const ICONS = { chat: Chat, questions: Questions, calculator: Calculator }

function Visual({ s, size }: { s: Solution; size: 'sm' | 'lg' }) {
  if (s.photo) {
    return (
      <img
        src={s.photo.file}
        alt={s.photo.alt}
        loading="lazy"
        decoding="async"
        width={960}
        height={600}
        className={`sol-photo sol-photo--${size}`}
      />
    )
  }
  const Icon = ICONS[s.icon ?? 'chat']
  return (
    <span className={`sol-icon sol-icon--${size}`} aria-hidden="true">
      <Icon size={size === 'sm' ? 26 : 34} />
    </span>
  )
}

/**
 * Carte d'accompagnement humain, en deux designs :
 * - « atelier » : ancien design de la carte atelier (photo, étiquette Atelier, bandeau jaune) ;
 * - « entretien » : langage de la fiche « Entretien programmé » observée (accroche, puces « + »,
 *   boutons « En savoir plus » / « Prenez rendez-vous »).
 */
function HumanCard({ s, detailed, headingLevel }: { s: Solution; detailed: boolean; headingLevel: 'h3' | 'h4' | 'p' }) {
  const service = getService(s.serviceId)!
  const Title = headingLevel
  const click = (where: string) => () => track('service_cta_click', `${s.serviceId} (cas 3, ${where})`)
  return (
    <div className={`hcard hcard--${s.design}${detailed ? ' hcard--lg' : ''}`}>
      <PhotoVisual service={service} className="hcard__photo" />
      <div className="hcard__body">
        <p className="hcard__kicker">{s.title}</p>
        <Title className="hcard__title">{s.official}</Title>
        <p className="hcard__text">{s.description}</p>
        {s.design === 'entretien' && <ModalityChips items={service.modalities} />}
        {detailed && s.points && (
          <ul className="plus-list hcard__points">
            {s.points.map(([b, t]) => (
              <li key={b}><Plus size={18} className="plus" /> <span><strong>{b} :</strong> {t}</span></li>
            ))}
          </ul>
        )}
        {detailed && s.design === 'atelier' && (
          <div className="workshop__sessions hcard__sessions">
            <p className="workshop__sessions-title"><Calendar size={18} /> Prochaines sessions</p>
            <ul>
              {WORKSHOP_SESSIONS.map((slot) => (
                <li key={slot.id}><strong>{slot.date}</strong> · {slot.time} · {slot.place}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="hcard__actions">
          {s.design === 'entretien' && s.secondary && (
            <Link to={s.secondary.href} className="btn btn--outline hcard__more" onClick={click('en savoir plus')}>
              {s.secondary.label}<span className="visually-hidden"> : {s.official}</span>
            </Link>
          )}
          {s.primary && (
            <Link to={s.primary.href} className="btn btn--primary" onClick={click('action principale')}>
              {s.primary.label}<span className="visually-hidden"> : {s.official}</span>
            </Link>
          )}
          {s.design === 'atelier' && s.secondary && (
            <Link to={s.secondary.href} className="link-arrow" onClick={click('en savoir plus')}>
              {s.secondary.label}<span className="visually-hidden"> : {s.official}</span> <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const humans = CAS3_SOLUTIONS.filter((s) => s.group === 'humain')
const tools = CAS3_SOLUTIONS.filter((s) => s.group === 'outil')

/**
 * Version compacte, pour la colonne latérale, d'après les codes observés sur les articles apec.fr :
 * cartouches blancs « Nos services » / « Nos outils », carte bleue de service, carte bleu nuit d'outil
 * avec pictogramme filaire jaune. Photos pour l'humain, icônes pour les outils.
 */
export function SolutionsCompact() {
  return (
    <section className="sol-side" aria-labelledby="sol-side-title">
      <div className="sol-side__head">
        <p id="sol-side-title" className="sol-side__title">{CAS3_SOLUTIONS_TITLE}</p>
        <p className="sol-side__intro">{CAS3_SOLUTIONS_INTRO}</p>
      </div>

      <h3 className="sidebar__heading sol-side__box">Nos services</h3>
      <ul className="sol-side__list sol-side__list--humans">
        {humans.map((s) => (
          <li key={s.id}><HumanCard s={s} detailed={false} headingLevel="p" /></li>
        ))}
      </ul>

      <h3 className="sidebar__heading sol-side__box">Nos outils</h3>
      <ul className="sol-side__list">
        {tools.map((s) => {
          const Icon = ICONS[s.icon ?? 'chat']
          return (
            <li key={s.id} className="sol-side-card sol-side-card--tool">
              <Icon size={32} className="sol-side-card__icon" />
              <p className="sol-side-card__title">{s.title}</p>
              {s.focus && <p className="sol-focus">{s.focus}</p>}
              <p className="sol-side-card__text">{s.description}</p>
              <Link
                to={solutionHref(s)}
                className="link-arrow link-arrow--light sol-side-card__link"
                onClick={() => track('service_cta_click', `${s.serviceId} (cas 3, colonne)`)}
              >
                {s.cta} <ArrowRight size={18} />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/** Version détaillée, en bas de l'article. */
export function SolutionsCards() {
  return (
    <section aria-labelledby="accompagnement" className="sol-block">
      <h2 id="accompagnement" tabIndex={-1}>{CAS3_SOLUTIONS_TITLE}</h2>
      <p className="sol-block__intro">{CAS3_SOLUTIONS_INTRO}</p>

      <h3 className="sol-block__label">Avec un consultant</h3>
      <ul className="sol-grid sol-grid--humans">
        {humans.map((s) => (
          <li key={s.id}><HumanCard s={s} detailed headingLevel="h4" /></li>
        ))}
      </ul>

      <h3 className="sol-block__label">En autonomie</h3>
      <ul className="sol-grid sol-grid--tools">
        {tools.map((s) => (
          <li key={s.id} className="sol-card sol-card--tool">
            <Visual s={s} size="lg" />
            <h4 className="sol-card__title">{s.title}</h4>
            {s.focus && <p className="sol-focus">{s.focus}</p>}
            <p>{s.description}</p>
            <Link
              to={solutionHref(s)}
              className="btn btn--outline btn--sm"
              onClick={() => track('service_cta_click', `${s.serviceId} (cas 3, bas d’article)`)}
            >
              {s.cta}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
