import Link from 'next/link'
import { Logo } from '@/components/logo'

const SPORTS = ['Football', 'Basketball', 'Volleyball', 'Tennis', 'Badminton', 'University', 'Amateur']

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div aria-hidden="true" className="flex overflow-hidden border-b border-border py-5">
        <div className="flex shrink-0 animate-marquee gap-10 whitespace-nowrap pr-10">
          {[...SPORTS, ...SPORTS].map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-4xl text-muted-foreground/40 md:text-6xl">
              {s}
              <span className="size-2 bg-primary" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-14 md:grid-cols-4 md:px-10">
        <div className="flex flex-col gap-4 md:col-span-2">
          <Logo />
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            A creative sports identity studio. We design and manufacture custom kits for teams that refuse to look ordinary.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="hud text-muted-foreground">Studio</p>
          <Link href="/about" className="text-sm hover:text-primary">About</Link>
          <Link href="/#work" className="text-sm hover:text-primary">Work</Link>
          <Link href="/#process" className="text-sm hover:text-primary">Process</Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="hud text-muted-foreground">Contact</p>
          <Link href="/contact" className="text-sm hover:text-primary">Project brief</Link>
          <a href="mailto:founder@kavoxsports.com" className="text-sm hover:text-primary">founder@kavoxsports.com</a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-2 border-t border-border px-5 py-6 md:flex-row md:px-10">
        <p className="hud text-muted-foreground">{'© 2026 KAVOX SPORTS'}</p>
        <p className="hud text-muted-foreground">Designed to compete — shipped worldwide</p>
      </div>
    </footer>
  )
}
