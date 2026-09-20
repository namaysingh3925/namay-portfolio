import { motion } from 'framer-motion'
import { Container, Marquee } from '@/components/ui/Layout'
import { Display, MonoLabel } from '@/components/ui/Display'
import { PillButton } from '@/components/ui/PillButton'
import { FluidParticlesBackground } from '@/components/ui/fluid-particles-background'
import { profile, skills } from '@/data/resume'

const EASE = [0.22, 1, 0.36, 1] as const

/** The client-logo strip of the template, rebuilt from the skills list. */
const technologies = skills.map((skill) => skill.name)

const textLinks = [
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, external: false },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-paper"
    >
      {/*
        Drifting flow field behind the fold. Purely decorative, so it is
        click-through and hidden from assistive tech; the count is tuned well
        below the component default to keep the hero cheap to paint.
      */}
      <FluidParticlesBackground
        particleCount={650}
        className="pointer-events-none absolute inset-0 h-full bg-transparent opacity-65"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 items-center pt-28 pb-16 md:pt-36 md:pb-20"
      >
        <Container>
          {/* Availability + location, the template's eyebrow row. */}
          <motion.div variants={item}>
            <MonoLabel className="flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-soft">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
              />
              <span>{profile.status}</span>
              <span aria-hidden className="text-ink-faint">
                /
              </span>
              <span>{profile.location}</span>
            </MonoLabel>
          </motion.div>

          {/* The name is a byline here — the h1 carries the positioning line. */}
          <motion.div variants={item} className="mt-9 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 shrink-0 bg-line-strong" />
            <span className="mono-label text-ink">{profile.name}</span>
          </motion.div>

          <motion.div variants={item} className="mt-5">
            <Display
              as="h1"
              lead="AI/ML Engineer &"
              accent="Product Builder."
              className="max-w-[17ch] text-[clamp(2.75rem,9vw,7rem)]"
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 max-w-[34rem] text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <PillButton href="#projects" variant="solid">
              VIEW WORK
            </PillButton>
            <PillButton
              href={profile.resumeUrl}
              variant="outline"
              download
              arrow={false}
            >
              DOWNLOAD RESUME
            </PillButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {textLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="mono-label text-ink-soft underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </Container>
      </motion.div>

      {/* Full-bleed technology strip closing the fold. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        className="relative z-10 border-t border-line bg-paper py-6"
      >
        <Marquee items={technologies} />
      </motion.div>
    </section>
  )
}
