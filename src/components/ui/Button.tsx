// src/components/ui/Button.tsx
'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as an anchor tag */
  href?: string;
  /** Include trailing arrow (defaults to false for pure symmetrical centering) */
  arrow?: boolean;
  children: React.ReactNode;
}

const base =
  'group inline-flex items-center justify-center font-sans font-medium rounded-full ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ' +
  'cursor-pointer select-none touch-manipulation active:scale-[0.97] text-center leading-normal ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-paper rounded-full [@media(hover:hover)]:hover:bg-ink-2 shadow-xs',
  secondary:
    'bg-transparent text-ink rounded-full ring-1 ring-inset ring-[rgba(13,14,17,0.18)] ' +
    '[@media(hover:hover)]:hover:ring-[rgba(13,14,17,0.4)] [@media(hover:hover)]:hover:bg-ink/[0.03]',
};

const variantsDark: Record<ButtonVariant, string> = {
  primary:
    'bg-paper text-ink rounded-full [@media(hover:hover)]:hover:bg-paper-2 shadow-xs',
  secondary:
    'bg-transparent text-paper rounded-full ring-1 ring-inset ring-[rgba(255,255,255,0.2)] ' +
    '[@media(hover:hover)]:hover:ring-[rgba(255,255,255,0.45)] [@media(hover:hover)]:hover:bg-white/[0.04]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-4 py-1.5 text-xs',
  md: 'min-h-[40px] px-5 py-2 text-sm',
  lg: 'min-h-[48px] px-7 py-2.5 text-base',
};

/** Small arrow that nudges 2px right on fine-pointer hover */
function Arrow({ size = 'md', className }: { size?: ButtonSize; className?: string }) {
  const dim = size === 'sm' ? 12 : size === 'lg' ? 15 : 13;
  return (
    <svg
      aria-hidden='true'
      width={dim}
      height={dim}
      viewBox='0 0 14 14'
      fill='none'
      className={cn(
        'transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] shrink-0 ml-2 [@media(hover:hover)]:group-hover:translate-x-[2px]',
        className,
      )}
    >
      <path
        d='M1 7h10M8 4l3 3-3 3'
        stroke='currentColor'
        strokeWidth='1.35'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'lg', href, arrow = false, children, className, ...props },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        <span>{children}</span>
        {arrow && <Arrow size={size} />}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      <span>{children}</span>
      {arrow && <Arrow size={size} />}
    </button>
  );
});

Button.displayName = 'Button';

/** Dark-surface variant of Button */
export const ButtonDark = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonDark(
    { variant = 'primary', size = 'lg', href, arrow = false, children, className, ...props },
    ref,
  ) {
    const classes = cn(base, variantsDark[variant], sizes[size], className);

    if (href) {
      return (
        <a href={href} className={classes}>
          <span>{children}</span>
          {arrow && <Arrow size={size} />}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        <span>{children}</span>
        {arrow && <Arrow size={size} />}
      </button>
    );
  },
);

ButtonDark.displayName = 'ButtonDark';

