import { Hero } from '@/components/home/hero'
import { Customizer } from '@/components/home/customizer'
import { Process } from '@/components/home/process'
import { Works } from '@/components/home/works'
import { Why } from '@/components/home/why'
import { FinalCta } from '@/components/home/final-cta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Customizer />
      <Process />
      <Works />
      <Why />
      <FinalCta />
    </main>
  )
}
