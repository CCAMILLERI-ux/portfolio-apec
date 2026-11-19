import type { ReactNode } from 'react'
import { Link } from '../lib/router'
import { ArrowLeft } from './Icons'

interface Props {
  back?: { to: string; label: string; anchor?: string }
  kicker?: string
  title: ReactNode
  /** Le titre du bandeau est le h1 sauf si la page porte son propre h1. */
  titleIsHeading?: boolean
  children?: ReactNode
}

/** Bandeau bleu nuit : retour, rubrique, titre — d'après le motif observé. */
export function PageBand({ back, kicker, title, titleIsHeading = true, children }: Props) {
  const TitleTag = titleIsHeading ? 'h1' : 'p'
  return (
    <div className="band">
      <div className="container">
        <div className="band__head">
          {back ? (
            <Link to={back.to} anchor={back.anchor} className="band__back">
              <ArrowLeft size={26} />
              <span className="visually-hidden">Retour : </span>
              <span className="band__back-label">{back.label}</span>
            </Link>
          ) : (
            kicker && <p className="band__kicker">{kicker}</p>
          )}
          <div className={back ? 'band__titles band__titles--indented' : 'band__titles'}>
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
