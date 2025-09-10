import { describe, it, expect } from 'vitest'

function simulateRealWorldBehavior(heroProgress: number, heroStage: number, isMobile: boolean) {
    if (!isMobile) return { leftPane: '50vh', rightPane: '50vh' };

    const progress = Math.min(heroProgress, 1);
    
    const minHeight = 50;
    const maxHeight = 85;
    const minDiskHeight = 50;
    const maxDiskHeight = 7.5;
    
    let leftPaneHeight = minHeight + (maxHeight - minHeight) * progress;
    let rightPaneHeight = minDiskHeight - (minDiskHeight - maxDiskHeight) * Math.min(progress * 2, 1);
    
    if (progress >= 1) {
        leftPaneHeight = 100;
        rightPaneHeight = 100;
    }
    
    return {
        leftPane: `${leftPaneHeight}vh`,
        rightPane: `${rightPaneHeight}vh`,
        progress: progress,
        stage: heroStage,
        heroProgress: heroProgress
    };
}

describe('Real World Test', () => {
    it('should debug the exact scenario you are seeing', () => {


        
        const scenarios = [
            { progress: 0.25, stage: 1, description: 'Stage 1, progress 25%' },
            { progress: 0.5, stage: 1, description: 'Stage 1, progress 50%' },
            { progress: 0.75, stage: 1, description: 'Stage 1, progress 75%' },
            { progress: 1, stage: 1, description: 'Stage 1, progress 100%' },
            { progress: 1, stage: 2, description: 'Stage 2, progress 100%' },
            { progress: 1, stage: 4, description: 'Stage 4, progress 100%' }
        ];

        scenarios.forEach(({ progress, stage, description }) => {
            const result = simulateRealWorldBehavior(progress, stage, true);
            console.log(`${description}:`, result);
            
            if (result.leftPane === '58.75vh') {
                console.log(`🎯 FOUND THE SCENARIO: ${description}`);
                console.log('This matches what you are seeing in the browser!');
            }
        });
    });

    it('should test what happens with the old logic (stage-based)', () => {

        const oldLogic = (stage: number) => {
            const progress = Math.min(stage / 4, 1);
            const minHeight = 50;
            const maxHeight = 85;
            const leftPaneHeight = minHeight + (maxHeight - minHeight) * progress;
            return `${leftPaneHeight}vh`;
        };

        console.log('Old logic (stage-based):');
        for (let stage = 0; stage <= 4; stage++) {
            const result = oldLogic(stage);
            console.log(`Stage ${stage}: ${result}`);
        }
    });

    it('should test what happens with the new logic (progress-based)', () => {

        console.log('New logic (progress-based):');
        const progressValues = [0, 0.25, 0.5, 0.75, 1];
        
        progressValues.forEach(progress => {
            const result = simulateRealWorldBehavior(progress, 1, true);
            console.log(`Progress ${progress}: ${result.leftPane}`);
        });
    });
});
