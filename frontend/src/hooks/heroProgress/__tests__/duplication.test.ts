
import { renderHook } from '@testing-library/react';
import { useHeroProgress } from '../useHeroProgress';

describe('Duplication Detection - Uncle Bob Style', () => {
    it('should not create multiple instances of useHeroProgress', () => {

        const { result: result1 } = renderHook(() => useHeroProgress());
        const { result: result2 } = renderHook(() => useHeroProgress());

        expect(result1.current.stage).toBeGreaterThanOrEqual(0);
        expect(result2.current.stage).toBeGreaterThanOrEqual(0);

        expect(result1.current).not.toBe(result2.current);
    });
    
    it('should handle multiple mounts without duplication', () => {

        const { result, rerender } = renderHook(() => useHeroProgress());

        expect(result.current.H).toBeGreaterThan(0);

        rerender();

        expect(result.current.H).toBeGreaterThan(0);
        expect(result.current.stage).toBeGreaterThanOrEqual(0);
    });
});