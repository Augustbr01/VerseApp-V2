/** Junta classes condicionais, ignorando valores falsy. */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
