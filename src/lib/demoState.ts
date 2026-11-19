import { useCallback, useEffect, useState } from 'react'
import { ALEX_PRESET, type Answers } from '../data/onboarding'
import type { Slot } from '../data/slots'
import { load, save } from './storage'

export type OnboardingStep = 'welcome' | 'situation' | 'needs' | 'results' | 'action' | 'confirm'

export interface OnboardingState {
  step: OnboardingStep
  answers: Answers
  chosenId: string | null
  /** Services recommandés conservés dans « Mes prochaines étapes ». */
  recs: string[]
  removed: string[]
}

export const INITIAL_ONBOARDING: OnboardingState = {
  step: 'welcome',
  answers: ALEX_PRESET,
  chosenId: null,
  recs: [],
  removed: [],
}

/** Petit état persistant partagé entre pages (sauvegarde locale de démo). */
function usePersistent<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => load(key, initial))
  useEffect(() => {
    const onReset = () => setValue(initial)
    const onSync = (e: Event) => {
      if ((e as CustomEvent).detail === key) setValue(load(key, initial))
    }
    window.addEventListener('portfolio-demo-reset', onReset)
    window.addEventListener('portfolio-demo-sync', onSync)
    return () => {
      window.removeEventListener('portfolio-demo-reset', onReset)
      window.removeEventListener('portfolio-demo-sync', onSync)
    }
    // initial est une constante de module
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        save(key, v)
        return v
      })
    },
    [key],
  )
  return [value, update] as const
}

export function useOnboarding() {
  return usePersistent<OnboardingState>('onboarding', INITIAL_ONBOARDING)
}

/** Réservations simulées, par service. */
export function useBookings() {
  return usePersistent<Record<string, Slot>>('bookings', {})
}
