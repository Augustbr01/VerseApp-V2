import { useState, useEffect } from "react"; 
import { FavoriteButton } from "./subcomponents/FavoriteButton";
import { useFavoritos } from "../contexts/FavoritosContext";
import ReactGA from "react-ga4"

export function PaginaFavoritos() {
    const { favoritos } = useFavoritos(); 
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {

        ReactGA.event({
            category: "Navegação",
            action: "visualizar_favoritos",
            label: `Total: ${favoritos.length}`,
        });


        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    if (!favoritos.length) { 
        return (
            <section className="relative min-h-screen flex justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-100 h-screen" 
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(255, 255, 255, 0.10), transparent 40%)`
                    }}
                />

                <div className="absolute -top-600 -right-500 sm:-top-570 sm:-right-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#FFFFFF]/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-600 -left-500 sm:-bottom-580 sm:-left-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#F4C430]/40 rounded-full blur-3xl animate-pulse"></div>

                <div className="max-w-7xl flex mt-50 md:mt-60 w-full">
                    <div className="max-w-7xl flex flex-col w-full">
                        <div className="animate-in slide-in-from-bottom duration-700 delay-100  flex flex-col mb-8">
                            <h1 className="font-display text-center  font-bold text-4xl md:text-5xl lg:text-6xl mb-2">
                                Nenhum versículo favorito ainda :(
                            </h1>
                            <span className="text-center font-display text-sm">Comece favoritando versículos que tocam em seu coração! ❤️</span>
                        </div>
                        
                        
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen flex justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div 
                className="absolute inset-0 opacity-100 h-screen" 
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(255, 255, 255, 0.10), transparent 40%)`
                }}
            />

            <div className="absolute -top-600 -right-500 sm:-top-570 sm:-right-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#FFFFFF]/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-600 -left-500 sm:-bottom-580 sm:-left-420 sm:w-700 sm:h-700 w-700 h-700 bg-[#F4C430]/40 rounded-full blur-3xl animate-pulse"></div>

            <div className="max-w-7xl mt-10 lg:mt-20 relative w-full">
                <div className="max-w-7xl flex flex-col">
                    <div className="animate-in slide-in-from-bottom duration-700 delay-100 sm:ml-15 max-[500px]:ml-2 lg:ml-10 ml-20 md:ml-30 flex flex-col mb-8">
                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-2">
                            Meus <span className="text-[#F4C430]">Versículos Favoritos</span>
                        </h1>
                    </div>
                    
                    <div className="space-y-4 px-4 md:grid md:grid-cols-2 grid-cols-1 gap-x-10 sm:px-8 lg:px-10">
                        {favoritos.map((favorito) => (
                            <div 
                                key={favorito.id} 
                                className="font-display p-4 mb-10 bg-white/10 border border-white/10 rounded-lg animate slide-in-from-top duration-300"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-[#F4C430] font-bold text-lg">
                                        {favorito.livro} {favorito.capitulo}:{favorito.versiculo}
                                    </h3>
                                    <FavoriteButton versiculo={favorito} />
                                </div>
                                
                                <p className="text-white leading-relaxed mb-2">
                                    {favorito.texto}
                                </p>
                                
                                <p className="text-gray-400 text-sm">
                                    Adicionado em: {new Date(favorito.dataAdicionado).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
