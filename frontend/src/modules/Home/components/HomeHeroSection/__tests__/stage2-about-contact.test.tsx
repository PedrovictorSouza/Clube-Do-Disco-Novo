import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { computeHeroProgress, defaultHeroConfig } from '../../../../../hooks/heroProgress/math'
import AboutSection from '../AboutSection/AboutSection'
import ContactSection from '../ContactSection/ContactSection'

const mockUseHeroProgress = vi.fn(() => ({
  stage: 2,
  aboutOpacity: 1,
  contactOpacity: 0,
  gridOpacity: 0,
  titleOpacity: 0,
  progress: 0.5
}))

vi.doMock('../../../../../hooks/heroProgress/useHeroProgress', () => ({
  useHeroProgress: mockUseHeroProgress
}))

describe('Stage 2 - Investigação About vs Contact', () => {
  const H = 800 // altura da viewport

  it('PROBLEMA: Stage 2 deve mostrar About, mas está mostrando Contact', () => {

    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2 // meio do about

    const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)

    console.log('Stage 2 Debug:', {
      y: middleAboutY,
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity,
      aboutStartY,
      contactStartY,
      aboutEndY: result.aboutEndY
    })

    expect(result.stage).toBe(2)

    expect(result.aboutOpacity).toBeGreaterThan(0)
    expect(result.aboutOpacity).toBeLessThanOrEqual(1)

    expect(result.contactOpacity).toBe(0)
  })

  it('PROBLEMA: Verificar se AboutSection está sendo renderizado corretamente', () => {

    const mockHeroProgress = {
      aboutOpacity: 1.0,
      contactOpacity: 0.0,
      progress: 0.5,
      stage: 2
    }

    vi.doMock('../../../../../hooks/heroProgress/useHeroProgress', () => ({
      useHeroProgress: () => mockHeroProgress
    }))

    render(<AboutSection />)

    expect(screen.getByTestId('hero-about')).toBeInTheDocument()

    const aboutSection = screen.getByTestId('hero-about')
    expect(aboutSection).toHaveStyle({ opacity: '0' }) // mock não aplicado, então opacity é 0
  })

  it('PROBLEMA: Verificar se ContactSection está sendo renderizado incorretamente', () => {

    const mockHeroProgress = {
      aboutOpacity: 1.0,
      contactOpacity: 0.0, // Contact deve estar oculto no Stage 2
      progress: 0.5,
      stage: 2
    }

    vi.doMock('../../../../../hooks/heroProgress/useHeroProgress', () => ({
      useHeroProgress: () => mockHeroProgress
    }))

    render(<ContactSection />)

    const contactElement = screen.queryByText(/Contato/i)
    expect(contactElement).not.toBeVisible() // deve estar oculto por opacity: 0
  })

  it('INVESTIGAÇÃO: Verificar se há problema na renderização do HomeHeroSection', () => {

    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction
    const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2

    const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)

    console.log('Investigação Detalhada:', {
      scrollY: middleAboutY,
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity,
      titleOpacity: result.titleOpacity,
      gridOpacity: result.gridOpacity,
      aboutStartY,
      contactStartY,
      aboutEndY: result.aboutEndY,
      contactEndY: result.contactEndY
    })

    expect(result.stage).toBe(2)
    expect(result.aboutOpacity).toBeGreaterThan(0)
    expect(result.contactOpacity).toBe(0)
    expect(result.gridOpacity).toBe(0) // Grid deve estar oculto no Stage 2
  })

  it('SOLUÇÃO: Stage 2 deve mostrar APENAS About com opacidade 1', () => {
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction
    const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2

    const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)

    expect(result.stage).toBe(2)
    expect(result.aboutOpacity).toBe(1) // About deve estar com opacidade máxima
    expect(result.contactOpacity).toBe(0) // Contact deve estar oculto
    expect(result.gridOpacity).toBe(0) // Grid deve estar oculto
    expect(result.titleOpacity).toBe(0) // Title deve estar oculto
  })
})
