import { useRef, useState } from "react";
import ReactGA from "react-ga4";
import { useBiblia } from "../../hooks/useBiblia";
import SearchForm from "./SearchForm";
import ClosedBook from "./ClosedBook";
import BookReader from "./BookReader";

/**
 * Orquestra a busca. O trilho de seleção fica na home; o resultado abre o
 * leitor em tela cheia, que cuida da abertura e do fechamento do livro.
 *
 * `hero` é o cabeçalho da página — fica na mesma coluna do formulário para
 * que desktop e mobile compartilhem a mesma ordem de leitura.
 */
export default function BibliaSearch({ hero }) {
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
    buscarCapituloCompleto,
  } = useBiblia();

  const [versiculo, setVersiculo] = useState(null);
  const [capitulo, setCapitulo] = useState(null);
  // Retângulo da capa na home: o leitor nasce em cima dela e cresce daí.
  const [origem, setOrigem] = useState(null);
  const [pousou, setPousou] = useState(false);
  const capaRef = useRef(null);

  /**
   * A capa da home flutua. Se eu medir enquanto ela sobe, o livro pousa na
   * posição memorizada e a capa já se moveu — daí o salto de até 14px na
   * troca. Congelo a flutuação no zero para medir, e só solto quando o
   * leitor sai de cena.
   */
  const capaNeutra = () => {
    const capa = capaRef.current?.querySelector(".closed-book");
    if (!capa) return null;
    capa.getAnimations().forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });
    return capa.getBoundingClientRect();
  };

  const soltarFlutuacao = () => {
    capaRef.current?.querySelector(".closed-book")?.getAnimations()
      .forEach((a) => {
        a.currentTime = 0;
        a.play();
      });
  };

  const handleBuscarVersiculo = () => {
    const encontrado = buscarVersiculo();
    if (!encontrado) return;

    const referencia = `${encontrado.livro} ${encontrado.capitulo}:${encontrado.versiculo}`;

    const caixa = capaNeutra();
    setOrigem(
      caixa?.width
        ? { x: caixa.x, y: caixa.y, w: caixa.width, h: caixa.height }
        : null,
    );

    const versosDoCapitulo = buscarCapituloCompleto();
    setCapitulo(
      versosDoCapitulo?.length
        ? {
            referencia: `${encontrado.livro} ${encontrado.capitulo}`,
            versos: versosDoCapitulo,
          }
        : null,
    );

    setPousou(false);
    setVersiculo({
      referencia,
      livro: encontrado.livro,
      capitulo: encontrado.capitulo,
      versiculo: encontrado.versiculo,
      texto: encontrado.texto,
    });

    ReactGA.event({
      category: "Busca",
      action: "buscar_versiculo",
      label: referencia,
    });
  };

  return (
    <>
      <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-14 xl:gap-20">
        <div className="flex flex-col">
          {hero}

          <div className="enter enter-up stagger-4 mt-10">
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
          </div>
        </div>

        <div className="hidden lg:block">
          {/* A capa fica invisível enquanto o leitor está aberto: é ela que
              vira o livro grande, e volta a aparecer quando ele encolhe. */}
          <div
            ref={capaRef}
            className={versiculo && !pousou ? "invisible" : "visible"}
          >
            <ClosedBook />
          </div>
          <p className="animate-breathe mt-10 text-center text-sm text-ash-500">
            Escolha livro, capítulo e versículo para abrir o livro.
          </p>
        </div>
      </div>

      {versiculo && (
        <BookReader
          key={versiculo.referencia}
          verse={versiculo}
          capitulo={capitulo}
          origem={origem}
          onPousou={() => setPousou(true)}
          onExit={() => {
            setVersiculo(null);
            soltarFlutuacao();
          }}
        />
      )}
    </>
  );
}
