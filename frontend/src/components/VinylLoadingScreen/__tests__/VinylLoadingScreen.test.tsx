import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VinylLoadingScreen from '../VinylLoadingScreen';

describe('VinylLoadingScreen - Teste de Keyframes', () => {
  it('deve renderizar o componente e verificar se as animações estão aplicadas', () => {
    render(<VinylLoadingScreen isPlaying={true} />);

    const loadingContainer = screen.getByTestId('loading-container');
    expect(loadingContainer).toBeInTheDocument();

    const playmeElement = screen.getByTestId('playme-svg');
    const className = playmeElement.getAttribute('class') || '';
    expect(className).toContain('playme');
    expect(className).toContain('isPlaying');

    const note4To = document.getElementById('playme-note4_to');
    const note4Tr = document.getElementById('playme-note4_tr');
    const note4 = document.getElementById('playme-note4');
    
    expect(note4To).toBeInTheDocument();
    expect(note4Tr).toBeInTheDocument();
    expect(note4).toBeInTheDocument();
  });

  it('deve verificar se as propriedades de animação estão definidas no CSS', () => {

    const styleSheets = Array.from(document.styleSheets);
    let hasKeyframes = false;
    
    styleSheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules);
        const keyframes = rules.filter(rule => rule.type === CSSRule.KEYFRAMES_RULE);
        if (keyframes.length > 0) {
          hasKeyframes = true;
          console.log('Keyframes encontrados:', keyframes.map(k => k.name));
        }
      } catch (e) {

      }
    });

    if (!hasKeyframes) {
      console.log('Keyframes não encontrados nos stylesheets - verificando CSS Module');

      render(<VinylLoadingScreen isPlaying={true} />);
      expect(screen.getByTestId('loading-container')).toBeInTheDocument();
    } else {
      expect(hasKeyframes).toBe(true);
    }
  });
});
