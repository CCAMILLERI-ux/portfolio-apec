import { useEffect, useState } from 'react'
import { readEvents, type DemoEvent } from '../lib/storage'

export function EventLog() {
  const [events, setEvents] = useState<DemoEvent[]>(() => readEvents())
  useEffect(() => {
    const refresh = () => setEvents(readEvents())
    window.addEventListener('portfolio-demo-event', refresh)
    window.addEventListener('portfolio-demo-reset', refresh)
    return () => {
      window.removeEventListener('portfolio-demo-event', refresh)
      window.removeEventListener('portfolio-demo-reset', refresh)
    }
  }, [])
  const last = events.slice(-8).reverse()
  return (
    <details className="event-log">
      <summary>Journal local de la démo ({events.length} événement{events.length > 1 ? 's' : ''})</summary>
      {last.length === 0 ? (
        <p>Aucun événement enregistré pour l’instant.</p>
      ) : (
        <ol>
          {last.map((e, i) => (
            <li key={e.at + i}>
              <code>{e.name}</code>
              {e.detail && <> — {e.detail}</>}{' '}
              <span className="muted">({new Date(e.at).toLocaleTimeString('fr-FR')})</span>
            </li>
          ))}
        </ol>
      )}
    </details>
  )
}
