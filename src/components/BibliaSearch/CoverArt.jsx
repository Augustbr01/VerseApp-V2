/** Capa de couro. Toda a arte é proporcional à capa (cqw), para que o
 *  livro pequeno da home e o do leitor sejam o mesmo desenho. */
export default function CoverArt() {
  return (
    <>
      <div className="book-spine-bands" aria-hidden="true" />
      <div className="capa-moldura" aria-hidden="true" />
      <div className="capa-moldura-2" aria-hidden="true" />

      <div className="capa-conteudo">
        {/* Emblema: uma página aberta reduzida a dois arcos */}
        <svg
          viewBox="0 0 48 34"
          className="capa-emblema"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M24 8v24" />
          <path d="M24 8C19 3.5 11 3 4 4.5v24C11 27 19 27.5 24 32" />
          <path d="M24 8c5-4.5 13-5 20-3.5v24C37 27 29 27.5 24 32" />
        </svg>

        <p className="capa-marca">
          <span className="text-gold-500">Verse</span>
          <span className="text-ash-50">App</span>
        </p>

        <div className="capa-filete" aria-hidden="true" />

        <p className="capa-selo">Almeida</p>
      </div>
    </>
  );
}
