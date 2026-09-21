import Picker from "./Picker";

export default function SelectLivro({ livros, selectedLivro, onLivroChange }) {
  return (
    <Picker
      step={1}
      label="Livro"
      placeholder="Escolha o livro"
      items={livros}
      value={selectedLivro}
      onChange={onLivroChange}
      layout="list"
      className="md:flex-[1.6]"
    />
  );
}
