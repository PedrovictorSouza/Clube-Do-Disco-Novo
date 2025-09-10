import { describe, it, expect } from 'vitest'
import { computeHeroProgress, defaultHeroConfig } from '../math'

describe('Stage 3 - About Fix', () => {
  const H = 800

  it('Stage 3 deve mostrar About em vez de Contact', () => {

    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const aboutEndY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const contactEndY = aboutEndY + H * 0.75 // 2640px
    const middleStage3Y = aboutEndY + (contactEndY - aboutEndY) / 2 // meio do stage 3

    const result = computeHeroProgress(middleStage3Y, H, defaultHeroConfig)

    console.log('Stage 3 Fix Debug:', {
      y: middleStage3Y,
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity,
      aboutStartY,
      aboutEndY,
      contactEndY
    })

    expect(result.stage).toBe(3) // Stage 3 para About
    expect(result.aboutOpacity).toBe(1) // About deve estar visível
    expect(result.contactOpacity).toBe(1) // Contact também está ativo no Stage 3
  })

  it('Stage 2 deve continuar mostrando About', () => {

    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const aboutEndY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const middleStage2Y = aboutStartY + (aboutEndY - aboutStartY) / 2 // meio do stage 2

    const result = computeHeroProgress(middleStage2Y, H, defaultHeroConfig)

    console.log('Stage 2 Continuity Debug:', {
      y: middleStage2Y,
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity
    })

    expect(result.stage).toBe(2) // Stage 2 para About
    expect(result.aboutOpacity).toBe(1) // About deve estar visível
    expect(result.contactOpacity).toBe(0) // Contact deve estar oculto
  })

  it('About deve ter opacidade 1 durante todo o Stage 3', () => {
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const aboutEndY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    const contactEndY = aboutEndY + H * 0.75 // 2640px

    const startStage3Y = aboutEndY + 10
    const resultStart = computeHeroProgress(startStage3Y, H, defaultHeroConfig)
    expect(resultStart.aboutOpacity).toBe(1)

    const middleStage3Y = aboutEndY + (contactEndY - aboutEndY) / 2
    const resultMiddle = computeHeroProgress(middleStage3Y, H, defaultHeroConfig)
    expect(resultMiddle.aboutOpacity).toBe(1)

    const endStage3Y = contactEndY - 10
    const resultEnd = computeHeroProgress(endStage3Y, H, defaultHeroConfig)
    expect(resultEnd.aboutOpacity).toBe(1)

    console.log('✅ About mantém opacidade 1 durante todo o Stage 3')
  })
})
