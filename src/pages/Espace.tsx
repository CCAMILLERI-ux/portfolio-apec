import { useState, type ReactNode } from 'react'
import { Case2Coulisses, CASE2_EVENTS } from '../components/Case2Coulisses'
import { ArrowRight, Doc, DuoArrowCircle, DuoLaptop, DuoSearch, DuoSpiral, DuoTarget, DuoUser, Eye, Lightbulb, Pencil, Pin, Plus } from '../components/Icons'
import { Illustration } from '../components/Illustration'
import { toBook } from '../components/ProgramAction'
import { ProtoLayout } from '../components/ProtoLayout'
import { getService } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding } from '../lib/demoState'
import { Link, navigate } from '../lib/router'

/**
 * « Mon espace » candidat : reproduction de la structure de l'espace candidat d'apec.fr
 * (compte récent d'Alex, persona du cas 03). Seul ajout : l'encart mis en avant en tête de la carte
 * « Ma relation avec l'Apec », porte d'entrée vers le parcours guidé puis vers le programme.
 */

/** Encart mis en avant : illustration, étiquette « Nouveau », accroche, action. */
function GuideFeature({ title, text, cta, to, onClick }: { title: ReactNode; text: ReactNode; cta: string; to?: string; onClick?: () => void }) {
  const body = (
    <>
      <Illustration name="boussole" tone="yellow" className="esp-feature__img" />
      <span className="esp-feature__main">
        <span className="esp-badge">Nouveau</span>
        <span className="esp-feature__title">{title}</span>
        <span className="esp-feature__text">{text}</span>
        <span className="esp-feature__cta">{cta} <ArrowRight size={18} /></span>
      </span>
    </>
  )
  if (to) return <li><Link to={to} className="esp-feature">{body}</Link></li>
  return <li><button type="button" className="esp-feature" onClick={onClick}>{body}</button></li>
}

/** Ligne de carte : titre en gras, texte, flèche. Sans destination dans le prototype : affichée, non cliquable. */
function Row({ title, count, text, to, onClick, badge }: { title: ReactNode; count?: number; text?: ReactNode; to?: string; onClick?: () => void; badge?: string }) {
  const body = (
    <>
      <span className="esp-row__main">
        <span className="esp-row__title">
          <span>{title}{count !== undefined && <span className="esp-row__count">{' '}({count})</span>}</span>
          {badge && <span className="esp-badge">{badge}</span>}
        </span>
        {text && <span className="esp-row__text">{text}</span>}
      </span>
      <ArrowRight size={22} className="esp-row__arrow" />
    </>
  )
  if (to) return <li><Link to={to} className="esp-row">{body}</Link></li>
  if (onClick) return <li><button type="button" className="esp-row" onClick={onClick}>{body}</button></li>
  return <li><span className="esp-row esp-row--static">{body}</span></li>
}

/** Icône « + » blanche dans un rond navy, devant les liens de création. */
const PlusDot = () => <span className="esp-dot" aria-hidden="true"><Plus size={14} /></span>

const OFFERS = [
  { title: 'Responsable grands comptes F/H', match: '64 %', city: 'Lyon (69)' },
  { title: 'Key Account Manager F/H', match: '61 %', city: 'Nanterre (92)' },
  { title: 'Directeur commercial régional F/H', match: '59 %', city: 'Bordeaux (33)' },
]

