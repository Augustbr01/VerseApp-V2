import SelectLivro from '../subcomponents/SelectLivro';
import SelectCapitulo from '../subcomponents/SelectCap';
import SelectVerse from '../subcomponents/SelectVerse';
import { MoveRight } from 'lucide-react';

export default function SearchForm({
    livros,
    capitulos,
    versos,
    livroSelecionado,
    capituloSelecionado,
    versiculoSelecionado,
    handleLivroChange,
    handleCapituloChange,
    handleVersiculoChange,
    buscarVersiculo,
}) {
    return (
        <div className="flex mt-8 items-center">
            <SelectLivro 
                livros={livros}
                selectedLivro={livroSelecionado}
                onLivroChange={handleLivroChange}
            />
            
            <SelectCapitulo 
                capitulos={capitulos}
                selectedCapitulo={capituloSelecionado}
                onCapituloChange={handleCapituloChange}
                disabled={!livroSelecionado}
            />
            
            <SelectVerse 
                versos={versos}
                selectedVerse={versiculoSelecionado}
                onVerseChange={handleVersiculoChange}
                disabled={!capituloSelecionado}
            />
    
            <button
                onClick={buscarVersiculo}
                disabled={!livroSelecionado || !capituloSelecionado || !versiculoSelecionado}
                className="flex items-center justify-center mt-1 ml-1 mr-1 mb-1 bg-[#FFC74D] w-17 h-10 rounded-full hover:border-2 hover:border-stone-900 transition-all"
            >
                <MoveRight className="text-black"/>
            </button>
        </div>
    )
}