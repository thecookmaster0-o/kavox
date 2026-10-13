'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'
import { cn } from '@/lib/utils'

const COLORS = [
  { name: 'Electric Blue', value: '#2f6bff' },
  { name: 'Volt', value: '#a6ff3d' },
  { name: 'Blaze', value: '#ff7a1a' },
  { name: 'Ultraviolet', value: '#8b3dff' },
  { name: 'Signal Red', value: '#ff2e3d' },
  { name: 'Ice', value: '#e8eef5' },
  { name: 'Gold', value: '#e9b949' },
  { name: 'Teal', value: '#14c8b4' },
  { name: 'Graphite', value: '#3a3c44' },
  { name: 'Midnight', value: '#16203d' },
] as const

const PATTERNS = ['Solid', 'Stripes', 'Hoops', 'Sash', 'Fade'] as const
type Pattern = (typeof PATTERNS)[number]
type Layer = 'primary' | 'secondary'

function patternBackground(pattern: Pattern, a: string, b: string) {
  switch (pattern) {
    case 'Stripes':
      return `repeating-linear-gradient(90deg, ${a} 0 7%, ${b} 7% 14%)`
    case 'Hoops':
      return `repeating-linear-gradient(180deg, ${a} 0 9%, ${b} 9% 18%)`
    case 'Sash':
      return `linear-gradient(120deg, ${a} 0 42%, ${b} 42% 58%, ${a} 58% 100%)`
    case 'Fade':
      return `linear-gradient(180deg, ${a} 15%, ${b} 85%)`
    default:
      return a
  }
}

export function Customizer() {
  const [primary, setPrimary] = useState<string>(COLORS[0].value)
  const [secondary, setSecondary] = useState<string>(COLORS[1].value)
  const [layer, setLayer] = useState<Layer>('primary')
  const [pattern, setPattern] = useState<Pattern>('Sash')
  const [crest, setCrest] = useState('KVX')

  const active = layer === 'primary' ? primary : secondary
  const setActive = layer === 'primary' ? setPrimary : setSecondary
  const activeName = COLORS.find((c) => c.value === active)?.name ?? ''

  useEffect(() => {
    // Warm the browser cache while the controls hydrate so color changes stay instant.
    const preview = new window.Image()
    preview.decoding = 'async'
    preview.src = '/images/jersey-base.webp'
  }, [])

  return (
    <section id="customize" aria-labelledby="customize-title" className="relative isolate overflow-hidden py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px] transition-colors duration-1000"
        style={{ backgroundColor: primary }}
      />

      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-8 lg:col-span-4">
          <Reveal>
            <SectionLabel index="01">Identity direction</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="customize-title" className="font-display text-balance text-5xl md:text-6xl xl:text-7xl">
              Your colors.
              <br />
              <span style={{ color: primary }} className="transition-colors duration-700">Your crest.</span>
              <br />
              Your story.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Every kit starts as a blank canvas. Use the visualizer to find a direction, then our designers turn it into a complete identity system no other team on earth will wear.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {/* Orbit ring */}
            <div aria-hidden="true" className="absolute inset-[6%] rounded-full border border-border" />
            <div aria-hidden="true" className="absolute inset-[13%] rounded-full border border-dashed border-border/60" />
            <div
              aria-hidden="true"
              className="absolute inset-[6%] rounded-full opacity-60"
              style={{
                background: `conic-gradient(from 0deg, transparent 0 70%, ${active} 100%)`,
                mask: 'radial-gradient(circle, transparent calc(50% - 2px), black calc(50% - 1px))',
                WebkitMask: 'radial-gradient(circle, transparent calc(50% - 2px), black calc(50% - 1px))',
              }}
            />

            {/* Jersey */}
            <div className="absolute inset-[16%] isolate overflow-hidden rounded-full">
              <Image
                src="/images/jersey-base.webp"
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 400px, 70vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-multiply transition-[background] duration-500"
                style={{ background: patternBackground(pattern, primary, secondary) }}
              />
              <span
                aria-hidden="true"
                className="absolute left-[60%] top-[30%] grid size-[11%] -translate-x-1/2 place-items-center rounded-full border font-mono text-[clamp(6px,1.2vw,10px)] font-bold mix-blend-hard-light"
                style={{ borderColor: secondary, color: secondary }}
              >
                {crest || '—'}
              </span>
            </div>
            <p className="sr-only" aria-live="polite">
              {`Jersey preview: ${pattern} pattern, primary ${COLORS.find((c) => c.value === primary)?.name}, secondary ${COLORS.find((c) => c.value === secondary)?.name}, crest ${crest}.`}
            </p>

            {/* Circular color selector */}
            <div role="radiogroup" aria-label={`${layer === 'primary' ? 'Primary' : 'Secondary'} color`}>
              {COLORS.map((c, i) => {
                const angle = (i / COLORS.length) * Math.PI * 2 - Math.PI / 2
                const selected = c.value === active
                return (
                  <button
                    key={c.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={c.name}
                    onClick={() => setActive(c.value)}
                    className={cn(
                      'absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 hover:scale-110 sm:size-11',
                      selected && 'scale-110',
                    )}
                    style={{
                      left: `${50 + Math.cos(angle) * 44}%`,
                      top: `${50 + Math.sin(angle) * 44}%`,
                    }}
                  >
                    <span
                      className={cn(
                        'block size-6 rounded-full ring-1 ring-white/20 transition-all sm:size-7',
                        selected && 'ring-2 ring-foreground ring-offset-4 ring-offset-background',
                      )}
                      style={{ backgroundColor: c.value, boxShadow: selected ? `0 0 24px ${c.value}` : undefined }}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={250} className="lg:col-span-3">
          <div className="flex flex-col gap-8 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <fieldset className="flex flex-col gap-3">
              <legend className="hud mb-3 text-muted-foreground">Layer</legend>
              <div className="grid grid-cols-2 gap-2">
                {(['primary', 'secondary'] as const).map((l) => {
                  const color = l === 'primary' ? primary : secondary
                  return (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={layer === l}
                      onClick={() => setLayer(l)}
                      className={cn(
                        'hud flex items-center gap-2 border px-3 py-3 text-left transition-colors',
                        layer === l ? 'border-foreground bg-foreground/5' : 'border-border text-muted-foreground hover:border-foreground/40',
                      )}
                    >
                      <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
                      {l}
                    </button>
                  )
                })}
              </div>
              <p className="hud text-muted-foreground">
                Selected: <span className="text-foreground">{activeName}</span>
              </p>
            </fieldset>

            <fieldset>
              <legend className="hud mb-3 text-muted-foreground">Pattern</legend>
              <div className="flex flex-wrap gap-2">
                {PATTERNS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={pattern === p}
                    onClick={() => setPattern(p)}
                    className={cn(
                      'hud border px-3 py-2 transition-colors',
                      pattern === p ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="crest" className="hud mb-3 block text-muted-foreground">
                Crest initials
              </label>
              <input
                id="crest"
                value={crest}
                maxLength={3}
                onChange={(e) => setCrest(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                className="w-full border-b border-border bg-transparent pb-2 font-display text-4xl outline-none transition-colors focus:border-primary"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
