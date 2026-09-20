import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/ui/Display'
import { Section } from '@/components/ui/Layout'
import { experience } from '@/data/resume'
import { cn } from '@/lib/utils'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * NexStudio's "Our Services" numbered list, applied to work history: full-width
 * rows split by hairlines, an italic monospace index, and an inline expansion
 * that reveals the highlights and stack. Light surface throughout — every text
 * colour comes from the white-surface column of the contrast scale.
 */
export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <Section id="experience">
      <SectionHeading eyebrow="(02) EXPERIENCE" lead="Where I've" accent="Worked" />

      <div className="border-b border-line">
        {experience.map((item, index) => {
          const isOpen = openId === item.id
          const panelId = `experience-panel-${item.id}`

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.07, ease: EASE }}
              className="border-t border-line"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className={cn(
                  'group flex w-full items-start gap-4 px-2 py-8 text-left',
                  'transition-colors duration-300 hover:bg-paper-alt md:gap-10 md:py-10',
                )}
              >
                {/* Index */}
                <span className="mono-label mt-2 w-9 shrink-0 italic text-ink-faint md:w-16">
                  #{index + 1}
                </span>

                {/* Main column */}
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'display block text-[clamp(1.5rem,3vw,2.25rem)] text-ink',
                      'transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                      'group-hover:translate-x-1.5',
                    )}
                  >
                    {item.role}
                  </span>

                  <span className="mono-label mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-faint">
                    <span>{item.company}</span>
                    <span aria-hidden className="text-ink-faint">
                      /
                    </span>
                    <span>{item.period}</span>
                    <span aria-hidden className="text-ink-faint">
                      /
                    </span>
                    <span>{item.location}</span>
                  </span>

                  <span className="mt-4 block max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-soft md:text-base">
                    {item.summary}
                  </span>
                </span>

                {/* Expand affordance */}
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line',
                    'text-ink transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    'group-hover:border-line-strong',
                    isOpen && 'rotate-45 border-ink bg-ink text-paper group-hover:border-ink',
                  )}
                >
                  <Plus size={16} strokeWidth={1.5} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pb-9 md:pb-12 md:pl-[6.5rem] md:pr-14">
                      <ul className="border-t border-line">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-4 border-b border-line py-3.5"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-ink-faint"
                            />
                            <span className="max-w-[46rem] text-[0.9375rem] leading-relaxed text-ink-soft">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="mono-label mr-1 text-ink-faint">STACK</span>
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="mono-label rounded-full border border-line px-3 py-1.5 text-ink-soft"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
