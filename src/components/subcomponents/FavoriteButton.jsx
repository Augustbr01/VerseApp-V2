import { Heart } from "lucide-react";
import { useFavoritos } from "../../contexts/FavoritosContext";


export const FavoriteButton = ({ versiculo }) => {
    const { isFavorito, toggleFavorito } = useFavoritos();
    
    // Extrair livro, capítulo e versículo da referência
    const parseReferencia = (referencia) => {
        // Exemplo: "João 3:16" → { livro: "João", capitulo: 3, versiculo: 16 }
        const match = referencia.match(/^(.+?)\s+(\d+):(\d+)$/);
        if (match) {
            return {
                livro: match[1],
                capitulo: parseInt(match[2]),
                versiculo: parseInt(match[3])
            };
        }

        return null;
    };
    
    const dadosParsed = versiculo.livro 
        ? versiculo // Já tem livro, capitulo, versiculo separados
        : { ...parseReferencia(versiculo.referencia), texto: versiculo.texto, referencia: versiculo.referencia };
    
    const favorited = dadosParsed && isFavorito(dadosParsed.livro, dadosParsed.capitulo, dadosParsed.versiculo);


    return (
        <div className="pt-1">
            <button onClick={() => toggleFavorito(dadosParsed)}
                className={`transition-colors ${favorited ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300 transition-all justify-start'}`}
                aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
            <Heart
                size={20}
                fill={favorited ? '#F4C430' : 'none'}
                className="transition-all"
            />
        </button>
        </div>
        
    );
};