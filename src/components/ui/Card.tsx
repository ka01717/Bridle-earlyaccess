// src/components/ui/Card.tsx
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  /** Remove default padding */
  noPad?: boolean;
}

/**
 * Card — hairline border, subtle background, no heavy shadows.
 * Elevation is implied through contrast, not box-shadow.
 */
export function Card({ children, className, dark, noPad }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[4px]',
        !noPad && 'p-6',
        dark
          ? 'bg-ink ring-1 ring-inset ring-[rgba(255,255,255,0.08)]'
          : 'bg-paper ring-1 ring-inset ring-[rgba(13,14,17,0.08)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
