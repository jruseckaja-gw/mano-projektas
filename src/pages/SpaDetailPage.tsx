import { Link, useParams } from 'react-router-dom'
import spasData from '../data/spas.json'
import { CompareAddButton } from '../components/CompareAddButton'
import {
  countryLabels,
  goalLabels,
  priceLevelLabels,
  spaTypeLabels,
  treatmentLabels,
} from '../lib/spaLabels'
import type { Spa } from '../types/spa'

const spas = spasData as Spa[]

export function SpaDetailPage() {
  const { spaId } = useParams()
  const spa = spas.find((item) => item.id === spaId)

  if (!spa) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-sage-dark">
          Toks SPA nerastas
        </h1>
        <p className="mt-3 text-sage-dark/80">
          Šio adreso nėra mūsų sąraše. Grįžk į SPA sąrašą ir pasirink kitą
          objektą.
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

  const location = `${spa.city}, ${countryLabels[spa.country]}`

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <img
        src={spa.imageUrl}
        alt={`${spa.name}, ${location}`}
        className="h-64 w-full rounded-2xl object-cover sm:h-80"
      />
      <h1 className="mt-6 text-3xl font-semibold text-sage-dark">{spa.name}</h1>
      <p className="mt-2 text-sage-dark/80">{location}</p>
      <p className="mt-1 text-sage">{spaTypeLabels[spa.type]}</p>
      <p className="mt-1 font-medium text-sage-dark">
        {priceLevelLabels[spa.priceLevel]}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-sage-dark">
        Poilsio tikslai
      </h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        {spa.goals.map((goal) => (
          <li
            key={goal}
            className="rounded-full bg-moss px-3 py-1 text-sm text-sage-dark"
          >
            {goalLabels[goal]}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-lg font-semibold text-sage-dark">Procedūros</h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        {spa.treatments.map((treatment) => (
          <li
            key={treatment}
            className="rounded-full bg-moss px-3 py-1 text-sm text-sage-dark"
          >
            {treatmentLabels[treatment]}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-lg font-semibold text-sage-dark">Aprašymas</h2>
      <p className="mt-2 leading-relaxed text-sage-dark/80">{spa.summary}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
        <a
          href={spa.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-sage px-6 py-3 text-center text-sand hover:bg-sage-dark"
        >
          Oficiali svetainė
        </a>
        <CompareAddButton spaId={spa.id} />
      </div>
    </article>
  )
}
