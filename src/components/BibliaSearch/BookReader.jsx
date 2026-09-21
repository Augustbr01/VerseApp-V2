import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cx } from "../../lib/cx";
import { FavoriteButton } from "../subcomponents/FavoriteButton";
import CoverArt from "./CoverArt";
import { paginarVersos, spreadDoVersiculo } from "./paginarCapitulo";

const FOLHAS = 5;

// --- abertura ---------------------------------------------------------------
const CRESCER = 640;
const ABRIR_ATRASO = 300;
const ABRIR_ATE_FOLHEAR = 520;
const FOLHEAR_PASSO = 110;
const FOLHEAR_DURACAO = 560;
const TEMPO_FOLHEANDO = (FOLHAS - 1) * FOLHEAR_PASSO + FOLHEAR_DURACAO;

// --- volta ------------------------------------------------------------------
const VOLTAR_PASSO = 90;
const VOLTAR_DURACAO = 460;
const ULTIMA_FOLHA = (FOLHAS - 1) * VOLTAR_PASSO;
const FECHAR_CAPA = 820;
const ENCOLHER_ATRASO = FECHAR_CAPA + 20;

// --- virar uma página do capítulo -------------------------------------------
const VIRAR = 620;

const CURVA = "cubic-bezier(0.22, 1, 0.36, 1)";
const menosMovimento = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------- páginas -- */

function Ornamento({ className }) {
  return (
    <div className={cx("flex items-center justify-center gap-2", className)} aria-hidden="true">
      <span className="filete w-10" />
      <svg viewBox="0 0 8 8" className="size-1.5 fill-gold-500/50">
        <path d="M4 0 8 4 4 8 0 4Z" />
      </svg>
      <span className="filete w-10" />
    </div>
  );
}

function PaginaDeRosto({ verse }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
      <p className="text-[9px] uppercase tracking-[0.34em] text-ash-300">Você está lendo</p>
      <Ornamento className="mt-5" />
      <p className="mt-5 text-balance text-[2rem] font-semibold leading-[1.1] text-gold-500 xl:text-4xl">
        {verse.referencia}
      </p>
      <Ornamento className="mt-5" />
      <p className="mt-8 max-w-[22ch] text-[11px] leading-relaxed text-ash-300">
        Toda a Escritura é divinamente inspirada e proveitosa para ensinar.
      </p>
    </div>
  );
}

function PaginaVersiculo({ verse, onVerCapitulo, temCapitulo }) {
  const [livroCap] = verse.referencia.split(":");
  return (
    <div className="pagina-inner">
      <div className="pagina-cabeca">
        <span className="truncate">{livroCap}</span>
        <span>{verse.versiculo}</span>
      </div>

      <div className="pagina-corpo scrollbar-paper fade-bottom !overflow-y-auto">
        <p className="capitular text-pretty text-[17px] leading-[1.9] text-ash-50 xl:text-lg">
          {verse.texto}
        </p>
      </div>

      <Ornamento className="mt-5" />

      <div className="mt-5 flex items-center justify-between gap-3">
        {temCapitulo && (
          <button
            type="button"
            onClick={onVerCapitulo}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-300 transition-all duration-300 hover:border-gold-500/55 hover:bg-gold-500/20"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Ler o capítulo inteiro
          </button>
        )}
        <FavoriteButton versiculo={verse} tone="paper" className="ml-auto" />
      </div>
    </div>
  );
}

function LinhaVerso({ verso, destacado }) {
  return (
    <div className={cx("verso-linha", destacado && "verso-linha--destaque")}>
      <span className="verso-num">{verso.versiculo}</span>
      <p className="verso-texto">{verso.texto}</p>
    </div>
  );
}

