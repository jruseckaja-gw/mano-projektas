import type {
  Country,
  PriceLevel,
  Spa,
  SpaFilters,
  SpaType,
  Treatment,
  WellnessGoal,
} from '../types/spa'
import {
  countryLabels,
  goalLabels,
  priceLevelLabels,
  spaTypeLabels,
  treatmentLabels,
} from './spaLabels'

export const countryKeys = Object.keys(countryLabels) as Country[]
export const goalKeys = Object.keys(goalLabels) as WellnessGoal[]
export const spaTypeKeys = Object.keys(spaTypeLabels) as SpaType[]
export const treatmentKeys = Object.keys(treatmentLabels) as Treatment[]
export const priceLevelKeys = Object.keys(priceLevelLabels) as PriceLevel[]

function isCountry(value: string): value is Country {
  return value in countryLabels
}

function isGoal(value: string): value is WellnessGoal {
  return value in goalLabels
}

function isSpaType(value: string): value is SpaType {
  return value in spaTypeLabels
}

function isTreatment(value: string): value is Treatment {
  return value in treatmentLabels
}

function isPriceLevel(value: string): value is PriceLevel {
  return value in priceLevelLabels
}

export function filtersFromSearchParams(params: URLSearchParams): SpaFilters {
  const countryValue = params.get('country')
  const typeValue = params.get('type')
  const goalValue = params.get('goal')
  const treatmentValue = params.get('treatment')
  const priceLevelValue = params.get('priceLevel')

  return {
    country: countryValue && isCountry(countryValue) ? countryValue : undefined,
    type: typeValue && isSpaType(typeValue) ? typeValue : undefined,
    goal: goalValue && isGoal(goalValue) ? goalValue : undefined,
    treatment:
      treatmentValue && isTreatment(treatmentValue) ? treatmentValue : undefined,
    priceLevel:
      priceLevelValue && isPriceLevel(priceLevelValue)
        ? priceLevelValue
        : undefined,
  }
}

export function filtersToSearchParams(filters: SpaFilters): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.country) {
    params.set('country', filters.country)
  }
  if (filters.type) {
    params.set('type', filters.type)
  }
  if (filters.goal) {
    params.set('goal', filters.goal)
  }
  if (filters.treatment) {
    params.set('treatment', filters.treatment)
  }
  if (filters.priceLevel) {
    params.set('priceLevel', filters.priceLevel)
  }

  return params
}

export function filterSpas(spas: Spa[], filters: SpaFilters): Spa[] {
  return spas.filter((spa) => {
    if (filters.country && spa.country !== filters.country) {
      return false
    }

    if (filters.type && spa.type !== filters.type) {
      return false
    }

    if (filters.goal && !spa.goals.includes(filters.goal)) {
      return false
    }

    if (filters.treatment && !spa.treatments.includes(filters.treatment)) {
      return false
    }

    if (filters.priceLevel && spa.priceLevel !== filters.priceLevel) {
      return false
    }

    return true
  })
}
