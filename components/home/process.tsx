import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'
import { Check } from 'lucide-react'

const PILLARS = ['Original designs', 'Professional manufacturing', 'Quality control', 'Worldwide delivery', 'Direct communication']

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: "We understand your team's identity, colors, sport, and vision before a single line is drawn.",
    meta: 'Consultation · Moodboard',
    color: 'var(--primary)',
  },
  {
    n: '02',
    title: 'Design',
    body: 'We create original jersey concepts and a clear visual direction: graphics, typography, numbers and colorways.',
    meta: 'Original concepts · Mockups',
    color: 'var(--volt)',
  },
  {
    n: '03',
    title: 'Produce',
    body: 'We work with professional manufacturers to produce high-quality kits, with sample approval and quality control.',
    meta: 'Sampling · Quality control',
    color: 'var(--blaze)',
  },
  {
    n: '04',
    title: 'Deliver',
    body: 'We ship finished kits worldwide and support your team until the project is complete.',
    meta: 'Worldwide shipping · Support',
    color: 'var(--ultra)',
  },
]

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <div className="flex flex-col gap-8">
            <Reveal>
              <SectionLabel index="02">Process</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 id="process-title" className="font-display text-balance text-5xl md:text-7xl">
                FROM CONCEPT
                <br />
                TO CHAMPIONSHIP.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              One studio handles the complete journey, so team managers deal with one point of contact from first idea to finished kit.
            </p>
          </Reveal>
        </div>

        <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 120}
              className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-background p-8 md:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-1/2 left-1/2 size-[140%] -translate-x-1/2 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-30"
                style={{ backgroundColor: step.color }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style={{ backgroundColor: step.color }}
              />

              <div className="relative flex items-start justify-between">
                <span className="font-display text-7xl text-foreground/10 transition-colors duration-500 group-hover:text-foreground md:text-8xl">
                  {step.n}
                </span>
                <span className="size-2 rounded-full" style={{ backgroundColor: step.color }} aria-hidden="true" />
              </div>

              <div className="relative flex flex-col gap-4">
                <h3 className="font-display text-3xl md:text-4xl">{step.title}</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{step.body}</p>
                <p className="hud border-t border-border pt-4 text-muted-foreground">{step.meta}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-px">
          <ul
            aria-label="What every KAVOX project includes"
            className="grid grid-cols-2 gap-px border border-t-0 border-border bg-border sm:grid-cols-3 lg:grid-cols-5"
          >
            {PILLARS.map((pillar) => (
              <li key={pillar} className="hud flex items-center gap-3 bg-background px-5 py-5 text-foreground md:px-8">
                <Check className="size-3.5 shrink-0 text-volt" aria-hidden="true" />
                {pillar}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
