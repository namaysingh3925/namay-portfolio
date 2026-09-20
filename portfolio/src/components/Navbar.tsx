import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { X } from 'lucide-react'
import { profile, sections } from '@/data/resume'
import { useActiveSection } from '@/hooks/useActiveSection'
import { PillButton } from '@/components/ui/PillButton'
import { cn } from '@/lib/utils'

const sectionIds = sections.map((section) => section.id)

/** "Namay" + italic uppercase "SINGH", the template's Nex/STUDIO wordmark. */
const [givenName, ...restOfName] = profile.name.split(' ')
const surname = restOfName.join(' ')

const EASE = [0.22, 1, 0.36, 1] as const

const contactLinks = [
  { label: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'GitHub', href: profile.github, external: true },
]

function Wordmark({ invert = false }: { invert?: boolean }) {
  return (
    <span
      className={cn(
        'text-[17px] font-medium tracking-tight md:text-[18px]',
        invert ? 'text-paper' : 'text-ink',
      )}
    >
      {givenName}
      {/* Hair gap so a person's name still reads as two words, not one brand word. */}
      <em className="ml-[0.18em] uppercase">{surname}</em>
    </span>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  // Spring-smoothed reading-progress hairline pinned to the very top.
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page behind the full-screen overlay and close it on Escape.
  useEffect(() => {
    if (!menuOpen) return

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-ink"
      />

      {/* The bar sits over the white hero, so its ink stays constant; only the
          backdrop and the hairline fade in once the page has moved. */}
      <div
        className={cn(
          'border-b transition-colors duration-300',
          scrolled
            ? 'border-line bg-paper/85 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 w-full max-w-[84rem] items-center justify-between px-5 sm:px-8 md:h-20 lg:px-12">
          <a href="#home" aria-label={`${profile.name} — back to top`}>
            <Wordmark />
          </a>

          <div className="flex items-center gap-5 sm:gap-7">
            <PillButton
              href={`mailto:${profile.email}`}
              variant="solid"
              className="hidden sm:inline-flex"
            >
              GET IN TOUCH
            </PillButton>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="mono-label text-ink underline-offset-[6px] transition-colors duration-300 hover:underline"
            >
              MENU
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-panel"
          >
            <div className="mx-auto flex min-h-full w-full max-w-[84rem] flex-col px-5 sm:px-8 lg:px-12">
              <div className="flex h-16 shrink-0 items-center justify-between md:h-20">
                <a
                  href="#home"
                  onClick={() => setMenuOpen(false)}
                  aria-label={`${profile.name} — back to top`}
                >
                  <Wordmark invert />
                </a>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="mono-label flex items-center gap-2 text-panel-soft transition-colors duration-300 hover:text-paper"
                >
                  <X size={15} strokeWidth={1.5} />
                  CLOSE
                </button>
              </div>

              <nav className="flex-1 py-10 md:py-16">
                <ul className="border-t border-panel-line">
                  {sections.map((section, i) => {
                    const isActive = active === section.id

                    return (
                      <motion.li
                        key={section.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.08 + i * 0.05,
                          ease: EASE,
                        }}
                        className="border-b border-panel-line"
                      >
                        <a
                          href={`#${section.id}`}
                          onClick={() => setMenuOpen(false)}
                          aria-current={isActive ? 'true' : undefined}
                          className="group flex items-baseline gap-4 py-3 sm:gap-7 md:py-4"
                        >
                          <span className="shrink-0 font-mono text-xs italic text-panel-faint">
                            #{i + 1}
                          </span>
                          <span
                            className={cn(
                              'display text-[clamp(2rem,7vw,4rem)] transition-colors duration-300',
                              isActive
                                ? 'text-paper'
                                : 'text-panel-faint group-hover:text-paper',
                            )}
                          >
                            {section.label}
                          </span>
                        </a>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
                className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-3 border-t border-panel-line py-8"
              >
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="mono-label break-all text-panel-soft underline-offset-4 transition-colors duration-300 hover:text-paper hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
