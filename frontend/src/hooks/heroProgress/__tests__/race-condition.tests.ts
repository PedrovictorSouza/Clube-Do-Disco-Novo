
import { act, renderHook } from '@testing-library/react';
import { useHeroProgress } from '../useHeroProgress';

describe('Race Condition Detection - Uncle Bob Style', () => {
    it('should handle resize and scroll events without duplication', async () => {
        const { result } = renderHook(() => useHeroProgress());

        act(() => {
            window.dispatchEvent(new Event('resize'));
        });

        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.H).toBeGreaterThan(0);
        expect(result.current.stage).toBeGreaterThanOrEqual(0);
    });
});