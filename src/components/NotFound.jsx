import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Página não encontrada · VerseApp";
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-20 text-center sm:px-8 lg:pt-32">
      <div className="animate-float grid size-20 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
        <Compass className="size-8 text-gold-500/60" strokeWidth={1.25} aria-hidden="true" />
      </div>

      <p className="enter enter-up stagger-1 mt-8 text-6xl font-bold tracking-tight text-gold-500 sm:text-7xl">
        404
      </p>
      <h1 className="enter enter-up stagger-2 mt-4 text-balance text-2xl font-bold sm:text-3xl">
        Esta página não está no índice
      </h1>
      <p className="enter enter-up stagger-3 mt-3 text-pretty text-ash-300">
        O endereço que você tentou abrir não existe por aqui.
      </p>

      <Link
        to="/"
        className="enter enter-up stagger-4 mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-gold-300 active:scale-95"
      >
        Voltar para a busca
      </Link>
    </section>
  );
}
