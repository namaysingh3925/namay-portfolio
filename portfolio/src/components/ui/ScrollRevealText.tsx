import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

function Word({
  children,
  progress,
  range,
  invert,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  invert: boolean
}) {
  const opacity = useTransform(progress, range, [invert ? 0.22 : 0.18, 1])

  return (
    <span className="relative mr-[0.26em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

/**
 * NexStudio's scroll-driven paragraph: words start faded and resolve to full
 * contrast one after another as the block moves up through the viewport.
 */
export function ScrollRevealText({
  text,
  className,
  invert = false,
}: {
  text: string
  className?: string
  invert?: boolean
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  })

  const words = text.split(' ')

  return (
    <p
      ref={ref}
      className={cn(
        'flex flex-wrap',
        invert ? 'text-paper' : 'text-ink',
        className,
      )}
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          invert={invert}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}
