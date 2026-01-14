import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

export default function SelectCapitulo({ capitulos, selectedCapitulo, onCapituloChange, disabled }) {
  const [query, setQuery] = useState('')

  const filteredCapitulo =
    query === ''
      ? capitulos
      : capitulos.filter((cap) => {
          return cap.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
      <Combobox value={selectedCapitulo} onChange={onCapituloChange}  onClose={() => setQuery('')} disabled={disabled}>
        <div className="relative">
          <ComboboxInput
            readOnly 
            className={clsx(
              'text-1xl ml-1 w-25 h-10 outline-0 pl-3 pr-3 bg-[#313131] rounded-full',
              'rounded-full border-none  text-sm/6 text-white',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            displayValue={(cap) => cap?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Capitulo"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions anchor="bottom" transition className={clsx('scrollbar-custom grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-5xl max-h-screen rounded-xl border border-white/5 bg-stone-900/95 p-1 [--anchor-gap:--spacing(1)] empty:invisible', 'transition duration-100 ease-in data-leave:data-closed:opacity-0')}>
          {filteredCapitulo.map((cap) => (
            <ComboboxOption
              key={cap.id}
              value={cap}
              className="justify-center group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
            >
              <div className="font-display text-sm/6 text-white">{cap.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>

  )
}