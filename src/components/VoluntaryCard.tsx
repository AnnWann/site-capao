import type { JSX } from 'react';

type Props = {
  imageUrl?: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export default function VoluntaryCard({ imageUrl, imageAlt, title, description, ctaLabel, href }: Props): JSX.Element {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Image */}
        <div className="shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full sm:w-32 h-28 sm:h-24 object-cover rounded-xl"
              loading="lazy"
            />
          ) : (
            <div className="w-full sm:w-32 h-28 sm:h-24 rounded-xl bg-neutral-200" />
          )}
        </div>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-bold text-neutral-900">{title}</div>
          <div className="text-sm text-neutral-700 mt-1">{description}</div>
        </div>

        {/* Button */}
        <div className="shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center w-full sm:w-auto px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
