import { describe, it, expect } from 'vitest'
import { computeHeroProgress, defaultHeroConfig } from '../../../../../hooks/heroProgress/math'

describe('Progress Investigation', () => {
    const H = 800; // altura da viewport

    it('should investigate the difference between progress and stage', () => {

        const testCases = [
            { y: 0, description: 'Início' },
            { y: 100, description: 'Pouco scroll' },
            { y: 200, description: 'Meio do titleEndY' },
            { y: 400, description: 'titleEndY completo' },
            { y: 600, description: 'Grid peak' },
            { y: 800, description: 'About start' },
            { y: 1200, description: 'Contact start' },
            { y: 1600, description: 'Contact end' }
        ];

        testCases.forEach(({ y, description }) => {
            const result = computeHeroProgress(y, H, defaultHeroConfig);
            const stageBasedProgress = result.stage / 4;
            
            console.log(`${description} (y=${y}):`, {
                progress: result.progress,
                stage: result.stage,
                stageBasedProgress: stageBasedProgress,
                leftPaneExpected: result.progress >= 1 ? '100vh' : `${50 + (85 - 50) * result.progress}vh`,
                leftPaneStageBased: stageBasedProgress >= 1 ? '100vh' : `${50 + (85 - 50) * stageBasedProgress}vh`
            });
        });
    });

    it('should show what happens when gridOpacity is 1', () => {

        const testCases = [
            { y: 0, description: 'Início' },
            { y: 200, description: 'Grid start' },
            { y: 400, description: 'Grid peak' },
            { y: 600, description: 'Grid peak + 200' },
            { y: 800, description: 'About start' }
        ];

        testCases.forEach(({ y, description }) => {
            const result = computeHeroProgress(y, H, defaultHeroConfig);
            
            if (result.gridOpacity === 1) {
                console.log(`Grid opacity = 1 em ${description} (y=${y}):`, {
                    progress: result.progress,
                    stage: result.stage,
                    stageBasedProgress: result.stage / 4,
                    titleOpacity: result.titleOpacity,
                    gridOpacity: result.gridOpacity
                });
            }
        });
    });

    it('should find when we have gridOpacity=1 and progress=1', () => {

        for (let y = 0; y <= 2000; y += 50) {
            const result = computeHeroProgress(y, H, defaultHeroConfig);
            
            if (result.gridOpacity === 1 && result.progress >= 0.99) {
                console.log(`Grid opacity=1 e progress≈1 em y=${y}:`, {
                    progress: result.progress,
                    stage: result.stage,
                    stageBasedProgress: result.stage / 4,
                    titleOpacity: result.titleOpacity,
                    gridOpacity: result.gridOpacity
                });
                break;
            }
        }
    });
});
