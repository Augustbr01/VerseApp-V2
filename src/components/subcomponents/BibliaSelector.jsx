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
    fetch('./src/assets/biblia.json')
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
      <div className="flex items-center ">
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
          disabled={!versiculoSelecionado}
          className="flex items-center justify-center mt-1 ml-1 mr-1 mb-1 bg-[#FFC74D] w-17 h-10 rounded-full hover:border-2 hover:border-stone-900 transition-all"
        >
          <MoveRight className="text-black"/>
        </button>
      </div>

      {versiculoExibido && (
        <div className="absolute max-w-150 lg:top-27 lg:-right-1 lg:mr-0 mt-6 p-4 mr-10 bg-white/10 border border-white/10 rounded-lg animate slide-in-from-top duration-300 ">
          <div className='flex justify-between'>
            <p className="text-sm text-white/60">{versiculoExibido.referencia}</p>
            <button className='flex'></button>
          </div>
          <p className="mt-2 text-white">{versiculoExibido.texto}</p>
        </div>
      )}
    </div>
  );
}
