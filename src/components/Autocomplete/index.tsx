import { Combobox, Transition } from '@headlessui/react';
import { ArrowDown, Check } from 'phosphor-react';
import { Fragment, useState } from 'react';

export interface Option {
  id: string | number;
  label: string;
}

export interface AutocompleteProps {
  options: Option[];
  value: Option;
  onChange: (option: Option) => void;
}

export function Autocomplete({ options, value, onChange }: AutocompleteProps) {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <div className="flex h-12 w-full items-center gap-3 rounded border border-gray2 bg-white py-2.5 px-5 ring-black focus-within:ring-1">
          <Combobox.Input
            className="bg-transparent text-gray-100 placeholder:text-textSecondary flex-1 text-xs outline-none"
            displayValue={(option: any) => option?.label}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ArrowDown className="text-gray-400 h-5 w-5" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => {
            setQuery('');
          }}
        >
          <Combobox.Options className="text-base absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="text-gray-700 relative cursor-default select-none py-2 px-4">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray1 text-white' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}