import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCompare } from '../hooks/useCompare.ts'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-3 text-base min-h-11 md:py-2',
    isActive
      ? 'bg-moss font-medium text-sage-dark'
      : 'text-sage-dark/80 hover:bg-moss/70 hover:text-sage-dark',
  ].join(' ')

function compareLabel(count: number) {
  return count > 0 ? `Palyginimas (${count})` : 'Palyginimas'
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { spaIds } = useCompare()
  const compareText = compareLabel(spaIds.length)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-sand-dark bg-sand/95">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="truncate text-base font-semibold text-sage-dark sm:text-lg"
        >
          Spa Stay Guide
        </NavLink>

        <button
          type="button"
          className="min-h-11 min-w-11 rounded-md border border-sage/40 px-3 py-2 text-sm text-sage-dark md:hidden"
          aria-expanded={menuOpen}
          aria-controls="pagrindinis-meniu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Uždaryti' : 'Meniu'}
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Pagrindinis">
          <NavLink to="/" className={linkClass} end>
            Pradžia
          </NavLink>
          <NavLink to="/spas" className={linkClass}>
            SPA sąrašas
          </NavLink>
          <NavLink to="/palyginimas" className={linkClass}>
            {compareText}
          </NavLink>
        </nav>
      </div>

      {menuOpen ? (
        <nav
          id="pagrindinis-meniu"
          className="flex min-h-11 flex-col gap-1 border-t border-sand-dark px-4 py-3 md:hidden"
          aria-label="Pagrindinis"
        >
          <NavLink to="/" className={linkClass} end onClick={closeMenu}>
            Pradžia
          </NavLink>
          <NavLink to="/spas" className={linkClass} onClick={closeMenu}>
            SPA sąrašas
          </NavLink>
          <NavLink to="/palyginimas" className={linkClass} onClick={closeMenu}>
            {compareText}
          </NavLink>
        </nav>
      ) : null}
    </header>
  )
}
