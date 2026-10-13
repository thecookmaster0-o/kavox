import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'
import { cn } from '@/lib/utils'
import { CaseStudyZjut } from '@/components/home/case-study-zjut'

const PROJECTS = [
  {
    title: 'Nightfall',
    subtitle: 'Home kit 26/27',
    team: 'Lyon University Football Club',
    sport: 'Football',
    year: '2026',
    service: 'Custom Team Kit Design',
    image: '/images/work-football.png',
    alt: 'Navy and electric blue football jersey hanging in a dark stadium tunnel',
    color: 'var(--primary)',
    coords: '45° 45\' N · 04° 50\' E',
  },
  {
    title: 'Heatcheck',
    subtitle: 'City edition',
    team: 'Harbor City Ballers',
    sport: 'Basketball',
    year: '2026',
    service: 'Identity + Kit System',
    image: '/images/work-basketball.png',
    alt: 'Black and orange basketball jersey on a hanger in a dark indoor court',
    color: 'var(--blaze)',
    coords: '40° 42\' N · 74° 00\' W',
  },
  {
    title: 'Violet Wall',
    subtitle: 'Competition set',
    team: 'Ostrava Volley Collective',
    sport: 'Volleyball',
    year: '2025',
    service: 'Custom Team Kit Design',
    image: '/images/work-volleyball.png',
    alt: 'Graphite and purple volleyball jersey folded on a concrete plinth under a spotlight',
    color: 'var(--ultra)',
    coords: '49° 49\' N · 18° 15\' E',
  },
  {
    title: 'Baseline',
    subtitle: 'Tour polo',
    team: 'Riverside Tennis Academy',
    sport: 'Tennis',
    year: '2025',
    service: 'Apparel Line Design',
    image: '/images/work-tennis.png',
    alt: 'White and neon green tennis polo floating against a dark background',
    color: 'var(--volt)',
    coords: '51° 30\' N · 00° 07\' W',
  },
]

export function Works() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-border py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-16 flex flex-col gap-8 md:mb-24">
          <Reveal>
            <SectionLabel index="03">Selected work</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="work-title" className="font-display text-balance text-5xl md:text-7xl">
              Designed.
              <br />
              Produced. Delivered.
            </h2>
          </Reveal>
        </div>

        <CaseStudyZjut />

        <div className="mb-16 mt-24 flex flex-col gap-4 border-t border-border pt-10 md:mb-24 md:mt-40 md:flex-row md:items-end md:justify-between">
          <h3 className="font-display text-3xl md:text-5xl">Studio directions</h3>
          <p className="hud max-w-sm text-muted-foreground">Exploratory kit directions from the studio — a glimpse of the identity systems we build across sports.</p>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title}>
              <article
                aria-labelledby={`work-${i}`}
                className={cn('grid gap-8 lg:grid-cols-12 lg:items-end', i % 2 === 1 && 'lg:[&>*:first-child]:order-2')}
              >
                <div className="group relative overflow-hidden lg:col-span-8">
                  <div className="relative aspect-[16/10] overflow-hidden bg-card">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-25"
                      style={{ backgroundColor: p.color }}
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    <div className="hud absolute inset-x-0 top-0 flex justify-between p-4 text-foreground/80 md:p-6">
                      <span>{p.coords}</span>
                      <span>{`${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`}</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-6">
                      <span className="hud flex items-center gap-2">
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: p.color }} aria-hidden="true" />
                        {p.subtitle}
                      </span>
                      <span className="hud text-foreground/60">REC ● 00:{String(24 + i * 7).padStart(2, '0')}:12</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8 lg:col-span-4">
                  <div className="flex flex-col gap-3">
                    <p className="hud text-muted-foreground">Concept study</p>
                    <h4 id={`work-${i}`} className="font-display text-5xl md:text-6xl" style={{ textShadow: `0 0 60px ${p.color}` }}>
                      {p.title}
                    </h4>
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-border">
                    {[
                      ['Brief', p.team],
                      ['Sport', p.sport],
                      ['Year', p.year],
                      ['Service', p.service],
                    ].map(([k, v]) => (
                      <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-border py-3">
                        <dt className="hud text-muted-foreground">{k} :</dt>
                        <dd className="hud text-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
