'use client'

import { useEffect, useState } from 'react'

function format(date: Date) {
  return [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
}

export function HudClock({ className }: { className?: string }) {
  const [time, setTime] = useState('00:00:00')

  useEffect(() => {
    const tick = () => setTime(format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={className} suppressHydrationWarning>
      <span className="sr-only">Current UTC time </span>
      {time} UTC
    </span>
  )
}
