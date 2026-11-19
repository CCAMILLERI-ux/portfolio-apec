import type { IllustrationKey } from '../data/services'

/**
 * Illustrations sobres dessinées pour le prototype. Elles remplacent des
 * photographies : aucune image licenciée n'a été fournie, et aucune personne
 * réelle (ni salarié Apec) n'est représentée. Décoratives : alt vide.
 */
const NAVY = 'var(--brand-navy)'
const YELLOW = 'var(--brand-yellow)'
const BLUE = 'var(--brand-blue)'

function Person({ x, y, color = NAVY }: { x: number; y: number; color?: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth={3} strokeLinecap="round">
      <circle cx={x} cy={y} r={9} />
      <path d={`M${x - 15} ${y + 34}c2-12 8-19 15-19s13 7 15 19`} />
    </g>
  )
}

const scenes: Record<IllustrationKey, React.ReactNode> = {
  groupe: (
    <>
      <rect x="40" y="88" width="160" height="10" rx="1" fill={NAVY} opacity=".12" />
      <Person x={70} y={46} />
      <Person x={120} y={40} color={BLUE} />
      <Person x={170} y={46} />
      <rect x="96" y="12" width="48" height="8" rx="1" fill={YELLOW} />
    </>
  ),
  echange: (
    <>
      <Person x={78} y={46} />
      <Person x={162} y={46} color={BLUE} />
      <path d="M100 30h40a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6h-24l-10 8v-8h-6a6 6 0 0 1-6-6V36a6 6 0 0 1 6-6z" fill={YELLOW} />
      <rect x="60" y="88" width="120" height="8" rx="1" fill={NAVY} opacity=".12" />
    </>
  ),
  outil: (
    <>
      <rect x="66" y="22" width="108" height="64" rx="3" fill="none" stroke={NAVY} strokeWidth={3} />
      <path d="M52 92h136" stroke={NAVY} strokeWidth={3} strokeLinecap="round" />
      <rect x="80" y="36" width="44" height="7" rx="1" fill={YELLOW} />
      <rect x="80" y="50" width="78" height="5" rx="1" fill={BLUE} opacity=".5" />
      <rect x="80" y="62" width="60" height="5" rx="1" fill={BLUE} opacity=".5" />
    </>
  ),
  document: (
    <>
      <path d="M90 12h46l18 18v66H90z" fill="none" stroke={NAVY} strokeWidth={3} strokeLinejoin="round" />
      <path d="M136 12v18h18" fill="none" stroke={NAVY} strokeWidth={3} strokeLinejoin="round" />
      <rect x="100" y="40" width="32" height="7" rx="1" fill={YELLOW} />
      <rect x="100" y="56" width="44" height="5" rx="1" fill={BLUE} opacity=".5" />
      <rect x="100" y="68" width="40" height="5" rx="1" fill={BLUE} opacity=".5" />
      <rect x="100" y="80" width="30" height="5" rx="1" fill={BLUE} opacity=".5" />
    </>
  ),
  boussole: (
    <>
      <circle cx="120" cy="54" r="38" fill="none" stroke={NAVY} strokeWidth={3} />
      <path d="M120 26l10 28-10 28-10-28z" fill={YELLOW} />
      <path d="M120 54l10 0-10 28-10-28z" fill={BLUE} opacity=".55" />
      <circle cx="120" cy="54" r="4" fill={NAVY} />
    </>
  ),
  recrutement: (
    <>
      <rect x="60" y="24" width="64" height="70" rx="3" fill="none" stroke={NAVY} strokeWidth={3} />
      <Person x={92} y={44} color={BLUE} />
      <circle cx="152" cy="50" r="20" fill="none" stroke={NAVY} strokeWidth={3} />
      <path d="M166 64l18 18" stroke={NAVY} strokeWidth={4} strokeLinecap="round" />
      <rect x="140" y="46" width="24" height="7" rx="1" fill={YELLOW} />
    </>
  ),
}

export function Illustration({ name, className }: { name: IllustrationKey; className?: string }) {
  return (
    <svg
      className={className ?? 'illustration'}
      viewBox="0 0 240 108"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="240" height="108" fill="var(--surface-muted)" />
      {scenes[name]}
    </svg>
  )
}
