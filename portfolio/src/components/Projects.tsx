import { projects, profile, type Project } from '@/data/resume'
import { BlackPanel, Rise } from '@/components/ui/Layout'
import { SectionHeading } from '@/components/ui/Display'
import { PillButton } from '@/components/ui/PillButton'

/** Two-letter monogram used as the neutral cover artwork. */
function monogram(title: string) {
  return title
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

/* Faint monochrome dot grid over the cover plate — no colour, greys only. */
const dotGrid = {
  backgroundImage:
    'radial-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px)',
  backgroundSize: '14px 14px',
}

/* A single diagonal hairline crossing the plate. */
const diagonalHairline = {
  backgroundImage:
    'linear-gradient(115deg, transparent 46%, rgb(255 255 255 / 0.06) 46%, rgb(255 255 255 / 0.06) 46.4%, transparent 46.4%)',
}

function ProjectCard({ project }: { project: Project }) {
  const [category, ...restTags] = project.tags

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-panel-line bg-panel-2 p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-[#3a3a3a]">
      {/* 1 — title */}
      <h3 className="display text-[1.35rem] leading-[1.08] text-paper">
        {project.title}
      </h3>

      {/* 2 — ruled meta band: category left, year right */}
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-b border-panel-line py-3">
        <span className="mono-label text-panel-faint">{category}</span>
        <span className="mono-label text-panel-faint">{project.year}</span>
      </div>

      {/* 3 — neutral cover plate */}
      <div className="mt-5 aspect-[16/10] overflow-hidden rounded-2xl border border-panel-line">
        <div className="relative h-full w-full bg-gradient-to-br from-panel-3 to-panel transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
          <div className="absolute inset-0" style={dotGrid} aria-hidden />
          <div className="absolute inset-0" style={diagonalHairline} aria-hidden />
          <div className="absolute inset-0 grid place-items-center">
            <span
              aria-hidden
              className="display text-[clamp(2.5rem,7vw,3.5rem)] text-panel-faint/70"
            >
              {monogram(project.title)}
            </span>
          </div>
        </div>
      </div>

      {/* 4 — description */}
      <p className="mt-6 text-sm leading-relaxed text-panel-soft">
        {project.description}
      </p>

      {/* 5 — remaining tags */}
      {restTags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {restTags.map((tag) => (
            <span
              key={tag}
              className="mono-label rounded-full border border-panel-line px-3 py-1.5 text-panel-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 6 — actions */}
      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-panel-line pt-6">
        {project.demo ? (
          <PillButton
            href={project.demo}
            external
            variant="solid-invert"
            className="px-6 py-3"
          >
            LIVE DEMO
          </PillButton>
        ) : (
          <span
            aria-disabled
            title="Demo link not published yet"
            className="mono-label inline-flex cursor-not-allowed items-center rounded-full border border-panel-line px-6 py-3 text-panel-faint"
          >
            DEMO SOON
          </span>
        )}

        {project.repo ? (
          <PillButton
            href={project.repo}
            external
            variant="outline-invert"
            className="px-6 py-3"
          >
            CODE
          </PillButton>
        ) : (
          <span
            aria-disabled
            title="Repository is private"
            className="mono-label inline-flex cursor-not-allowed items-center rounded-full border border-panel-line px-6 py-3 text-panel-faint"
          >
            PRIVATE
          </span>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <BlackPanel id="projects">
      <SectionHeading
        invert
        eyebrow="(03) SELECTED WORK"
        lead="Recent"
        accent="Projects"
      />

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {projects.map((project, i) => (
          <Rise key={project.id} delay={i * 0.08} amount={0.2} className="h-full">
            <ProjectCard project={project} />
          </Rise>
        ))}
      </div>

      <Rise delay={0.1} className="mt-14 flex justify-center md:mt-16">
        <PillButton variant="outline-invert" href={profile.github} external>
          EXPLORE ALL PROJECTS
        </PillButton>
      </Rise>
    </BlackPanel>
  )
}
