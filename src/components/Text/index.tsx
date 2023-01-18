import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface TextProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Text({ size = 'md', children, className }: TextProps) {
  return (
    <span
      className={clsx(
        'text-gray-100 font-sans',
        {
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-md': size === 'lg',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
