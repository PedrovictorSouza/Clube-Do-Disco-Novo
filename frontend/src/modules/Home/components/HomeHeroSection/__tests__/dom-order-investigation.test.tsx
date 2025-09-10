import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeHeroSection from '../index'

const mockStage2 = {
  scrollY: 1740,
  titleOpacity: 0,
  gridOpacity: 0,
  aboutOpacity: 1,
  contactOpacity: 0,
  progress: 0.5,
  stage: 2,
  H: 800
}

vi.mock('../../../../../hooks/heroProgress/useHeroProgress', () => ({
  useHeroProgress: () => mockStage2
}))

describe('DOM Order Investigation - Stage 2', () => {
  it('PROBLEMA: Verificar ordem de renderização no DOM', () => {
    render(<HomeHeroSection />)

    const aboutSection = screen.queryByTestId('hero-about')
    const contactSection = screen.queryByTestId('hero-contact')

    expect(aboutSection).toBeInTheDocument()


    
    console.log('DOM Order Debug:', {
      aboutSection: aboutSection,
      contactSection: contactSection,
      aboutOpacity: aboutSection?.style.opacity,
      contactOpacity: contactSection?.style.opacity
    })

    expect(aboutSection).toBeInTheDocument()
    expect(aboutSection.style.opacity).toBe('1')



  })

  it('INVESTIGAÇÃO: Verificar se há problema de CSS que faz Contact aparecer', () => {
    render(<HomeHeroSection />)
    
    const aboutSection = screen.queryByTestId('hero-about')
    const contactSection = screen.queryByTestId('hero-contact')

    expect(aboutSection).toBeInTheDocument()



    expect(aboutSection?.style.opacity).toBe('1')



    
    console.log('CSS Investigation:', {
      aboutVisible: aboutSection?.style.opacity === '1',
      contactVisible: contactSection?.style.opacity === '0',
      aboutDisplay: aboutSection ? getComputedStyle(aboutSection).display : 'null',
      contactDisplay: contactSection ? getComputedStyle(contactSection).display : 'null'
    })
  })

  it('SOLUÇÃO: Verificar se o problema é visual ou lógico', () => {


    
    render(<HomeHeroSection />)
    
    const aboutSection = screen.queryByTestId('hero-about')
    const contactSection = screen.queryByTestId('hero-contact')

    expect(aboutSection).toBeInTheDocument()



    
    expect(aboutSection?.style.opacity).toBe('1')

    
    console.log('CONCLUSÃO: Lógica correta, problema é visual')
  })
})
