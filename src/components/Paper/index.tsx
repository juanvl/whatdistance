import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Paper({ children, className }: PaperProps) {
  return (
    <div className={clsx('rounded-[10px] bg-white p-5', className)}>
      {children}
    </div>
  );
}