function PaginaCapitulo({ referencia, versos, numero, rolavel, destaque }) {
  const faixa = versos?.length
    ? `${versos[0].versiculo}–${versos[versos.length - 1].versiculo}`
    : "";
  return (
    <div className="pagina-inner">
      <div className="pagina-cabeca">
        <span className="truncate">{referencia}</span>
        <span>{faixa}</span>
      </div>

      <div className={cx("pagina-corpo", rolavel && "scrollbar-paper")}>
        {versos?.map((verso) => (
          <LinhaVerso
            key={verso.versiculo}
            verso={verso}
            destacado={String(verso.versiculo) === String(destaque)}
          />
        ))}
      </div>

      {numero != null && <div className="pagina-rodape">{numero}</div>}
    </div>
  );
}

/** Desenha uma página a partir do seu descritor. */
function Pagina({ desc, verse, onVerCapitulo, temCapitulo }) {
  if (!desc) return null;
  if (desc.tipo === "rosto") return <PaginaDeRosto verse={verse} />;
  if (desc.tipo === "versiculo") {
    return (
      <PaginaVersiculo
        verse={verse}
        onVerCapitulo={onVerCapitulo}
        temCapitulo={temCapitulo}
      />
    );
  }
  return <PaginaCapitulo {...desc} />;
}

/* ----------------------------------------------------------------- leitor -- */

/**
 * Leitor em tela cheia.
 *
 * Dois modos na mesma folha dupla: um versículo, ou o capítulo inteiro
 * paginado. Toda troca de página — entrar no capítulo, avançar, voltar,
 * sair — passa por uma folha que gira carregando o conteúdo nas duas faces.
 *
 * No mobile o capítulo abre mão da paginação e ocupa a tela, rolando.
 */
