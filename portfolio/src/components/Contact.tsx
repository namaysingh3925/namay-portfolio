import { Container, Rise, Section } from '@/components/ui/Layout'
import { MonoLabel } from '@/components/ui/Display'
import { PillButton } from '@/components/ui/PillButton'
import { education, profile, sections } from '@/data/resume'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

/** External / mail destinations for the footer's "Elsewhere" column. */
const elsewhere = [
  { label: 'GitHub', href: profile.github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, external: false },
]

/** Non-link facts for the footer's "Details" column. */
const details = [profile.location, profile.status, education.institution]

/**
 * Closing CTA on white paper, followed by the black footer with the giant
 * outlined wordmark. Two surfaces, two colour families — the CTA is
 * ink-family, everything inside <footer> is panel-family.
 */
export function Contact() {
  const { copied, copy } = useCopyToClipboard()
  const year = new Date().getFullYear()

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  A. CTA — white surface                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section id="contact" className="pb-24 md:pb-32 lg:pb-40">
        <div className="flex flex-col items-center text-center">
          <Rise>
            <MonoLabel>(06) Contact</MonoLabel>
          </Rise>

          <Rise delay={0.06}>
            <h2 className="display mt-6 text-ink text-[clamp(2.5rem,7.5vw,5.5rem)]">
              Ready to build
              <br />
              <em>something together?</em>
            </h2>
          </Rise>

          <Rise delay={0.12}>
            <p className="mx-auto mt-8 max-w-[34rem] text-base leading-relaxed text-ink-soft">
              Open to internships, collaborations and genuinely interesting
              problems. Email is the fastest way to reach me — one click copies
              the address.
            </p>
          </Rise>

          <Rise delay={0.18}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <PillButton variant="solid" href={`mailto:${profile.email}`}>
                Email me
              </PillButton>

              <PillButton
                variant="outline"
                arrow={false}
                onClick={() => {
                  void copy(profile.email)
                }}
                ariaLabel="Copy email address to clipboard"
              >
                {copied ? 'Copied' : profile.email}
              </PillButton>
            </div>
          </Rise>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/*  B. Footer — black surface, flush to the page edges              */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-panel rounded-t-3xl pt-20 pb-10 sm:rounded-t-4xl md:pt-28">
        <Container>
          {/* Link columns */}
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-10">
            <div>
              <MonoLabel invert>Navigate</MonoLabel>
              <ul className="mt-6 space-y-3">
                {sections.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-panel-soft transition-colors duration-300 hover:text-paper"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <MonoLabel invert>Elsewhere</MonoLabel>
              <ul className="mt-6 space-y-3">
                {elsewhere.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-panel-soft transition-colors duration-300 hover:text-paper"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <MonoLabel invert>Details</MonoLabel>
              <ul className="mt-6 space-y-3">
                {details.map((item) => (
                  <li key={item} className="text-sm text-panel-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/*
            The template's signature move: an oversized outlined wordmark that
            runs wider than its container. Clipped here so the page itself
            never scrolls sideways.
          */}
          <div className="mt-20 overflow-hidden md:mt-24">
            <div
              aria-hidden
              className="display stroke-text select-none text-[clamp(3.5rem,16vw,13rem)] whitespace-nowrap"
            >
              {profile.name.toUpperCase()}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col gap-3 border-t border-panel-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <span className="mono-label text-panel-faint">
              © {year} {profile.name}
            </span>
            <span className="mono-label text-panel-faint">
              Built with React, Tailwind &amp; Framer Motion
            </span>
          </div>
        </Container>
      </footer>
    </>
  )
}
