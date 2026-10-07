// src/components/ui/Badge.tsx
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * Badge — mono label with hairline border.
 * Use for status tags, version indicators, category labels.
 */
export function Badge({ children, className, dark }: BadgeProps) {
  return (
    <span
      className={cn(
        'type-mono-label inline-flex items-center px-2.5 py-1 rounded-[2px]',
        dark
          ? 'ring-1 ring-inset ring-[rgba(255,255,255,0.12)] text-mute'
          : 'ring-1 ring-inset ring-[rgba(13,14,17,0.12)] text-graphite',
        className,
      )}
    >
      {children}
    </span>
  );
}
