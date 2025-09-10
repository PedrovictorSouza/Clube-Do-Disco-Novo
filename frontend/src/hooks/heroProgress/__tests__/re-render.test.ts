
import { renderHook } from '@testing-library/react';
import { useHeroProgress } from '../useHeroProgress';

describe('Re-render Detection - Uncle Bob Style', () => {
    it('should not cause excessive re-renders', () => {
        let renderCount = 0;
        
        const { result } = renderHook(() => {
            renderCount++;
            return useHeroProgress();
        });

        expect(renderCount).toBe(1);
        expect(result.current.stage).toBeGreaterThanOrEqual(0);

        for (let i = 0; i < 50; i++) {

            Object.defineProperty(window, 'innerHeight', { 
                value: 800 + Math.random() * 100 
            });
            window.dispatchEvent(new Event('resize'));

            window.dispatchEvent(new Event('scroll'));
        }


        expect(renderCount).toBeLessThan(10);
    });
    
    it('should handle rapid state changes without excessive re-renders', () => {
        let renderCount = 0;
        
        const { result, rerender } = renderHook(() => {
            renderCount++;
            return useHeroProgress();
        });

        for (let i = 0; i < 20; i++) {
            rerender();
        }

        expect(renderCount).toBeLessThan(25); // 1 inicial + 20 forçados
        expect(result.current.stage).toBeGreaterThanOrEqual(0);
    });
});
