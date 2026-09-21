import { Routes, Route } from 'react-router-dom'
import NavBar from "./components/Navbar"
import Search from "./components/Search"
import { PaginaFavoritos } from "./components/Favoritos"
import { FavoritosProvider } from './contexts/FavoritosContext'
import NotFound from './components/NotFound'
import Aurora from './components/Aurora'

function App() {
  return (
    <FavoritosProvider>
      <div className="relative min-h-screen bg-ink-900 font-display text-ash-50 antialiased">
        <Aurora />
        <NavBar />

        <main className="pt-16 lg:pt-20">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/favoritos" element={<PaginaFavoritos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </FavoritosProvider>
  )
}

export default App
