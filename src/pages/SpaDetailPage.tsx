import { useParams } from 'react-router-dom'

export function SpaDetailPage() {
  const { spaId } = useParams()

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-sage-dark">SPA profilis</h1>
      <p className="mt-3 text-sage-dark/80">
        Čia bus konkretaus SPA informacija.
        {spaId ? ` Pasirinktas kodas: ${spaId}.` : null}
      </p>
    </section>
  )
}
