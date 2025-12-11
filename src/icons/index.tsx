import { type JSX } from 'react';
import { Bed, Wifi, MapPin, Leaf, Users, PawPrint, 
  Coffee, Droplet, Refrigerator, 
  Microwave, Flame, Wine, Disc, Aperture, Beef,
  WashingMachine, Shirt, Package, 
  BedDouble, Rainbow, Diamond,
  LineSquiggle,
  Anvil,
  DropletOff,
  ShowerHead,
  FlameKindling,
  Columns4,
  Telescope,
  Waves,
  Footprints} from 'lucide-react';

type IconProps = { size?: number; className?: string; strokeWidth?: number };

export function SleepIcon({ size = 28, className, strokeWidth = 1.5 }: IconProps): JSX.Element {
  return <Bed size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function WifiIcon({ size = 28, className, strokeWidth = 1.5 }: IconProps): JSX.Element {
  return <Wifi size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function DistIcon({ size = 28, className, strokeWidth = 1.5 }: IconProps): JSX.Element {
  return <MapPin size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function NatureIcon({ size = 28, className, strokeWidth = 1.5 }: IconProps): JSX.Element {
  return <Leaf size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function FamilyIcon({ size = 28, className, strokeWidth = 1.5 }: IconProps): JSX.Element {
  return <Users size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function PetsIcon({ size = 28, className, strokeWidth = 1.5 }: IconProps): JSX.Element {
  return <PawPrint size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}
// Individual icon functions for keys used in sections (return JSX directly so callers can do `fridgeIcon()`)
const defaultClass = 'w-5 h-5 text-green-700';

export function kitchenIcon(): JSX.Element { return <Refrigerator size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function roomIcon(): JSX.Element { return <Bed size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function laundryIcon(): JSX.Element { return <WashingMachine size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function bathroomIcon(): JSX.Element { return <ShowerHead size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function outdoorIcon(): JSX.Element { return <Leaf size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }


export function fridgeIcon(): JSX.Element { return <Refrigerator size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function stoveIcon(): JSX.Element { return <Flame size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function ovenIcon(): JSX.Element { return <Microwave size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function coffeeIcon(): JSX.Element { return <Coffee size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function wineIcon(): JSX.Element { return <Wine size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function trayIcon(): JSX.Element { return <Disc size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function blenderIcon(): JSX.Element { return <Aperture size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function bbqtoolsIcon(): JSX.Element { return <Beef size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }

export function bedIcon(): JSX.Element { return <Bed size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function doubleBedIcon(): JSX.Element { return <BedDouble size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function towelsIcon(): JSX.Element { return <Diamond size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function hangerIcon(): JSX.Element { return <Shirt size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function wardrobeIcon(): JSX.Element { return <Package size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function hammockIcon(): JSX.Element { return <Rainbow size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }

export function washingIcon(): JSX.Element { return <WashingMachine size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function dryerIcon(): JSX.Element { return <WashingMachine size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function lineIcon(): JSX.Element { return <LineSquiggle size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function ironIcon(): JSX.Element { return <Anvil size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function hairdryerIcon(): JSX.Element { return <DropletOff size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }

export function showerIcon(): JSX.Element { return <ShowerHead size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function hotIcon(): JSX.Element { return <Droplet size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function fireIcon(): JSX.Element { return <FlameKindling size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function grillIcon(): JSX.Element { return <Columns4 size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function porchIcon(): JSX.Element { return <Telescope size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function waterIcon(): JSX.Element { return <Waves size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }
export function walkIcon(): JSX.Element { return <Footprints size={20} className={defaultClass} strokeWidth={1.5} aria-hidden />; }

export default {
  SleepIcon,
  WifiIcon,
  DistIcon,
  NatureIcon,
  FamilyIcon,
  PetsIcon,
  kitchenIcon,
  fridgeIcon,
  stoveIcon,
  ovenIcon,
  coffeeIcon,
  wineIcon,
  trayIcon,
  blenderIcon,
  bbqtoolsIcon,
  bedIcon,
  towelsIcon,
  hangerIcon,
  wardrobeIcon,
  hammockIcon,
  washingIcon,
  dryerIcon,
  lineIcon,
  ironIcon,
  hairdryerIcon,
  showerIcon,
  hotIcon,
  fireIcon,
  grillIcon,
  porchIcon,
  waterIcon,
  walkIcon,
};