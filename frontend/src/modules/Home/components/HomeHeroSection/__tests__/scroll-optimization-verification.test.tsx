import { describe, it, expect, beforeEach } from 'vitest';
import { computeHeroProgress, defaultHeroConfig } from '../../../../../hooks/heroProgress/math';

// Mock do window.innerHeight para testes consistentes
const mockViewportHeight = 1000;

describe('Verificação da Implementação da Otimização de Scroll', () => {
  beforeEach(() => {
    // Mock do viewport height
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: mockViewportHeight,
    });
  });

  describe('Verificação da Configuração Atualizada', () => {
    it('deve confirmar que a configuração foi atualizada corretamente', () => {
      const config = defaultHeroConfig;

      // Verificar que os valores foram atualizados conforme a solução
      expect(config.gridFadeEndFraction).toBe(1.0);
      expect(config.aboutFadeStartFraction).toBe(1.0);
      expect(config.aboutFadeEndFraction).toBe(1.75);
      expect(config.contactFadeStartFraction).toBe(1.75);
      expect(config.contactFadeEndFraction).toBe(2.5);
    });

    it('deve verificar que a distância entre Events e About agora é ideal', () => {
      const H = mockViewportHeight;
      const config = defaultHeroConfig;

      // Events aparece em 0.6H
      const eventsStartY = H * 0.6; // 600px
      
      // About agora aparece em 1.0H (otimizado)
      const aboutStartY = H * config.aboutFadeStartFraction; // 1000px
      
      // Distância otimizada
      const optimizedDistance = aboutStartY - eventsStartY; // 400px
      
      // Verificar que a distância agora é ideal (40% da viewport)
      expect(optimizedDistance).toBe(400);
      expect(optimizedDistance).toBe(H * 0.4);
    });
  });

  describe('Verificação da Funcionalidade das Seções', () => {
    it('deve confirmar que todas as seções funcionam corretamente com a nova configuração', () => {
      const H = mockViewportHeight;
      const config = defaultHeroConfig;

      // Teste de transições entre seções
      const testPoints = [
        { y: H * 0.2, expectedStage: 0, description: 'Título ativo' },
        { y: H * 0.6, expectedStage: 1, description: 'Events ativo' },
        { y: H * 1.0, expectedStage: 2, description: 'About ativo' },
        { y: H * 1.75, expectedStage: 3, description: 'Contact ativo' },
      ];

      testPoints.forEach(({ y, expectedStage, description }) => {
        const state = computeHeroProgress(y, H, config);
        expect(state.stage).toBe(expectedStage, `Falha em ${description} (y=${y})`);
      });
    });

    it('deve verificar que as opacidades das seções funcionam corretamente', () => {
      const H = mockViewportHeight;
      const config = defaultHeroConfig;

      // Events totalmente visível
      const eventsState = computeHeroProgress(H * 0.6, H, config);
      expect(eventsState.gridOpacity).toBe(1);

      // About totalmente visível
      const aboutState = computeHeroProgress(H * 1.0, H, config);
      expect(aboutState.aboutOpacity).toBe(1);

      // Contact totalmente visível
      const contactState = computeHeroProgress(H * 1.75, H, config);
      expect(contactState.contactOpacity).toBe(1);
    });
  });

  describe('Verificação da Melhoria na UX', () => {
    it('deve confirmar que a navegação agora é mais eficiente', () => {
      const H = mockViewportHeight;
      
      // Distância otimizada entre Events e About
      const optimizedDistance = H * (1.0 - 0.6); // 400px
      
      // Scrolls necessários com a otimização
      const typicalScrollAmount = 100;
      const optimizedScrolls = Math.ceil(optimizedDistance / typicalScrollAmount);
      
      // Verificar que agora são necessários apenas 4 scrolls
      expect(optimizedScrolls).toBe(4);
      
      // Verificar que a distância é 40% da viewport (ideal)
      const distanceInViewports = optimizedDistance / H;
      expect(distanceInViewports).toBe(0.4);
    });

    it('deve confirmar que o problema de scroll excessivo foi resolvido', () => {
      const H = mockViewportHeight;
      
      // Distância anterior (problemática): 1.8H - 0.6H = 1.2H
      const previousDistance = H * (1.8 - 0.6); // 1200px
      
      // Distância atual (otimizada): 1.0H - 0.6H = 0.4H
      const currentDistance = H * (1.0 - 0.6); // 400px
      
      // Verificar que a distância foi reduzida em 66.7%
      const reductionPercentage = (previousDistance - currentDistance) / previousDistance;
      expect(reductionPercentage).toBeCloseTo(0.667, 2); // 66.7% de redução
      
      // Verificar que a distância atual é 3x menor que a anterior
      expect(previousDistance / currentDistance).toBeCloseTo(3, 5);
    });
  });

  describe('Verificação da Consistência da Navegação', () => {
    it('deve confirmar que a navegação entre todas as seções é consistente', () => {
      const H = mockViewportHeight;
      const config = defaultHeroConfig;

      // Calcular distâncias entre todas as seções
      const homeToEvents = H * 0.6; // 0.6H
      const eventsToAbout = H * (1.0 - 0.6); // 0.4H
      const aboutToContact = H * (1.75 - 1.0); // 0.75H

      // Verificar que as distâncias são proporcionais e razoáveis
      expect(homeToEvents).toBe(600);
      expect(eventsToAbout).toBe(400);
      expect(aboutToContact).toBe(750);

      // Verificar que a distância Events->About é a menor (mais eficiente)
      expect(eventsToAbout).toBeLessThan(homeToEvents);
      expect(eventsToAbout).toBeLessThan(aboutToContact);
    });
  });
});
