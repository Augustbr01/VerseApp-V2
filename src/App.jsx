import NavBar from "./components/Navbar"
import Search from "./components/Search"
import { FavoritosProvider } from './contexts/FavoritosContext'

function App() {
  return (
    <FavoritosProvider>
      <div className="bg-[#1C1C1C] min-h-screen text-white overflow-hidden">
        <NavBar />
        <Search />
      </div>   
    </FavoritosProvider>
  )
}

export default App
