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
        <div className="font-display max-[500px]:ml-2 md:ml-30 ml-13 lg:ml-10 flex mt-20 border items-center border-stone-400/30 mb-20 w-93 h-12 bg-[#525252]/60 rounded-full ">
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
                    disabled={!livroSelecionado || !capituloSelecionado || !versiculoSelecionado}
                    className="flex items-center justify-center mt-1 ml-1 mr-1 mb-1 bg-[#FFC74D] w-17 h-10 rounded-full hover:border-2 hover:border-stone-900 transition-all"
                >
                    <MoveRight className="font-display text-black"/>
                </button>
            </div>
        </div>
    )
}