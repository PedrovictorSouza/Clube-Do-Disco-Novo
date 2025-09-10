import { describe, it, expect } from 'vitest'

function calculateMobileHeights(heroStage: number, isMobile: boolean) {
    if (!isMobile) return { leftPane: '50vh', rightPane: '50vh' };

    const progress = Math.min(heroStage / 4, 1); // 0 a 1 baseado no stage (0-4)

    const minHeight = 50; // 50vh
    const maxHeight = 85; // 85vh (quase toda a tela)

    const minDiskHeight = 50; // 50vh
    const maxDiskHeight = 7.5; // 7.5vh (metade do tamanho atual - 15vh/2)

    let leftPaneHeight = minHeight + (maxHeight - minHeight) * progress;
    let rightPaneHeight = minDiskHeight - (minDiskHeight - maxDiskHeight) * Math.min(progress * 2, 1);

    if (progress >= 1) {
        leftPaneHeight = 100; // 100vh - tela toda
        rightPaneHeight = 100; // 100vh - tela toda também para o disco
    }
    
    return {
        leftPane: `${leftPaneHeight}vh`,
        rightPane: `${rightPaneHeight}vh`
    };
}

describe('Mobile Heights Calculation', () => {
    describe('Desktop behavior', () => {
        it('should return fixed heights for desktop', () => {
            const result = calculateMobileHeights(0, false);
            expect(result.leftPane).toBe('50vh');
            expect(result.rightPane).toBe('50vh');
        });
    });

    describe('Mobile behavior', () => {
        it('should return 50vh for both panes at stage 0', () => {
            const result = calculateMobileHeights(0, true);
            expect(result.leftPane).toBe('50vh');
            expect(result.rightPane).toBe('50vh');
        });

        it('should return 58.75vh for leftPane at stage 1', () => {
            const result = calculateMobileHeights(1, true);
            expect(result.leftPane).toBe('58.75vh');
        });

        it('should return 28.75vh for rightPane at stage 1', () => {
            const result = calculateMobileHeights(1, true);
            expect(result.rightPane).toBe('28.75vh');
        });

        it('should return 67.5vh for leftPane at stage 2', () => {
            const result = calculateMobileHeights(2, true);
            expect(result.leftPane).toBe('67.5vh');
        });

        it('should return 7.5vh for rightPane at stage 2', () => {
            const result = calculateMobileHeights(2, true);
            expect(result.rightPane).toBe('7.5vh');
        });

        it('should return 76.25vh for leftPane at stage 3', () => {
            const result = calculateMobileHeights(3, true);
            expect(result.leftPane).toBe('76.25vh');
        });

        it('should return 7.5vh for rightPane at stage 3', () => {
            const result = calculateMobileHeights(3, true);
            expect(result.rightPane).toBe('7.5vh');
        });

        it('should return 100vh for leftPane at stage 4 (100% progress)', () => {
            const result = calculateMobileHeights(4, true);
            expect(result.leftPane).toBe('100vh');
        });

        it('should return 100vh for rightPane at stage 4 (100% progress) - MOBILE ONLY', () => {
            const result = calculateMobileHeights(4, true);
            expect(result.rightPane).toBe('100vh');
        });

        it('should handle stages beyond 4', () => {
            const result = calculateMobileHeights(5, true);
            expect(result.leftPane).toBe('100vh');
            expect(result.rightPane).toBe('100vh');
        });
    });
});