export function Espace({ path }: { path: string }) {
  const [state, setState] = useOnboarding()
  const [bookings] = useBookings()
  const [partners, setPartners] = useState(false)
  const program = state.program
  const booked = program.filter((id) => bookings[id]).length
  const remaining = toBook(program, bookings, getService).length

  return (
    <ProtoLayout
      path={path}
      caseLabel="Cas 03 · Mon espace"
      events={CASE2_EVENTS}
      onReset={() => setState(INITIAL_ONBOARDING)}
      coulisses={<Case2Coulisses />}
    >
      <div className="band esp-band">
        <div className="container">
          <div className="esp-band__head">
            <DuoUser size={64} className="esp-band__icon" />
            <p className="esp-band__kicker"><span>Mon espace</span> <strong>candidat</strong></p>
          </div>
          <h1 className="esp-band__title" tabIndex={-1}>Bonjour Alex <span className="esp-band__name">DURAND</span></h1>
        </div>
      </div>

      <div className="container overlap esp">
        <div className="esp-duo">
          <section className="esp-card" aria-labelledby="esp-relation">
            <h2 id="esp-relation" className="esp-card__title"><DuoArrowCircle size={32} className="esp-card__icon" /> Ma relation avec l’Apec</h2>
            <ul className="esp-rows">
              {program.length === 0 ? (
                <GuideFeature
                  title={<>Vous ne savez pas quels services l’Apec peut vous{'\u00a0'}proposer{'\u00a0'}?</>}
                  text={<>Laissez-vous guider en quelques étapes{'\u00a0'}: ateliers, rendez-vous ou outils, selon votre{'\u00a0'}situation.</>}
                  cta="Me laisser guider"
                  onClick={() => {
                    setState((s) => ({ ...s, step: 'welcome' }))
                    navigate('/cas-03-inscription')
                  }}
                />
              ) : (
                <GuideFeature
                  title={`Votre programme sur mesure (${program.length}\u00a0service${program.length > 1 ? 's' : ''})`}
                  text={`${booked} réservé${booked > 1 ? 's' : ''}, ${remaining} à faire. Retrouvez vos prochaines étapes et ajustez vos choix à tout\u00a0moment.`}
                  cta="Voir mes prochaines étapes"
                  to="/cas-03-inscription/prochaines-etapes"
                />
              )}
              <Row
                title={<>Vous n’avez pas de rendez-vous à venir{' '}?</>}
                text="Nos consultants vous accompagnent gratuitement pour faire avancer votre projet professionnel."
                onClick={() => window.dispatchEvent(new Event('open-rdv-panel'))}
              />
              <Row title="Mon accompagnement" />
            </ul>
          </section>

          <section className="esp-card" aria-labelledby="esp-offres">
            <h2 id="esp-offres" className="esp-card__title"><DuoTarget size={32} className="esp-card__icon" /> Mes offres</h2>
            <ul className="esp-rows">
              <Row title="Mes offres sauvegardées" count={5} />
              <Row title="Mes candidatures" count={1} />
              <Row title="Rechercher une offre" />
            </ul>
          </section>
        </div>

        <section className="esp-card esp-profile" aria-labelledby="esp-profil">
          <h2 id="esp-profil" className="visually-hidden">Mon profil</h2>
          <div className="esp-profile__side">
            <span className="esp-avatar" aria-hidden="true">A</span>
            <p className="esp-profile__views"><strong>3</strong> <span>consultations de votre profil</span></p>
          </div>
          <div className="esp-profile__main">
            <div className="esp-profile__head">
              <p className="esp-profile__name">ALEX DURAND</p>
              <span className="btn btn--primary esp-static">Voir mon profil</span>
            </div>
            <p className="esp-profile__job">Responsable commercial grands comptes</p>
            <ul className="esp-pills" aria-label="État du profil">
              <li className="esp-pill esp-pill--sky"><span className="esp-pill__dot" aria-hidden="true" /> Profil complété à 60 %</li>
              <li className="esp-pill esp-pill--sky"><Eye size={16} /> Profil visible des recruteurs</li>
              <li className="esp-pill">En recherche active</li>
            </ul>
            <p className="esp-profile__hint">Débloquez des opportunités professionnelles</p>
            <span className="esp-link esp-link--static"><span className="esp-dot" aria-hidden="true"><Pencil size={14} /></span> Modifier les informations personnelles de mon compte</span>
          </div>
        </section>

        <section className="esp-matching" aria-labelledby="esp-matching">
          <h2 id="esp-matching" className="esp-card__title"><DuoSpiral size={32} className="esp-card__icon" /> Matching</h2>
          <p className="esp-card__lead">Les offres d’emploi les plus pertinentes pour votre Profil.</p>
          <label className="esp-check">
            <input type="checkbox" checked={partners} onChange={(e) => setPartners(e.target.checked)} />
            Inclure les offres de nos partenaires
          </label>
          <ul className="esp-offers">
            {OFFERS.map((o) => (
              <li key={o.title} className="esp-offer">
                <div className="esp-offer__top">
                  <h3 className="esp-offer__title">{o.title}</h3>
                  <span className="esp-offer__match">{o.match} match</span>
                </div>
                <ul className="esp-offer__meta">
                  <li><Doc size={18} /> CDI</li>
                  <li><Pin size={18} /> {o.city}</li>
                </ul>
              </li>
            ))}
          </ul>
          <div className="esp-center esp-overlap"><span className="btn btn--primary esp-static">Toutes les offres pertinentes</span></div>
        </section>

        <div className="esp-duo">
          <section className="esp-card" aria-labelledby="esp-cv">
            <h2 id="esp-cv" className="esp-card__title"><DuoSpiral size={32} className="esp-card__icon" /> Mes CV et lettres de{' '}motivation</h2>
            <div className="esp-block">
              <p className="esp-block__title">Mes CV</p>
              <p className="esp-block__date">Mis à jour le 19/11/26</p>
              <Link to="/service/creer-cv?from=espace" className="esp-link"><PlusDot /> Créer un CV</Link>
            </div>
            <div className="esp-block">
              <p className="esp-block__title">Je n’ai pas de lettre de motivation{' '}?</p>
              <p className="esp-block__meta">Faites en quelques minutes une lettre de motivation professionnelle</p>
              <span className="esp-link esp-link--static"><PlusDot /> Créer une lettre de motivation</span>
            </div>
            <div className="esp-cv-all"><span className="esp-static esp-btn-ring">Tous mes CV (1) et lettres de motivation (0)</span></div>
          </section>

          <section className="esp-card" aria-labelledby="esp-recherches">
            <h2 id="esp-recherches" className="esp-card__title"><DuoSearch size={32} className="esp-card__icon" /> Mes recherches</h2>
            <p className="esp-block__title">Recevez les offres qui vous correspondent{' '}!</p>
            <p className="esp-block__meta">Ne ratez aucune opportunité, recevez les offres qui vous intéressent chaque jour dans votre boîte{' '}mail.</p>
            <p className="esp-block"><span className="esp-link esp-link--static"><PlusDot /> Créer une recherche</span></p>
            <p className="esp-tip"><Lightbulb size={20} className="esp-tip__icon" /> Vous pourrez recevoir les nouvelles offres par mail pour chacune de vos{' '}recherches.</p>
          </section>
        </div>

        <section className="esp-card" aria-labelledby="esp-ressources">
          <h2 id="esp-ressources" className="esp-card__title"><DuoLaptop size={32} className="esp-card__icon" /> Mes ressources Apec</h2>
          <ul className="esp-rows">
            <Row title="Tous les outils Apec en ligne" />
            <Row title="Toutes les tendances du marché" />
            <Row title="Parcourir les services" to="/cas-02-ab-test?situation=tous" />
          </ul>
        </section>
      </div>
    </ProtoLayout>
  )
}
