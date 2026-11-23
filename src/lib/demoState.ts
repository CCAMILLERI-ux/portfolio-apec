import { useCallback, useEffect, useState } from 'react'
import { ALEX_PRESET, type Answers } from '../data/onboarding'
import type { Slot } from '../data/slots'
import { load, save } from './storage'

export type OnboardingStep = 'welcome' | 'situation' | 'needs' | 'results' | 'program' | 'confirm'

export interface OnboardingState {
  step: OnboardingStep
  answers: Answers
  /** Service en cours de réservation depuis « Mon programme » (null : liste du programme). */
  chosenId: string | null
  /** Toutes les suggestions, triées (les trois premières sont mises en avant). */
  recs: string[]
  /** Services ajoutés par le candidat à son programme, dans l'ordre d'ajout. */
  program: string[]
  /** Services retirés du programme depuis « Mes services sélectionnés » (rétablissables). */
  removed: string[]
}

export const INITIAL_ONBOARDING: OnboardingState = {
  step: 'welcome',
  answers: ALEX_PRESET,
  chosenId: null,
  recs: [],
  program: [],
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

/** Sauvegarde d'une version précédente de la démo : champs manquants et ancienne étape « action ». */
function normalize(v: OnboardingState): OnboardingState {
  const step = (v.step as string) === 'action' ? 'program' : v.step
  return { ...INITIAL_ONBOARDING, ...v, step, program: v.program ?? [], removed: v.removed ?? [] }
}

export function useOnboarding() {
  const [value, update] = usePersistent<OnboardingState>('onboarding', INITIAL_ONBOARDING)
  const set = useCallback(
    (next: OnboardingState | ((prev: OnboardingState) => OnboardingState)) =>
      update((prev) => (typeof next === 'function' ? next(normalize(prev)) : next)),
    [update],
  )
  return [normalize(value), set] as const
}

/** Réservations simulées, par service. */
export function useBookings() {
  return usePersistent<Record<string, Slot>>('bookings', {})
}
