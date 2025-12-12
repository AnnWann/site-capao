import { type JSX } from 'react';
import { translate, type Locale } from '../contexts/LocaleContext';

type Props = {
  locale: Locale;
  onNavigate: (id: string) => void;
  closeMenu?: () => void;
};

export default function NavLinks({ locale, onNavigate, closeMenu }: Props): JSX.Element {
  const links: { id: string; key: string }[] = [
    { id: 'home', key: 'nav.home' },
    { id: 'rooms', key: 'nav.rooms' },
    { id: 'amenities', key: 'nav.amenities' },
    { id: 'attractions', key: 'nav.attractions' },
    { id: 'gallery', key: 'nav.gallery' },
    { id: 'booking', key: 'nav.booking' },
    { id: 'location', key: 'nav.location' },
  ];

  return (
    <>
      {links.map((ln) => (
        <a
          key={ln.id}
          href={`#${ln.id}`}
          onClick={(e) => {
            e.preventDefault();
            if (closeMenu) closeMenu();
            onNavigate(ln.id);
          }}
          className="font-semibold"
        >
          {translate(locale, ln.key)}
        </a>
      ))}
    </>
  );
}
