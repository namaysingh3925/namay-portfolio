import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** Shared horizontal gutter + max width for every section. */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </div>
  )
}

/** A light section on white paper. */
export function Section({
  id,
  children,
  className,
  alt = false,
}: {
  id?: string
  children: ReactNode
  className?: string
  alt?: boolean
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-28 lg:py-32',
        alt ? 'bg-paper-alt' : 'bg-paper',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}

/**
 * The template's inverted block: a pure-black, heavily rounded panel inset
 * from the page edges, used to break up the white between sections.
 */
export function BlackPanel({
  id,
  children,
  className,
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className="bg-paper px-2 sm:px-4 lg:px-6">
      <div
        className={cn(
          'mx-auto w-full max-w-[90rem] rounded-3xl bg-panel px-5 py-20 sm:rounded-4xl sm:px-10 md:py-28 lg:px-16 lg:py-32',
          className,
        )}
      >
        <div className="mx-auto w-full max-w-[78rem]">{children}</div>
      </div>
    </section>
  )
}

/** Standard entrance: a short rise with a long ease, matching the template. */
export function Rise({
  children,
  delay = 0,
  className,
  amount = 0.3,
}: {
  children: ReactNode
  delay?: number
  className?: string
  amount?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Infinite horizontal strip, duplicated so the loop is seamless. */
export function Marquee({
  items,
  invert = false,
}: {
  items: string[]
  invert?: boolean
}) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-mask overflow-hidden">
      <div className="animate-marquee flex w-max items-center gap-14">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              'mono-label whitespace-nowrap',
              invert ? 'text-panel-faint' : 'text-ink-faint',
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
