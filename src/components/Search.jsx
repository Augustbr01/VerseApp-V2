import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import BibliaSearch from "./BibliaSearch/BibliaSearch";

function Hero() {
  return (
    <header className="max-w-xl">
      <p className="enter enter-down inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ash-300">
        <Sparkles className="size-3.5 text-gold-500" aria-hidden="true" />
        Bíblia Almeida
      </p>

      <h1 className="enter enter-up stagger-1 mt-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
        <span className="block text-ash-50">Jesus é o</span>
        <span className="enter enter-up stagger-2 block text-gold-500">
          caminho, a verdade
        </span>
        <span className="enter enter-up stagger-3 block text-ash-50">
          e a <span className="text-gold-500">vida</span>
        </span>
      </h1>

      <p className="enter enter-up stagger-4 mt-6 max-w-md text-pretty text-base leading-relaxed text-ash-300 sm:text-lg">
        Encontre qualquer versículo em três toques — escolha o livro, o capítulo
        e o versículo, e deixe a página se abrir.
      </p>
    </header>
  );
}

export default function Search() {
  useEffect(() => {
    document.title = "Buscar versículos · VerseApp";
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col justify-center px-5 xl:max-w-[82rem] pb-24 pt-10 sm:px-8 lg:min-h-[calc(100vh_-_5rem)] lg:px-10 lg:pb-20 lg:pt-10">
      <BibliaSearch hero={<Hero />} />
    </section>
  );
}
