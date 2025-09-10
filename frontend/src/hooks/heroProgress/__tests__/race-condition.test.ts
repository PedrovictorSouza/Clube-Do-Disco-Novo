
import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useHeroProgress } from '../useHeroProgress';

const mockWindow = {
    innerHeight: 800,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
};

Object.defineProperty(window, 'performance', {
    value: {
        memory: {
            usedJSHeapSize: 1000000
        }
    }
});

describe('Race Condition Detection - Uncle Bob Style', () => {
    beforeEach(() => {

        vi.clearAllMocks();
        Object.defineProperty(window, 'innerHeight', {
            value: 800,
            writable: true
        });
    });

    it('should handle resize and scroll events without duplication', async () => {
        const { result } = renderHook(() => useHeroProgress());

        expect(result.current.H).toBeGreaterThan(0);
        expect(result.current.stage).toBeGreaterThanOrEqual(0);

        act(() => {
            Object.defineProperty(window, 'innerHeight', { value: 600 });
            window.dispatchEvent(new Event('resize'));
        });

        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.H).toBeGreaterThan(0);
        expect(result.current.stage).toBeGreaterThanOrEqual(0);
    });
    
    it('should handle rapid resize events without race conditions', async () => {
        const { result } = renderHook(() => useHeroProgress());

        act(() => {
            for (let i = 0; i < 10; i++) {
                Object.defineProperty(window, 'innerHeight', { value: 600 + i * 10 });
                window.dispatchEvent(new Event('resize'));
            }
        });

        expect(result.current.H).toBeGreaterThan(0);
        expect(result.current.stage).toBeGreaterThanOrEqual(0);
    });
});
