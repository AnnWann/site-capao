import { type JSX } from 'react';

export type InfoItemType = {
  key: string;
  label: string;
  svg: JSX.Element;
};

export function InfoItem({ label, svg, labelClass }: { label: string; svg: JSX.Element; labelClass?: string }): JSX.Element {
  const lblCls = labelClass ?? 'text-white drop-shadow';
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center text-emerald-800 shadow-lg">
        {svg}
      </div>
      <span className={`mt-2 text-sm font-medium text-center ${lblCls}`}>{label}</span>
    </div>
  );
}

export default function InfoGrid({ items, labelClass }: { items: InfoItemType[]; labelClass?: string }): JSX.Element {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:flex-wrap items-start gap-6 overflow-x-auto md:overflow-x-visible px-2 py-2 justify-center">
        {items.map((it) => (
          <div key={it.key} className="w-full md:w-auto md:flex-shrink md:min-w-[110px]">
            <InfoItem label={it.label} svg={it.svg} labelClass={labelClass} />
          </div>
        ))}
      </div>
    </div>
  );
}

