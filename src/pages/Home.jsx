import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import HeroSection from '../components/home/HeroSection'
import ChallengesSection from '../components/home/ChallengesSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import ImpactSection from '../components/home/ImpactSection'
import TestimonialsSection from '../components/home/TestimonialsSection'

export default function Home() {
  useReveal()

  return (
    <>
      <HeroSection />
      <ChallengesSection />
      <HowItWorksSection />
      <ImpactSection />
      <TestimonialsSection />
    </>
  )
}
