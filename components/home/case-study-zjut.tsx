import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const KIT = '/images/zjut-tennis-kit.webp'

const PHOTOS = [
  {
    label: 'Team award',
    src: '/images/zjut-team-award.webp',
    alt: 'ZJUT tennis team holding competition awards in their KAVOX polos',
    position: '50% 44%',
  },
  {
    label: 'Back customization',
    src: '/images/zjut-jersey-back.webp',
    alt: 'ZJUT tennis players showing the custom names and crest on the backs of their polos',
    position: '50% 38%',
  },
  {
    label: 'Match action',
    src: '/images/zjut-on-court.webp',
    alt: 'ZJUT tennis player wearing the finished polo during a match',
    position: '68% 50%',
  },
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
              loading="lazy"
              sizes="(min-width: 1600px) 1520px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="hud flex flex-wrap items-center justify-between gap-2 border-t border-border bg-background px-4 py-3 text-muted-foreground md:px-6">
            <span>FINAL KIT — FULL SET</span>
            <span>NAVY • WHITE • SILVER GREY</span>
          </figcaption>
        </figure>
      </Reveal>

      <figure className="flex flex-col gap-4">
        <ul className="grid grid-cols-3 gap-2 md:gap-4" aria-label="Competition photos">
          {PHOTOS.map((photo, i) => (
            <Reveal as="li" key={photo.label} delay={i * 100} className="flex flex-col gap-2">
              <div className="group relative aspect-[3/4] overflow-hidden border border-border bg-card">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                sizes="(min-width: 768px) 33vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ objectPosition: photo.position }}
              />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <p className="hud text-[10px] text-muted-foreground md:text-xs">{photo.label}</p>
            </Reveal>
          ))}
        </ul>
        <figcaption className="hud flex flex-wrap items-center justify-between gap-2 border-y border-border py-3 text-muted-foreground">
          <span>FROM DESIGN TO COMPETITION</span>
          <span>ZJUT TENNIS TEAM • 2026</span>
        </figcaption>
      </figure>

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
