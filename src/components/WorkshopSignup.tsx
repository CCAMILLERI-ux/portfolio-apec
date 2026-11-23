import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import type { Service } from '../data/services'
import { WORKSHOP_REGIONS, workshopSessions, type WorkshopMode, type WorkshopRegion } from '../data/slots'
import { track } from '../lib/storage'
import { nb } from '../lib/text'
import type { BookingResult } from './Booking'
import { Calendar, Gift, Pin } from './Icons'
import { Illustration } from './Illustration'

/**
 * Inscription à un atelier, d'après la structure de la page d'inscription d'apec.fr :
 * carte « Inscrivez-vous » (présentiel / à distance, région, sessions, « S'inscrire »)
 * et encart « Votre atelier » mis à jour en direct.
 */
export function WorkshopSignup({
  service,
  onComplete,
  footer,
}: {
  service: Service
  onComplete: (r: BookingResult) => void
  /** Action secondaire sous la carte (ex. « Revenir à ma sélection »). */
  footer?: ReactNode
}) {
  const uid = useId()
  const [mode, setMode] = useState<WorkshopMode>('presentiel')
  const [region, setRegion] = useState<WorkshopRegion>('Île-de-France')
  const [selected, setSelected] = useState<string | null>(null)
  const [error, setError] = useState('')
  const started = useRef(false)
  const sessions = workshopSessions(region, mode)
  const session = sessions.find((s) => s.id === selected)

  useEffect(() => {
    if (started.current) return
    started.current = true
    track('booking_start', service.id)
  }, [service.id])

  // Changer de mode ou de région change la liste : la sélection repart de zéro.
  useEffect(() => setSelected(null), [mode, region])

  const submit = () => {
    if (!session) {
      setError('Sélectionnez une session pour vous inscrire.')
      document.getElementById(`${uid}-sessions`)?.querySelector('input')?.focus()
      return
    }
    track('booking_complete_demo', service.id)
    onComplete({ serviceId: service.id, slot: { id: session.id, date: session.date, time: session.time, place: session.place } })
  }

  const distance = mode === 'distance'

  return (
    <div className="signup">
      <section className="signup__card" aria-labelledby={`${uid}-title`}>
        <h2 id={`${uid}-title`} className="signup__title">Inscrivez-vous</h2>
        <p className="signup__intro">L’Apec vous propose un atelier, en groupe</p>

        <div className="signup__mode">
          <span className={`signup__mode-label${!distance ? ' is-on' : ''}`} aria-hidden="true" onClick={() => setMode('presentiel')}>
            En présentiel
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={distance}
            aria-label="À distance"
            className="signup__switch"
            onClick={() => setMode(distance ? 'presentiel' : 'distance')}
          >
            <span className="signup__switch-knob" aria-hidden="true" />
          </button>
          <span className={`signup__mode-label${distance ? ' is-on' : ''}`} aria-hidden="true" onClick={() => setMode('distance')}>
            À distance
          </span>
        </div>

        <h3 className="signup__h3">Calendrier</h3>
        <p className="signup__help" id={`${uid}-help`}>Sélectionnez une région pour obtenir la liste des sessions{' '}correspondantes.</p>

        <div className="signup__field">
          <label htmlFor={`${uid}-region`} className="signup__label">Région <span aria-hidden="true">*</span></label>
          <select
            id={`${uid}-region`}
            className="signup__select"
            value={region}
            required
            aria-describedby={`${uid}-help`}
            onChange={(e) => setRegion(e.target.value as WorkshopRegion)}
          >
            {WORKSHOP_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <fieldset id={`${uid}-sessions`} className="signup__sessions" aria-describedby={error ? `${uid}-error` : undefined}>
          <legend className="signup__label">Session <span aria-hidden="true">*</span></legend>
          {sessions.map((s) => (
            <label key={s.id} className={`signup__session${selected === s.id ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name={`${uid}-session`}
                value={s.id}
                checked={selected === s.id}
                required
                onChange={() => { setSelected(s.id); setError('') }}
                className="visually-hidden"
              />
              <span className="signup__cell signup__cell--date">{s.date}</span>
              <span className="signup__cell">{s.time}</span>
              <span className="signup__cell">{s.availability}</span>
              <span className="signup__cell signup__cell--place">{s.place}</span>
            </label>
          ))}
        </fieldset>
        {error && <p id={`${uid}-error`} className="field-error" role="alert">{error}</p>}

        <div className="signup__submit">
          <button type="button" className="btn btn--primary btn--lg" onClick={submit}>
            S’inscrire<span className="visually-hidden">{' '}: {service.officialTitle}</span>
          </button>
        </div>
        <p className="signup__req">* Champs obligatoires</p>

        <div className="signup__free">
          <Gift size={28} className="signup__free-icon" />
          <div>
            <p className="signup__free-title">Service gratuit</p>
            <p>Les services de l’Apec sont gratuits pour les{' '}cadres.</p>
          </div>
        </div>
        {footer}
      </section>

      <aside className="signup__aside" aria-labelledby={`${uid}-aside`}>
        <div className="signup__aside-head">
          <Illustration name="groupe" tone="yellow" className="signup__illu" />
          <h2 id={`${uid}-aside`} className="signup__aside-title">Votre atelier</h2>
        </div>
        <div className="signup__aside-body" aria-live="polite">
          <p className="signup__aside-name">{nb(service.officialTitle)}</p>
          {session ? (
            <>
              <p className="signup__aside-line"><Pin size={20} /> <span>{session.place}</span></p>
              <p className="signup__aside-line">
                <Calendar size={20} />
                <span>
                  {session.date}<br />
                  {session.time}<br />
                  <span className="signup__aside-note">(horaire du centre Apec)</span>
                </span>
              </p>
            </>
          ) : (
            <p className="signup__aside-empty">Sélectionnez une session pour voir le lieu et la{' '}date.</p>
          )}
        </div>
      </aside>
    </div>
  )
}
