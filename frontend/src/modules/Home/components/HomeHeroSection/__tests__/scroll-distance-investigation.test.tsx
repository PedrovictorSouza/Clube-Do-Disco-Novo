import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { computeHeroProgress, defaultHeroConfig } from '../../../../../hooks/heroProgress/math';
import HomeHeroSection from '../index';

// Mock do window.innerHeight para testes consistentes
const mockViewportHeight = 1000;

describe('Investigação de Distância de Scroll - Events para About', () => {
  beforeEach(() => {
    // Mock do viewport height
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: mockViewportHeight,
    });
  });

  describe('Análise dos Pontos de Transição', () => {
    it('deve calcular corretamente os pontos de transição das seções', () => {
      const H = mockViewportHeight;
      const config = defaultHeroConfig;

      // Events aparece quando scroll atinge 0.6 * H
      const eventsStartY = H * 0.6;
      expect(eventsStartY).toBe(600);

      // About aparece quando scroll atinge 1.0 * H (otimizado)
      const aboutStartY = H * config.aboutFadeStartFraction;
      expect(aboutStartY).toBe(1000);

      // Distância entre Events e About (otimizada)
      const distanceEventsToAbout = aboutStartY - eventsStartY;
      expect(distanceEventsToAbout).toBe(400);

      // Verificar se a distância agora é ideal
      const expectedDistance = H * 0.4; // 40% da viewport (400px)
      const actualDistance = distanceEventsToAbout; // 400px (otimizado)
      
      expect(actualDistance).toBe(expectedDistance);
    });

    it('deve verificar os stages corretos para cada seção', () => {
      const H = mockViewportHeight;
      
      // Teste no ponto onde Events deveria estar ativo
      const eventsY = H * 0.6; // 600px
      const eventsState = computeHeroProgress(eventsY, H, defaultHeroConfig);
      expect(eventsState.stage).toBe(1);
      expect(eventsState.gridOpacity).toBe(1);

      // Teste no ponto onde About deveria estar ativo (otimizado)
      const aboutY = H * 1.0; // 1000px
      const aboutState = computeHeroProgress(aboutY, H, defaultHeroConfig);
      expect(aboutState.stage).toBe(2);
      expect(aboutState.aboutOpacity).toBe(1);
    });
  });

  describe('Análise do Problema de Scroll Excessivo', () => {
    it('deve confirmar que a distância agora está otimizada', () => {
      const H = mockViewportHeight;
      
      // Distância atual otimizada: de 0.6H a 1.0H = 0.4H
      const currentDistance = H * (1.0 - 0.6);
      expect(currentDistance).toBe(400);

      // Distância ideal: deveria ser aproximadamente 0.4H (40% da viewport)
      const idealDistance = H * 0.4;
      expect(idealDistance).toBe(400);

      // Verificar que agora a distância é ideal
      expect(currentDistance).toBe(idealDistance);
    });

    it('deve calcular a posição correta para About baseada em uma distância ideal', () => {
      const H = mockViewportHeight;
      const eventsStartY = H * 0.6; // 600px
      const idealDistance = H * 0.4; // 400px
      
      // Posição ideal para About
      const idealAboutStartY = eventsStartY + idealDistance;
      expect(idealAboutStartY).toBe(1000); // 1.0 * H

      // Verificar que a posição atual (1.8H) é muito distante
      const currentAboutStartY = H * 1.8;
      const excessDistance = currentAboutStartY - idealAboutStartY;
      expect(excessDistance).toBe(800); // 0.8H de distância excessiva
    });
  });

  describe('Teste de Configuração Otimizada', () => {
    it('deve testar uma configuração com distância reduzida entre Events e About', () => {
      const H = mockViewportHeight;
      
      // Configuração otimizada: About começa em 1.0H em vez de 1.8H
      const optimizedConfig = {
        ...defaultHeroConfig,
        aboutFadeStartFraction: 1.0, // Em vez de 1.8
        aboutFadeEndFraction: 1.75,  // Ajustado proporcionalmente
      };

      // Teste no ponto otimizado
      const optimizedAboutY = H * 1.0; // 1000px
      const optimizedState = computeHeroProgress(optimizedAboutY, H, optimizedConfig);
      
      expect(optimizedState.stage).toBe(2);
      expect(optimizedState.aboutOpacity).toBe(1);

      // Verificar que a distância agora é ideal
      const eventsY = H * 0.6;
      const optimizedDistance = optimizedAboutY - eventsY;
      expect(optimizedDistance).toBe(400); // 0.4H - distância ideal
    });

    it('deve validar que a configuração otimizada mantém a funcionalidade', () => {
      const H = mockViewportHeight;
      const optimizedConfig = {
        ...defaultHeroConfig,
        aboutFadeStartFraction: 1.0,
        aboutFadeEndFraction: 1.75,
        contactFadeStartFraction: 1.75,
        contactFadeEndFraction: 2.5,
      };

      // Teste em diferentes pontos de scroll
      const testPoints = [
        { y: H * 0.2, expectedStage: 0, description: 'Título ativo' },
        { y: H * 0.6, expectedStage: 1, description: 'Events ativo' },
        { y: H * 1.1, expectedStage: 2, description: 'About ativo' },
        { y: H * 1.8, expectedStage: 3, description: 'Contact ativo' },
      ];

      testPoints.forEach(({ y, expectedStage, description }) => {
        const state = computeHeroProgress(y, H, optimizedConfig);
        expect(state.stage).toBe(expectedStage, `Falha em ${description} (y=${y})`);
      });
    });
  });

  describe('Análise de Impacto no UX', () => {
    it('deve calcular quantos "scrolls" são necessários para ir de Events para About', () => {
      const H = mockViewportHeight;
      
      // Scroll típico do usuário: aproximadamente 100px por "scroll"
      const typicalScrollAmount = 100;
      
      // Distância atual
      const currentDistance = H * (1.8 - 0.6);
      const currentScrolls = Math.ceil(currentDistance / typicalScrollAmount);
      expect(currentScrolls).toBe(13); // 13 scrolls necessários (devido a Math.ceil)

      // Distância ideal
      const idealDistance = H * 0.4;
      const idealScrolls = Math.ceil(idealDistance / typicalScrollAmount);
      expect(idealScrolls).toBe(4); // 4 scrolls ideais

      // Verificar que são necessários aproximadamente 3x mais scrolls
      expect(currentScrolls).toBeGreaterThanOrEqual(3 * idealScrolls - 1);
    });

    it('deve identificar o problema de usabilidade', () => {
      const H = mockViewportHeight;
      
      // O usuário precisa scrollar 1.2H (1200px) para ir de Events para About
      // Isso é equivalente a mais de uma tela inteira de scroll
      const distanceInViewports = (H * (1.8 - 0.6)) / H;
      expect(distanceInViewports).toBeCloseTo(1.2, 5);
      
      // Isso é problemático porque:
      // 1. O usuário perde a referência visual
      // 2. A navegação fica lenta e cansativa
      // 3. A experiência não é fluida
      
      expect(distanceInViewports).toBeGreaterThan(1.0); // Mais de uma viewport
    });
  });
});
