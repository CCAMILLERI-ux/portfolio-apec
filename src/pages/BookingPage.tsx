import { useEffect, useRef, useState } from 'react'
import { Badge } from '../components/Badge'
import { Booking, SimulationNotice, type BookingResult } from '../components/Booking'
import { ArrowRight } from '../components/Icons'
import { PageBand } from '../components/PageBand'
import { getService } from '../data/services'
import { useBookings } from '../lib/demoState'
import { backFor, safeFrom } from '../lib/nav'
import { Link, navigate, type Route } from '../lib/router'
import { NotFound } from './NotFound'

export function BookingPage({ id, route }: { id: string; route: Route }) {
  const service = getService(id)
  const from = safeFrom(route.query.get('from'))
  const origin = backFor(from)
  const [, setBookings] = useBookings()
  const [done, setDone] = useState<BookingResult | null>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (done) doneRef.current?.focus()
  }, [done])

  if (!service || service.action.kind !== 'booking') return <NotFound />
  const serviceBack = { to: `/service/${id}?from=${from}`, label: service.officialTitle }

  return (
    <>
      <PageBand back={serviceBack} kicker="Réservation simulée" title={service.officialTitle} />
      <div className="container overlap">
        <div className="sheet sheet--narrow">
          {done ? (
            <div className="step">
              <SimulationNotice after />
              <h2 ref={doneRef} tabIndex={-1} className="step__title">Réservation simulée enregistrée</h2>
              <dl className="recap">
                <div><dt>Service</dt><dd>{service.officialTitle}</dd></div>
                <div><dt>Date</dt><dd>{done.slot.date} à {done.slot.time} <Badge tone="demo">Fictif</Badge></dd></div>
                <div><dt>Lieu</dt><dd>{done.slot.place}</dd></div>
              </dl>
              <div className="step__actions step__actions--wrap">
                <Link to={origin.to} anchor={origin.anchor} className="btn btn--primary">
                  Retour : {origin.label}
                </Link>
                <Link to="/cas-2/prochaines-etapes" className="link-arrow">
                  Mes prochaines étapes (cas 2) <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ) : (
            <Booking
              service={service}
              cancelLabel="Revenir à la fiche"
              onCancel={() => navigate(serviceBack.to)}
              onComplete={(r) => {
                setBookings((b) => ({ ...b, [r.serviceId]: r.slot }))
                setDone(r)
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
