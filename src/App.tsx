import { useEffect, useRef } from 'react'
import { useRoute } from './lib/router'
import { BookingPage } from './pages/BookingPage'
import { Case1 } from './pages/Case1'
import { Case2 } from './pages/Case2'
import { Case3 } from './pages/Case3'
import { Espace } from './pages/Espace'
import { Home } from './pages/Home'
import { SeoPlan } from './pages/SeoPlan'
import { NextSteps } from './pages/NextSteps'
import { NotFound } from './pages/NotFound'
import { Remuneration } from './pages/Remuneration'
import { ServicePage } from './pages/ServicePage'
import { Sources } from './pages/Sources'

const TITLES: Record<string, string> = {
  '/': 'Accueil',
  '/cas-1': 'Cas 02 — Clarifier l’offre pour faciliter le choix',
  '/cas-2': 'Cas 03 — Inscription accompagnée',
  '/cas-2/prochaines-etapes': 'Cas 03 — Mes prochaines étapes',
  '/espace': 'Cas 03 — Mon espace',
  '/cas-3': 'Cas 01 — Préparer un entretien de recrutement',
  '/conseil/remuneration': 'Cas 01 — Aborder la rémunération',
  '/sources': 'Sources et limites',
  '/plan-seo': 'Un plan SEO pour apec.fr',
}

export default function App() {
  const route = useRoute()
  const { path, anchor } = route
  const firstLoad = useRef(true)
  const prevPath = useRef<string | null>(null)

  // Défilement et focus à chaque changement de page ou d'ancre.
  useEffect(() => {
    const section = path.startsWith('/service/') ? 'Fiche service' : path.startsWith('/reserver/') ? 'Réservation simulée' : TITLES[path] ?? 'Page'
    document.title = `${section} · Portfolio indépendant — C. Camilleri`

    const isFirst = firstLoad.current
    firstLoad.current = false
    // Même page, ancre retirée : on ne remonte pas en haut (les modules gèrent leur propre défilement).
    const samePage = prevPath.current === path
    prevPath.current = path
    if (samePage && !anchor) return
    requestAnimationFrame(() => {
      if (anchor) {
        const el = document.getElementById(anchor)
        if (el) {
          el.scrollIntoView({ block: 'start' })
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
          return
        }
      }
      window.scrollTo(0, 0)
      if (!isFirst) document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    })
  }, [path, anchor])

  let page: React.ReactNode
  const service = path.match(/^\/service\/([\w-]+)$/)
  const booking = path.match(/^\/reserver\/([\w-]+)$/)
  if (path === '/') page = <Home />
  else if (path === '/cas-1') page = <Case1 route={route} />
  else if (path === '/espace') page = <Espace path={path} />
  else if (path === '/cas-2') page = <Case2 path={path} />
  else if (path === '/cas-2/prochaines-etapes') page = <NextSteps path={path} />
  else if (path === '/cas-3') page = <Case3 path={path} />
  else if (path === '/conseil/remuneration') page = <Remuneration path={path} />
  else if (path === '/sources') page = <Sources />
  else if (path === '/plan-seo') page = <SeoPlan route={route} />
  else if (service) page = <ServicePage key={service[1]} id={service[1]} route={route} />
  else if (booking) page = <BookingPage key={booking[1]} id={booking[1]} route={route} />
  else page = <NotFound />

  return page
}
