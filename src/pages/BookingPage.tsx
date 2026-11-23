import { nb } from '../lib/text'
import { useEffect, useRef, useState } from 'react'
import { Booking, type BookingResult } from '../components/Booking'
import { CrBlock } from '../components/Coulisses'
import { ArrowLeft, ArrowRight, Check } from '../components/Icons'
import { WorkshopSignup } from '../components/WorkshopSignup'
import { PageBand } from '../components/PageBand'
import { ProtoLayout } from '../components/ProtoLayout'
import { getService } from '../data/services'
import { useBookings } from '../lib/demoState'
import { backFor, caseLabelFor, safeFrom } from '../lib/nav'
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

  // Ateliers (inscription à une session) et rendez-vous (créneau) ; un outil ne se réserve pas.
  if (!service || service.kind === 'outil') return <NotFound />
  const serviceBack = { to: `/service/${id}?from=${from}`, label: service.officialTitle }

  return (
    <ProtoLayout
      path={route.path}
      caseLabel={caseLabelFor(from)}
      events={['booking_start', 'booking_complete_demo']}
      barNotice={'Démonstration\u00a0: aucune inscription réelle.'}
      coulisses={
        <>
          <h3 className="coulisses__case">Réservation</h3>
          <CrBlock title="Ce qui se passe ici">
            <p>
              La réservation est enregistrée dans ce navigateur, pour l’afficher dans « Mon espace ».
            </p>
          </CrBlock>
        </>
      }
    >
      {service.kind === 'atelier' && !done ? (
        <>
          {/* Inscription à un atelier : bandeau retour + intitulé, puis carte « Inscrivez-vous ». */}
          <div className="band band--signup">
            <div className="container band__signup">
              <Link to={serviceBack.to} className="band__back">
                <ArrowLeft size={26} />
                <span className="visually-hidden">Retour à la fiche du service</span>
              </Link>
              <h1 className="band__title" tabIndex={-1}>{nb(service.officialTitle)}</h1>
            </div>
          </div>
          <div className="container overlap">
            <WorkshopSignup
              service={service}
              onComplete={(r) => {
                setBookings((b) => ({ ...b, [r.serviceId]: r.slot }))
                setDone(r)
              }}
            />
          </div>
        </>
      ) : (
      <>
      <PageBand back={serviceBack} title={done ? 'Votre réservation' : 'Planifiez votre rendez-vous'} />
      <div className="container overlap">
        <div className="sheet sheet--narrow">
          {done ? (
            <div className="step confirm">
              <span className="confirm__check" aria-hidden="true"><Check size={44} /></span>
              <h2 ref={doneRef} tabIndex={-1} className="step__title confirm__title">C’est noté !</h2>
              <dl className="recap">
                <div><dt>Service</dt><dd>{nb(service.officialTitle)}</dd></div>
                <div><dt>Date</dt><dd>{done.slot.date} à {done.slot.time}</dd></div>
                <div><dt>Lieu</dt><dd>{done.slot.place}</dd></div>
              </dl>
              <div className="step__actions step__actions--wrap">
                <Link to={origin.to} anchor={origin.anchor} className="btn btn--primary">
                  Retour : {origin.label}
                </Link>
                <Link to="/cas-03-inscription/prochaines-etapes" className="link-arrow">
                  Mon espace <ArrowRight size={18} />
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
      )}
    </ProtoLayout>
  )
}
