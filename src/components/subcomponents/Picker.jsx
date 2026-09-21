import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cx } from "../../lib/cx";

/**
 * Campo de seleção em cascata usado para Livro, Capítulo e Versículo.
 *
 * - `layout="list"`  -> resultados em coluna (nomes de livros)
 * - `layout="grid"`  -> resultados em chips numéricos (capítulos/versículos)
 *
 * A abertura acontece ao focar o campo (`immediate`), então um toque já
 * mostra as opções — sem exigir que o usuário acerte a setinha.
 */
export default function Picker({
  step,
  label,
  placeholder,
  items = [],
  value,
  onChange,
  disabled = false,
  layout = "list",
  className,
}) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(query.trim().toLowerCase()),
        );

  const filled = Boolean(value);

  return (
    <Combobox
      immediate
      value={value}
      onChange={onChange}
      onClose={() => setQuery("")}
      disabled={disabled}
    >
      <div
        className={cx(
          "group relative flex min-w-0 items-center gap-3 rounded-field py-2 pl-3 pr-9 transition-all duration-300",
          "md:rounded-full md:pl-3.5 md:pr-10",
          disabled
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-white/[0.05] focus-within:bg-white/[0.06]",
          className,
        )}
      >
        {/* O campo inteiro abre a lista, não só a seta. Fica por baixo de
            tudo; os enfeites não recebem clique e o input, que precisa
            receber para aceitar digitação, fica por cima. */}
        <ComboboxButton
          aria-label={`Escolher ${label.toLowerCase()}`}
          className={cx(
            "group/seta absolute inset-0 rounded-[inherit]",
            !disabled && "cursor-pointer",
          )}
        >
          <ChevronDown
            className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ash-500 transition-all duration-300 group-hover:text-ash-50 group-data-open/seta:rotate-180 md:right-3.5"
            aria-hidden="true"
          />
        </ComboboxButton>

        {/* Indicador da etapa: número -> check dourado quando preenchido */}
        <span
          aria-hidden="true"
          className={cx(
            "pointer-events-none relative grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition-all duration-500",
            filled
              ? "scale-100 bg-gold-500 text-ink-950"
              : "bg-white/10 text-ash-300 group-focus-within:bg-white/20 group-focus-within:text-ash-50",
          )}
        >
          {filled ? <Check className="size-3.5" strokeWidth={3} /> : step}
        </span>

        <span className="pointer-events-none relative flex min-w-0 flex-1 flex-col">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ash-500">
            {label}
          </span>
          <ComboboxInput
            aria-label={label}
            className={cx(
              "pointer-events-auto w-full min-w-0 truncate border-none bg-transparent p-0 text-sm font-medium text-ash-50 outline-none",
              "placeholder:font-normal placeholder:text-ash-500",
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
            size={1}
            displayValue={(item) => item?.name ?? ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
        </span>
      </div>

      <ComboboxOptions
        anchor={{ to: "bottom start", gap: 10, padding: 16 }}
        transition
        className={cx(
          // Largura própria: herdar --input-width colapsaria os painéis de
          // capítulo/versículo, que são campos estreitos dentro do trilho.
          "z-50 rounded-card border border-white/10 bg-ink-850 p-2 shadow-lift",
          // O anchor do Headless UI injeta max-height inline a partir do
          // espaço livre na tela; só a variável dele limita a altura.
          "[--anchor-max-height:22rem] scrollbar-custom overflow-y-auto overscroll-contain",
          "origin-top transition duration-200 ease-out",
          "data-closed:scale-95 data-closed:opacity-0",
          "empty:invisible",
          layout === "grid"
            ? "grid w-[min(20rem,calc(100vw_-_2rem))] grid-cols-5 gap-1.5"
            : "grid w-[min(30rem,calc(100vw_-_2rem))] grid-cols-1 gap-0.5 sm:grid-cols-2",
        )}
      >
        {filtered.map((item, index) => (
          <ComboboxOption
            key={item.id}
            value={item}
            style={{ animationDelay: `${Math.min(index, 14) * 18}ms` }}
            className={cx(
              "enter enter-pop group cursor-pointer select-none rounded-lg text-sm text-ash-200 transition-colors",
              "data-focus:bg-gold-500/15 data-focus:text-gold-300",
              "data-selected:bg-gold-500/20 data-selected:font-semibold data-selected:text-gold-300",
              layout === "grid"
                ? "grid h-9 place-items-center tabular-nums"
                : "flex items-center justify-between gap-2 px-3 py-2",
            )}
          >
            <span className="truncate">{item.name}</span>
            {layout === "list" && (
              <Check
                className="size-4 shrink-0 opacity-0 transition-opacity group-data-selected:opacity-100"
                aria-hidden="true"
              />
            )}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
