import { cn } from '@/lib/utils'

export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('hud flex items-center gap-4 text-muted-foreground', className)}>
      <span className="text-foreground">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-border" />
      <span>{children}</span>
    </div>
  )
}
