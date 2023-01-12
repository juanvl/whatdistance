import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded bg-green1 py-2.5 px-5 text-sm font-normal text-white ring-white transition-colors hover:bg-green2 focus:ring-2',
        fullWidth === true ? 'w-full' : 'w-32',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
