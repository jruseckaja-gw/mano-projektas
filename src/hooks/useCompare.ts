import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'spa-stay-guide-compare'
const MAX_COMPARE = 3

export type AddCompareResult = 'added' | 'exists' | 'full'

type CompareContextValue = {
  spaIds: string[]
  addSpa: (id: string) => AddCompareResult
  removeSpa: (id: string) => void
  isCompared: (id: string) => boolean
}

const CompareContext = createContext<CompareContextValue | null>(null)

function readStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter((item): item is string => typeof item === 'string')
      .slice(0, MAX_COMPARE)
  } catch {
    return []
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [spaIds, setSpaIds] = useState<string[]>(readStoredIds)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spaIds))
  }, [spaIds])

  const addSpa = useCallback((id: string): AddCompareResult => {
    let result: AddCompareResult = 'added'

    setSpaIds((current) => {
      if (current.includes(id)) {
        result = 'exists'
        return current
      }

      if (current.length >= MAX_COMPARE) {
        result = 'full'
        return current
      }

      return [...current, id]
    })

    return result
  }, [])

  const removeSpa = useCallback((id: string) => {
    setSpaIds((current) => current.filter((item) => item !== id))
  }, [])

  const isCompared = useCallback(
    (id: string) => spaIds.includes(id),
    [spaIds],
  )

  const value = useMemo(
    () => ({ spaIds, addSpa, removeSpa, isCompared }),
    [spaIds, addSpa, removeSpa, isCompared],
  )

  return createElement(CompareContext.Provider, { value }, children)
}

export function useCompare() {
  const context = useContext(CompareContext)

  if (!context) {
    throw new Error('Palyginimas veikia tik CompareProvider viduje')
  }

  return context
}
