import { Link } from 'react-router-dom'
import { type ReactNode } from 'react'
import spasData from '../data/spas.json'
import { useCompare } from '../hooks/useCompare.ts'
import {
  countryLabels,
  goalLabels,
  priceLevelLabels,
  spaTypeLabels,
} from '../lib/spaLabels'
import type { Spa } from '../types/spa'

const spas = spasData as Spa[]

export function ComparePage() {
  const { spaIds, removeSpa } = useCompare()
  const selected = spaIds
    .map((id) => spas.find((spa) => spa.id === id))
    .filter((spa): spa is Spa => spa !== undefined)

  if (selected.length < 2) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-sage-dark">Palyginimas</h1>
        <p className="mt-3 text-sage-dark/80">
          Palyginti galima, kai pasirinkti bent 2 SPA. Grįžk į sąrašą ir pridėk
          objektus mygtuku „Pridėti palyginti“.
        </p>
        <Link
          to="/spas"
          className="mt-6 inline-block rounded-full bg-sage px-6 py-3 text-sand hover:bg-sage-dark"
        >
          Grįžti į SPA sąrašą
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-semibold text-sage-dark">Palyginimas</h1>
      <p className="mt-2 mb-3 text-sage-dark/80">
        Šalia vienas kito – {selected.length} pasirinkti SPA.
      </p>
      <p className="mb-4 text-sm text-sage-dark/70 md:hidden">
        Lentelę slink į šoną, kad pamatytum visus SPA.
      </p>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="rounded-2xl border border-sand-dark">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <caption className="sr-only">Pasirinktų SPA palyginimas</caption>
          <thead>
            <tr className="bg-moss/60">
              <th className="sticky left-0 z-10 min-w-28 border-b border-sand-dark bg-moss/90 px-3 py-3 font-medium sm:px-4">
                Savybė
              </th>
              {selected.map((spa) => (
                <th
                  key={spa.id}
                  className="min-w-40 border-b border-sand-dark px-3 py-3 font-semibold sm:px-4"
                >
                  {spa.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CompareRow label="Pavadinimas">
              {selected.map((spa) => (
                <Link
                  key={spa.id}
                  to={`/spas/${spa.id}`}
                  className="text-sage-dark underline decoration-sage/50 underline-offset-2"
                >
                  {spa.name}
                </Link>
              ))}
            </CompareRow>
            <CompareRow label="Šalis">
              {selected.map((spa) => (
                <span key={spa.id}>{countryLabels[spa.country]}</span>
              ))}
            </CompareRow>
            <CompareRow label="Tipas">
              {selected.map((spa) => (
                <span key={spa.id}>{spaTypeLabels[spa.type]}</span>
              ))}
            </CompareRow>
            <CompareRow label="Tikslai">
              {selected.map((spa) => (
                <span key={spa.id}>
                  {spa.goals.map((goal) => goalLabels[goal]).join(', ')}
                </span>
              ))}
            </CompareRow>
            <CompareRow label="Kainų lygis">
              {selected.map((spa) => (
                <span key={spa.id}>{priceLevelLabels[spa.priceLevel]}</span>
              ))}
            </CompareRow>
            <CompareRow label="Nuoroda">
              {selected.map((spa) => (
                <a
                  key={spa.id}
                  href={spa.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-dark underline decoration-sage/50 underline-offset-2"
                >
                  Oficiali svetainė
                </a>
              ))}
            </CompareRow>
            <tr>
              <th className="sticky left-0 z-10 min-w-28 border-t border-sand-dark bg-sand px-3 py-3 text-left font-medium sm:px-4">
                Veiksmai
              </th>
              {selected.map((spa) => (
                <td key={spa.id} className="border-t border-sand-dark px-3 py-3 sm:px-4">
                  <button
                    type="button"
                    onClick={() => removeSpa(spa.id)}
                    className="min-h-11 rounded-full border border-sage px-4 py-2 text-sage-dark hover:bg-moss"
                  >
                    Pašalinti
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </section>
  )
}

type CompareRowProps = {
  label: string
  children: ReactNode[]
}

function CompareRow({ label, children }: CompareRowProps) {
  return (
    <tr className="odd:bg-sand even:bg-moss/30">
      <th className="sticky left-0 z-10 min-w-28 bg-inherit px-3 py-3 font-medium sm:px-4">
        {label}
      </th>
      {children.map((child, index) => (
        <td key={index} className="min-w-40 px-3 py-3 align-top sm:px-4">
          {child}
        </td>
      ))}
    </tr>
  )
}
