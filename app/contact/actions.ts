export type BriefState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'team' | 'sport' | 'quantity' | 'logo', string>>
}

const SPORTS = ['Football', 'Basketball', 'Volleyball', 'Tennis', 'Badminton', 'Other']
const MAX_LOGO_BYTES = 5 * 1024 * 1024
const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'application/pdf']

function text(formData: FormData, key: string, max = 200) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function submitBrief(_prev: BriefState, formData: FormData): Promise<BriefState> {
  const name = text(formData, 'name', 100)
  const email = text(formData, 'email', 160)
  const team = text(formData, 'team', 120)
  const sport = text(formData, 'sport', 40)
  const quantity = Number(text(formData, 'quantity', 6))
  const logo = formData.get('logo')

  const errors: BriefState['errors'] = {}
  if (name.length < 2) errors.name = 'Tell us your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (team.length < 2) errors.team = 'Add your team or club name.'
  if (!SPORTS.includes(sport)) errors.sport = 'Choose a sport.'
  if (!Number.isInteger(quantity) || quantity < 5 || quantity > 5000) {
    errors.quantity = 'Quantity must be between 5 and 5000.'
  }
  if (logo instanceof File && logo.size > 0) {
    if (!LOGO_TYPES.includes(logo.type)) errors.logo = 'Upload a PNG, JPG, SVG, WEBP or PDF.'
    else if (logo.size > MAX_LOGO_BYTES) errors.logo = 'Logo must be under 5 MB.'
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors }
  }

  try {
    const response = await fetch('/api/brief', {
      method: 'POST',
      body: formData,
    })

    const result = (await response.json().catch(() => ({}))) as { message?: string }
    if (!response.ok) {
      return { status: 'error', message: result.message || 'We could not send your brief. Please try again.' }
    }
  } catch {
    return { status: 'error', message: 'We could not reach the studio. Please check your connection and try again.' }
  }

  return {
    status: 'success',
    message: `Thanks ${name.split(' ')[0]} — your brief for ${team} is in. A KAVOX designer will reply within 48 hours.`,
  }
}
