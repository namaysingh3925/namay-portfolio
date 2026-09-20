import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'solid-invert' | 'outline-invert'

const variants: Record<Variant, string> = {
  // On white paper
  solid: 'bg-ink text-paper border border-ink hover:bg-ink-2',
  outline: 'bg-transparent text-ink border border-line-strong hover:border-ink',
  // On black panels
  'solid-invert': 'bg-paper text-ink border border-paper hover:bg-paper-alt',
  'outline-invert':
    'bg-transparent text-paper border border-panel-line hover:border-paper',
}

interface PillButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  arrow?: boolean
  download?: boolean
  external?: boolean
  className?: string
  ariaLabel?: string
}

/**
 * NexStudio's signature pill: uppercase monospace label inside a fully rounded
 * button. The label is rendered twice and slides on hover — the first copy
 * exits upward while its duplicate arrives from below.
 */
export function PillButton({
  children,
  href,
  onClick,
  variant = 'solid',
  arrow = true,
  download = false,
  external = false,
  className,
  ariaLabel,
}: PillButtonProps) {
  const classes = cn(
    'group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5',
    'mono-label transition-colors duration-300',
    variants[variant],
    className,
  )

  const inner = (
    <>
      {/* Two stacked copies of the label produce the hover swap. */}
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

      {arrow && (
        <ArrowUpRight
          size={15}
          strokeWidth={1.75}
          className="shrink-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        download={download || undefined}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
      {inner}
    </button>
  )
}
