import { type JSX } from 'react';

type Mode = {
  key: string;
  label: string;
};

type ModeSwitcherProps = {
  modes: Mode[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
};

export default function ModeSwitcher({ modes, value, onChange, className }: ModeSwitcherProps): JSX.Element {
  return (
    <div className={className}>
      <div className="-mx-4 px-4 sm:px-0 mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
          {modes.map((m) => {
            const active = m.key === value;
            return (
              <button
                key={m.key}
                onClick={() => onChange(m.key)}
                aria-pressed={active}
                className={`flex-shrink-0 text-center px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap leading-none transition-colors ${active ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
