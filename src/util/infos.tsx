import { type InfoItemType } from '../components/InfoGrid';
import { SleepIcon, WifiIcon, DistIcon, NatureIcon, FamilyIcon, PetsIcon } from '../icons';

// Build the list of infos for the Inicio section. Accepts a translator function `t`.
export function buildInicioInfos(t: (key: string) => string): InfoItemType[] {
  return [
    { key: 'sleep', label: t('info.sleep'), svg: <SleepIcon /> },
    { key: 'wifi', label: t('info.wifi'), svg: <WifiIcon /> },
    { key: 'dist', label: t('info.dist'), svg: <DistIcon /> },
    { key: 'nature', label: t('info.nature'), svg: <NatureIcon /> },
    { key: 'family', label: t('info.family'), svg: <FamilyIcon /> },
    { key: 'pets', label: t('info.pets'), svg: <PetsIcon /> },  
  ];
}

export default buildInicioInfos;
