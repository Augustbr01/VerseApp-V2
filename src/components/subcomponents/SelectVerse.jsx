import Picker from "./Picker";

export default function SelectVerse({
  versos,
  selectedVerse,
  onVerseChange,
  disabled,
}) {
  return (
    <Picker
      step={3}
      label="Versículo"
      placeholder="Vers."
      items={versos}
      value={selectedVerse}
      onChange={onVerseChange}
      disabled={disabled}
      layout="grid"
      className="md:flex-1"
    />
  );
}
