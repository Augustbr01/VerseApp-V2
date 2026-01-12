import { useState, useEffect } from 'react';
import SelectLivro from './SelectLivro';
import SelectCapitulo from './SelectCap';
import SelectVerse from './SelectVerse';
import { MoveRight } from 'lucide-react';

export default function BibleSelector() {
  const [versiculos, setVersiculos] = useState([]);
  const [livros, setLivros] = useState([]);
  const [capitulos, setCapitulos] = useState([]);
  const [versos, setVersos] = useState([]);
  
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [capituloSelecionado, setCapituloSelecionado] = useState(null);
  const [versiculoSelecionado, setVersiculoSelecionado] = useState(null);
  
  const [versiculoExibido, setVersiculoExibido] = useState(null);

  // Carregar JSON 
  useEffect(() => {
    fetch('/biblia.json')
      .then(res => res.json())
      .then(data => {
        setVersiculos(data);
        
        const livrosUnicos = [...new Set(data.map(v => v.livro))].map((nome, index) => ({
          id: index + 1,
          name: nome
        }));
        setLivros(livrosUnicos);
      })
      .catch(err => console.error('Erro ao carregar bíblia:', err));
  }, []);

  // Atualizar capítulos
  useEffect(() => {
    if (!livroSelecionado) {
      setCapitulos([]);
      return;
    }

    const capsUnicos = [...new Set(
      versiculos
        .filter(v => v.livro === livroSelecionado.name)
        .map(v => v.capitulo)
    )].map((cap, index) => ({
      id: index + 1,
      name: cap
    }));
    
    setCapitulos(capsUnicos);
  }, [livroSelecionado, versiculos]);

  // Atualizar versículos
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
      .map((v, index) => ({
        id: index + 1,
        name: v.versiculo
      }));
    
    setVersos(versosDoCapitulo);
  }, [livroSelecionado, capituloSelecionado, versiculos]);

  // Handlers
  const handleLivroChange = (livro) => {
    setLivroSelecionado(livro);
    setCapituloSelecionado(null);
    setVersiculoSelecionado(null);
    setVersiculoExibido(null);
  };

  const handleCapituloChange = (capitulo) => {
    setCapituloSelecionado(capitulo);
    setVersiculoSelecionado(null);
    setVersiculoExibido(null);
  };

  const handleVersiculoChange = (verso) => {
    setVersiculoSelecionado(verso);
  };

  const buscarVersiculo = () => {
    if (!livroSelecionado || !capituloSelecionado || !versiculoSelecionado) return;

    const resultado = versiculos.find(v => 
      v.livro === livroSelecionado.name && 
      v.capitulo === capituloSelecionado.name && 
      v.versiculo === versiculoSelecionado.name
    );

    if (resultado) {
      setVersiculoExibido({
        referencia: `${livroSelecionado.name} ${capituloSelecionado.name}:${versiculoSelecionado.name}`,
        texto: resultado.texto
      });
    }
  };

  return (
    <div className="">
      
    </div>
  );
}
