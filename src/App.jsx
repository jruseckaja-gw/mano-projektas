import { useState } from 'react'
import './App.css'

const spalvos = ['#f5f0e8', '#d4e6f1', '#d5f5e3', '#fdebd0', '#f5d0e8']

function App() {
  const [spalva, setSpalva] = useState(spalvos[0])

  function keistiFona() {
    setSpalva((dabartine) => {
      const kitos = spalvos.filter((s) => s !== dabartine)
      return kitos[Math.floor(Math.random() * kitos.length)]
    })
  }

  return (
    <div className="puslapis" style={{ backgroundColor: spalva }}>
      <h1>Labas, čia mano pirmas projektas</h1>
      <p>
        Esu pradedančioji programuotoja. Mokausi kurti svetaines su React ir
        Vite — šis puslapis yra mano pirmas žingsnis.
      </p>
      <button type="button" onClick={keistiFona}>
        Keisti fono spalvą
      </button>
    </div>
  )
}

export default App