export default function BookReader({ verse, capitulo, origem, onPousou, onExit }) {
  const [fase, setFase] = useState(origem ? "ancorado" : "abrindo");
  const [modo, setModo] = useState("versiculo");
  const [rostoNaPagina, setRostoNaPagina] = useState(false);
  const [paginas, setPaginas] = useState([]);
  const [spread, setSpread] = useState(0);
  const [turno, setTurno] = useState(null);
  const [compacto, setCompacto] = useState(
    () => !window.matchMedia("(min-width: 1024px)").matches,
  );

  const palcoRef = useRef(null);
  const gabaritoRef = useRef(null);
  const ancoragem = useRef(null);
  const animacao = useRef(null);
  const emTurno = useRef(false);
  const timers = useRef([]);

  const agendar = (fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const aoMudar = () => setCompacto(!mq.matches);
    mq.addEventListener("change", aoMudar);
    return () => mq.removeEventListener("change", aoMudar);
  }, []);

  // Crescimento a partir da capa da home -------------------------------------
  useLayoutEffect(() => {
    if (!origem || !palcoRef.current) return;
    const capa = palcoRef.current.querySelector(".book-cover");
    if (!capa) return;

    animacao.current?.cancel();
    palcoRef.current.style.transform = "none";
    const palco = palcoRef.current.getBoundingClientRect();
    const alvo = capa.getBoundingClientRect();
    if (!alvo.width) return;

    const escala = origem.w / alvo.width;
    const dx = origem.x + origem.w / 2 - (alvo.x + alvo.width / 2);
    const dy = origem.y + origem.h / 2 - (alvo.y + alvo.height / 2);

    ancoragem.current = `translate(${dx}px, ${dy}px) scale(${escala})`;
    palcoRef.current.style.transformOrigin =
      `${alvo.x + alvo.width / 2 - palco.x}px ${alvo.y + alvo.height / 2 - palco.y}px`;

    animacao.current = palcoRef.current.animate(
      [{ transform: ancoragem.current }, { transform: "none" }],
      { duration: menosMovimento() ? 1 : CRESCER, easing: CURVA, fill: "backwards" },
    );
  }, [origem]);

  useEffect(() => {
    const base = origem ? ABRIR_ATRASO : 0;
    const raf = requestAnimationFrame(() =>
      setFase(origem ? "crescendo" : "abrindo"),
    );
    if (origem) agendar(() => setFase("abrindo"), ABRIR_ATRASO);
    agendar(() => setFase("flipping"), base + ABRIR_ATE_FOLHEAR);
    agendar(() => setFase("reading"), base + ABRIR_ATE_FOLHEAR + TEMPO_FOLHEANDO);

    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [origem]);

  useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, []);

  // Paginação: mede o corpo de uma página real e corta os versículos nele.
  const paginar = () => {
    const corpo = gabaritoRef.current?.querySelector(".pagina-corpo");
    if (!corpo || !capitulo?.versos?.length) return [];
    return paginarVersos(capitulo.versos, corpo);
  };

  const sair = () => {
    if (["unflipping", "fechando", "encolhendo"].includes(fase)) return;
    setFase("unflipping");
    agendar(() => setFase("fechando"), ULTIMA_FOLHA);
    agendar(() => {
      setFase("encolhendo");
      if (origem && palcoRef.current && ancoragem.current) {
        animacao.current = palcoRef.current.animate(
          [{ transform: "none" }, { transform: ancoragem.current }],
          { duration: menosMovimento() ? 1 : CRESCER, easing: CURVA, fill: "forwards" },
        );
      }
    }, ULTIMA_FOLHA + ENCOLHER_ATRASO);
    agendar(() => onPousou?.(), ULTIMA_FOLHA + ENCOLHER_ATRASO + CRESCER);
    agendar(onExit, ULTIMA_FOLHA + ENCOLHER_ATRASO + CRESCER + 90);
  };

  /* ------------------------------------------------------------- páginas -- */

  const pagina = (versos, numero) =>
    versos
      ? {
          referencia: capitulo.referencia,
          versos,
          numero,
          destaque: verse.versiculo,
        }
      : null;
  const L = (i, ps = paginas) => pagina(ps[i * 2], i * 2 + 1);
  const R = (i, ps = paginas) => pagina(ps[i * 2 + 1], i * 2 + 2);
  const totalSpreads = Math.max(1, Math.ceil(paginas.length / 2));

  const girar = ({ dir, frente, verso, esq, direita, aoFim }) => {
    if (emTurno.current || fase !== "reading") return;
    emTurno.current = true;
    setTurno({ dir, frente, verso, esq, direita });
    agendar(() => {
      emTurno.current = false;
      setTurno(null);
      aoFim();
    }, menosMovimento() ? 1 : VIRAR);
  };

  const abrirCapitulo = () => {
    if (!capitulo?.versos?.length) return;

    if (compacto) {
      setModo("capitulo");
      return;
    }

    const ps = paginar();
    if (!ps.length) return;
    const inicial = spreadDoVersiculo(ps, verse.versiculo);

    setPaginas(ps);
    setRostoNaPagina(true);
    girar({
      dir: "frente",
      frente: { tipo: "versiculo" },
      verso: L(inicial, ps),
      esq: { tipo: "rosto" },
      direita: R(inicial, ps),
      aoFim: () => {
        setModo("capitulo");
        setSpread(inicial);
      },
    });
  };

  const proxima = () => {
    if (spread >= totalSpreads - 1) return;
    girar({
      dir: "frente",
      frente: R(spread),
      verso: L(spread + 1),
      esq: L(spread),
      direita: R(spread + 1),
      aoFim: () => setSpread(spread + 1),
    });
  };

  const anterior = () => {
    if (spread <= 0) return;
    girar({
      dir: "tras",
      frente: R(spread - 1),
      verso: L(spread),
      esq: L(spread - 1),
      direita: R(spread),
      aoFim: () => setSpread(spread - 1),
    });
  };

  const voltarAoVersiculo = () => {
    if (compacto) {
      setModo("versiculo");
      return;
    }
    girar({
      dir: "tras",
      frente: { tipo: "versiculo" },
      verso: L(spread),
      esq: { tipo: "rosto" },
      direita: R(spread),
      aoFim: () => setModo("versiculo"),
    });
  };

  // No mobile o capítulo abre rolado até o versículo buscado — senão a
  // pessoa cai no versículo 1 e tem que procurar o dela.
  useEffect(() => {
    if (modo !== "capitulo" || !compacto) return;
    const corpo = document.querySelector(".book-reader .pagina-corpo");
    const alvo = corpo?.querySelector(".verso-linha--destaque");
    if (!corpo || !alvo) return;
    corpo.scrollTop = Math.max(
      0,
      alvo.offsetTop - corpo.clientHeight / 2 + alvo.offsetHeight / 2,
    );
  }, [modo, compacto]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        if (modo === "capitulo") voltarAoVersiculo();
        else sair();
        return;
      }
      if (modo !== "capitulo" || compacto) return;
      if (event.key === "ArrowRight") proxima();
      if (event.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* -------------------------------------------------------------- render -- */

  const aberto = ["abrindo", "flipping", "reading", "unflipping"].includes(fase);
  const seguraRosto = modo === "versiculo" && !rostoNaPagina;
  const folheando = (fase === "flipping" || fase === "reading") && seguraRosto;
  const voltando = ["unflipping", "fechando", "encolhendo"].includes(fase);
  const fechandoCapa = fase === "fechando" || fase === "encolhendo";
  const conteudoVisivel = ["flipping", "reading", "unflipping", "fechando"].includes(fase);
  const cromoVisivel = fase === "reading";
  const modoCapitulo = modo === "capitulo";

  let descEsq = null;
  let descDir = { tipo: "versiculo" };

  if (turno) {
    descEsq = turno.esq;
    descDir = turno.direita;
  } else if (modoCapitulo) {
    descEsq = compacto ? null : L(spread);
    descDir = compacto
      ? {
          referencia: capitulo.referencia,
          versos: capitulo.versos,
          rolavel: true,
          destaque: verse.versiculo,
        }
      : R(spread);
  } else if (rostoNaPagina) {
    descEsq = { tipo: "rosto" };
  }

  // Ao fechar, a esquerda sai de cena montada na folha que assentou — é ela
  // que leva o conteúdo de volta para a direita.
  const conteudoAssentada = seguraRosto
    ? { tipo: "rosto" }
    : voltando
      ? descEsq
      : null;
  const mostrarPaginaEsq = Boolean(descEsq) && !voltando;

  const passarPagina = { verse, onVerCapitulo: abrirCapitulo, temCapitulo: Boolean(capitulo?.versos?.length) };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Leitura de ${verse.referencia}`}
      className={cx(
        "book-reader fixed inset-0 z-[60] overflow-hidden",
        modoCapitulo && "is-capitulo",
        fase === "encolhendo" && "pointer-events-none",
      )}
    >
      <div
        aria-hidden="true"
        className={cx(
          "absolute inset-0 bg-ink-950 transition-opacity duration-[640ms]",
          fase === "encolhendo" ? "opacity-0" : "opacity-100",
        )}
      >
        <div
            className="absolute left-1/2 top-1/2 size-[62vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgb(244 196 48 / 0.10), transparent 72%)",
            }}
          />
      </div>

      <header
        className={cx(
          "absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-4 transition-opacity duration-500 sm:p-6",
          cromoVisivel ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          onClick={sair}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ash-200 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/10 hover:text-gold-300 active:scale-95"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">Buscar outro versículo</span>
        </button>

        <div className="flex items-center gap-3">
          {modoCapitulo && (
            <button
              type="button"
              onClick={voltarAoVersiculo}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ash-200 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/10 hover:text-gold-300 active:scale-95"
            >
              <Quote className="size-3.5" aria-hidden="true" />
              <span className="max-sm:sr-only">Voltar ao versículo</span>
            </button>
          )}
          <p className="truncate text-[11px] uppercase tracking-[0.2em] text-ash-500">
            {modoCapitulo ? capitulo?.referencia : verse.referencia}
          </p>
        </div>
      </header>

      <div
        className={cx(
          "grid h-full px-4 pt-20 sm:pt-24",
          // No capítulo mobile a página precisa esticar para rolar por dentro
          modoCapitulo && compacto
            ? "grid-rows-[minmax(0,1fr)] place-items-stretch pb-4"
            : "place-items-center pb-14",
        )}
      >
        <div ref={palcoRef} className="book-morph book-stage w-full">
          <div
            className={cx(
              "book",
              aberto && "is-open",
              fase === "abrindo" && "is-abrindo",
              folheando && "is-flipping",
              voltando && "is-unflipping",
              fechandoCapa && "is-fechando",
              turno?.dir === "frente" && "is-virando",
              turno?.dir === "tras" && "is-voltando",
            )}
          >
            <div className="book-spread">
              {mostrarPaginaEsq && (
                <div className="book-page book-page--esq paper-left">
                  {conteudoVisivel && <Pagina desc={descEsq} {...passarPagina} />}
                </div>
              )}

              <div className="book-page paper-right">
                {conteudoVisivel && <Pagina desc={descDir} {...passarPagina} />}

                {/* Gabarito invisível: dá a caixa exata que a paginação mede */}
                <div
                  ref={gabaritoRef}
                  aria-hidden="true"
                  className="pointer-events-none invisible absolute inset-0"
                >
                  <PaginaCapitulo referencia="—" versos={[]} numero={1} />
                </div>
              </div>

              {/* Folhas decorativas da abertura */}
              {Array.from({ length: FOLHAS }, (_, index) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className={cx("leaf-sheet", index === FOLHAS - 1 && "leaf-sheet--assenta")}
                  style={{
                    animationDelay: voltando
                      ? `${(FOLHAS - 1 - index) * VOLTAR_PASSO}ms`
                      : `${index * FOLHEAR_PASSO}ms`,
                  }}
                >
                  <div className="leaf-face leaf-face--front" />
                  <div className="leaf-face leaf-face--back">
                    {index === FOLHAS - 1 && conteudoVisivel && (
                      <Pagina desc={conteudoAssentada} {...passarPagina} />
                    )}
                  </div>
                </div>
              ))}

              {/* Folha que vira carregando conteúdo real nas duas faces */}
              {turno && (
                <div className="leaf-sheet leaf-sheet--pagina" aria-hidden="true">
                  <div className="leaf-face leaf-face--front">
                    <Pagina desc={turno.frente} {...passarPagina} />
                  </div>
                  <div className="leaf-face leaf-face--back">
                    <Pagina desc={turno.verso} {...passarPagina} />
                  </div>
                </div>
              )}

              <div className="book-page-edges" aria-hidden="true" />
              <div className="book-ribbon" aria-hidden="true" />

              <div className="book-cover">
                <div className="book-cover-face book-cover-face--front">
                  <CoverArt />
                </div>
                <div className="book-cover-face book-cover-face--back">
                  <div className="absolute inset-6 rounded-[4px] border border-gold-500/12" />
                  <div className="grid h-full place-items-center">
                    <svg
                      viewBox="0 0 40 40"
                      className="w-10 text-gold-500/25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      aria-hidden="true"
                    >
                      <path d="M20 2 38 20 20 38 2 20Z" />
                      <path d="M20 10 30 20 20 30 10 20Z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="book-spine" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Navegação do capítulo */}
      {modoCapitulo && !compacto && cromoVisivel && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-3 p-5">
          <button
            type="button"
            onClick={anterior}
            disabled={spread <= 0}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ash-200 transition-all duration-300 enabled:hover:border-gold-500/30 enabled:hover:bg-gold-500/10 enabled:hover:text-gold-300 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Folhear para trás
          </button>

          <span className="min-w-20 text-center text-xs tabular-nums text-ash-500">
            {spread + 1} de {totalSpreads}
          </span>

          <button
            type="button"
            onClick={proxima}
            disabled={spread >= totalSpreads - 1}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-ash-200 transition-all duration-300 enabled:hover:border-gold-500/30 enabled:hover:bg-gold-500/10 enabled:hover:text-gold-300 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Folhear para frente
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
