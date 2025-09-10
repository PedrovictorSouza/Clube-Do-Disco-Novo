import { describe, it, expect } from 'vitest';
import { computeHeroProgress } from '../../../../../hooks/heroProgress/math';
import { defaultHeroConfig } from '../../../../../hooks/heroProgress/math';

describe('Contact Opacity Debug', () => {
  it('deve verificar por que ContactOpacity não é 1.00 quando clica em contact', () => {
    const H = 1000; // Altura da viewport

    const stage3Result = computeHeroProgress(H * 2.0, H, defaultHeroConfig); // Entre about e contact
    console.log('Stage 3 (Y=2000):', {
      stage: stage3Result.stage,
      aboutOpacity: stage3Result.aboutOpacity,
      contactOpacity: stage3Result.contactOpacity
    });

    const contactClickResult = computeHeroProgress(H * 2.55, H, defaultHeroConfig);
    console.log('Contact Click (Y=2550):', {
      stage: contactClickResult.stage,
      aboutOpacity: contactClickResult.aboutOpacity,
      contactOpacity: contactClickResult.contactOpacity
    });

    const stage4Result = computeHeroProgress(H * 3.0, H, defaultHeroConfig);
    console.log('Stage 4 (Y=3000):', {
      stage: stage4Result.stage,
      aboutOpacity: stage4Result.aboutOpacity,
      contactOpacity: stage4Result.contactOpacity
    });

    expect(contactClickResult.stage).toBe(4);
    expect(contactClickResult.contactOpacity).toBe(1);
    expect(contactClickResult.aboutOpacity).toBe(0);
  });

  it('deve verificar os pontos de transição entre about e contact', () => {
    const H = 1000;

    const testPoints = [
      { y: H * 1.8, name: 'About Start' },
      { y: H * 2.0, name: 'About Middle' },
      { y: H * 2.2, name: 'About End' },
      { y: H * 2.4, name: 'Contact Start' },
      { y: H * 2.55, name: 'Contact Click' },
      { y: H * 2.8, name: 'Contact Middle' },
      { y: H * 3.0, name: 'Contact End' }
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

  it('deve verificar se o problema está na lógica de stages', () => {
    const H = 1000;

    const stage3Y = H * 2.0; // Entre about e contact
    const stage3Result = computeHeroProgress(stage3Y, H, defaultHeroConfig);
    
    console.log('Stage 3 Analysis:', {
      y: stage3Y,
      stage: stage3Result.stage,
      aboutOpacity: stage3Result.aboutOpacity,
      contactOpacity: stage3Result.contactOpacity,
      aboutEndY: stage3Result.aboutEndY,
      contactEndY: stage3Result.contactEndY
    });

    expect(stage3Result.stage).toBe(3);
    expect(stage3Result.aboutOpacity).toBe(1);
    expect(stage3Result.contactOpacity).toBe(0);
  });
});
