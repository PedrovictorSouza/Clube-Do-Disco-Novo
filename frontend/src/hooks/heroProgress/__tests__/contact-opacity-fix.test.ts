import { describe, it, expect } from 'vitest';
import { computeHeroProgress, defaultHeroConfig } from '../math';

describe('Contact Opacity Fix', () => {
  it('deve ter contactOpacity = 1 quando y >= contactStartY', () => {
    const H = 1000;
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction; // 2.55 * 1000 = 2550

    const result1 = computeHeroProgress(contactStartY, H, defaultHeroConfig);
    expect(result1.contactOpacity).toBe(1);
    expect(result1.stage).toBe(3);

    const result2 = computeHeroProgress(contactStartY + 100, H, defaultHeroConfig);
    expect(result2.contactOpacity).toBe(1);
    expect(result2.stage).toBe(3);

    const result3 = computeHeroProgress(contactStartY - 100, H, defaultHeroConfig);
    expect(result3.contactOpacity).toBe(0);
    expect(result3.stage).toBe(2); // About stage
  });

  it('deve manter stage 3 para contact quando y >= contactStartY', () => {
    const H = 1000;
    const contactStartY = H * defaultHeroConfig.contactFadeStartFraction;

    const testValues = [
      contactStartY,           // Exatamente no início
      contactStartY + 100,     // Pouco depois
      contactStartY + 500,     // No meio
      contactStartY + 1000,    // Muito depois
    ];
    
    testValues.forEach(y => {
      const result = computeHeroProgress(y, H, defaultHeroConfig);
      expect(result.stage).toBe(3);
      expect(result.contactOpacity).toBe(1);
    });
  });
});
