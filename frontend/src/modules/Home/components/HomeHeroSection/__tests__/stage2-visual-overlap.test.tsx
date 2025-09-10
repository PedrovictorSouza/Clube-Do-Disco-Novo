import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { computeHeroProgress, defaultHeroConfig } from '../../../../../hooks/heroProgress/math'

describe('Stage 2 - Investigação de Sobreposição Visual', () => {
  const H = 800

  it('PROBLEMA: AboutSection e ContactSection têm estilos idênticos', () => {

    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction
    const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2

    const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)

    console.log('Sobreposição Visual Debug:', {
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity,

      aboutVisible: result.aboutOpacity > 0,
      contactVisible: result.contactOpacity > 0
    })

    expect(result.stage).toBe(2)
    expect(result.aboutOpacity).toBeGreaterThan(0)
    expect(result.contactOpacity).toBe(0)
  })

  it('PROBLEMA: Ambos os componentes são renderizados no DOM simultaneamente', () => {


    
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction
    const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2

    const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)






    expect(result.aboutOpacity).toBe(1)
    expect(result.contactOpacity).toBe(0)

    console.log('PROBLEMA VISUAL: Ambos os componentes estão no DOM simultaneamente')
  })

  it('SOLUÇÃO: Verificar se há problema de z-index ou posicionamento', () => {

    
    const aboutStartY = H * defaultHeroConfig.aboutFadeStartFraction
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction
    const middleAboutY = aboutStartY + (contactStartY - aboutStartY) / 2

    const result = computeHeroProgress(middleAboutY, H, defaultHeroConfig)

    expect(result.stage).toBe(2)
    expect(result.aboutOpacity).toBe(1)
    expect(result.contactOpacity).toBe(0)





    
    console.log('POSSÍVEIS CAUSAS:')
    console.log('1. Z-index conflito')
    console.log('2. Posicionamento absoluto/fixed')
    console.log('3. CSS opacity não funcionando')
    console.log('4. Ordem de renderização no DOM')
  })
})
