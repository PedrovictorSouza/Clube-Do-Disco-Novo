import { describe, it, expect } from 'vitest'
import { computeHeroProgress, defaultHeroConfig } from '../math'

describe('Stage 4 - Contact', () => {
  const H = 800

  it('Stage 4 deve mostrar Contact', () => {

    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const aboutEndY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const contactEndY = aboutEndY + H * 0.75 // 2640px
    const stage4Y = contactEndY + 100 // início do stage 4

    const result = computeHeroProgress(stage4Y, H, defaultHeroConfig)

    console.log('Stage 4 Debug:', {
      y: stage4Y,
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity,
      aboutStartY,
      aboutEndY,
      contactEndY
    })

    expect(result.stage).toBe(4)
    expect(result.contactOpacity).toBeGreaterThan(0) // Contact deve estar aparecendo
    expect(result.aboutOpacity).toBe(0) // About deve estar oculto
  })

  it('Contact deve ter opacidade 1 no meio do Stage 4', () => {
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const aboutEndY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const contactEndY = aboutEndY + H * 0.75 // 2640px
    const contactRange = H * 0.5 // 400px
    const middleStage4Y = contactEndY + (contactRange / 2) // meio do stage 4

    const result = computeHeroProgress(middleStage4Y, H, defaultHeroConfig)

    console.log('Stage 4 Middle Debug:', {
      y: middleStage4Y,
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity
    })

    expect(result.stage).toBe(4)
    expect(result.contactOpacity).toBe(1) // Contact deve estar com opacidade máxima
    expect(result.aboutOpacity).toBe(0) // About deve estar oculto
  })

  it('Stages 2 e 3 devem continuar mostrando About', () => {
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const aboutEndY = H * defaultHeroConfig.contactFadeStartFraction // 2040px

    const stage2Y = aboutStartY + (aboutEndY - aboutStartY) / 2
    const resultStage2 = computeHeroProgress(stage2Y, H, defaultHeroConfig)
    expect(resultStage2.stage).toBe(2)
    expect(resultStage2.aboutOpacity).toBe(1)
    expect(resultStage2.contactOpacity).toBe(0)

    const stage2Y2 = aboutStartY + 200
    const resultStage2_2 = computeHeroProgress(stage2Y2, H, defaultHeroConfig)
    expect(resultStage2_2.stage).toBe(2)
    expect(resultStage2_2.aboutOpacity).toBeGreaterThan(0.5) // About deve estar visível
    expect(resultStage2_2.contactOpacity).toBe(0)

    console.log('✅ Stages 2 e 3 continuam mostrando About')
  })

  it('Verificar transição suave do About para Contact', () => {
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const aboutEndY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const contactEndY = aboutEndY + H * 0.75 // 2640px

    const endStage2Y = aboutEndY - 10
    const resultEnd2 = computeHeroProgress(endStage2Y, H, defaultHeroConfig)
    expect(resultEnd2.stage).toBe(2)
    expect(resultEnd2.aboutOpacity).toBe(1)
    expect(resultEnd2.contactOpacity).toBe(0)

    const startStage4Y = contactEndY + 10
    const resultStart4 = computeHeroProgress(startStage4Y, H, defaultHeroConfig)
    expect(resultStart4.stage).toBe(4)
    expect(resultStart4.aboutOpacity).toBe(0)
    expect(resultStart4.contactOpacity).toBeGreaterThan(0)

    console.log('✅ Transição suave: About → Contact')
  })
})
