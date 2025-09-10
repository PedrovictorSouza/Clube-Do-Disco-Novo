import { describe, it, expect } from 'vitest';
import { computeHeroProgress } from '../../../../../hooks/heroProgress/math';
import { defaultHeroConfig } from '../../../../../hooks/heroProgress/math';

describe('Contact Stage 3 Navigation', () => {
  it('deve verificar se Y=2550 leva para stage 3 com contactOpacity > 0', () => {
    const H = 1000; // Altura da viewport

    const result = computeHeroProgress(H * 2.55, H, defaultHeroConfig);
    
    console.log('Contact Navigation (Y=2550):', {
      stage: result.stage,
      aboutOpacity: result.aboutOpacity,
      contactOpacity: result.contactOpacity,
      aboutStartY: H * defaultHeroConfig.aboutFadeStartFraction,
      contactStartY: H * defaultHeroConfig.contactFadeStartFraction,
      aboutEndY: H * defaultHeroConfig.contactFadeStartFraction, // aboutEndY = contactStartY
      contactEndY: H * defaultHeroConfig.contactFadeStartFraction + H * 0.75
    });

    expect(result.stage).toBe(3);

    expect(result.contactOpacity).toBeGreaterThan(0);

    expect(result.aboutOpacity).toBeGreaterThanOrEqual(0);
  });

  it('deve verificar se ContactSection aparece no stage 3', () => {
    const H = 1000;

    const stage3Result = computeHeroProgress(H * 2.55, H, defaultHeroConfig);
    
    console.log('Stage 3 (Y=2550):', {
      stage: stage3Result.stage,
      aboutOpacity: stage3Result.aboutOpacity,
      contactOpacity: stage3Result.contactOpacity
    });

    expect(stage3Result.stage).toBe(3);

    expect(stage3Result.contactOpacity).toBeGreaterThan(0);
  });

  it('deve verificar diferentes pontos Y no stage 3', () => {
    const H = 1000;
    
    const testPoints = [
      { y: H * 2.55, name: 'Contact Start (Y=2550)' },
      { y: H * 2.7, name: 'Contact Middle (Y=2700)' },
      { y: H * 2.9, name: 'Contact Middle+ (Y=2900)' },
      { y: H * 3.0, name: 'Contact End (Y=3000)' }
    ];
    
    testPoints.forEach(({ y, name }) => {
      const result = computeHeroProgress(y, H, defaultHeroConfig);
      console.log(`${name}:`, {
        stage: result.stage,
        aboutOpacity: result.aboutOpacity.toFixed(2),
        contactOpacity: result.contactOpacity.toFixed(2)
      });

      expect(result.stage).toBe(3);

      expect(result.contactOpacity).toBeGreaterThan(0);
    });
  });
});
