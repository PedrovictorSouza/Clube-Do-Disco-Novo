import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProgressBar } from '../useProgressBar';

vi.mock('../heroProgress/useHeroProgress', () => ({
  useHeroProgress: vi.fn()
}));

import { useHeroProgress } from '../heroProgress/useHeroProgress';
const mockUseHeroProgress = useHeroProgress as any;

describe('useProgressBar', () => {
  it('deve retornar progresso 0 quando no home (stage 0)', () => {
    mockUseHeroProgress.mockReturnValue({
      stage: 0,
      contactOpacity: 0,
      aboutOpacity: 0,
      gridOpacity: 0,
      titleOpacity: 1
    });

    const { result } = renderHook(() => useProgressBar());
    
    expect(result.current.progress).toBe(0);
    expect(result.current.stage).toBe(0);
  });

  it('deve retornar progresso 1 quando contactOpacity = 1', () => {
    mockUseHeroProgress.mockReturnValue({
      stage: 3,
      contactOpacity: 1,
      aboutOpacity: 0,
      gridOpacity: 0,
      titleOpacity: 0
    });

    const { result } = renderHook(() => useProgressBar());
    
    expect(result.current.progress).toBe(1);
    expect(result.current.stage).toBe(3);
  });

  it('deve retornar progresso 0.7 quando aboutOpacity = 1', () => {
    mockUseHeroProgress.mockReturnValue({
      stage: 2,
      contactOpacity: 0,
      aboutOpacity: 1,
      gridOpacity: 0,
      titleOpacity: 0
    });

    const { result } = renderHook(() => useProgressBar());
    
    expect(result.current.progress).toBe(0.7);
    expect(result.current.stage).toBe(2);
  });

  it('deve retornar progresso 0.3 quando gridOpacity = 1', () => {
    mockUseHeroProgress.mockReturnValue({
      stage: 1,
      contactOpacity: 0,
      aboutOpacity: 0,
      gridOpacity: 1,
      titleOpacity: 0
    });

    const { result } = renderHook(() => useProgressBar());
    
    expect(result.current.progress).toBe(0.3);
    expect(result.current.stage).toBe(1);
  });

  it('deve calcular progresso baseado na opacidade do contact', () => {
    mockUseHeroProgress.mockReturnValue({
      stage: 3,
      contactOpacity: 0.5,
      aboutOpacity: 0,
      gridOpacity: 0,
      titleOpacity: 0
    });

    const { result } = renderHook(() => useProgressBar());
    
    expect(result.current.progress).toBe(0.5);
  });

  it('deve calcular progresso baseado na opacidade do about', () => {
    mockUseHeroProgress.mockReturnValue({
      stage: 2,
      contactOpacity: 0,
      aboutOpacity: 0.5,
      gridOpacity: 0,
      titleOpacity: 0
    });

    const { result } = renderHook(() => useProgressBar());
    
    expect(result.current.progress).toBe(0.5); // 0.3 + (0.5 * 0.4) = 0.5
  });
});
