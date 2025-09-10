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
        rightPane: `${rightPaneHeight}vh`,
        progress: progress,
        stage: heroStage
    };
}

describe('Debug Heights Investigation', () => {
    it('should show current behavior for stage 1', () => {
        const result = calculateMobileHeights(1, true);
        console.log('Stage 1:', result);
        expect(result.stage).toBe(1);
        expect(result.progress).toBe(0.25); // 1/4 = 0.25
        expect(result.leftPane).toBe('58.75vh');
        expect(result.rightPane).toBe('28.75vh');
    });

    it('should show current behavior for stage 2', () => {
        const result = calculateMobileHeights(2, true);
        console.log('Stage 2:', result);
        expect(result.stage).toBe(2);
        expect(result.progress).toBe(0.5); // 2/4 = 0.5
        expect(result.leftPane).toBe('67.5vh');
        expect(result.rightPane).toBe('7.5vh');
    });

    it('should show current behavior for stage 3', () => {
        const result = calculateMobileHeights(3, true);
        console.log('Stage 3:', result);
        expect(result.stage).toBe(3);
        expect(result.progress).toBe(0.75); // 3/4 = 0.75
        expect(result.leftPane).toBe('76.25vh');
        expect(result.rightPane).toBe('7.5vh');
    });

    it('should show current behavior for stage 4', () => {
        const result = calculateMobileHeights(4, true);
        console.log('Stage 4:', result);
        expect(result.stage).toBe(4);
        expect(result.progress).toBe(1); // 4/4 = 1
        expect(result.leftPane).toBe('100vh');
        expect(result.rightPane).toBe('100vh');
    });

    it('should investigate what happens with different progress calculations', () => {

        const stage1Progress1 = Math.min(1 / 4, 1); // 0.25
        const stage1Progress2 = 1 / 4; // 0.25
        const stage1Progress3 = 1; // 1 (se progress for 100%)
        
        console.log('Stage 1 progress calculations:');
        console.log('Math.min(1/4, 1):', stage1Progress1);
        console.log('1/4:', stage1Progress2);
        console.log('1 (100%):', stage1Progress3);
        
        expect(stage1Progress1).toBe(0.25);
        expect(stage1Progress2).toBe(0.25);
        expect(stage1Progress3).toBe(1);
    });

    it('should test what happens if we use different progress values', () => {

        const mockProgress = 1; // 100%
        const minHeight = 50;
        const maxHeight = 85;
        
        let leftPaneHeight = minHeight + (maxHeight - minHeight) * mockProgress;

        if (mockProgress >= 1) {
            leftPaneHeight = 100;
        }
        
        console.log('Mock progress 100%:', {
            progress: mockProgress,
            leftPaneHeight: leftPaneHeight,
            leftPaneVh: `${leftPaneHeight}vh`
        });
        
        expect(leftPaneHeight).toBe(100);
        expect(`${leftPaneHeight}vh`).toBe('100vh');
    });
});
