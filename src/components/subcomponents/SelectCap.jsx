import Picker from "./Picker";

export default function SelectCapitulo({
  capitulos,
  selectedCapitulo,
  onCapituloChange,
  disabled,
}) {
  return (
    <Picker
      step={2}
      label="Capítulo"
      placeholder="Cap."
      items={capitulos}
      value={selectedCapitulo}
      onChange={onCapituloChange}
      disabled={disabled}
      layout="grid"
      className="md:flex-1"
    />
  );
}
