import { type JSX } from 'react';

export default function Walkthrough(): JSX.Element {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-neutral-900">Walkthrough</h1>
        <p className="mt-4 text-neutral-700">
          Coming soon: an interactive Street View experience.
        </p>
      </div>
    </div>
  );
}
