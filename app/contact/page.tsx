import type { Metadata } from 'next'
import { BriefForm } from '@/components/contact/brief-form'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

export const metadata: Metadata = {
  title: 'Start your project',
  description: 'Send KAVOX SPORTS your project brief — team, sport, colors, quantity and deadline — and get a custom jersey concept.',
}

const NEXT = [
  ['48h', 'Designer replies with questions & quote'],
  ['7d', 'First concept & 3D mockups'],
  ['4–6w', 'Production & worldwide delivery'],
]

export default function ContactPage() {
  return (
    <main className="relative isolate overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-1/4 -top-1/4 -z-10 size-[70vw] animate-drift rounded-full bg-primary/15 blur-[140px]" />

      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 py-16 md:px-10 md:py-28 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <Reveal>
            <SectionLabel index="05">Project brief</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-balance text-5xl md:text-7xl">
              Let&apos;s build your kit.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Share the essentials and a KAVOX designer will get back to you with ideas, timelines and a transparent quote.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <ol className="border-t border-border">
              {NEXT.map(([t, d]) => (
                <li key={t} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-border py-4">
                  <span className="font-display text-xl text-primary">{t}</span>
                  <span className="text-sm text-muted-foreground">{d}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-7 lg:col-start-6">
          <BriefForm />
        </Reveal>
      </div>
    </main>
  )
}
