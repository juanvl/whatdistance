import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  secondary?: boolean;
}

export function Button({
  children,
  fullWidth,
  secondary,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded py-2.5 px-5 text-sm font-normal text-white ring-white transition-colors focus:ring-2',
        fullWidth ? 'w-full' : 'w-32',
        secondary ? 'bg-gray1 hover:bg-gray1/80' : 'bg-green1 hover:bg-green2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
