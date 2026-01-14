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
        <div className="font-display ml-5 md:ml-10 flex mt-20 border items-center border-stone-400/30 mb-0 lg:mb-15 w-93 h-12 bg-stone-800/50 rounded-full ">
            <div className="flex  items-center">
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
                    disabled={ !livroSelecionado || !capituloSelecionado || !versiculoSelecionado }
                    className="disabled:cursor-not-allowed disabled:bg-[#898579] duration-700 disabled:hover:border-0 flex items-center justify-center mt-1 ml-1 mr-1 mb-1 bg-[#FFC74D] w-17 h-10 rounded-full hover:border-2 hover:border-stone-900 transition-all"
                >
                    <MoveRight className="font-display text-black"/>
                </button>
            </div>
        </div>
    )
}