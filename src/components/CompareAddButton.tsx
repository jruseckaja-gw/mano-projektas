import { useState } from 'react'
import { useCompare } from '../hooks/useCompare.ts'

type CompareAddButtonProps = {
  spaId: string
}

export function CompareAddButton({ spaId }: CompareAddButtonProps) {
  const { addSpa, isCompared } = useCompare()
  const [fullMessage, setFullMessage] = useState<string | null>(null)

  if (isCompared(spaId)) {
    return (
      <p className="min-h-11 rounded-full bg-moss px-4 py-3 text-center text-sm font-medium text-sage-dark">
        Jau palyginime
      </p>
    )
  }

  function handleAdd() {
    const result = addSpa(spaId)

    if (result === 'full') {
      setFullMessage(
        'Palyginti galima tik 3 SPA. Pirmiau pašalink vieną iš palyginimo.',
      )
      return
    }

    setFullMessage(null)
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAdd}
        className="min-h-11 w-full rounded-full border border-sage px-4 py-3 text-base text-sage-dark hover:bg-moss"
      >
        Pridėti palyginti
      </button>
      {fullMessage ? (
        <p className="mt-2 text-sm text-sage-dark/80">{fullMessage}</p>
      ) : null}
    </div>
  )
}
