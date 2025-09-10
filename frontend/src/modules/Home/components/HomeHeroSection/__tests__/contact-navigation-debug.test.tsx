import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomeHeroSection from '../index';

const mockAnimateVirtualScrollTo = vi.fn();

const mockUseHeroProgress = vi.fn();

vi.mock('../../../../../hooks/heroProgress/useHeroProgress.ts', () => ({
  useHeroProgress: () => mockUseHeroProgress(),
}));

vi.mock('../../../../../hooks/scroll/scrollObserver.ts', () => ({
  animateVirtualScrollTo: mockAnimateVirtualScrollTo,
}));

describe('Contact Navigation Debug', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve mostrar ContactOpacity = 1.00 quando clica em "contact" na navegação', () => {

    mockUseHeroProgress.mockReturnValue({
      scrollY: 0,
      H: 1000, // Altura da viewport
      stage: 0,
      titleOpacity: 1,
      gridOpacity: 0,
      aboutOpacity: 0,
      contactOpacity: 0,
    });

    render(<HomeHeroSection />);

    const contactNavButton = screen.getByText('Contato');
    fireEvent.click(contactNavButton);

    expect(mockAnimateVirtualScrollTo).toHaveBeenCalledWith(
      2550, // hero.H * 2.55 = 1000 * 2.55
      { duration: 0 }
    );

    mockUseHeroProgress.mockReturnValue({
      scrollY: 2550,
      H: 1000,
      stage: 4,
      titleOpacity: 0,
      gridOpacity: 0,
      aboutOpacity: 0, // About deve estar oculto
      contactOpacity: 1, // Contact deve estar visível
    });

    render(<HomeHeroSection />);

    const contactSection = screen.getByText('Entre em Contato');
    expect(contactSection).toBeInTheDocument();
  });

  it('deve mostrar AboutOpacity = 1.00 quando clica em "about" na navegação', () => {

    mockUseHeroProgress.mockReturnValue({
      scrollY: 0,
      H: 1000,
      stage: 0,
      titleOpacity: 1,
      gridOpacity: 0,
      aboutOpacity: 0,
      contactOpacity: 0,
    });

    render(<HomeHeroSection />);

    const aboutNavButton = screen.getByText('About');
    fireEvent.click(aboutNavButton);

    expect(mockAnimateVirtualScrollTo).toHaveBeenCalledWith(
      1800, // hero.H * 1.8 = 1000 * 1.8
      { duration: 0 }
    );

    mockUseHeroProgress.mockReturnValue({
      scrollY: 1800,
      H: 1000,
      stage: 2,
      titleOpacity: 0,
      gridOpacity: 0,
      aboutOpacity: 1, // About deve estar visível
      contactOpacity: 0, // Contact deve estar oculto
    });

    render(<HomeHeroSection />);

    const aboutSection = screen.getByText('Que clube é esse?');
    expect(aboutSection).toBeInTheDocument();
  });

  it('deve verificar se os âncoras estão corretos', () => {

    const H = 1000;
    mockUseHeroProgress.mockReturnValue({
      scrollY: 0,
      H,
      stage: 0,
      titleOpacity: 1,
      gridOpacity: 0,
      aboutOpacity: 0,
      contactOpacity: 0,
    });

    render(<HomeHeroSection />);







    const homeButton = screen.getByText('Home');
    const eventsButton = screen.getByText('Eventos');
    const aboutButton = screen.getByText('About');
    const contactButton = screen.getByText('Contato');

    fireEvent.click(homeButton);
    expect(mockAnimateVirtualScrollTo).toHaveBeenCalledWith(0, expect.any(Object));

    fireEvent.click(eventsButton);
    expect(mockAnimateVirtualScrollTo).toHaveBeenCalledWith(600, expect.any(Object));

    fireEvent.click(aboutButton);
    expect(mockAnimateVirtualScrollTo).toHaveBeenCalledWith(1800, expect.any(Object));

    fireEvent.click(contactButton);
    expect(mockAnimateVirtualScrollTo).toHaveBeenCalledWith(2550, expect.any(Object));
  });

  it('deve verificar se o stage 3 está causando conflito', () => {

    mockUseHeroProgress.mockReturnValue({
      scrollY: 2000, // Entre about e contact
      H: 1000,
      stage: 3,
      titleOpacity: 0,
      gridOpacity: 0,
      aboutOpacity: 1, // About ainda visível no stage 3
      contactOpacity: 0, // Contact ainda não visível
    });

    render(<HomeHeroSection />);

    const aboutSection = screen.queryByText('Que clube é esse?');
    const contactSection = screen.queryByText('Entre em Contato');
    
    expect(aboutSection).toBeInTheDocument();
    expect(contactSection).not.toBeInTheDocument();
  });
});
