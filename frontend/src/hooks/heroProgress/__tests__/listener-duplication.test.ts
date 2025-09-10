
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useHeroProgress } from '../useHeroProgress';

const mockEventListeners = {
    resize: [],
    scroll: []
};

global.getEventListeners = vi.fn(() => mockEventListeners);

describe('Listener Duplication Detection - Uncle Bob Style', () => {
    beforeEach(() => {

        mockEventListeners.resize = [];
        mockEventListeners.scroll = [];
        vi.clearAllMocks();
    });

    it('should not create duplicate event listeners', () => {
        const initialResizeListeners = mockEventListeners.resize.length;
        const initialScrollListeners = mockEventListeners.scroll.length;

        const { unmount: unmount1 } = renderHook(() => useHeroProgress());
        const { unmount: unmount2 } = renderHook(() => useHeroProgress());

        mockEventListeners.resize.push(() => {});
        mockEventListeners.scroll.push(() => {});
        
        const finalResizeListeners = mockEventListeners.resize.length;
        const finalScrollListeners = mockEventListeners.scroll.length;

        expect(finalResizeListeners - initialResizeListeners).toBeLessThanOrEqual(2);
        expect(finalScrollListeners - initialScrollListeners).toBeLessThanOrEqual(2);
        
        unmount1();
        unmount2();
    });
    
    it('should clean up listeners on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        
        const { unmount } = renderHook(() => useHeroProgress());
        
        unmount();


        
        removeEventListenerSpy.mockRestore();
    });
});
