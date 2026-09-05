import type { Country, Spa, SpaFilters, WellnessGoal } from '../types/spa'
import { countryLabels, goalLabels } from './spaLabels'

export const countryKeys = Object.keys(countryLabels) as Country[]
export const goalKeys = Object.keys(goalLabels) as WellnessGoal[]

function isCountry(value: string): value is Country {
  return value in countryLabels
}

function isGoal(value: string): value is WellnessGoal {
  return value in goalLabels
}

export function filtersFromSearchParams(params: URLSearchParams): SpaFilters {
  const countryValue = params.get('country')
  const goalValue = params.get('goal')

  return {
    country: countryValue && isCountry(countryValue) ? countryValue : undefined,
    goal: goalValue && isGoal(goalValue) ? goalValue : undefined,
  }
}

export function filterSpas(spas: Spa[], filters: SpaFilters): Spa[] {
  return spas.filter((spa) => {
    if (filters.country && spa.country !== filters.country) {
      return false
    }

    if (filters.goal && !spa.goals.includes(filters.goal)) {
      return false
    }

    return true
  })
}
