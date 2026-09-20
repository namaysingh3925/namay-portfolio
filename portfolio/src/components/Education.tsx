import { Award } from 'lucide-react'
import { certifications, education } from '@/data/resume'
import { Section, Rise } from '@/components/ui/Layout'
import { MonoLabel, SectionHeading } from '@/components/ui/Display'

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="(05) BACKGROUND"
        lead="Education &"
        accent="Certifications"
      />

      <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
        {/* ---------------- Degree ---------------- */}
        <div className="lg:col-span-3">
          <Rise>
            <MonoLabel className="mb-6">Degree</MonoLabel>

            <h3 className="display text-[clamp(1.6rem,3.6vw,2rem)] leading-[1.06] text-ink">
              {education.degree}
            </h3>

            <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-ink-soft">
              {education.institution}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="mono-label text-ink-faint">{education.period}</span>
              <span className="mono-label text-ink-faint">{education.location}</span>
            </div>
          </Rise>

          <ul className="mt-10 border-b border-line">
            {education.notes.map((note, i) => (
              <li key={note} className="border-t border-line">
                <Rise delay={0.06 + i * 0.07} amount={0.4} className="flex gap-5 py-5">
                  <span className="mt-0.5 shrink-0 font-mono text-xs italic text-ink-faint">
                    #{i + 1}
                  </span>
                  <p className="max-w-[34rem] text-sm leading-relaxed text-ink-soft">
                    {note}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------- Certifications ------------- */}
        <div className="lg:col-span-2">
          <Rise delay={0.08}>
            <MonoLabel className="mb-6">Certifications</MonoLabel>
          </Rise>

          <ul className="border-b border-line">
            {certifications.map((cert, i) => (
              <li key={cert.name} className="border-t border-line">
                <Rise
                  delay={0.1 + i * 0.07}
                  amount={0.4}
                  className="flex items-start justify-between gap-5 py-5"
                >
                  <div className="min-w-0">
                    <MonoLabel>{cert.issuer}</MonoLabel>
                    <p className="mt-2 text-sm leading-snug text-ink">{cert.name}</p>
                    {cert.year && (
                      <span className="mono-label mt-2 block text-ink-faint">
                        {cert.year}
                      </span>
                    )}
                  </div>
                  <Award
                    size={15}
                    strokeWidth={1.5}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-ink-faint"
                  />
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
