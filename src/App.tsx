import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { ComparePage } from './pages/ComparePage'
import { HomePage } from './pages/HomePage'
import { SpaDetailPage } from './pages/SpaDetailPage'
import { SpaListPage } from './pages/SpaListPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sand text-sage-dark">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spas" element={<SpaListPage />} />
            <Route path="/spas/:spaId" element={<SpaDetailPage />} />
            <Route path="/palyginimas" element={<ComparePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
