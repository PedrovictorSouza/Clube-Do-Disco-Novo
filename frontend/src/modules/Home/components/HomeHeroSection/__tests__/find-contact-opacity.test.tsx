import { describe, it, expect } from 'vitest';
import { computeHeroProgress } from '../../../../../hooks/heroProgress/math';
import { defaultHeroConfig } from '../../../../../hooks/heroProgress/math';

describe('Find Contact Opacity > 0', () => {
  it('deve encontrar o valor Y onde contactOpacity > 0', () => {
    const H = 1000;

    const testPoints = [
      { y: H * 2.55, name: 'Contact Start (Y=2550)' },
      { y: H * 2.6, name: 'Y=2600' },
      { y: H * 2.7, name: 'Y=2700' },
      { y: H * 2.8, name: 'Y=2800' },
      { y: H * 2.9, name: 'Y=2900' },
      { y: H * 3.0, name: 'Y=3000' },
      { y: H * 3.1, name: 'Y=3100' },
      { y: H * 3.2, name: 'Y=3200' },
      { y: H * 3.3, name: 'Y=3300' }
    ];
    
    testPoints.forEach(({ y, name }) => {
      const result = computeHeroProgress(y, H, defaultHeroConfig);
      console.log(`${name}:`, {
        stage: result.stage,
        aboutOpacity: result.aboutOpacity.toFixed(2),
        contactOpacity: result.contactOpacity.toFixed(2),
        contactStartY: H * defaultHeroConfig.contactFadeStartFraction,
        contactEndY: H * defaultHeroConfig.contactFadeStartFraction + H * 0.75
      });
    });
  });

  it('deve verificar a lógica de contactOpacity', () => {
    const H = 1000;
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction; // 2550
    const contactEndY = contactStartY + H * 0.75; // 3300
    
    console.log('Contact Logic:', {
      contactStartY,
      contactEndY,
      contactRange: contactEndY - contactStartY
    });

    const resultStart = computeHeroProgress(contactStartY, H, defaultHeroConfig);
    console.log('At contactStartY (2550):', {
      stage: resultStart.stage,
      contactOpacity: resultStart.contactOpacity
    });

    const resultAfter = computeHeroProgress(contactStartY + 100, H, defaultHeroConfig);
    console.log('After contactStartY (2650):', {
      stage: resultAfter.stage,
      contactOpacity: resultAfter.contactOpacity
    });
  });
});
