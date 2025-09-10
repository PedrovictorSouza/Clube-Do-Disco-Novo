import { describe, it, expect } from 'vitest'
import { computeHeroProgress, defaultHeroConfig } from '../math'

describe('Integração - Problemas Identificados', () => {
  const H = 800 // altura da viewport

  it('PROBLEMA 1: Grid não aparece no momento certo', () => {

    const gridStartY = H * defaultHeroConfig.gridFadeStartFraction // 200px
    const gridStartYPlus = gridStartY + 1 // 201px - logo após o início
    
    const resultAtStart = computeHeroProgress(gridStartY, H, defaultHeroConfig) // 200px
    const resultAtStartPlus = computeHeroProgress(gridStartYPlus, H, defaultHeroConfig) // 201px
    const resultAtPeak = computeHeroProgress(H * 0.6, H, defaultHeroConfig) // 480px
    
    console.log('Grid start (200px):', resultAtStart.gridOpacity)
    console.log('Grid start+1 (201px):', resultAtStartPlus.gridOpacity)
    console.log('Grid peak (480px):', resultAtPeak.gridOpacity)

    expect(resultAtStart.gridOpacity).toBe(0)

    expect(resultAtStartPlus.gridOpacity).toBeGreaterThan(0)
    expect(resultAtPeak.gridOpacity).toBe(1)
  })

  it('PROBLEMA 2: Transições não são suaves', () => {
    const points = [
      { y: 0, expected: 'title=1, grid=0' },
      { y: 200, expected: 'title<1, grid>0' },
      { y: 480, expected: 'title<1, grid=1' },
      { y: 1440, expected: 'title=0, grid=0, about>0' },
    ]

    points.forEach(({ y, expected }) => {
      const result = computeHeroProgress(y, H, defaultHeroConfig)
      console.log(`Y=${y}px: title=${result.titleOpacity.toFixed(2)}, grid=${result.gridOpacity.toFixed(2)}, about=${result.aboutOpacity.toFixed(2)}`)
    })
  })

  it('PROBLEMA 3: About e Contact não começam nos momentos corretos', () => {
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction // 1440px
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction // 2040px
    
    const resultAbout = computeHeroProgress(aboutStartY + 100, H, defaultHeroConfig)
    const resultContact = computeHeroProgress(contactStartY + 100, H, defaultHeroConfig)
    
    console.log('About start:', resultAbout.aboutOpacity)
    console.log('Contact start:', resultContact.contactOpacity)
    
    expect(resultAbout.aboutOpacity).toBeGreaterThan(0)
    expect(resultContact.contactOpacity).toBeGreaterThan(0)
  })

  it('PROBLEMA 4: Valores de retorno inconsistentes', () => {
    const result = computeHeroProgress(0, H, defaultHeroConfig)

    expect(result.aboutEndY).toBeDefined()
    expect(result.contactEndY).toBeDefined()
    expect(typeof result.aboutEndY).toBe('number')
    expect(typeof result.contactEndY).toBe('number')
    
    console.log('aboutEndY:', result.aboutEndY)
    console.log('contactEndY:', result.contactEndY)
  })
})
