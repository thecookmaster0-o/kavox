import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const KIT = '/images/zjut-tennis-kit.jpeg'

const VIEWS = [
  { label: 'Shorts — Front', position: '0% 50%' },
  { label: 'Shorts — Back', position: '50% 50%' },
  { label: 'Polo — Front', position: '100% 50%' },
]

const JOURNEY = [
  {
    n: '01',
    phase: 'Design process',
    body: 'Built around the university crest and navy identity. Angular slash graphics on the polo body, grey mesh side panels and white piping for a clean court-ready silhouette.',
    meta: 'Crest integration · Colorway · Mockups',
  },
  {
    n: '02',
    phase: 'Manufacturing',
    body: 'Produced with a professional sportswear manufacturer in breathable performance fabric, with sample approval and quality inspection before the full run.',
    meta: 'Sampling · Production · QC',
  },
  {
    n: '03',
    phase: 'Final delivery',
    body: 'Finished kits delivered to the team, ready for the 2026 competition season, with direct support from the studio through to hand-off.',
    meta: 'Packed · Shipped · Delivered',
  },
]

const SPECS = [
  ['Client', 'ZJUT Tennis Team'],
  ['Sport', 'Tennis'],
  ['Season', '2026'],
  ['Scope', 'Design + Production + Delivery'],
  ['Pieces', 'Polo jersey · Match shorts'],
]

export function CaseStudyZjut() {
  return (
    <article aria-labelledby="case-zjut" className="flex flex-col gap-10 md:gap-16">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="hud flex items-center gap-2 text-volt">
              <span className="size-1.5 animate-pulse rounded-full bg-volt" aria-hidden="true" />
              Case study 01 — Delivered
            </p>
            <h3 id="case-zjut" className="font-display text-balance text-4xl sm:text-5xl md:text-7xl">
              ZJUT TENNIS TEAM
              <br />
              <span className="text-muted-foreground">2026 COLLECTION</span>
            </h3>
          </div>
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            A real university kit: designed in-studio, manufactured with professional partners and delivered to the team.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <figure className="relative overflow-hidden border border-border bg-card">
          <div className="relative aspect-[16/9]">
            <Image
              src={KIT}
              alt="ZJUT tennis kit: navy match shorts with grey side panels shown front and back, and a white polo jersey with navy collar and crest"
              fill
              sizes="(min-width: 1600px) 1520px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="hud flex flex-wrap items-center justify-between gap-2 border-t border-border bg-background px-4 py-3 text-muted-foreground md:px-6">
            <span>Final kit — Full set</span>
            <span>Navy · White · Silver grey</span>
          </figcaption>
        </figure>
      </Reveal>

      <ul className="grid grid-cols-3 gap-2 md:gap-4" aria-label="Kit views">
        {VIEWS.map((v, i) => (
          <Reveal as="li" key={v.label} delay={i * 100} className="flex flex-col gap-2">
            <div className="relative aspect-[3/4] overflow-hidden border border-border bg-card">
              <Image
                src={KIT}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 33vw"
                className="object-cover"
                style={{ objectPosition: v.position }}
              />
            </div>
            <p className="hud text-[10px] text-muted-foreground md:text-xs">{v.label}</p>
          </Reveal>
        ))}
      </ul>

      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-border">
            {SPECS.map(([k, v]) => (
              <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-border py-3">
                <dt className="hud text-muted-foreground">{k} :</dt>
                <dd className="hud text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ol className="grid gap-px border border-border bg-border lg:col-span-8 md:grid-cols-3">
          {JOURNEY.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 120} className="flex flex-col gap-4 bg-background p-6 md:p-8">
              <span className="font-display text-4xl text-foreground/15">{step.n}</span>
              <h4 className="font-display text-2xl">{step.phase}</h4>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              <p className="hud mt-auto border-t border-border pt-4 text-muted-foreground">{step.meta}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </article>
  )
}
