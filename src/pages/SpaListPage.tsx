import spasData from '../data/spas.json'
import { SpaCard } from '../components/SpaCard'
import type { Spa } from '../types/spa'

const spas = spasData as Spa[]

export function SpaListPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-sage-dark">SPA sąrašas</h1>
      <p className="mt-2 mb-8 text-sage-dark/80">
        {spas.length} objektai Europoje. Pasirink kortelę ir atidaryk profilį.
      </p>
      <ul className="grid gap-6 sm:grid-cols-2">
        {spas.map((spa) => (
          <li key={spa.id}>
            <SpaCard spa={spa} />
          </li>
        ))}
      </ul>
    </section>
  )
}
