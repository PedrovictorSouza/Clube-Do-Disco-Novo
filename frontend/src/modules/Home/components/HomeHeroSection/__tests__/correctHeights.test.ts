import { describe, it, expect } from 'vitest'

function calculateCorrectMobileHeights(heroProgress: number, heroStage: number, isMobile: boolean) {
    if (!isMobile) return { leftPane: '50vh', rightPane: '50vh' };

    const progress = Math.min(heroProgress, 1);

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
        rightPane: `${rightPaneHeight}vh`,
        progress: progress,
        stage: heroStage
    };
}

describe('Correct Heights Calculation', () => {
    it('should return 100vh for both panes when progress=1 and stage=1', () => {
        const result = calculateCorrectMobileHeights(1, 1, true);
        console.log('Progress=1, Stage=1:', result);
        expect(result.leftPane).toBe('100vh');
        expect(result.rightPane).toBe('100vh');
        expect(result.progress).toBe(1);
        expect(result.stage).toBe(1);
    });

    it('should return 50vh for both panes when progress=0', () => {
        const result = calculateCorrectMobileHeights(0, 0, true);
        console.log('Progress=0, Stage=0:', result);
        expect(result.leftPane).toBe('50vh');
        expect(result.rightPane).toBe('50vh');
    });

    it('should return intermediate values for progress=0.5', () => {
        const result = calculateCorrectMobileHeights(0.5, 1, true);
        console.log('Progress=0.5, Stage=1:', result);
        expect(result.leftPane).toBe('67.5vh');
        expect(result.rightPane).toBe('28.75vh');
    });

    it('should work for desktop (isMobile=false)', () => {
        const result = calculateCorrectMobileHeights(1, 1, false);
        expect(result.leftPane).toBe('50vh');
        expect(result.rightPane).toBe('50vh');
    });
});
