import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MonoLabel, SectionHeading } from '@/components/ui/Display'
import { Section } from '@/components/ui/Layout'
import { skills } from '@/data/resume'
import { cn } from '@/lib/utils'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FILTERS = ['All', 'Frontend', 'Backend', 'ML / Data', 'Tools'] as const
type Filter = (typeof FILTERS)[number]

/** `level` still drives the copy — it is never drawn as a bar or a percentage. */
function proficiency(level: number) {
  if (level >= 86) return 'ADVANCED'
  if (level >= 76) return 'PROFICIENT'
  return 'WORKING'
}

/**
 * Capabilities as an editorial index rather than a dashboard: a mono filter row
 * with a sliding black pill, then a two-column hairline list of names and
 * plain-language proficiency. Light surface — no primitive is inverted.
 */
export function Skills() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo(
    () => (filter === 'All' ? skills : skills.filter((s) => s.category === filter)),
    [filter],
  )

  return (
    <Section id="skills" alt>
      <SectionHeading eyebrow="(04) CAPABILITIES" lead="Skills &" accent="Tools" />

      {/* Filter row */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-10 flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between md:mb-14"
      >
        <div className="-ml-1 flex flex-wrap items-center gap-1">
          {FILTERS.map((option) => {
            const isActive = option === filter

            return (
              <button
                key={option}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(option)}
                className={cn(
                  'relative rounded-full px-4 py-2 transition-colors duration-300',
                  'mono-label',
                  isActive ? 'text-paper' : 'text-ink-faint hover:text-ink',
                )}
              >
                {isActive && (
                  <motion.span
                    aria-hidden
                    layoutId="skills-filter-pill"
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative z-10">{option}</span>
              </button>
            )
          })}
        </div>

        <MonoLabel className="shrink-0 sm:text-right">
          {filtered.length} Entries
        </MonoLabel>
      </motion.div>

      {/* Index */}
      <motion.div
        layout
        transition={{ duration: 0.45, ease: EASE }}
        className="grid grid-cols-1 border-b border-line md:grid-cols-2 md:gap-x-16 lg:gap-x-24"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-baseline justify-between gap-6 border-t border-line py-4 md:py-5"
            >
              <span className="display min-w-0 text-[1.25rem] text-ink">{skill.name}</span>
              <span className="mono-label shrink-0 text-ink-faint">
                {proficiency(skill.level)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
