import { type JSX } from 'react';
import { translate, type Locale } from '../contexts/LocaleContext';

type Props = { locale: Locale };

export default function Footer({ locale }: Props): JSX.Element {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <div className="bg-green-900 text-white px-6 py-3 text-center">
        <p className="text-sm font-semibold">{translate(locale,'footer.contact')}</p>
        <p className="text-xs">{translate(locale,'footer.whatsapp')}: (71) 99220-6321</p>
        <p className="text-xs">{translate(locale,'footer.email')}: contato@pousadagaia.com</p>
        <p className="text-xs opacity-80">{translate(locale,'footer.copy')}</p>
      </div>
    </div>
  );
}
