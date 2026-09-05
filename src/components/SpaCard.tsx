import { Link } from 'react-router-dom'
import {
  countryLabels,
  goalLabels,
  priceLevelLabels,
  spaTypeLabels,
} from '../lib/spaLabels'
import type { Spa } from '../types/spa'

type SpaCardProps = {
  spa: Spa
}

export function SpaCard({ spa }: SpaCardProps) {
  const location = `${spa.city}, ${countryLabels[spa.country]}`

  return (
    <Link
      to={`/spas/${spa.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-sand-dark bg-moss/40 shadow-sm transition hover:border-sage/40 hover:shadow-md"
    >
      <img
        src={spa.imageUrl}
        alt={`${spa.name}, ${location}`}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold text-sage-dark">{spa.name}</h2>
        <p className="text-sm text-sage-dark/80">{location}</p>
        <p className="text-sm text-sage">{spaTypeLabels[spa.type]}</p>
        <p className="text-sm font-medium text-sage-dark">
          {priceLevelLabels[spa.priceLevel]}
        </p>
        <ul className="mt-1 flex flex-wrap gap-1.5">
          {spa.goals.map((goal) => (
            <li
              key={goal}
              className="rounded-full bg-sand px-2.5 py-0.5 text-xs text-sage-dark"
            >
              {goalLabels[goal]}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
