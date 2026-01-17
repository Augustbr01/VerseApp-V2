import { useRef, useState } from "react";
import { useBiblia } from "../../hooks/useBiblia";
import SearchForm from "./SearchForm";
import ResultDisplay from "./ResultDisplay";
import ReactGA from "react-ga4";


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

    const resultadoRef = useRef(null);

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

            ReactGA.event({
                category: "Busca",
                action: "buscar_versiculo",
                label: `${livroSelecionado.name} ${capituloSelecionado.name}:${versiculoSelecionado.name}`,
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

            ReactGA.event({
                category: "Busca",
                action: "ver_capitulo_completo",
                label: `${livroSelecionado.name} ${capituloSelecionado.name}`,
            });

            setTimeout(() => {
                resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    };

    return (
        <div className="space-y-8 ">
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
            <div ref={resultadoRef} className="scroll-mt-100">
                <ResultDisplay
                    versiculo={resultado.versiculo}
                    capituloCompleto={resultado.capituloCompleto}
                    onVerCapitulo={handleVerCapitulo} 
                />
            </div>
        </div>
    );


}
