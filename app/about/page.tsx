import type { Metadata } from 'next'
import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'
import { FinalCta } from '@/components/home/final-cta'

export const metadata: Metadata = {
  title: 'About',
  description:
    'KAVOX SPORTS is a creative studio building sports identities — custom jerseys and team kits that make every club feel unique.',
}

const STATS = [
  { value: '140+', label: 'Teams dressed' },
  { value: '23', label: 'Countries shipped' },
  { value: '6', label: 'Sports covered' },
  { value: '100%', label: 'Original designs' },
]

const VALUES = [
  {
    title: 'Identity over inventory',
    body: 'We are not a catalog. A jersey is the flag a team carries onto the field — it should say something only your team can say.',
  },
  {
    title: 'Craft at every level',
    body: 'Sunday league, university squad or national club: every brief gets the same design rigor and the same performance fabrics.',
  },
  {
    title: 'Built with players',
    body: 'We test fits, listen to captains and design for movement, sweat and the last ten minutes of a tight game.',
  },
]

export default function AboutPage() {
  return (
    <main className="pt-16">
      <section aria-labelledby="about-title" className="relative overflow-hidden">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-28">
          <Reveal>
            <SectionLabel index="00">About the studio</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h1 id="about-title" className="font-display max-w-6xl text-balance text-5xl sm:text-7xl md:text-8xl">
              We build sports identities.
            </h1>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative mx-auto aspect-[16/9] max-w-[1600px] overflow-hidden md:aspect-[21/9]">
            <Image
              src="/images/studio.webp"
              alt="KAVOX studio at night with a designer sewing a jersey prototype among fabric racks"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="hud absolute inset-x-0 top-0 flex justify-between p-5 text-foreground/80 md:p-8">
              <span>Studio — Marseille, FR</span>
              <span>Cam A · 35mm</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="mission-title" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel index="01">Mission</SectionLabel>
            </Reveal>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-8">
            <Reveal>
              <h2 id="mission-title" className="text-balance text-3xl font-medium leading-tight md:text-5xl">
                KAVOX SPORTS is a creative studio helping teams design jerseys that represent{' '}
                <span className="text-primary">who they are</span> — not what a catalog had in stock.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                Founded by designers who grew up playing, we combine fashion-level creative direction with professional sportswear manufacturing. From grassroots clubs to university programs, we give every team the kind of identity once reserved for the pros.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Studio in numbers" className="border-y border-border">
        <dl className="mx-auto grid max-w-[1600px] grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className="flex flex-col gap-3 border-border p-8 md:p-12 [&:not(:last-child)]:border-r max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b"
            >
              <dt className="hud order-2 text-muted-foreground">{s.label}</dt>
              <dd className="font-display order-1 text-6xl md:text-7xl">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section aria-labelledby="values-title" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="mb-16 flex flex-col gap-8">
            <Reveal>
              <SectionLabel index="02">What drives us</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2 id="values-title" className="font-display text-5xl md:text-7xl">
                The playbook.
              </h2>
            </Reveal>
          </div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 120} className="flex flex-col gap-10 bg-background p-8 md:p-10">
                <span className="hud text-primary">{`Rule ${String(i + 1).padStart(2, '0')}`}</span>
                <div className="flex flex-col gap-4">
                  <h3 className="font-display text-3xl">{v.title}</h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  )
}
