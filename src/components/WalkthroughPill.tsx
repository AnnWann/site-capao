import { type JSX, type ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseProps & {
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

type LabelProps = BaseProps & {
  as?: 'div';
};

const baseClass =
  'flex items-center gap-2 px-4 py-2 rounded-full bg-black/35 text-white font-semibold backdrop-blur border border-white/15';

const interactiveClass = 'hover:bg-black/45 transition-colors';

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

export function WalkthroughPillButton({
  children,
  className,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={cx(baseClass, interactiveClass, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function WalkthroughPillLabel({ children, className }: LabelProps): JSX.Element {
  return <div className={cx(baseClass, className)}>{children}</div>;
}
