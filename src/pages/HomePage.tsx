import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { countryKeys, goalKeys } from '../lib/filterSpas'
import { countryLabels, goalLabels } from '../lib/spaLabels'

const heroImage =
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=80'

const selectClass =
  'w-full rounded-md border border-sand-dark bg-sand px-3 py-2 text-left text-sage-dark'

export function HomePage() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('')
  const [goal, setGoal] = useState('')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams()
    if (country) {
      params.set('country', country)
    }
    if (goal) {
      params.set('goal', goal)
    }

    navigate(`/spas?${params.toString()}`)
  }

  return (
    <section
      className="relative flex min-h-[70vh] items-center justify-center bg-cover bg-center px-4 py-16 text-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-sage-dark/55" />
      <div className="relative mx-auto w-full max-w-2xl rounded-2xl bg-sand/90 px-6 py-10 shadow-sm">
        <p className="mb-3 text-sm font-medium tracking-wide text-sage uppercase">
          Wellness paieška Europoje
        </p>
        <h1 className="text-3xl font-semibold text-sage-dark sm:text-4xl">
          Spa Stay Guide
        </h1>
        <p className="mt-4 leading-relaxed text-sage-dark/80">
          Viena vieta, kur ramiai rasi SPA viešbučius, wellness retreatus ir
          termalinius kurortus pagal šalį ir poilsio tikslą. Palygink kelis
          objektus ir eik rezervuoti į oficialią svetainę.
        </p>

        <form onSubmit={handleSearch} className="mt-8 text-left">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-sage-dark">
              Šalis
              <select
                required
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className={`${selectClass} mt-1`}
              >
                <option value="">Pasirinkite šalį</option>
                {countryKeys.map((key) => (
                  <option key={key} value={key}>
                    {countryLabels[key]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-sage-dark">
              Poilsio tikslas
              <select
                required
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className={`${selectClass} mt-1`}
              >
                <option value="">Pasirinkite tikslą</option>
                {goalKeys.map((key) => (
                  <option key={key} value={key}>
                    {goalLabels[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-sage px-6 py-3 text-sand hover:bg-sage-dark sm:w-auto"
          >
            Ieškoti
          </button>
        </form>

        <Link
          to="/spas"
          className="mt-6 inline-block text-sage-dark underline decoration-sage/50 underline-offset-4 hover:text-sage"
        >
          Žiūrėti visus SPA
        </Link>
      </div>
    </section>
  )
}
