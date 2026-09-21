import { Heart } from "lucide-react";
import { useFavoritos } from "../../contexts/FavoritosContext";
import { cx } from "../../lib/cx";

/** Interpreta "1 Coríntios 13:4" -> { livro, capitulo, versiculo }. */
const parseReferencia = (referencia = "") => {
  const match = referencia.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!match) return null;
  return { livro: match[1], capitulo: match[2], versiculo: match[3] };
};

export const FavoriteButton = ({ versiculo, className, tone = "dark" }) => {
  const { isFavorito, toggleFavorito } = useFavoritos();

  const dados = versiculo?.livro
    ? versiculo
    : {
        ...parseReferencia(versiculo?.referencia),
        texto: versiculo?.texto,
      };

  if (!dados?.livro) return null;

  const favorito = isFavorito(dados.livro, dados.capitulo, dados.versiculo);

  return (
    <button
      type="button"
      onClick={() => toggleFavorito(dados)}
      aria-pressed={favorito}
      aria-label={
        favorito
          ? `Remover ${dados.livro} ${dados.capitulo}:${dados.versiculo} dos favoritos`
          : `Adicionar ${dados.livro} ${dados.capitulo}:${dados.versiculo} aos favoritos`
      }
      className={cx(
        "grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300",
        "active:scale-90",
        tone === "paper"
          ? favorito
            ? "text-gold-500 hover:bg-gold-500/12"
            : "text-ash-300 hover:bg-gold-500/12 hover:text-gold-400"
          : favorito
            ? "text-gold-500 hover:bg-gold-500/10"
            : "text-ash-500 hover:bg-gold-500/10 hover:text-gold-400",
        className,
      )}
    >
      <Heart
        className={cx("size-[18px] transition-all duration-300", favorito && "enter enter-pop")}
        fill={favorito ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
};
