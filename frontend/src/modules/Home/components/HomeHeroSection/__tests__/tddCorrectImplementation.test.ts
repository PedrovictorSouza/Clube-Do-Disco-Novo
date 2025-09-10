import { describe, it, expect } from 'vitest'

function correctBehavior(gridOpacity: number, isMobile: boolean) {
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

describe('TDD: Implementação CORRETA', () => {
    it('should PASS: returns 100vh when gridOpacity > 0', () => {
        const result = correctBehavior(0.133396, true);
        
        console.log('Comportamento CORRETO:', result);
        console.log('GridOpacity:', 0.133396);
        console.log('Resultado:', result.leftPane);
        
        expect(result.leftPane).toBe('100vh');
    });

    it('should PASS: returns 50vh when gridOpacity = 0', () => {
        const result = correctBehavior(0, true);
        expect(result.leftPane).toBe('50vh');
    });

    it('should PASS: returns 100vh when gridOpacity = 0.01', () => {
        const result = correctBehavior(0.01, true);
        expect(result.leftPane).toBe('100vh');
    });

    it('should PASS: works for desktop (isMobile=false)', () => {
        const result = correctBehavior(0.5, false);
        expect(result.leftPane).toBe('50vh');
        expect(result.rightPane).toBe('50vh');
    });
});
