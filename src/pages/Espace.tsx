import { Case2Coulisses, CASE2_EVENTS } from '../components/Case2Coulisses'
import { ArrowRight, Calendar, Compass, Doc, Search } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { ProtoLayout } from '../components/ProtoLayout'
import { getService } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding } from '../lib/demoState'
import { Link, navigate } from '../lib/router'

/** Accueil de « Mon espace » (profil fictif Alex). */
export function Espace({ path }: { path: string }) {
  const [state, setState] = useOnboarding()
  const [bookings] = useBookings()
  const kept = state.program
  const booked = Object.entries(bookings)
  const guided = state.recs.length > 0

  return (
    <ProtoLayout
      path={path}
      caseLabel="Cas 03 · Mon espace"
      events={CASE2_EVENTS}
      onReset={() => setState(INITIAL_ONBOARDING)}
      coulisses={<Case2Coulisses />}
    >
      <div className="band">
        <div className="container">
          <p className="band__kicker">Mon espace</p>
          <h1 className="band__title band__title--xl" tabIndex={-1}>Bonjour Alex</h1>
        </div>
      </div>
      <div className="container overlap">
        <div className="space-grid">
          <section className="space-card space-card--hero" aria-labelledby="sp-guide">
            <div className="space-card__visual">
              <Illustration name="boussole" tone="yellow" className="space-card__img" />
            </div>
            <div className="space-card__body">
              <h2 id="sp-guide" className="space-card__title">{guided ? 'Votre accueil guidé' : 'Bien démarrer'}</h2>
              <p>
                {guided
                  ? 'Vos réponses sont enregistrées. Vous pouvez revoir nos suggestions ou modifier vos besoins.'
                  : 'Trois questions pour savoir par où commencer : ateliers, rendez-vous ou outils en ligne.'}
              </p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setState((s) => ({ ...s, step: guided ? 'results' : 'welcome' }))
                  navigate('/cas-03-inscription')
                }}
              >
                {guided ? 'Revoir mes suggestions' : 'Me guider'} <ArrowRight size={18} />
              </button>
            </div>
          </section>

          <section className="space-card space-card--blue" aria-labelledby="sp-steps">
            <Compass size={36} className="space-card__icon" />
            <h2 id="sp-steps" className="space-card__title">Mes prochaines étapes</h2>
            <p>
              {kept.length
                ? `${kept.length} service${kept.length > 1 ? 's' : ''} dans mon\u00a0programme.`
                : 'Aucun service dans mon programme pour\u00a0l’instant.'}
            </p>
            <Link to="/cas-03-inscription/prochaines-etapes" className="link-arrow link-arrow--light">
              Voir mes prochaines étapes <ArrowRight size={18} />
            </Link>
          </section>

          <section className="space-card" aria-labelledby="sp-services">
            <Search size={36} className="space-card__icon space-card__icon--dark" />
            <h2 id="sp-services" className="space-card__title space-card__title--dark">Nos services</h2>
            <p>Ateliers, accompagnements et outils selon votre{'\u00a0'}situation.</p>
            <Link to="/cas-02-ab-test" className="link-arrow">Explorer nos services <ArrowRight size={18} /></Link>
          </section>

          <section className="space-card space-card--navy" aria-labelledby="sp-rdv">
            <Calendar size={36} className="space-card__icon" />
            <h2 id="sp-rdv" className="space-card__title">Mes rendez-vous</h2>
            {booked.length ? (
              <ul className="space-list">
                {booked.map(([id, slot]) => (
                  <li key={id}>
                    <strong>{getService(id)?.officialTitle}</strong>
                    <br />{slot.date} à {slot.time}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun rendez-vous à venir.</p>
            )}
            <Link to="/reserver/rendez-vous-conseil?from=espace" className="link-arrow link-arrow--light">
              Prendre rendez-vous avec un consultant <ArrowRight size={18} />
            </Link>
          </section>

          <section className="space-card" aria-labelledby="sp-conseils">
            <Doc size={36} className="space-card__icon space-card__icon--dark" />
            <h2 id="sp-conseils" className="space-card__title space-card__title--dark">Conseils</h2>
            <p>Préparer un entretien de recrutement en 5 étapes.</p>
            <Link to="/cas-01-seo" className="link-arrow">Lire le conseil <ArrowRight size={18} /></Link>
          </section>
        </div>
      </div>
    </ProtoLayout>
  )
}
