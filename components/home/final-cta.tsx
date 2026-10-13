import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="grain relative isolate overflow-hidden border-t border-border py-32 md:py-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-full h-[90vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[conic-gradient(from_180deg,var(--primary),var(--ultra),var(--signal),var(--blaze),var(--volt),var(--primary))] opacity-40 blur-[120px]" />
      </div>
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-12 px-5 text-center md:px-10">
        <Reveal>
          <p className="hud text-muted-foreground">New project — Brief open</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="cta-title" className="font-display text-balance text-5xl sm:text-6xl md:text-8xl">
            YOUR NEXT KIT STARTS HERE.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {"Tell us your vision. We'll build the identity your team wears."}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-4 overflow-hidden bg-foreground px-10 py-6 text-background"
          >
            <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
            <span className="hud relative text-sm transition-colors group-hover:text-primary-foreground">BUILD MY KIT</span>
            <ArrowRight className="relative size-5 transition-transform group-hover:translate-x-1 group-hover:text-primary-foreground" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
