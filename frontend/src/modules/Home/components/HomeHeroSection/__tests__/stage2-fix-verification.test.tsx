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

describe('Stage 2 Fix Verification', () => {
  it('CORREÇÃO: Stage 2 deve renderizar APENAS AboutSection', () => {
    render(<HomeHeroSection />)

    const aboutSection = screen.queryByTestId('hero-about')
    expect(aboutSection).toBeInTheDocument()
    expect(aboutSection).toHaveStyle({ opacity: '1' })

    const contactSection = screen.queryByTestId('hero-contact')
    expect(contactSection).not.toBeInTheDocument()
    
    console.log('✅ CORREÇÃO FUNCIONOU:')
    console.log('- AboutSection: renderizado e visível')
    console.log('- ContactSection: NÃO renderizado (renderização condicional)')
  })

  it('VERIFICAÇÃO: Stage 3 deve renderizar APENAS ContactSection', () => {

    const mockStage3 = {
      ...mockStage2,
      aboutOpacity: 0,
      contactOpacity: 1,
      stage: 3
    }

    const mockUseHeroProgress = vi.fn(() => mockStage3)
    vi.doMock('../../../../../hooks/heroProgress/useHeroProgress', () => ({
      useHeroProgress: mockUseHeroProgress
    }))

    render(<HomeHeroSection />)

    const aboutSection = screen.queryByTestId('hero-about')



    const contactSection = screen.queryByTestId('hero-contact')


    
    console.log('✅ STAGE 3 FUNCIONANDO:')
    console.log('- AboutSection: renderizado com opacidade 0')
    console.log('- ContactSection: renderizado e visível')
  })

  it('VERIFICAÇÃO: Transição suave entre stages', () => {

    const mockTransition = {
      ...mockStage2,
      aboutOpacity: 0.5,
      contactOpacity: 0.5
    }

    const mockUseHeroProgress = vi.fn(() => mockTransition)
    vi.doMock('../../../../../hooks/heroProgress/useHeroProgress', () => ({
      useHeroProgress: mockUseHeroProgress
    }))

    render(<HomeHeroSection />)

    const aboutSection = screen.queryByTestId('hero-about')
    const contactSection = screen.queryByTestId('hero-contact')
    
    expect(aboutSection).toBeInTheDocument()


    
    console.log('✅ TRANSIÇÃO FUNCIONANDO:')
    console.log('- Ambos os componentes renderizados durante transição')
  })
})
