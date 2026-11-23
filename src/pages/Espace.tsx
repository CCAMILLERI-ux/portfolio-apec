import { useState, type ReactNode } from 'react'
import { Case2Coulisses, CASE2_EVENTS } from '../components/Case2Coulisses'
import { ArrowRight, Chat, Doc, Grid, Handshake, Lightbulb, Search, User } from '../components/Icons'
import { toBook } from '../components/ProgramAction'
import { ProtoLayout } from '../components/ProtoLayout'
import { getService } from '../data/services'
import { INITIAL_ONBOARDING, useBookings, useOnboarding } from '../lib/demoState'
import { Link, navigate } from '../lib/router'

/**
 * « Mon espace » candidat : reproduction de la structure de l'espace candidat d'apec.fr
 * (compte récent d'Alex, persona du cas 03). Seul ajout : la première ligne de la carte
 * « Ma relation avec l'Apec », porte d'entrée vers le parcours guidé.
 */

/** Ligne de carte : titre en gras, texte, flèche. Sans destination dans le prototype : affichée, non cliquable. */
function Row({ title, text, to, onClick, badge }: { title: ReactNode; text?: ReactNode; to?: string; onClick?: () => void; badge?: string }) {
  const body = (
    <>
      <span className="esp-row__main">
        <span className="esp-row__title">
          {title}
          {badge && <span className="esp-badge">{badge}</span>}
        </span>
        {text && <span className="esp-row__text">{text}</span>}
      </span>
      <ArrowRight size={20} className="esp-row__arrow" />
    </>
  )
  if (to) return <li><Link to={to} className="esp-row">{body}</Link></li>
  if (onClick) return <li><button type="button" className="esp-row" onClick={onClick}>{body}</button></li>
  return <li><span className="esp-row esp-row--static">{body}</span></li>
}

