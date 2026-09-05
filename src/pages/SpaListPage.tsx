import { useSearchParams } from 'react-router-dom'
import spasData from '../data/spas.json'
import { SpaCard } from '../components/SpaCard'
import { SpaFilters } from '../components/SpaFilters'
import {
  filterSpas,
  filtersFromSearchParams,
  filtersToSearchParams,
} from '../lib/filterSpas'
import type { Spa, SpaFilters as AppliedFilters } from '../types/spa'

const spas = spasData as Spa[]

export function SpaListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = filtersFromSearchParams(searchParams)
  const visibleSpas = filterSpas(spas, filters)

  function handleFiltersChange(nextFilters: AppliedFilters) {
    setSearchParams(filtersToSearchParams(nextFilters), { replace: true })
  }

  function clearFilters() {
    setSearchParams({}, { replace: true })
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-semibold text-sage-dark">SPA sąrašas</h1>
      <p className="mt-2 mb-6 text-sage-dark/80">
        {visibleSpas.length === 0
          ? 'Pagal filtrus objektų nerasta.'
          : `${visibleSpas.length} objektai. Pasirink kortelę ir atidaryk profilį.`}
      </p>
      <SpaFilters filters={filters} onChange={handleFiltersChange} />
      {visibleSpas.length === 0 ? (
        <div className="rounded-2xl border border-sand-dark bg-moss/40 px-6 py-10 text-center">
          <p className="text-sage-dark">
            Pagal pasirinktus filtrus SPA nerasta. Pabandyk kitus filtrus arba
            juos nuimk.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full bg-sage px-6 py-3 text-sand hover:bg-sage-dark"
          >
            Nuimti filtrus
          </button>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {visibleSpas.map((spa) => (
            <li key={spa.id}>
              <SpaCard spa={spa} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
