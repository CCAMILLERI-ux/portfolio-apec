import type { Modality } from '../data/services'
import { Clock, Gift, People, Target } from './Icons'

const ICON = { Format: People, Durée: Clock, Tarif: Gift, Public: Target }

/** Bloc modalités 2×2 (format / durée / tarif / public), d'après le motif observé. */
export function Modalities({ items, compact = false }: { items: Modality[]; compact?: boolean }) {
  return (
    <dl className={`modalities${compact ? ' modalities--compact' : ''}`}>
      {items.map((m) => {
        const Icon = ICON[m.label]
        const tbc = m.provenance === 'a-verifier'
        return (
          <div key={m.label} className={`modalities__item${tbc ? ' is-tbc' : ''}`}>
            <Icon size={compact ? 20 : 24} className="modalities__icon" />
            <dt className="visually-hidden">{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        )
      })}
    </dl>
  )
}
