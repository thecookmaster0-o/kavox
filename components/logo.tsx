import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="KAVOX SPORTS home"
    >
      <span
        aria-hidden="true"
        className="relative grid size-7 place-items-center overflow-hidden bg-foreground text-background"
      >
        <span className="font-display text-sm leading-none">K</span>
        <span className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-primary/70 transition-all duration-700 group-hover:left-[150%]" />
      </span>
      <span className="font-display text-base tracking-tight">
        Kavox<span className="text-muted-foreground"> Sports</span>
      </span>
    </Link>
  )
}
