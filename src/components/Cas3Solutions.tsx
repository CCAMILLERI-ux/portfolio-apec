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

/** Version compacte, pour la colonne latérale. */
export function SolutionsCompact() {
  return (
    <section className="sol-side" aria-labelledby="sol-side-title">
      <p id="sol-side-title" className="sol-side__title">{CAS3_SOLUTIONS_TITLE}</p>
      <p className="sol-side__intro">{CAS3_SOLUTIONS_INTRO}</p>
      {[
        ['Avec un consultant', humans],
        ['En autonomie', tools],
      ].map(([label, list]) => (
        <div key={label as string} className="sol-side__group">
          <p className="sol-side__label">{label as string}</p>
          <ul className="sol-side__list">
            {(list as Solution[]).map((s) => (
              <li key={s.id} className="sol-item">
                <Visual s={s} size="sm" />
                <div className="sol-item__body">
                  <p className="sol-item__title">{s.title}</p>
                  {s.focus && <p className="sol-focus">{s.focus}</p>}
                  <p className="sol-item__text">{s.description}</p>
                  <Link
                    to={solutionHref(s)}
                    className="link-arrow sol-item__link"
                    onClick={() => track('service_cta_click', `${s.serviceId} (cas 3, colonne)`)}
                  >
                    {s.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
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
