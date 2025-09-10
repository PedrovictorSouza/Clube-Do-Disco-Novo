import { describe, it, expect } from 'vitest'

function calculateGridOpacityBasedHeights(gridOpacity: number, isMobile: boolean) {
    if (!isMobile) return { leftPane: '50vh', rightPane: '50vh' };

    if (gridOpacity > 0) {
        return {
            leftPane: '100vh',
            rightPane: '100vh'
        };
    }

    return {
        leftPane: '50vh',
        rightPane: '50vh'
    };
}

describe('Grid Opacity Based Heights', () => {
    it('should return 50vh when gridOpacity is 0', () => {
        const result = calculateGridOpacityBasedHeights(0, true);
        expect(result.leftPane).toBe('50vh');
        expect(result.rightPane).toBe('50vh');
    });

    it('should return 100vh when gridOpacity is 0.01', () => {
        const result = calculateGridOpacityBasedHeights(0.01, true);
        expect(result.leftPane).toBe('100vh');
        expect(result.rightPane).toBe('100vh');
    });

    it('should return 100vh when gridOpacity is 0.133396 (your exact value)', () => {
        const result = calculateGridOpacityBasedHeights(0.133396, true);
        expect(result.leftPane).toBe('100vh');
        expect(result.rightPane).toBe('100vh');
    });

    it('should return 100vh when gridOpacity is 1', () => {
        const result = calculateGridOpacityBasedHeights(1, true);
        expect(result.leftPane).toBe('100vh');
        expect(result.rightPane).toBe('100vh');
    });

    it('should work for desktop (isMobile=false)', () => {
        const result = calculateGridOpacityBasedHeights(0.5, false);
        expect(result.leftPane).toBe('50vh');
        expect(result.rightPane).toBe('50vh');
    });

    it('should test the exact scenario you described', () => {

        const scenarios = [
            { gridOpacity: 0, expected: '50vh', description: 'Grid opacity 0' },
            { gridOpacity: 0.01, expected: '100vh', description: 'Grid opacity 0.01 (should jump to 100vh)' },
            { gridOpacity: 0.133396, expected: '100vh', description: 'Grid opacity 0.133396 (your exact value)' },
            { gridOpacity: 1, expected: '100vh', description: 'Grid opacity 1' }
        ];

        scenarios.forEach(({ gridOpacity, expected, description }) => {
            const result = calculateGridOpacityBasedHeights(gridOpacity, true);
            console.log(`${description}: ${result.leftPane} (expected: ${expected})`);
            expect(result.leftPane).toBe(expected);
        });
    });
});
