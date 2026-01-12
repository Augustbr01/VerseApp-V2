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
        transition
        className={clsx(
          'absolute left-0 min-[200px]:top-[calc(50%)] min-[200px]:pt-0 min-[320px]:top-[calc(55%)] sm:top-[calc(40%)] md:top-[calc(50%)] z-50',
        'w-max min-w-full max-w-[90vw]',
        'grid grid-cols-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-2',
        'max-h-96 overflow-y-auto scrollbar-custom',
        'rounded-xl border border-white/5 bg-stone-900/95 md:bg-white/5 p-1',
        'transition duration-100 ease-in',
        'data-closed:scale-95 data-closed:opacity-0',
        'data-leave:data-closed:opacity-0'
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