const OFFERS = [
  { title: 'Responsable grands comptes F/H', match: '92 %', city: 'Lyon (69)' },
  { title: 'Key Account Manager F/H', match: '87 %', city: 'Nanterre (92)' },
  { title: 'Directeur commercial régional F/H', match: '81 %', city: 'Bordeaux (33)' },
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
          <p className="esp-band__kicker"><User size={26} className="esp-band__icon" /> Mon espace <strong>candidat</strong></p>
          <h1 className="esp-band__title" tabIndex={-1}>Bonjour <span className="esp-band__name">Alex</span></h1>
        </div>
      </div>

      <div className="container overlap esp">
        <div className="esp-duo">
          <section className="esp-card" aria-labelledby="esp-relation">
            <h2 id="esp-relation" className="esp-card__title"><Handshake size={28} className="esp-card__icon" /> Ma relation avec l’Apec</h2>
            <ul className="esp-rows">
              {program.length === 0 ? (
                <Row
                  title={<>Vous ne savez pas par où commencer{' '}?</>}
                  text="Trois questions pour trouver les services faits pour vous."
                  badge="Nouveau"
                  onClick={() => {
                    setState((s) => ({ ...s, step: 'welcome' }))
                    navigate('/cas-03-inscription')
                  }}
                />
              ) : (
                <Row
                  title={`Mon programme (${program.length} service${program.length > 1 ? 's' : ''})`}
                  text={`${booked} réservé${booked > 1 ? 's' : ''}, ${remaining} à faire`}
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
            <h2 id="esp-offres" className="esp-card__title"><Search size={28} className="esp-card__icon" /> Mes offres</h2>
            <ul className="esp-rows">
              <Row title="Mes offres sauvegardées (5)" />
              <Row title="Mes candidatures (1)" />
              <Row title="Rechercher une offre" />
            </ul>
          </section>
        </div>

        <section className="esp-card esp-profile" aria-labelledby="esp-profil">
          <h2 id="esp-profil" className="visually-hidden">Mon profil</h2>
          <div className="esp-profile__side">
            <span className="esp-avatar" aria-hidden="true">A</span>
            <p className="esp-profile__views"><strong>3</strong> consultations de votre profil</p>
          </div>
          <div className="esp-profile__main">
            <p className="esp-profile__name">ALEX</p>
            <p className="esp-profile__job">Responsable commercial grands comptes</p>
            <ul className="esp-pills" aria-label="État du profil">
              <li>Profil complété à 60{' '}%</li>
              <li>Profil visible des recruteurs</li>
              <li>En recherche active</li>
            </ul>
            <p className="esp-profile__hint">Débloquez des opportunités{' '}professionnelles</p>
            <div className="esp-profile__actions">
              <span className="esp-link esp-link--static">Modifier les informations personnelles de mon compte</span>
              <span className="btn btn--primary esp-static">Voir mon profil</span>
            </div>
          </div>
        </section>

        <section className="esp-card" aria-labelledby="esp-matching">
          <h2 id="esp-matching" className="esp-card__title">Matching</h2>
          <p className="esp-card__lead">Les offres d’emploi les plus pertinentes pour votre Profil.</p>
          <label className="esp-check">
            <input type="checkbox" checked={partners} onChange={(e) => setPartners(e.target.checked)} />
            Inclure les offres de nos partenaires
          </label>
          <ul className="esp-offers">
            {OFFERS.map((o) => (
              <li key={o.title} className="esp-offer">
                <span className="esp-offer__match">{o.match} match</span>
                <h3 className="esp-offer__title">{o.title}</h3>
                <p className="esp-offer__meta"><span>CDI</span><span>{o.city}</span></p>
              </li>
            ))}
          </ul>
          <div className="esp-center"><span className="btn btn--primary esp-static">Toutes les offres pertinentes</span></div>
        </section>

        <div className="esp-duo">
          <section className="esp-card" aria-labelledby="esp-cv">
            <h2 id="esp-cv" className="esp-card__title"><Doc size={28} className="esp-card__icon" /> Mes CV et lettres de{' '}motivation</h2>
            <div className="esp-block">
              <p className="esp-block__title">Mes CV</p>
              <p className="esp-block__meta">Mis à jour le 19/11/2026</p>
              <Link to="/service/creer-cv?from=espace" className="esp-link">Créer un CV <ArrowRight size={18} /></Link>
            </div>
            <div className="esp-block">
              <p className="esp-block__title">Je n’ai pas de lettre de motivation{' '}?</p>
              <p className="esp-block__meta">Faites en quelques minutes une lettre de motivation professionnelle</p>
              <span className="esp-link esp-link--static">Créer une lettre de motivation <ArrowRight size={18} /></span>
            </div>
            <div className="esp-center"><span className="btn btn--outline esp-static esp-btn-ring">Tous mes CV (1) et lettres de motivation (0)</span></div>
          </section>

          <section className="esp-card" aria-labelledby="esp-recherches">
            <h2 id="esp-recherches" className="esp-card__title"><Chat size={28} className="esp-card__icon" /> Mes recherches</h2>
            <p className="esp-block__title">Recevez les offres qui vous correspondent{' '}!</p>
            <p className="esp-block__meta">Ne ratez aucune opportunité, recevez les offres qui vous intéressent chaque jour dans votre boîte{' '}mail.</p>
            <div className="esp-center"><span className="btn btn--primary esp-static">Créer une recherche</span></div>
            <p className="esp-tip"><Lightbulb size={22} className="esp-tip__icon" /> Vous pourrez recevoir les nouvelles offres par mail pour chacune de vos{' '}recherches.</p>
          </section>
        </div>

        <section className="esp-card" aria-labelledby="esp-ressources">
          <h2 id="esp-ressources" className="esp-card__title"><Grid size={28} className="esp-card__icon" /> Mes ressources Apec</h2>
          <ul className="esp-rows esp-rows--inline">
            <Row title="Tous les outils Apec en ligne" />
            <Row title="Toutes les tendances du marché" />
            <Row title="Parcourir les services" to="/cas-02-ab-test?situation=tous" />
          </ul>
        </section>
      </div>
    </ProtoLayout>
  )
}
