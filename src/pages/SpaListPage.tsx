import { useSearchParams } from 'react-router-dom'
import spasData from '../data/spas.json'
import { SpaCard } from '../components/SpaCard'
import { filterSpas, filtersFromSearchParams } from '../lib/filterSpas'
import { countryLabels, goalLabels } from '../lib/spaLabels'
import type { Spa } from '../types/spa'

const spas = spasData as Spa[]

export function SpaListPage() {
  const [searchParams] = useSearchParams()
  const filters = filtersFromSearchParams(searchParams)
  const visibleSpas = filterSpas(spas, filters)

  const filterNotes = [
    filters.country ? countryLabels[filters.country] : null,
    filters.goal ? goalLabels[filters.goal] : null,
  ].filter(Boolean)

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-sage-dark">SPA sąrašas</h1>
      <p className="mt-2 mb-8 text-sage-dark/80">
        {visibleSpas.length} objektai
        {filterNotes.length > 0 ? ` · ${filterNotes.join(', ')}` : ' Europoje'}.
        Pasirink kortelę ir atidaryk profilį.
      </p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {visibleSpas.map((spa) => (
          <li key={spa.id}>
            <SpaCard spa={spa} />
          </li>
        ))}
      </ul>
    </section>
  )
}
