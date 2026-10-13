'use client'

import { useActionState, useState } from 'react'
import { ArrowUpRight, Check, Loader2, Upload } from 'lucide-react'
import { submitBrief, type BriefState } from '@/app/contact/actions'
import { cn } from '@/lib/utils'

const SPORTS = ['Football', 'Basketball', 'Volleyball', 'Tennis', 'Badminton', 'Other']
const initial: BriefState = { status: 'idle' }

const inputClass =
  'w-full border-b border-border bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary aria-[invalid=true]:border-destructive'

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={id} className="hud text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="hud mt-1 text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function BriefForm() {
  const [state, action, pending] = useActionState(submitBrief, initial)
  const [fileName, setFileName] = useState('')
  const e = state.errors ?? {}

  if (state.status === 'success') {
    return (
      <div
        role="status"
        tabIndex={-1}
        ref={(el) => {
          el?.focus({ preventScroll: true })
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }}
        className="flex flex-col items-start gap-6 border border-border p-8 outline-none md:p-12"
      >
        <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h2 className="font-display text-4xl md:text-5xl">Brief received.</h2>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{state.message}</p>
      </div>
    )
  }

  const describe = (key: keyof NonNullable<BriefState['errors']>, id: string) =>
    e[key] ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {}

  return (
    <form action={action} className="grid gap-x-10 gap-y-10 md:grid-cols-2" noValidate>
      <Field id="name" label="Your name" error={e.name}>
        <input id="name" name="name" autoComplete="name" required placeholder="Alex Moreau" className={inputClass} {...describe('name', 'name')} />
      </Field>
      <Field id="email" label="Email" error={e.email}>
        <input id="email" name="email" type="email" autoComplete="email" required placeholder="captain@club.com" className={inputClass} {...describe('email', 'email')} />
      </Field>
      <Field id="team" label="Team name" error={e.team}>
        <input id="team" name="team" required placeholder="Lyon University FC" className={inputClass} {...describe('team', 'team')} />
      </Field>
      <Field id="sport" label="Sport" error={e.sport}>
        <select id="sport" name="sport" required defaultValue="" className={cn(inputClass, 'appearance-none bg-background')} {...describe('sport', 'sport')}>
          <option value="" disabled>
            Select a sport
          </option>
          {SPORTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
      <Field id="quantity" label="Quantity (kits)" error={e.quantity}>
        <input id="quantity" name="quantity" type="number" inputMode="numeric" min={5} max={5000} step={1} required placeholder="25" className={inputClass} {...describe('quantity', 'quantity')} />
      </Field>
      <Field id="deadline" label="Deadline">
        <input id="deadline" name="deadline" type="date" className={cn(inputClass, '[color-scheme:dark]')} />
      </Field>
      <Field id="colors" label="Team colors" className="md:col-span-2">
        <input id="colors" name="colors" placeholder="Navy, electric blue, white" className={inputClass} />
      </Field>

      <div className="flex flex-col gap-1 md:col-span-2">
        <span className="hud text-muted-foreground" id="logo-label">
          Logo upload <span className="normal-case tracking-normal">(optional · max 5 MB)</span>
        </span>
        <label
          htmlFor="logo"
          className={cn(
            'group mt-2 flex cursor-pointer items-center justify-between gap-4 border border-dashed px-6 py-8 transition-colors hover:border-primary hover:bg-primary/5 has-[:focus-visible]:border-primary',
            e.logo ? 'border-destructive' : 'border-border',
          )}
        >
          <span className="flex items-center gap-4">
            <Upload className="size-5 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
            <span className="text-sm">{fileName || 'Drop your crest or click to browse'}</span>
          </span>
          <span className="hud text-muted-foreground">PNG · SVG · PDF</span>
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp,application/pdf"
            aria-labelledby="logo-label"
            className="sr-only"
            onChange={(ev) => setFileName(ev.target.files?.[0]?.name ?? '')}
          />
        </label>
        {e.logo && <p className="hud mt-1 text-destructive">{e.logo}</p>}
      </div>

      <Field id="message" label="Tell us about your team" className="md:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="History, rivals, city, the vibe you want on the pitch…"
          className={cn(inputClass, 'resize-none')}
        />
      </Field>

      <div className="flex flex-col-reverse gap-6 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="hud text-muted-foreground" aria-live="polite">
          {state.status === 'error' ? <span className="text-destructive">{state.message}</span> : 'Reply within 48 hours'}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="hud group inline-flex items-center justify-center gap-3 bg-primary px-8 py-5 text-primary-foreground transition-all hover:shadow-[0_0_40px_-4px_var(--primary)] disabled:opacity-60"
        >
          {pending ? 'Sending brief' : 'Send project brief'}
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          )}
        </button>
      </div>
    </form>
  )
}
