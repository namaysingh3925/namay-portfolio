import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Monospace eyebrow label — the small uppercase tag that sits above every
 * NexStudio heading and on every card meta row.
 */
export function MonoLabel({
  children,
  className,
  invert = false,
}: {
  children: ReactNode
  className?: string
  invert?: boolean
}) {
  return (
    <span
      className={cn(
        'mono-label block',
        invert ? 'text-panel-faint' : 'text-ink-faint',
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * The template's display heading: regular weight, very tight tracking, and a
 * trailing italic phrase. Pass `lead` for the roman part and `accent` for the
 * italic tail — e.g. lead="Our" accent="Services".
 */
export function Display({
  lead,
  accent,
  as: Tag = 'h2',
  className,
  invert = false,
}: {
  lead: string
  accent?: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  invert?: boolean
}) {
  return (
    <Tag
      className={cn(
        'display',
        invert ? 'text-paper' : 'text-ink',
        'text-[clamp(2.25rem,6.2vw,4.5rem)]',
        className,
      )}
    >
      {lead}
      {accent && (
        <>
          {' '}
          <em>{accent}</em>
        </>
      )}
    </Tag>
  )
}

/**
 * Eyebrow + display heading, revealed together on scroll. Used at the top of
 * every section so the vertical rhythm stays identical across the page.
 */
export function SectionHeading({
  eyebrow,
  lead,
  accent,
  invert = false,
  className,
  children,
}: {
  eyebrow?: string
  lead: string
  accent?: string
  invert?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-12 md:mb-16', className)}
    >
      {eyebrow && <MonoLabel invert={invert} className="mb-5">{eyebrow}</MonoLabel>}
      <Display lead={lead} accent={accent} invert={invert} />
      {children}
    </motion.div>
  )
}
