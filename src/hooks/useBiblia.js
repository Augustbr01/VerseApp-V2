import { useEffect, useRef, useState } from "react";

export function useBiblia() {
    const [ versiculos, setVersiculos ] = useState([]);
    const [ livros, setLivros ] = useState([]);
    const [ capitulos, setCapitulos ] = useState([]);
    const [ versos, setVersos ] = useState([]);

    const [ livroSelecionado, setLivroSelecionado ] = useState(null);
    const [ capituloSelecionado, setCapituloSelecionado ] = useState(null);
    const [ versiculoSelecionado, setVersiculoSelecionado ] = useState(null);

    // Carregar JSON
    useEffect(() => {
        fetch('/biblia.json')
            .then(res => res.json())
            .then(data => {
                setVersiculos(data);
                const livrosUnicos = [...new Set(data.map(v => v.livro))]
                    .map((nome, index) => ({ id: index + 1, name: nome}));
                setLivros(livrosUnicos);
            })
            .catch(err => console.error('Erro ao carregar biblia', err))
    }, []);

    // Atualizar os Capitulos
    useEffect(() => {
        if (!livroSelecionado) {
            setCapitulos([]);
            return;
        }

        const capsUnicos = [...new Set(
            versiculos
                .filter(v => v.livro === livroSelecionado.name)
                .map(v => v.capitulo)
        )].map((cap, index) => ({ id: index + 1, name: cap }));
        setCapitulos(capsUnicos);
    }, [livroSelecionado, versiculos]);

    // Atualizar os versiculos
    useEffect(() => {
        if (!livroSelecionado || !capituloSelecionado) {
            setVersos([]);
            return;
        }

        const versosDoCapitulo = versiculos 
            .filter(v =>
                v.livro === livroSelecionado.name &&
                v.capitulo === capituloSelecionado.name
            )
            .map((v, index) => ({ id: index + 1, name: v.versiculo }));
        setVersos(versosDoCapitulo);
    }, [livroSelecionado, capituloSelecionado, versiculos])

    // Funções

    // Busca versiculo
    const buscarVersiculo = () => {
        if (!livroSelecionado || !capituloSelecionado || !versiculoSelecionado)
            return null;

        return versiculos.find(v =>
            v.livro === livroSelecionado.name &&
            v.capitulo === capituloSelecionado.name &&
            v.versiculo === versiculoSelecionado.name
        );
    };

    // Buscar Capitulo completo

    const buscarCapituloCompleto = () => {
        if (!livroSelecionado || !capituloSelecionado) return null;

        return versiculos
            .filter(v =>
                v.livro === livroSelecionado.name &&
                v.capitulo === capituloSelecionado.name
            )
            .sort((a, b) => parseInt(a.versiculo) - parseInt(b.versiculo));
    };

    return {
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
    };

}