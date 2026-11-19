import { useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { resetAll } from '../lib/storage'
import { ArrowLeft, Home, Reset } from './Icons'

interface Props {
  back?: { to: string; label: string; anchor?: string }
  kicker?: string
  title: ReactNode
  /** Le titre du bandeau est le h1 sauf si la page porte son propre h1. */
  titleIsHeading?: boolean
  showToolbar?: boolean
  onReset?: () => void
  children?: ReactNode
}

/** Bandeau bleu nuit : retour, rubrique, titre — comme observé sur apec.fr. */
export function PageBand({
  back,
  kicker,
  title,
  titleIsHeading = true,
  showToolbar = true,
  onReset,
  children,
}: Props) {
  const [status, setStatus] = useState('')
  const TitleTag = titleIsHeading ? 'h1' : 'p'

  return (
    <div className="band">
      <div className="container">
        {showToolbar && (
          <div className="demo-toolbar">
            <Link to="/" className="toolbar-btn">
              <Home size={18} /> Retour au portfolio
            </Link>
            <button
              type="button"
              className="toolbar-btn"
              onClick={() => {
                resetAll()
                onReset?.()
                setStatus('Démo réinitialisée : choix, réservations simulées et journal local effacés.')
              }}
            >
              <Reset size={18} /> Réinitialiser la démo
            </button>
            <span className="toolbar-status" role="status" aria-live="polite">
              {status}
            </span>
          </div>
        )}
        <div className="band__head">
          {back && (
            <Link to={back.to} anchor={back.anchor} className="band__back">
              <ArrowLeft size={26} />
              <span className="visually-hidden">Retour : </span>
              <span className="band__back-label">{back.label}</span>
            </Link>
          )}
          <div className={back ? 'band__titles band__titles--indented' : 'band__titles'}>
            {kicker && <p className="band__kicker">{kicker}</p>}
            <TitleTag className="band__title" tabIndex={titleIsHeading ? -1 : undefined}>
              {title}
            </TitleTag>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
