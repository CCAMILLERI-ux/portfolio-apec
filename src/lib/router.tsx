import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'

/**
 * Routage minimal par hash (#/chemin?param=valeur#ancre).
 * Fonctionne sur tout hébergement statique sans réécriture d'URL.
 */
export interface Route {
  path: string
  query: URLSearchParams
  anchor: string
}

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, '') || '/'
  const [beforeAnchor, anchor = ''] = raw.split('#')
  const [path, search = ''] = beforeAnchor.split('?')
  return { path: path || '/', query: new URLSearchParams(search), anchor }
}

export function href(to: string, anchor?: string) {
  return `#${to}${anchor ? `#${anchor}` : ''}`
}

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (opts.replace) {
    history.replaceState(null, '', href(to))
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = to
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  anchor?: string
  children: ReactNode
}

export function Link({ to, anchor, children, ...rest }: LinkProps) {
  return (
    <a href={href(to, anchor)} {...rest}>
      {children}
    </a>
  )
}
