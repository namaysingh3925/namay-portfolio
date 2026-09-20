import { Brain, Layers, LineChart, Webhook } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { profile, stats } from '@/data/resume'
import { BlackPanel, Rise } from '@/components/ui/Layout'
import { MonoLabel, SectionHeading } from '@/components/ui/Display'
import { ScrollRevealText } from '@/components/ui/ScrollRevealText'
import { cn } from '@/lib/utils'

interface Capability {
  Icon: LucideIcon
  title: string
  copy: string
}

/** Commentary, not resume data — what the day-to-day work actually looks like. */
const capabilities: Capability[] = [
  {
    Icon: Brain,
    title: 'Model Development',
    copy: 'Training, tuning and evaluating classifiers in TensorFlow and scikit-learn. Augmentation and hyperparameter search until the numbers hold on data the model has never seen.',
  },
  {
    Icon: Layers,
    title: 'Full-Stack Delivery',
    copy: 'React and Tailwind at the front, Node and Express behind it. The whole path from a first component to a build someone can actually open.',
  },
  {
    Icon: LineChart,
    title: 'Data & Analysis',
    copy: 'Exploratory analysis and feature engineering across six-figure datasets with Pandas and NumPy. Finding the signal long before anything gets trained on it.',
  },
  {
    Icon: Webhook,
    title: 'API Engineering',
    copy: 'FastAPI and Flask endpoints that put a trained model behind a clean contract. Documented, predictable and ready for a frontend to call.',
  },
]

export function About() {
  return (
    <BlackPanel id="about">
      <SectionHeading
        invert
        eyebrow="(01) ABOUT"
        lead="A Builder &"
        accent="Engineer"
        className="mb-8 md:mb-10"
      />

      {/* The centrepiece: the bio resolving word by word on scroll. */}
      <ScrollRevealText
        invert
        text={profile.bio}
        className="max-w-[52rem] text-[clamp(1.15rem,2.4vw,1.75rem)] leading-[1.5] tracking-[-0.02em]"
      />

      <Rise delay={0.1}>
        <p className="mt-8 max-w-[34rem] leading-relaxed text-panel-soft">
          What holds my attention is the whole path a model takes to reach a
          person — the training loop, the API that serves it, and the interface
          that finally makes it feel obvious. I would rather understand all
          three roughly at once than any one of them in isolation.
        </p>
      </Rise>

      {/* Stats — 2x2 on mobile, a single hairline-separated row from md up. */}
      <div className="mt-16 grid grid-cols-2 gap-y-12 border-t border-panel-line pt-12 md:mt-24 md:grid-cols-4 md:gap-y-0 md:pt-14">
        {stats.map((stat, i) => (
          <Rise
            key={stat.label}
            delay={i * 0.08}
            className={cn(
              'pr-4 md:pr-6',
              i % 2 === 1 && 'border-l border-panel-line pl-5 sm:pl-8',
              i > 0 && 'md:border-l md:border-panel-line md:pl-6 lg:pl-8',
            )}
          >
            <div className="display text-[clamp(2.25rem,6vw,3.75rem)] text-paper">
              {stat.value}
            </div>
            <MonoLabel invert className="mt-3 leading-snug">
              {stat.label}
            </MonoLabel>
          </Rise>
        ))}
      </div>

      {/* Capability grid — hairlines only, no cards, no white boxes. */}
      <div className="mt-20 md:mt-28">
        <MonoLabel invert>WHAT I DO</MonoLabel>

        <div className="mt-8 grid gap-y-10 sm:grid-cols-2">
          {capabilities.map(({ Icon, title, copy }, i) => (
            <Rise
              key={title}
              delay={i * 0.07}
              className={cn(
                'border-t border-panel-line pt-8 md:pt-10',
                i % 2 === 0
                  ? 'sm:border-r sm:border-panel-line sm:pr-8 md:pr-12'
                  : 'sm:pl-8 md:pl-12',
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <Icon size={20} strokeWidth={1.5} className="text-panel-soft" />
                <span className="mono-label italic text-panel-faint">
                  #{i + 1}
                </span>
              </div>

              <h3 className="display mt-6 text-[1.5rem] text-paper">{title}</h3>

              <p className="mt-3 max-w-[30rem] text-sm leading-relaxed text-panel-soft sm:text-[0.9375rem]">
                {copy}
              </p>
            </Rise>
          ))}
        </div>
      </div>
    </BlackPanel>
  )
}
