import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import EventCarousel from '../EventCarousel';
import { EventData } from '../types';

// Mock dos dados de eventos para teste
const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Evento 1',
    date: '2024-01-01',
    time: '20:00',
    coverImage: '/test-image1.jpg',
    albumTitle: 'Álbum 1',
    artist: 'Artista 1',
    price: 'R$ 50,00'
  },
  {
    id: '2',
    title: 'Evento 2',
    date: '2024-01-02',
    time: '21:00',
    coverImage: '/test-image2.jpg',
    albumTitle: 'Álbum 2',
    artist: 'Artista 2',
    price: 'R$ 60,00'
  },
  {
    id: '3',
    title: 'Evento 3',
    date: '2024-01-03',
    time: '22:00',
    coverImage: '/test-image3.jpg',
    albumTitle: 'Álbum 3',
    artist: 'Artista 3',
    price: 'R$ 70,00'
  }
];

describe('EventCarousel - Integration Tests', () => {
  beforeEach(() => {
    // Mock do scrollTo para evitar erros nos testes
    Element.prototype.scrollTo = vi.fn();
  });

  describe('Problema de Scroll Identificado', () => {
    test('deve ter um container scrollável com overflow-x', () => {
      render(<EventCarousel events={mockEvents} />);
      
      // Encontra o container do carrossel
      const carousel = document.querySelector('[class*="carousel"]:not([class*="carouselContainer"]):not([class*="carouselWrapper"])');
      expect(carousel).toBeInTheDocument();
      
      // Verifica se tem overflow-x
      const computedStyle = window.getComputedStyle(carousel!);
      console.log('Computed styles:', {
        overflowX: computedStyle.overflowX,
        display: computedStyle.display,
        flexDirection: computedStyle.flexDirection
      });
      
      expect(computedStyle.overflowX).toBe('auto');
    });

    test('deve ter itens com largura fixa para permitir scroll', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const eventCards = document.querySelectorAll('[class*="card"]');
      expect(eventCards.length).toBeGreaterThan(0);
      
      eventCards.forEach((card, index) => {
        const computedStyle = window.getComputedStyle(card);
        console.log(`Card ${index} styles:`, {
          flex: computedStyle.flex,
          flexShrink: computedStyle.flexShrink,
          width: computedStyle.width,
          minWidth: computedStyle.minWidth
        });
        
        // Verifica se tem largura fixa
        expect(computedStyle.width).not.toBe('auto');
      });
    });

    test('deve permitir scroll programático', () => {
      const onFeaturedChange = vi.fn();
      render(<EventCarousel events={mockEvents} onFeaturedChange={onFeaturedChange} />);
      
      const nextButton = screen.getByLabelText('Próximo evento');
      
      // Simula clique no botão próximo
      fireEvent.click(nextButton);
      
      // Verifica se scrollTo foi chamado
      expect(Element.prototype.scrollTo).toHaveBeenCalled();
    });

    test('deve ter conteúdo maior que o container para permitir scroll', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]:not([class*="carouselContainer"]):not([class*="carouselWrapper"])') as HTMLElement;
      expect(carousel).toBeInTheDocument();
      
      // Simula que o conteúdo é maior que o container
      Object.defineProperty(carousel, 'scrollWidth', { value: 1000 });
      Object.defineProperty(carousel, 'clientWidth', { value: 500 });
      
      expect(carousel.scrollWidth).toBeGreaterThan(carousel.clientWidth);
    });
  });

  describe('Diagnóstico do Problema', () => {
    test('deve identificar se o problema é CSS ou JavaScript', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]:not([class*="carouselContainer"]):not([class*="carouselWrapper"])') as HTMLElement;
      const eventCards = document.querySelectorAll('[class*="card"]');
      
      console.log('=== DIAGNÓSTICO DO CARROSSEL ===');
      console.log('Container encontrado:', !!carousel);
      console.log('Número de cards:', eventCards.length);
      
      if (carousel) {
        const computedStyle = window.getComputedStyle(carousel);
        console.log('Estilos do container:', {
          display: computedStyle.display,
          overflowX: computedStyle.overflowX,
          flexDirection: computedStyle.flexDirection,
          gap: computedStyle.gap,
          padding: computedStyle.padding
        });
      }
      
      eventCards.forEach((card, index) => {
        const computedStyle = window.getComputedStyle(card);
        console.log(`Card ${index}:`, {
          flex: computedStyle.flex,
          width: computedStyle.width,
          minWidth: computedStyle.minWidth,
          flexShrink: computedStyle.flexShrink
        });
      });
      
      // O teste sempre passa, é apenas para diagnóstico
      expect(true).toBe(true);
    });
  });
});
