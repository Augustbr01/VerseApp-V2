import CoverArt from "./CoverArt";

/** Livro fechado da home — decorativo, flutuando. */
export default function ClosedBook() {
  return (
    <div className="book-stage book-stage--home w-full select-none">
      <div className="closed-book animate-float">
        <div className="book-cover-face book-cover-face--front">
          <CoverArt />
        </div>
      </div>
    </div>
  );
}
