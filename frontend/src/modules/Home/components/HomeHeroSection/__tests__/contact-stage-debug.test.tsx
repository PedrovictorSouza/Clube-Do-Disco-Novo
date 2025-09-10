import { describe, it, expect } from 'vitest';
import { computeHeroProgress } from '../../../../../hooks/heroProgress/math';
import { defaultHeroConfig } from '../../../../../hooks/heroProgress/math';

describe('Contact Stage Debug', () => {
  it('deve verificar o que acontece quando clicamos em Contact (Y=3300)', () => {
    const H = 1000; // Altura da viewport

    const result = computeHeroProgress(H * 3.3, H, defaultHeroConfig);
    
    console.log('Contact Click (Y=3300):', {
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity,
      aboutStartY: H * defaultHeroConfig.aboutFadeStartFraction,
      contactStartY: H * defaultHeroConfig.contactFadeStartFraction,
      aboutEndY: H * defaultHeroConfig.contactFadeStartFraction, // aboutEndY = contactStartY
      contactEndY: H * defaultHeroConfig.contactFadeStartFraction + H * 0.75
    });

    expect(result.stage).toBe(4);
    expect(result.contactOpacity).toBe(1);
    expect(result.aboutOpacity).toBe(0);
  });

  it('deve verificar os valores de configuração', () => {
    const H = 1000;
    
    console.log('Configuração:', {
      aboutFadeStartFraction: defaultHeroConfig.aboutFadeStartFraction,
      contactFadeStartFraction: defaultHeroConfig.contactFadeStartFraction,
      aboutStartY: H * defaultHeroConfig.aboutFadeStartFraction,
      contactStartY: H * defaultHeroConfig.contactFadeStartFraction,
      aboutEndY: H * defaultHeroConfig.contactFadeStartFraction, // aboutEndY = contactStartY
      contactEndY: H * defaultHeroConfig.contactFadeStartFraction + H * 0.75
    });

    expect(defaultHeroConfig.aboutFadeStartFraction).toBe(1.8);
    expect(defaultHeroConfig.contactFadeStartFraction).toBe(2.55);
  });

  it('deve verificar diferentes pontos Y para entender a transição', () => {
    const H = 1000;
    
    const testPoints = [
      { y: H * 1.8, name: 'About Start' },
      { y: H * 2.0, name: 'About Middle' },
      { y: H * 2.55, name: 'Contact Start' },
      { y: H * 2.8, name: 'Contact Middle' },
      { y: H * 3.0, name: 'Contact Middle+' },
      { y: H * 3.3, name: 'Contact Click' },
      { y: H * 3.5, name: 'Contact End' }
    ];
    
    testPoints.forEach(({ y, name }) => {
      const result = computeHeroProgress(y, H, defaultHeroConfig);
      console.log(`${name} (Y=${y}):`, {
        stage: result.stage,
        aboutOpacity: result.aboutOpacity.toFixed(2),
        contactOpacity: result.contactOpacity.toFixed(2)
      });
    });
  });
});
