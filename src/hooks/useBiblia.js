import { useEffect, useMemo, useState } from "react";

export function useBiblia() {
    const [ versiculos, setVersiculos ] = useState([]);
    const [ livros, setLivros ] = useState([]);
    const [ carregando, setCarregando ] = useState(true);
    const [ erro, setErro ] = useState(null);

    const [ livroSelecionado, setLivroSelecionado ] = useState(null);
    const [ capituloSelecionado, setCapituloSelecionado ] = useState(null);
    const [ versiculoSelecionado, setVersiculoSelecionado ] = useState(null);

    // Carregar JSON
    useEffect(() => {
        let ativo = true;

        fetch('/biblia.json')
            .then(res => res.json())
            .then(data => {
                if (!ativo) return;
                setVersiculos(data);
                const livrosUnicos = [...new Set(data.map(v => v.livro))]
                    .map((nome, index) => ({ id: index + 1, name: nome}));
                setLivros(livrosUnicos);
            })
            .catch(err => {
                console.error('Erro ao carregar biblia', err);
                if (ativo) setErro(err);
            })
            .finally(() => {
                if (ativo) setCarregando(false);
            });

        return () => { ativo = false; };
    }, []);

    // Capítulos do livro escolhido
    const capitulos = useMemo(() => {
        if (!livroSelecionado) return [];

        return [...new Set(
            versiculos
                .filter(v => v.livro === livroSelecionado.name)
                .map(v => v.capitulo)
        )]
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((cap, index) => ({ id: index + 1, name: cap }));
    }, [livroSelecionado, versiculos]);

    // Versículos do capítulo escolhido
    const versos = useMemo(() => {
        if (!livroSelecionado || !capituloSelecionado) return [];

        return versiculos
            .filter(v =>
                v.livro === livroSelecionado.name &&
                v.capitulo === capituloSelecionado.name
            )
            .sort((a, b) => parseInt(a.versiculo, 10) - parseInt(b.versiculo, 10))
            .map((v, index) => ({ id: index + 1, name: v.versiculo }));
    }, [livroSelecionado, capituloSelecionado, versiculos]);

    // Trocar um nível acima limpa os de baixo — senão sobra uma seleção que
    // não existe no novo livro/capítulo e a busca falha em silêncio.
    const selecionarLivro = (livro) => {
        setLivroSelecionado(livro);
        setCapituloSelecionado(null);
        setVersiculoSelecionado(null);
    };

    const selecionarCapitulo = (capitulo) => {
        setCapituloSelecionado(capitulo);
        setVersiculoSelecionado(null);
    };

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
            .sort((a, b) => parseInt(a.versiculo, 10) - parseInt(b.versiculo, 10));
    };

    return {
        livros,
        capitulos,
        versos,
        carregando,
        erro,
        livroSelecionado,
        capituloSelecionado,
        versiculoSelecionado,
        setLivroSelecionado: selecionarLivro,
        setCapituloSelecionado: selecionarCapitulo,
        setVersiculoSelecionado,
        buscarVersiculo,
        buscarCapituloCompleto
    };
}
