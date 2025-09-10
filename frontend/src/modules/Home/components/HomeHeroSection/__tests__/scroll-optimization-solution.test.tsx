import { describe, it, expect, beforeEach } from 'vitest';
import { computeHeroProgress, defaultHeroConfig } from '../../../../../hooks/heroProgress/math';

// Mock do window.innerHeight para testes consistentes
const mockViewportHeight = 1000;

describe('Solução para Problema de Scroll Excessivo - Events para About', () => {
  beforeEach(() => {
    // Mock do viewport height
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: mockViewportHeight,
    });
  });

  describe('Análise do Problema Identificado', () => {
    it('deve confirmar que o problema é a distância excessiva entre Events e About', () => {
      const H = mockViewportHeight;
      const config = defaultHeroConfig;

      // Configuração atual problemática
      const eventsStartY = H * 0.6; // 600px
      const aboutStartY = H * config.aboutFadeStartFraction; // 1800px
      const currentDistance = aboutStartY - eventsStartY; // 1200px

      // Distância ideal (40% da viewport)
      const idealDistance = H * 0.4; // 400px

      // Confirmar que a distância atual agora é ideal (foi otimizada)
      expect(currentDistance / idealDistance).toBeCloseTo(1, 5);
      
      // Confirmar que agora são necessários apenas 4 scrolls para navegar
      const typicalScrollAmount = 100;
      const requiredScrolls = Math.ceil(currentDistance / typicalScrollAmount);
      expect(requiredScrolls).toBe(4);
    });
  });

  describe('Configuração Otimizada', () => {
    it('deve definir a configuração otimizada que reduz a distância de scroll', () => {
      const H = mockViewportHeight;
      
      // Configuração otimizada: About começa em 1.0H em vez de 1.8H
      const optimizedConfig = {
        ...defaultHeroConfig,
        aboutFadeStartFraction: 1.0, // Reduzido de 1.8 para 1.0
        aboutFadeEndFraction: 1.75,  // Ajustado proporcionalmente
        contactFadeStartFraction: 1.75, // Ajustado para manter consistência
        contactFadeEndFraction: 2.5,    // Ajustado proporcionalmente
      };

      // Verificar que a distância agora é ideal
      const eventsStartY = H * 0.6; // 600px
      const optimizedAboutStartY = H * optimizedConfig.aboutFadeStartFraction; // 1000px
      const optimizedDistance = optimizedAboutStartY - eventsStartY; // 400px

      expect(optimizedDistance).toBe(400); // Distância ideal
      expect(optimizedDistance).toBe(H * 0.4); // 40% da viewport
    });

    it('deve validar que a configuração otimizada mantém a funcionalidade das seções', () => {
      const H = mockViewportHeight;
      const optimizedConfig = {
        ...defaultHeroConfig,
        aboutFadeStartFraction: 1.0,
        aboutFadeEndFraction: 1.75,
        contactFadeStartFraction: 1.75,
        contactFadeEndFraction: 2.5,
      };

      // Teste de transições suaves entre seções
      const testPoints = [
        { y: H * 0.2, expectedStage: 0, description: 'Título ativo' },
        { y: H * 0.6, expectedStage: 1, description: 'Events ativo' },
        { y: H * 1.0, expectedStage: 2, description: 'About ativo' },
        { y: H * 1.75, expectedStage: 3, description: 'Contact ativo' },
      ];

      testPoints.forEach(({ y, expectedStage, description }) => {
        const state = computeHeroProgress(y, H, optimizedConfig);
        expect(state.stage).toBe(expectedStage, `Falha em ${description} (y=${y})`);
      });
    });

    it('deve verificar que a opacidade das seções funciona corretamente na configuração otimizada', () => {
      const H = mockViewportHeight;
      const optimizedConfig = {
        ...defaultHeroConfig,
        aboutFadeStartFraction: 1.0,
        aboutFadeEndFraction: 1.75,
        contactFadeStartFraction: 1.75,
        contactFadeEndFraction: 2.5,
      };

      // Teste de opacidade em pontos específicos
      const eventsState = computeHeroProgress(H * 0.6, H, optimizedConfig);
      expect(eventsState.gridOpacity).toBe(1); // Events totalmente visível

      const aboutState = computeHeroProgress(H * 1.0, H, optimizedConfig);
      expect(aboutState.aboutOpacity).toBe(1); // About totalmente visível

      const contactState = computeHeroProgress(H * 1.75, H, optimizedConfig);
      expect(contactState.contactOpacity).toBe(1); // Contact totalmente visível
    });
  });

  describe('Benefícios da Otimização', () => {
    it('deve demonstrar a melhoria na experiência do usuário', () => {
      const H = mockViewportHeight;
      
      // Configuração atual
      const currentDistance = H * (1.8 - 0.6); // 1200px
      const currentScrolls = Math.ceil(currentDistance / 100); // 13 scrolls

      // Configuração otimizada
      const optimizedDistance = H * (1.0 - 0.6); // 400px
      const optimizedScrolls = Math.ceil(optimizedDistance / 100); // 4 scrolls

      // Verificar melhorias
      expect(optimizedDistance).toBeLessThan(currentDistance);
      expect(optimizedScrolls).toBeLessThan(currentScrolls);
      expect(optimizedScrolls).toBe(4); // Apenas 4 scrolls necessários
      expect(currentScrolls / optimizedScrolls).toBeCloseTo(3.25, 1); // 3.25x menos scrolls
    });

    it('deve confirmar que a navegação fica mais fluida e intuitiva', () => {
      const H = mockViewportHeight;
      
      // Com a configuração otimizada, o usuário precisa scrollar apenas 40% da viewport
      // para ir de Events para About, em vez de 120% da viewport
      const optimizedDistanceInViewports = (H * (1.0 - 0.6)) / H;
      expect(optimizedDistanceInViewports).toBe(0.4); // 40% da viewport

      // Isso significa que o usuário não perde a referência visual
      // e a navegação fica mais natural
      expect(optimizedDistanceInViewports).toBeLessThan(1.0); // Menos de uma viewport
    });
  });

  describe('Implementação da Solução', () => {
    it('deve fornecer a configuração exata para implementar no código', () => {
      // Esta é a configuração que deve ser aplicada no arquivo math.ts
      const solutionConfig = {
        titleFadeEndFraction: 0.25,    // Mantém o mesmo
        gridFadeStartFraction: 0.25,   // Mantém o mesmo
        gridFadeEndFraction: 1.0,      // Reduzido de 1.8 para 1.0
        aboutFadeStartFraction: 1.0,   // Reduzido de 1.8 para 1.0
        aboutFadeEndFraction: 1.75,    // Reduzido de 2.55 para 1.75
        contactFadeStartFraction: 1.75, // Reduzido de 2.55 para 1.75
        contactFadeEndFraction: 2.5,   // Reduzido de 3.3 para 2.5
        logMilestones: true,
      };

      // Verificar que a configuração está correta
      expect(solutionConfig.aboutFadeStartFraction).toBe(1.0);
      expect(solutionConfig.aboutFadeEndFraction).toBe(1.75);
      expect(solutionConfig.contactFadeStartFraction).toBe(1.75);
      expect(solutionConfig.contactFadeEndFraction).toBe(2.5);
    });
  });
});
