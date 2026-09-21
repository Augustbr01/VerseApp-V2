import { ArrowRight } from "lucide-react";
import SelectLivro from "../subcomponents/SelectLivro";
import SelectCapitulo from "../subcomponents/SelectCap";
import SelectVerse from "../subcomponents/SelectVerse";
import { cx } from "../../lib/cx";

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-8 w-px shrink-0 bg-white/10 md:block"
    />
  );
}

/**
 * Trilho de busca em três etapas.
 *
 * Desktop: uma única pílula horizontal (livro -> capítulo -> versículo -> ir).
 * Mobile: cartão empilhado, com capítulo e versículo lado a lado.
 * Abaixo, uma barra de progresso dourada mostra o quanto falta.
 */
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
  const preenchidos = [
    livroSelecionado,
    capituloSelecionado,
    versiculoSelecionado,
  ].filter(Boolean).length;

  const pronto = preenchidos === 3;

  return (
    // Sem <form>: o Enter do combobox concorre com o submit e a seleção
    // do livro se perde antes de virar estado.
    <div className="w-full max-w-2xl" role="search">
      <div
        className={cx(
          "flex flex-col gap-1 rounded-card border border-white/10 bg-ink-800/60 p-2 shadow-lift backdrop-blur-xl transition-colors duration-500",
          "md:flex-row md:items-center md:gap-0 md:rounded-full md:p-1.5",
          pronto && "border-gold-500/30",
        )}
      >
        <SelectLivro
          livros={livros}
          selectedLivro={livroSelecionado}
          onLivroChange={handleLivroChange}
        />

        <Divider />

        {/* No desktop estes viram itens diretos do flex; no mobile ficam 2 colunas */}
        <div className="grid grid-cols-2 gap-1 md:contents">
          <SelectCapitulo
            capitulos={capitulos}
            selectedCapitulo={capituloSelecionado}
            onCapituloChange={handleCapituloChange}
            disabled={!livroSelecionado}
          />
          <Divider />
          <SelectVerse
            versos={versos}
            selectedVerse={versiculoSelecionado}
            onVerseChange={handleVersiculoChange}
            disabled={!capituloSelecionado}
          />
        </div>

        <button
          type="button"
          onClick={buscarVersiculo}
          disabled={!pronto}
          className={cx(
            "mt-1 flex h-12 shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300",
            "md:mt-0 md:ml-1 md:size-12 md:gap-0",
            pronto
              ? "animate-gold-pulse bg-gold-400 text-ink-950 hover:bg-gold-300 active:scale-95"
              : "cursor-not-allowed bg-white/[0.07] text-ash-500",
          )}
        >
          <span className="md:sr-only">Buscar versículo</span>
          <ArrowRight
            className={cx(
              "size-5 transition-transform duration-300",
              pronto && "md:group-hover:translate-x-0.5",
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Progresso das três etapas */}
      <div className="mt-3 flex items-center gap-3 px-1">
        <div
          className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={preenchidos}
          aria-valuemin={0}
          aria-valuemax={3}
          aria-label="Etapas preenchidas"
        >
          <span
            className="block h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700 ease-out"
            style={{ width: `${(preenchidos / 3) * 100}%` }}
          />
        </div>
        <p className="shrink-0 text-[11px] text-ash-500">
          {pronto ? "Pronto para abrir" : `${preenchidos} de 3`}
        </p>
      </div>
    </div>
  );
}
