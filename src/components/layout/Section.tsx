// src/components/layout/Section.tsx
import { cn } from '@/lib/utils';

type SectionVariant = 'light' | 'dark';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  id?: string;
  /**
   * Removes default vertical padding — use when you need full control.
   */
  noPad?: boolean;
}

/**
 * Section — consistent vertical rhythm across the page.
 * Light variant uses paper background; dark variant uses ink-2.
 */
export function Section({
  children,
  className,
  variant = 'light',
  id,
  noPad,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        !noPad && 'py-24 md:py-32 lg:py-40',
        variant === 'light' && 'bg-paper text-ink',
        variant === 'dark' && 'bg-ink-2 text-paper',
        className,
      )}
    >
      {children}
    </section>
  );
}
