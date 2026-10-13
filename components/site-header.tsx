'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { HudClock } from '@/components/hud-clock'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/#customize', label: 'Customize' },
  { href: '/#process', label: 'Process' },
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || open
          ? 'border-b border-border bg-background/75 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 md:px-10">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'hud text-muted-foreground transition-colors hover:text-foreground',
                pathname === item.href && 'text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <HudClock className="hud hidden text-muted-foreground lg:inline" />
          <Link
            href="/contact"
            className="hud group hidden items-center gap-2 bg-foreground px-4 py-2.5 text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            Start project
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          'overflow-hidden transition-[max-height] duration-500 md:hidden',
          open ? 'max-h-[80vh]' : 'max-h-0',
        )}
      >
        <ul className="flex flex-col px-5 pb-8 pt-2">
          {[...NAV, { href: '/contact', label: 'Start project' }].map((item, i) => (
            <li key={item.href} className="border-b border-border">
              <Link
                href={item.href}
                className="flex items-baseline justify-between py-5 font-display text-3xl"
              >
                {item.label}
                <span className="hud text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
