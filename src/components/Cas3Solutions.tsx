import { CAS3_SOLUTIONS, CAS3_SOLUTIONS_INTRO, CAS3_SOLUTIONS_TITLE, solutionHref, type Solution } from '../data/cas3'
import { Link } from '../lib/router'
import { track } from '../lib/storage'
import { ArrowRight, Calculator, Chat, Questions } from './Icons'

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
      <ul className="sol-side__list">
        {humans.map((s) => (
          <li key={s.id} className="sol-side-card sol-side-card--human">
            <Visual s={s} size="sm" />
            <div className="sol-side-card__body">
              <p className="sol-side-card__title">{s.title}</p>
              <p className="sol-side-card__text">{s.description}</p>
              <Link
                to={solutionHref(s)}
                className="link-arrow link-arrow--light sol-side-card__link"
                onClick={() => track('service_cta_click', `${s.serviceId} (cas 3, colonne)`)}
              >
                {s.cta} <ArrowRight size={18} />
              </Link>
            </div>
          </li>
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
          <li key={s.id} className="sol-card sol-card--human">
            <Visual s={s} size="lg" />
            <div className="sol-card__body">
              <h4 className="sol-card__title">{s.title}</h4>
              <p className="sol-card__official">{s.official}</p>
              <p>{s.description}</p>
              <Link
                to={solutionHref(s)}
                className="btn btn--primary btn--sm"
                onClick={() => track('service_cta_click', `${s.serviceId} (cas 3, bas d’article)`)}
              >
                {s.cta}
              </Link>
            </div>
          </li>
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
