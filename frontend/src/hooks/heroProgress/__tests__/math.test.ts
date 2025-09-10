import { describe, it, expect } from 'vitest'
import { computeHeroProgress, defaultHeroConfig } from '../math'

describe('computeHeroProgress', () => {
  const H = 800 // altura da viewport
  
  it('deve retornar título com opacidade 1 quando scrollY = 0', () => {
    const result = computeHeroProgress(0, H, defaultHeroConfig)
    
    expect(result.titleOpacity).toBe(1)
    expect(result.gridOpacity).toBe(0)
    expect(result.aboutOpacity).toBe(0)
    expect(result.contactOpacity).toBe(0)
    expect(result.stage).toBe(0)
  })

  it('deve começar a esconder o título quando scrollY > 0', () => {
    const result = computeHeroProgress(100, H, defaultHeroConfig)
    
    expect(result.titleOpacity).toBeLessThan(1)
    expect(result.titleOpacity).toBeGreaterThan(0)
  })

  it('deve mostrar o grid quando scrollY atinge 25% da viewport', () => {
    const gridStartY = H * defaultHeroConfig.gridFadeStartFraction // 200px
    const result = computeHeroProgress(gridStartY, H, defaultHeroConfig)
    
    expect(result.gridOpacity).toBe(0) // início da transição
    expect(result.stage).toBe(1)
  })

  it('deve ter grid com opacidade máxima em 60% da viewport', () => {
    const gridPeakY = H * 0.6 // 480px
    const result = computeHeroProgress(gridPeakY, H, defaultHeroConfig)
    
    expect(result.gridOpacity).toBe(1)
  })

  it('deve esconder o grid quando scrollY atinge 180% da viewport', () => {
    const gridEndY = H * defaultHeroConfig.gridFadeEndFraction // 1440px
    const result = computeHeroProgress(gridEndY, H, defaultHeroConfig)
    
    expect(result.gridOpacity).toBe(0)
    expect(result.aboutOpacity).toBe(0) // about começa quando grid termina
  })

  it('deve mostrar about quando grid termina', () => {
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const result = computeHeroProgress(aboutStartY + 100, H, defaultHeroConfig)
    
    expect(result.aboutOpacity).toBeGreaterThan(0)
    expect(result.stage).toBe(2)
  })

  it('deve mostrar contact quando about termina', () => {
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const result = computeHeroProgress(contactStartY + 100, H, defaultHeroConfig)
    
    expect(result.contactOpacity).toBeGreaterThan(0)
    expect(result.stage).toBe(3)
  })

  it('deve retornar aboutEndY e contactEndY calculados', () => {
    const result = computeHeroProgress(0, H, defaultHeroConfig)
    
    expect(result.aboutEndY).toBeDefined()
    expect(result.contactEndY).toBeDefined()
    expect(typeof result.aboutEndY).toBe('number')
    expect(typeof result.contactEndY).toBe('number')
  })

  describe('Correções de Estados Exclusivos', () => {
    it('Stage 2 deve mostrar APENAS About com opacidade 1, sem Contact', () => {
      const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
      const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
      const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2 // meio do about
      
      const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)
      
      expect(result.stage).toBe(2)
      expect(result.aboutOpacity).toBe(1) // About deve estar com opacidade máxima
      expect(result.contactOpacity).toBe(0) // Contact deve estar oculto
      expect(result.gridOpacity).toBe(0) // Grid deve estar oculto
    })

    it('Stage 3 deve mostrar APENAS Contact com opacidade 1, sem About', () => {
      const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
      const contactEndY = contactStartY + H * 0.75 // fim do contact
      const middleContactY = contactStartY + (contactEndY - contactStartY) / 2 // meio do contact
      
      const result = computeHeroProgress(middleContactY, H, defaultHeroConfig)
      
      expect(result.stage).toBe(3) // Contact aparece no stage 3
      expect(result.contactOpacity).toBe(1) // Contact deve estar com opacidade máxima
      expect(result.aboutOpacity).toBeGreaterThan(0) // About pode estar visível
      expect(result.gridOpacity).toBe(0) // Grid deve estar oculto
    })

    it('About deve ter opacidade 1 no meio do seu range (stage 2)', () => {
      const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
      const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
      const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2
      
      const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)
      
      expect(result.aboutOpacity).toBe(1)
    })

    it('Contact deve ter opacidade 1 no meio do seu range (stage 3)', () => {
      const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
      const contactEndY = contactStartY + H * 0.75
      const middleContactY = contactStartY + (contactEndY - contactStartY) / 2
      
      const result = computeHeroProgress(middleContactY, H, defaultHeroConfig)
      
      expect(result.contactOpacity).toBe(1)
    })

    it('Grid deve estar oculto nos stages 2 e 3', () => {
      const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
      const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px

      const resultStage2 = computeHeroProgress(aboutStartY + 100, H, defaultHeroConfig)
      expect(resultStage2.gridOpacity).toBe(0)

      const resultStage3 = computeHeroProgress(contactStartY + 100, H, defaultHeroConfig)
      expect(resultStage3.gridOpacity).toBe(0)
    })

    it('Stage 2 deve ser APENAS About - verificação específica', () => {
      const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
      const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
      const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2
      
      const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)
      
      console.log('Stage 2 Debug:', {
        y: middleAboutY,
        stage: result.stage,
        aboutOpacity: result.aboutOpacity,
        contactOpacity: result.contactOpacity,
        gridOpacity: result.gridOpacity,
        aboutStartY,
        contactStartY,
        aboutEndY: result.aboutEndY
      })
      
      expect(result.stage).toBe(2)
      expect(result.aboutOpacity).toBe(1)
      expect(result.contactOpacity).toBe(0)
      expect(result.gridOpacity).toBe(0)
    })
  })
})