import { useState } from "react";
import { useBiblia } from "../../hooks/useBiblia";
import SearchForm from "./SearchForm";
import ResultDisplay from "./ResultDisplay";

export default function BibliaSearch() {
    const {
        livros,
        capitulos,
        versos,
        livroSelecionado,
        capituloSelecionado,
        versiculoSelecionado,
        setLivroSelecionado,
        setCapituloSelecionado,
        setVersiculoSelecionado,
        buscarVersiculo,
        buscarCapituloCompleto
    } = useBiblia();

    const [resultado, setResultado] = useState({ versiculo: null, capituloCompleto: null });


    const handleBuscarVersiculo = () => {
        const verso = buscarVersiculo();
        if (verso) {
            setResultado({
                versiculo: {
                    referencia: `${livroSelecionado.name} ${capituloSelecionado.name}:${versiculoSelecionado.name}`,
                    texto: verso.texto
                },
                capituloCompleto: null
            });
        }
    };

    const handleVerCapitulo = () => {
        const capitulo = buscarCapituloCompleto();
        if (capitulo) {
            setResultado({
                versiculo: null,
                capituloCompleto: {
                    referencia: `${livroSelecionado.name} ${capituloSelecionado.name}`,
                    versos: capitulo
                }
            });
        }
    };

    return (
        <div className="space-y-8">
        <SearchForm
            livros={livros}
            capitulos={capitulos}
            versos={versos}
            livroSelecionado={livroSelecionado}
            capituloSelecionado={capituloSelecionado}
            versiculoSelecionado={versiculoSelecionado}
            handleLivroChange={setLivroSelecionado}
            handleCapituloChange={setCapituloSelecionado}
            handleVersiculoChange={setVersiculoSelecionado}
            buscarVersiculo={handleBuscarVersiculo}
        />
        <ResultDisplay
            versiculo={resultado.versiculo}
            capituloCompleto={resultado.capituloCompleto}
            onVerCapitulo={handleVerCapitulo} 
        />
        </div>
    );


}