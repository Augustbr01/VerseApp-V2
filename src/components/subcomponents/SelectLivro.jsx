import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

export default function SelectLivro({ livros, selectedLivro, onLivroChange }) {
  const [query, setQuery] = useState('')

  const filteredLivro = query === ''
    ? livros
    : livros.filter((livro) => {
        return livro.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox value={selectedLivro} onChange={onLivroChange} onClose={() => setQuery('')}>
      <div className="relative">
        <ComboboxInput
          readOnly 
          className={clsx(
            'font-display text-1xl ml-1 w-30 h-10 outline-0 pl-3 pr-3 bg-[#313131] rounded-full',
            'rounded-full border-none text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
          displayValue={(livro) => livro?.name}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Livro"
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="font-display size-4 fill-white/60 group-data-hover:fill-white" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom start"
        transition
        className={clsx(
          // Remove absolute e posicionamento manual!
          // O anchor faz tudo automaticamente
          
          // Controle de espaçamento
          '[--anchor-gap:0.5rem]',      // Distância do botão
          '[--anchor-padding:1rem]',     // Margem da viewport
          
          // Largura
          'w-auto min-w-[320px] max-w-120',
          
          // Grid
          'grid grid-cols-2 gap-3 p-4',
          
          // Altura
          'max-h-100 overflow-y-auto scrollbar-custom',
          
          // Estilo
          'rounded-xl border border-white/10 bg-stone-900/95',
          'backdrop-blur-sm shadow-2xl',
          
          // Z-index
          'z-50',
          
          // Transições
          'transition duration-150 ease-out',
          'data-closed:scale-95 data-closed:opacity-0'
        )}
      >
        {filteredLivro.map((livro) => (
          <ComboboxOption
            key={livro.id}
            value={livro}
            className="group flex cursor-default scrollbar-custom items-center gap-2 rounded-lg px-2 py-1.5 select-none data-focus:bg-white/10 "
          >
            <div className="font-display text-sm/6 text-white">{livro.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  )
}
