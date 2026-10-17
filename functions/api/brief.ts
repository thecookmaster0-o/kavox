type BriefEnvironment = {
  RESEND_API_KEY?: string
  INQUIRY_FROM_EMAIL?: string
}

type PagesContext = {
  request: Request
  env: BriefEnvironment
}

const DESTINATION = 'founder@kavoxsports.com'
const SPORTS = ['Football', 'Basketball', 'Volleyball', 'Tennis', 'Badminton', 'Other']
const MAX_LOGO_BYTES = 5 * 1024 * 1024
const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'application/pdf']

function text(formData: FormData, key: string, max = 200) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character]
  })
}

function json(data: Record<string, string>, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

async function asBase64(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer())
  let binary = ''
  const chunkSize = 0x8000
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize))
  }
  return btoa(binary)
}

export async function onRequestPost({ request, env }: PagesContext) {
  if (!env.RESEND_API_KEY || !env.INQUIRY_FROM_EMAIL) {
    return json({ message: 'The inquiry service is not configured yet.' }, 503)
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return json({ message: 'We could not read this submission. Please try again.' }, 400)
  }

  const name = text(formData, 'name', 100)
  const email = text(formData, 'email', 160)
  const team = text(formData, 'team', 120)
  const sport = text(formData, 'sport', 40)
  const quantity = Number(text(formData, 'quantity', 6))
  const colors = text(formData, 'colors', 200)
  const deadline = text(formData, 'deadline', 20)
  const message = text(formData, 'message', 3000)
  const logoValue = formData.get('logo')
  const logo = logoValue instanceof File && logoValue.size > 0 ? logoValue : null

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || team.length < 2 || !SPORTS.includes(sport)) {
    return json({ message: 'Please fix the highlighted fields.' }, 400)
  }
  if (!Number.isInteger(quantity) || quantity < 5 || quantity > 5000) {
    return json({ message: 'Quantity must be between 5 and 5000.' }, 400)
  }
  if (logo && (!LOGO_TYPES.includes(logo.type) || logo.size > MAX_LOGO_BYTES)) {
    return json({ message: 'Please upload a supported logo under 5 MB.' }, 400)
  }

  const fields = [
    ['Name', name],
    ['Email', email],
    ['Team', team],
    ['Sport', sport],
    ['Quantity', String(quantity)],
    ['Colors', colors || 'Not provided'],
    ['Deadline', deadline || 'Not provided'],
    ['Message', message || 'Not provided'],
  ] as const
  const html = `<h2>New KAVOX project brief</h2>${fields.map(([label, value]) => `<p><strong>${label}</strong><br>${escapeHtml(value).replace(/\n/g, '<br>')}</p>`).join('')}`

  const attachments = logo
    ? [{ filename: logo.name || 'team-logo', content: await asBase64(logo) }]
    : undefined

  let response: Response
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.INQUIRY_FROM_EMAIL,
        to: [DESTINATION],
        reply_to: email,
        subject: `New KAVOX project brief — ${team}`,
        html,
        ...(attachments ? { attachments } : {}),
      }),
    })
  } catch {
    return json({ message: 'The studio email service is unreachable. Please try again.' }, 502)
  }

  if (!response.ok) {
    return json({ message: 'The studio could not accept your brief. Please try again.' }, 502)
  }

  return json({ message: 'Your project brief has been sent.' }, 200)
}
