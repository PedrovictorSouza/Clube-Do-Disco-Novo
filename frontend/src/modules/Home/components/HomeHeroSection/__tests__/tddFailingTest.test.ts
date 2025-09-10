import { describe, it, expect } from 'vitest'

function currentWrongBehavior(gridOpacity: number, isMobile: boolean) {
    if (!isMobile) return { leftPane: '50vh', rightPane: '50vh' };

    const progress = 0.25; // Simulando progress = 25%
    const minHeight = 50;
    const maxHeight = 85;
    const leftPaneHeight = minHeight + (maxHeight - minHeight) * progress;
    
    return {
        leftPane: `${leftPaneHeight}vh`,
        rightPane: '50vh' // Simplificado para o teste
    };
}

describe('TDD: Teste que DEVE FALHAR primeiro', () => {
    it('should FAIL: current behavior returns 58.75vh when gridOpacity > 0', () => {

        const result = currentWrongBehavior(0.133396, true);
        
        console.log('Comportamento atual (ERRADO):', result);
        console.log('GridOpacity:', 0.133396);
        console.log('Resultado atual:', result.leftPane);
        console.log('Resultado esperado: 100vh');

        expect(result.leftPane).toBe('100vh');
    });

    it('should FAIL: current behavior returns 50vh when gridOpacity = 0', () => {

        const result = currentWrongBehavior(0, true);
        expect(result.leftPane).toBe('50vh');
    });

    it('should FAIL: current behavior returns 58.75vh when gridOpacity = 0.01', () => {

        const result = currentWrongBehavior(0.01, true);
        expect(result.leftPane).toBe('100vh');
    });
});
