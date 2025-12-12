import { type JSX } from 'react';
import { translate, type Locale } from '../contexts/LocaleContext';
import type { SectionId } from '../util/navigation';
import ArrowButton from './ArrowButton';

type Props = {
  prev: SectionId | null;
  next: SectionId | null;
  locale: Locale;
  onNavigate: (id: SectionId) => void;
  emphasizePrev?: boolean;
  emphasizeNext?: boolean;
};

export default function ArrowNav({ prev, next, locale, onNavigate, emphasizePrev = false, emphasizeNext = false }: Props): JSX.Element {
  return (
    <>
      {prev && (
        <ArrowButton
          direction="up"
          label={translate(locale, `nav.${prev}`)}
          emphasized={emphasizePrev}
          onClick={() => onNavigate(prev)}
          ariaLabel="Subir"
        />
      )}

      {next && (
        <ArrowButton
          direction="down"
          label={translate(locale, `nav.${next}`)}
          emphasized={emphasizeNext}
          onClick={() => onNavigate(next)}
          ariaLabel="Descer"
        />
      )}
    </>
  );
}
