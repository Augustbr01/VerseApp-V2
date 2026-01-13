import { useState, useEffect } from 'react'

export const useFavoritos = () => {
    const [ favoritos, setFavoritos ] = useState(() => {
        const favoritosSalvos = localStorage.getItem('verseapp-favoritos');

        return favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
    })

    useEffect(() => {
        localStorage.setItem('verseapp-favoritos',
            JSON.stringify(favoritos));
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
    };

    const removerFavorito = (id) => {
        setFavoritos(prev => prev.filter(fav => fav.id !== id));
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
    }

    return {
        favoritos,
        adicionarFavorito,
        removerFavorito,
        isFavorito,
        toggleFavorito
    };
};


