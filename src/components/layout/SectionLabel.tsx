// src/components/layout/SectionLabel.tsx
import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  /** On dark surfaces, adjust colors */
  dark?: boolean;
}

/**
 * SectionLabel — monospace eyebrow with a small brass tick accent.
 * Used above section headings to orient the reader.
 */
export function SectionLabel({ children, className, dark }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'type-mono-label inline-flex items-center gap-2',
        dark ? 'text-mute' : 'text-graphite',
        className,
      )}
    >
      {/* Brass tick */}
      <span
        className='block h-px w-5 flex-shrink-0'
        style={{ backgroundColor: 'var(--color-brass)' }}
        aria-hidden='true'
      />
      <span>{children}</span>
    </div>
  );
}
