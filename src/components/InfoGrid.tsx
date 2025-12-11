import { type JSX } from 'react';

export type InfoItemType = {
  key: string;
  label: string;
  svg: JSX.Element;
};

export function InfoItem({ label, svg, labelClass }: { label: string; svg: JSX.Element; labelClass?: string }): JSX.Element {
  const lblCls = labelClass ?? 'text-white drop-shadow';
  return (
    <div className="w-1/2 sm:w-auto flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center text-emerald-800 shadow-lg">
        {svg}
      </div>
      <span className={`mt-2 text-sm font-medium ${lblCls}`}>{label}</span>
    </div>
  );
}

export default function InfoGrid({ items, labelClass }: { items: InfoItemType[]; labelClass?: string }): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((it) => (
        <InfoItem key={it.key} label={it.label} svg={it.svg} labelClass={labelClass} />
      ))}
    </div>
  );
}

