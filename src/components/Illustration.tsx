import type { IllustrationKey } from '../data/services'

/**
 * Illustrations en aplats dessinées pour le prototype, dans les couleurs de la
 * charte observée (jaune, bleu, bleu nuit). Elles remplacent des photographies :
 * aucune personne réelle ni salarié de l'Apec n'est représenté. Décoratives.
 */
export type Tone = 'yellow' | 'blue' | 'navy'

const PALETTE: Record<Tone, { bg: string; fig: string; acc: string; soft: string }> = {
  yellow: { bg: '#FFC400', fig: '#252555', acc: '#FFFFFF', soft: '#006699' },
  blue: { bg: '#006699', fig: '#FFFFFF', acc: '#FFC400', soft: '#99E8FA' },
  navy: { bg: '#252555', fig: '#FFFFFF', acc: '#FFC400', soft: '#99E8FA' },
}

function Fig({ x, y, s = 1, color }: { x: number; y: number; s?: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <circle cx="0" cy="0" r="13" />
      <path d="M-24 50c0-22 10-32 24-32s24 10 24 32z" />
    </g>
  )
}

function scene(name: IllustrationKey | 'conseil', c: (typeof PALETTE)[Tone]) {
  switch (name) {
    case 'groupe':
      return (
        <>
          <rect x="196" y="34" width="70" height="52" rx="3" fill={c.acc} />
          <path d="M206 48h40M206 60h50M206 72h30" stroke={c.soft} strokeWidth="5" strokeLinecap="round" />
          <path d="M231 86v26" stroke={c.fig} strokeWidth="4" />
          <Fig x={84} y={86} color={c.fig} />
          <Fig x={140} y={76} color={c.soft} />
          <Fig x={196} y={110} s={0.85} color={c.fig} />
          <rect x="44" y="136" width="200" height="12" rx="2" fill={c.fig} opacity=".9" />
        </>
      )
    case 'echange':
      return (
        <>
          <Fig x={96} y={84} s={1.1} color={c.fig} />
          <Fig x={224} y={84} s={1.1} color={c.soft} />
          <path d="M130 34h64a10 10 0 0 1 10 10v18a10 10 0 0 1-10 10h-40l-16 13v-13h-8a10 10 0 0 1-10-10V44a10 10 0 0 1 10-10z" fill={c.acc} />
          <circle cx="146" cy="53" r="4" fill={c.bg} /><circle cx="162" cy="53" r="4" fill={c.bg} /><circle cx="178" cy="53" r="4" fill={c.bg} />
          <rect x="60" y="146" width="200" height="12" rx="2" fill={c.fig} opacity=".9" />
        </>
      )
    case 'outil':
      return (
        <>
          <rect x="82" y="30" width="156" height="100" rx="6" fill={c.fig} />
          <rect x="92" y="40" width="136" height="80" rx="2" fill={c.bg} />
          <path d="M60 140h200l-14-10H74z" fill={c.fig} />
          <rect x="104" y="52" width="70" height="16" rx="8" fill={c.acc} />
          <rect x="146" y="76" width="70" height="16" rx="8" fill={c.soft} />
          <rect x="104" y="100" width="50" height="10" rx="5" fill={c.acc} opacity=".8" />
        </>
      )
    case 'document':
      return (
        <>
          <path d="M112 22h76l26 26v112H112z" fill={c.fig} />
          <path d="M188 22v26h26" fill={c.acc} />
          <circle cx="140" cy="64" r="14" fill={c.soft} />
          <rect x="162" y="56" width="36" height="8" rx="4" fill={c.acc} />
          <rect x="162" y="70" width="26" height="6" rx="3" fill={c.bg} />
          <rect x="128" y="96" width="70" height="7" rx="3.5" fill={c.bg} />
          <rect x="128" y="112" width="60" height="7" rx="3.5" fill={c.bg} />
          <rect x="128" y="128" width="66" height="7" rx="3.5" fill={c.bg} />
          <path d="M230 120l26-60 10 5-26 60-12 6z" fill={c.acc} />
        </>
      )
    case 'boussole':
      return (
        <>
          <path d="M30 150c40-10 50-50 100-56s70 30 110 10 40-40 50-50" fill="none" stroke={c.acc} strokeWidth="6" strokeLinecap="round" strokeDasharray="2 14" />
          <circle cx="160" cy="80" r="52" fill={c.fig} />
          <circle cx="160" cy="80" r="42" fill={c.bg} />
          <path d="M160 44l14 36-14 36-14-36z" fill={c.acc} />
          <path d="M160 80l14 0-14 36-14-36z" fill={c.soft} />
          <circle cx="160" cy="80" r="6" fill={c.fig} />
        </>
      )
    case 'recrutement':
      return (
        <>
          <rect x="60" y="40" width="84" height="104" rx="4" fill={c.fig} />
          <circle cx="102" cy="74" r="16" fill={c.soft} />
          <rect x="76" y="100" width="52" height="7" rx="3.5" fill={c.bg} />
          <rect x="82" y="114" width="40" height="7" rx="3.5" fill={c.bg} />
          <rect x="128" y="56" width="84" height="104" rx="4" fill={c.acc} />
          <circle cx="170" cy="90" r="16" fill={c.bg} />
          <circle cx="226" cy="74" r="30" fill="none" stroke={c.fig} strokeWidth="9" />
          <path d="M248 96l26 26" stroke={c.fig} strokeWidth="12" strokeLinecap="round" />
        </>
      )
    case 'conseil':
      return (
        <>
          <Fig x={110} y={78} s={1.25} color={c.fig} />
          <rect x="170" y="34" width="86" height="112" rx="4" fill={c.acc} />
          <rect x="196" y="28" width="34" height="12" rx="3" fill={c.fig} />
          {[60, 86, 112].map((y) => (
            <g key={y}>
              <path d={`M184 ${y}l6 6 10-12`} fill="none" stroke={c.soft} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="208" y={y - 2} width="36" height="7" rx="3.5" fill={c.fig} opacity=".85" />
            </g>
          ))}
        </>
      )
  }
}

export function Illustration({
  name,
  tone = 'yellow',
  className,
}: {
  name: IllustrationKey | 'conseil'
  tone?: Tone
  className?: string
}) {
  const c = PALETTE[tone]
  return (
    <svg
      className={className ?? 'illustration'}
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="320" height="180" fill={c.bg} />
      <circle cx="292" cy="20" r="46" fill={c.fig} opacity=".08" />
      <circle cx="20" cy="170" r="38" fill={c.fig} opacity=".08" />
      {scene(name, c)}
    </svg>
  )
}
