import { Routes, Route } from 'react-router-dom'
import NavBar from "./components/Navbar"
import Search from "./components/Search"
import { PaginaFavoritos } from "./components/Favoritos"
import { FavoritosProvider } from './contexts/FavoritosContext'

function App() {
  return (
    <FavoritosProvider>
      <div className="bg-[#1C1C1C] min-h-screen text-white overflow-hidden">
        <NavBar />

        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/favoritos" element={<PaginaFavoritos />} /> 
        </Routes>
      </div>   
    </FavoritosProvider>
  )
}

export default App
