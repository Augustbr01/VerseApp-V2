import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import ReactGA from "react-ga4";
import { FavoriteButton } from "./subcomponents/FavoriteButton";
import { useFavoritos } from "../contexts/FavoritosContext";

function PageHeader({ total }) {
  return (
    <header className="enter enter-up">
      <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ash-300">
        <Heart className="size-3.5 text-gold-500" aria-hidden="true" />
        {total} {total === 1 ? "versículo salvo" : "versículos salvos"}
      </p>
      <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Meus <span className="text-gold-500">versículos favoritos</span>
      </h1>
    </header>
  );
}

export function PaginaFavoritos() {
  const { favoritos } = useFavoritos();

  useEffect(() => {
    document.title = "Favoritos · VerseApp";
    ReactGA.event({
      category: "Navegação",
      action: "visualizar_favoritos",
      label: `Total: ${favoritos.length}`,
    });
    // Só no primeiro render: o evento marca a visita, não cada alteração.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!favoritos.length) {
    return (
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-24 pt-16 text-center sm:px-8 lg:px-10 lg:pt-28">
        <div className="animate-float grid size-20 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
          <Heart className="size-8 text-gold-500/60" strokeWidth={1.25} aria-hidden="true" />
        </div>

        <h1 className="enter enter-up stagger-1 mt-8 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Nenhum versículo <span className="text-gold-500">favoritado</span> ainda
        </h1>
        <p className="enter enter-up stagger-2 mt-4 max-w-md text-pretty text-ash-300">
          Toque no coração ao lado de um versículo para guardá-lo aqui. Eles
          ficam salvos neste navegador.
        </p>

        <Link
          to="/"
          className="enter enter-up stagger-3 mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-gold-300 active:scale-95"
        >
          <Search className="size-4" aria-hidden="true" />
          Buscar um versículo
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:px-10 lg:pt-16">
      <PageHeader total={favoritos.length} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {favoritos.map((favorito, index) => (
          <article
            key={favorito.id}
            style={{ animationDelay: `${Math.min(index * 55, 500)}ms` }}
            className="enter enter-up group relative flex flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/25 hover:bg-white/[0.06]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold-500">
                {favorito.livro} {favorito.capitulo}:{favorito.versiculo}
              </h2>
              <FavoriteButton versiculo={favorito} />
            </div>

            <p className="mt-4 flex-1 text-pretty leading-[1.75] text-ash-200">
              {favorito.texto}
            </p>

            <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs text-ash-500">
              Salvo em{" "}
              {new Date(favorito.dataAdicionado).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
