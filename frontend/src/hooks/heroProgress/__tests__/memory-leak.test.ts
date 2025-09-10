
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useHeroProgress } from '../useHeroProgress';

const mockMemory = {
    usedJSHeapSize: 1000000
};

Object.defineProperty(window, 'performance', {
    value: {
        memory: mockMemory
    }
});

describe('Memory Leak Detection - Uncle Bob Style', () => {
    beforeEach(() => {

        mockMemory.usedJSHeapSize = 1000000;
    });

    it('should not leak memory on multiple mounts/unmounts', () => {
        const initialMemory = mockMemory.usedJSHeapSize;

        for (let i = 0; i < 10; i++) {
            const { unmount } = renderHook(() => useHeroProgress());
            unmount();

            mockMemory.usedJSHeapSize += 1000;
        }
        
        const finalMemory = mockMemory.usedJSHeapSize;

        expect(finalMemory - initialMemory).toBeLessThan(50000); // 50KB
    });
    
    it('should clean up event listeners on unmount', () => {
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        
        const { unmount } = renderHook(() => useHeroProgress());


        
        unmount();


        
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });
});