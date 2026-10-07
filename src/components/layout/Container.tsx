// src/components/layout/Container.tsx
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Narrows the content to max-w-prose (~62ch) for reading sections */
  prose?: boolean;
}

/**
 * Container — max-width 1200px with responsive horizontal gutters.
 * The primary layout wrapper for all sections.
 */
export function Container({ children, className, prose }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8 lg:px-12',
        prose ? 'max-w-prose' : 'max-w-[75rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}
