import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

const REASONS = [
  { title: 'Original design', body: 'No templates. Every crest, pattern and number font is drawn for your team.', color: 'var(--primary)' },
  { title: 'Pro manufacturing', body: 'The same suppliers and fabrics trusted by professional clubs.', color: 'var(--volt)' },
  { title: 'Fair pricing', body: 'Studio-grade design without the agency invoice. Transparent quotes per kit.', color: 'var(--blaze)' },
  { title: 'Worldwide delivery', body: 'Tracked shipping to clubs across Europe, the Americas, Africa and Asia.', color: 'var(--ultra)' },
  { title: 'Direct line', body: 'One dedicated designer from first call to final delivery. No call centers.', color: 'var(--signal)' },
  { title: 'Team-first', body: 'Sizing sessions, player names, numbers and keeper kits handled for you.', color: 'var(--primary)' },
]

export function Why() {
  return (
    <section aria-labelledby="why-title" className="border-t border-border py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Reveal>
            <SectionLabel index="04">Why Kavox</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="why-title" className="font-display text-balance text-5xl md:text-6xl">
              A design partner,
              <br />
              <span className="text-muted-foreground">not a supplier.</span>
            </h2>
          </Reveal>
        </div>

        <ul className="lg:col-span-7 lg:col-start-6">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 60} className="group relative border-t border-border last:border-b">
              <div
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 opacity-15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${r.color}, transparent)` }}
              />
              <div className="relative grid grid-cols-[3rem_1fr] gap-4 py-8 md:grid-cols-[4rem_1fr_1fr] md:items-center md:gap-8">
                <span className="hud text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                  {r.title}
                </h3>
                <p className="col-start-2 text-pretty text-sm leading-relaxed text-muted-foreground md:col-start-3">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
