import { createContext, useContext, useState, useEffect } from 'react';
import ReactGA from "react-ga4"

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState(() => {
        const favoritosSalvos = localStorage.getItem('verseapp-favoritos');
        return favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
    });

    useEffect(() => {
        localStorage.setItem('verseapp-favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    const adicionarFavorito = (versiculo) => {
        const novoFavorito = {
            id: `${versiculo.livro}-${versiculo.capitulo}-${versiculo.versiculo}`,
            livro: versiculo.livro,
            capitulo: versiculo.capitulo,
            versiculo: versiculo.versiculo,
            texto: versiculo.texto,
            dataAdicionado: new Date().toISOString()
        };
        setFavoritos(prev => [...prev, novoFavorito]);

        ReactGA.event({
            category: "Favoritos",
            action: "adicionar_favorito",
            label: `${versiculo.livro} ${versiculo.capitulo}:${versiculo.versiculo}`,
        });
    };

    const removerFavorito = (id) => {
        const favoritoRemovido = favoritos.find(fav => fav.id === id);
        setFavoritos(prev => prev.filter(fav => fav.id !== id));

        if (favoritoRemovido) {
            ReactGA.event({
                category: "Favoritos",
                action: "remover_favorito",
                label: `${favoritoRemovido.livro} ${favoritoRemovido.capitulo}:${favoritoRemovido.versiculo}`,
            });
        }
    };

    const isFavorito = (livro, capitulo, versiculo) => {
        const id = `${livro}-${capitulo}-${versiculo}`;
        return favoritos.some(fav => fav.id === id);
    };

    const toggleFavorito = (versiculo) => {
        const id = `${versiculo.livro}-${versiculo.capitulo}-${versiculo.versiculo}`;
        if (isFavorito(versiculo.livro, versiculo.capitulo, versiculo.versiculo)) {
            removerFavorito(id);
        } else {
            adicionarFavorito(versiculo);
        }
    };

    return (
        <FavoritosContext.Provider value={{
            favoritos,
            adicionarFavorito,
            removerFavorito,
            isFavorito,
            toggleFavorito
        }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export const useFavoritos = () => {
    const context = useContext(FavoritosContext);
    if (!context) {
        throw new Error('useFavoritos deve ser usado dentro de FavoritosProvider');
    }
    return context;
};
