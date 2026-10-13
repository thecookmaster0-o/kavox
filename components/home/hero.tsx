'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const target = { x: 0, y: 0, s: 0 }

    const apply = () => {
      frame = 0
      node.style.setProperty('--mx', target.x.toFixed(3))
      node.style.setProperty('--my', target.y.toFixed(3))
      node.style.setProperty('--sy', target.s.toFixed(1))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5
      target.y = e.clientY / window.innerHeight - 0.5
      schedule()
    }
    const onScroll = () => {
      target.s = Math.min(window.scrollY, window.innerHeight)
      schedule()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-svh flex-col overflow-hidden pt-16"
      style={{ '--mx': 0, '--my': 0, '--sy': 0 } as React.CSSProperties}
    >
      {/* Stadium lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[70vh] w-[70vw] animate-drift rounded-full bg-primary/25 blur-[140px]" />
        <div
          className="absolute -right-1/4 bottom-0 h-[60vh] w-[60vw] animate-drift rounded-full bg-blaze/20 blur-[140px]"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="absolute left-1/3 top-1/3 h-[40vh] w-[40vw] animate-drift rounded-full bg-volt/10 blur-[120px]"
          style={{ animationDelay: '-12s' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* HUD row */}
      <div className="mx-auto flex w-full max-w-[1600px] items-start justify-between px-5 pt-6 md:px-10">
        <div className="hud flex flex-col gap-1 text-muted-foreground">
          <span>{'43° 17\' 02" N'}</span>
          <span>{'05° 22\' 16" E'}</span>
        </div>
        <div className="hud hidden flex-col items-end gap-1 text-muted-foreground sm:flex">
          <span>Kit_No. 026 / Home</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-volt" />
            Studio online
          </span>
        </div>
      </div>

      {/* Stage */}
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col items-center justify-center px-5 md:px-10">
        <p
          aria-hidden="true"
          className="font-display pointer-events-none select-none whitespace-nowrap text-[20vw] text-foreground/[0.07] md:text-[17vw]"
          style={{
            transform:
              'translate3d(calc(var(--mx) * -40px), calc(var(--sy) * 0.25px), 0)',
          }}
        >
          Kavox
        </p>

        <div
          className="absolute inset-x-0 top-[44%] mx-auto w-[min(960px,150vw)] [mask-image:radial-gradient(ellipse_45%_50%_at_center,black_55%,transparent_100%)] sm:w-[min(960px,95vw)]"
          style={{
            transform: `translate3d(calc(var(--mx) * 30px), calc(-50% + var(--my) * 20px - var(--sy) * 0.15px), 0)`,
          }}
        >
          <div className="animate-float">
            <Image
              src="/images/hero-jersey.png"
              alt="Black KAVOX football jersey with electric blue and neon green speed graphics"
              width={1408}
              height={768}
              priority
              className="h-auto w-full"
              style={{
                transform:
                  'perspective(1200px) rotateY(calc(var(--mx) * 14deg)) rotateX(calc(var(--my) * -8deg))',
              }}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 mix-blend-overlay"
          >
            <div className="absolute inset-x-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="relative mx-auto grid w-full max-w-[1600px] gap-8 px-5 pb-10 md:grid-cols-12 md:items-end md:px-10 md:pb-14">
        <div className="md:col-span-7">
          <p className="hud mb-4 text-primary">KAVOX Sports — Complete team identity systems</p>
          <h1 id="hero-title" className="font-display text-balance text-4xl sm:text-5xl lg:text-7xl">
            WE BUILD SPORTS IDENTITIES.
            <br />
            <span className="text-muted-foreground">From first sketch to final kit.</span>
          </h1>
        </div>
        <div className="flex flex-col gap-6 md:col-span-5">
          <p className="max-w-md text-pretty text-lg leading-relaxed text-foreground/85">
            {"Custom performance kits designed around your team's story, colors, and ambition. We shape the identity, then deliver the pieces your team takes to the court."}
          </p>
          <ul className="hud grid grid-cols-3 gap-px border border-border bg-border text-[10px] sm:text-xs" aria-label="What KAVOX delivers">
            {['Original design', 'Pro manufacturing', 'Worldwide delivery'].map((item) => (
              <li key={item} className="flex items-center gap-2 bg-background/80 px-3 py-3 text-muted-foreground backdrop-blur">
                <span className="size-1 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="hud group inline-flex items-center gap-3 bg-primary px-6 py-4 text-primary-foreground transition-all hover:shadow-[0_0_40px_-4px_var(--primary)]"
            >
              START YOUR KIT
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/#work"
              className="hud group inline-flex items-center gap-3 border border-foreground/20 px-6 py-4 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              View our work
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
