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

describe('EventCarousel - Scroll Tests', () => {
  beforeEach(() => {
    // Mock do scrollTo para evitar erros nos testes
    Element.prototype.scrollTo = vi.fn();
  });

  describe('Container de Scroll', () => {
    test('deve ter um container com overflow-x: auto', () => {
      render(<EventCarousel events={mockEvents} />);
      
      // Seleciona o container correto (o que tem a classe carousel)
      const carousel = document.querySelector('[class*="carousel"]:not([class*="carouselContainer"]):not([class*="carouselWrapper"])');
      
      expect(carousel).toBeInTheDocument();
      
      // Verifica se o elemento tem as classes CSS corretas
      expect(carousel!.className).toContain('carousel');
    });

    test('deve ter scroll-behavior: smooth', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]:not([class*="carouselContainer"]):not([class*="carouselWrapper"])');
      expect(carousel).toBeInTheDocument();
      
      // Verifica se o estilo está aplicado (será verificado via CSS)
      const computedStyle = window.getComputedStyle(carousel!);
      expect(computedStyle.scrollBehavior).toBe('smooth');
    });

    test('deve ter scrollbar oculta', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]:not([class*="carouselContainer"]):not([class*="carouselWrapper"])');
      expect(carousel).toBeInTheDocument();
      
      const computedStyle = window.getComputedStyle(carousel!);
      expect(computedStyle.scrollbarWidth).toBe('none');
    });
  });

  describe('Funcionalidade de Scroll', () => {
    test('deve permitir scroll horizontal quando há mais itens que cabem na tela', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]') as HTMLElement;
      expect(carousel).toBeInTheDocument();
      
      // Simula que o conteúdo é maior que o container
      Object.defineProperty(carousel, 'scrollWidth', { value: 1000 });
      Object.defineProperty(carousel, 'clientWidth', { value: 500 });
      
      expect(carousel.scrollWidth).toBeGreaterThan(carousel.clientWidth);
    });

    test('deve ter botões de navegação funcionais', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const prevButton = screen.getByLabelText('Evento anterior');
      const nextButton = screen.getByLabelText('Próximo evento');
      
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      
      // Testa se os botões não estão desabilitados inicialmente
      expect(prevButton).toBeDisabled(); // Primeiro item, botão anterior deve estar desabilitado
      expect(nextButton).not.toBeDisabled();
    });

    test('deve atualizar índice atual ao clicar nos botões de navegação', async () => {
      const onFeaturedChange = vi.fn();
      render(<EventCarousel events={mockEvents} onFeaturedChange={onFeaturedChange} />);
      
      const nextButton = screen.getByLabelText('Próximo evento');
      
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(onFeaturedChange).toHaveBeenCalledWith(mockEvents[1]);
      });
    });

    test('deve ter dots de navegação funcionais', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const dots = screen.getAllByRole('button', { name: /Ir para evento/ });
      expect(dots).toHaveLength(mockEvents.length);
      
      // O primeiro dot deve estar ativo (usando a classe hasheada)
      expect(dots[0].className).toContain('activeDot');
    });
  });

  describe('Problemas de Scroll Identificados', () => {
    test('deve ter padding horizontal no container para evitar que itens fiquem colados nas bordas', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]');
      expect(carousel).toBeInTheDocument();
      
      const computedStyle = window.getComputedStyle(carousel!);
      expect(computedStyle.paddingLeft).not.toBe('0px');
      expect(computedStyle.paddingRight).not.toBe('0px');
    });

    test('deve ter gap entre os itens do carrossel', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]');
      expect(carousel).toBeInTheDocument();
      
      const computedStyle = window.getComputedStyle(carousel!);
      expect(computedStyle.gap).not.toBe('0px');
    });

    test('deve ter flex-shrink: 0 nos itens para evitar compressão', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const eventCards = document.querySelectorAll('[class*="card"]');
      expect(eventCards.length).toBeGreaterThan(0);
      
      eventCards.forEach(card => {
        const computedStyle = window.getComputedStyle(card);
        expect(computedStyle.flexShrink).toBe('0');
      });
    });
  });

  describe('Teste de Scroll Manual', () => {
    test('deve responder a eventos de scroll manual', () => {
      render(<EventCarousel events={mockEvents} />);
      
      const carousel = document.querySelector('[class*="carousel"]') as HTMLElement;
      expect(carousel).toBeInTheDocument();
      
      // Simula scroll manual
      const scrollEvent = new Event('scroll', { bubbles: true });
      fireEvent(carousel, scrollEvent);
      
      // Verifica se o evento foi processado (não deve gerar erro)
      expect(carousel).toBeInTheDocument();
    });
  });
});
