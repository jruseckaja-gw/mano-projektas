import {
  countryKeys,
  goalKeys,
  priceLevelKeys,
  spaTypeKeys,
  treatmentKeys,
} from '../lib/filterSpas'
import {
  countryLabels,
  goalLabels,
  priceLevelLabels,
  spaTypeLabels,
  treatmentLabels,
} from '../lib/spaLabels'
import type { SpaFilters as AppliedFilters } from '../types/spa'

type SpaFiltersProps = {
  filters: AppliedFilters
  onChange: (filters: AppliedFilters) => void
}

const selectClass =
  'mt-1 w-full min-h-11 rounded-md border border-sand-dark bg-sand px-3 py-2 text-base text-sage-dark'

type FilterSelectProps = {
  label: string
  value: string
  emptyLabel: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

function FilterSelect({
  label,
  value,
  emptyLabel,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="block text-sm font-medium text-sage-dark">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
      >
        <option value="">{emptyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function SpaFilters({ filters, onChange }: SpaFiltersProps) {
  function update(key: keyof AppliedFilters, value: string) {
    onChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    })
  }

  return (
    <form
      className="mb-8 grid gap-4 rounded-2xl border border-sand-dark bg-moss/40 p-4 sm:grid-cols-2 lg:grid-cols-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <FilterSelect
        label="Šalis"
        emptyLabel="Visos šalys"
        value={filters.country ?? ''}
        options={countryKeys.map((key) => ({
          value: key,
          label: countryLabels[key],
        }))}
        onChange={(value) => update('country', value)}
      />
      <FilterSelect
        label="SPA tipas"
        emptyLabel="Visi tipai"
        value={filters.type ?? ''}
        options={spaTypeKeys.map((key) => ({
          value: key,
          label: spaTypeLabels[key],
        }))}
        onChange={(value) => update('type', value)}
      />
      <FilterSelect
        label="Poilsio tikslas"
        emptyLabel="Visi tikslai"
        value={filters.goal ?? ''}
        options={goalKeys.map((key) => ({
          value: key,
          label: goalLabels[key],
        }))}
        onChange={(value) => update('goal', value)}
      />
      <FilterSelect
        label="Procedūra"
        emptyLabel="Visos procedūros"
        value={filters.treatment ?? ''}
        options={treatmentKeys.map((key) => ({
          value: key,
          label: treatmentLabels[key],
        }))}
        onChange={(value) => update('treatment', value)}
      />
      <FilterSelect
        label="Kainų lygis"
        emptyLabel="Visos kainos"
        value={filters.priceLevel ?? ''}
        options={priceLevelKeys.map((key) => ({
          value: key,
          label: priceLevelLabels[key],
        }))}
        onChange={(value) => update('priceLevel', value)}
      />
    </form>
  )
}
