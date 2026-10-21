import { Metadata } from 'next'
import { Hero } from '@/components/sections/hero'
import { WhatIsSection } from '@/components/sections/what-is'
import { CarreraSection } from '@/components/sections/carrera'
import { PlanEstudiosSection } from '@/components/sections/plan-estudios'
import { IngenierosSection } from '@/components/sections/ingenieros'
import { TestimoniosSection } from '@/components/sections/testimonios'
import { ContactoSection } from '@/components/sections/contacto'
import { getSiteData, getPlanEstudios } from '@/services/data.service'

export const metadata: Metadata = {
  title: 'Ingeniería Agrícola | Universidad Nacional de Ingeniería',
  description: 'Cultivamos innovación para alimentar el futuro. Conoce la carrera de Ingeniería Agrícola en la UNI: plan de estudios, laboratorios, proyectos y admisión.',
}

export default async function HomePage() {
  const [siteData, planEstudios] = await Promise.all([
    getSiteData(),
    getPlanEstudios(),
  ])

  return (
    <>
      <Hero
        slides={siteData.carrusel_hero}
        slogan={siteData.slogan}
        descripcion={siteData.descripcion}
        inscripcionHref="/contacto"
      />
      <WhatIsSection />
      <CarreraSection />
      <PlanEstudiosSection data={planEstudios} />
      <IngenierosSection ingenieros={siteData.ingenieros} />
      <TestimoniosSection initialTestimonios={siteData.testimonios} />
      <ContactoSection contacto={siteData.contacto} />
    </>
  )
}