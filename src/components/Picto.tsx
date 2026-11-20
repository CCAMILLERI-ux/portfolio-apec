import type { ServiceKind } from '../data/services'

/**
 * Pictogrammes filaires bicolores (blanc + jaune), d'après le motif observé sur les
 * cartes thématiques bleues d'apec.fr (capture « Nos consultantes et nos consultants »).
 * Dessinés pour le prototype ; décoratifs.
 */
type Kind = ServiceKind | 'aide'
const W = '#FFFFFF'
const Y = '#FFC400'

export function Picto({ kind, size = 72 }: { kind: Kind; size?: number }) {
  const common = { fill: 'none', strokeWidth: 3.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="picto">
      {kind === 'individuel' && (
        <>
          <circle cx="32" cy="18" r="8" stroke={W} {...common} />
          <path d="M14 52V44c0-6 5-10 10-10l8 9 8-9c5 0 10 4 10 10v8" stroke={Y} {...common} />
        </>
      )}
      {kind === 'atelier' && (
        <>
          <circle cx="32" cy="16" r="6" stroke={W} {...common} />
          <circle cx="14" cy="24" r="5" stroke={W} {...common} />
          <circle cx="50" cy="24" r="5" stroke={W} {...common} />
          <path d="M20 50v-8c0-6 5-10 12-10s12 4 12 10v8M4 48v-4c0-5 4-8 9-8M60 48v-4c0-5-4-8-9-8" stroke={Y} {...common} />
        </>
      )}
      {kind === 'outil' && (
        <>
          <rect x="12" y="14" width="40" height="26" rx="2" stroke={W} {...common} />
          <path d="M24 24l-5 3 5 3M40 24l5 3-5 3" stroke={W} {...common} />
          <path d="M6 48h52l-4-8H10z" stroke={Y} {...common} />
        </>
      )}
      {kind === 'aide' && (
        <>
          <path d="M14 22a20 20 0 1 1 0 20" stroke={W} {...common} />
          <path d="M8 32h30M30 24l8 8-8 8" stroke={Y} {...common} />
        </>
      )}
    </svg>
  )
}
