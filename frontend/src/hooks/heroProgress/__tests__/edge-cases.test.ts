
import { computeHeroProgress, defaultHeroConfig } from '../math';

describe('Edge Cases - Viewport Height Zero', () => {
    it('should handle zero viewport height gracefully', () => {
        const result = computeHeroProgress(100, 0, defaultHeroConfig);
        
        expect(result.titleOpacity).toBe(1);
        expect(result.gridOpacity).toBe(0);
        expect(result.aboutOpacity).toBe(0);
        expect(result.contactOpacity).toBe(0);
        expect(result.progress).toBe(0);
        expect(result.stage).toBe(0);
    });
    
    it('should handle negative viewport height gracefully', () => {
        const result = computeHeroProgress(100, -100, defaultHeroConfig);
        
        expect(result.titleOpacity).toBe(1);
        expect(result.progress).toBe(0);
        expect(result.stage).toBe(0);
    });
    
    it('should handle infinite viewport height gracefully', () => {
        const result = computeHeroProgress(100, Infinity, defaultHeroConfig);
        
        expect(result.titleOpacity).toBe(1);
        expect(result.progress).toBe(0);
        expect(result.stage).toBe(0);
    });
    
    it('should handle NaN viewport height gracefully', () => {
        const result = computeHeroProgress(100, NaN, defaultHeroConfig);
        
        expect(result.titleOpacity).toBe(1);
        expect(result.progress).toBe(0);
        expect(result.stage).toBe(0);
    });
});

describe('Edge Cases - Scroll Y Invalid', () => {
    it('should handle infinite scroll Y gracefully', () => {
        const result = computeHeroProgress(Infinity, 800, defaultHeroConfig);
        
        expect(result.titleOpacity).toBe(1);
        expect(result.progress).toBe(0);
        expect(result.stage).toBe(0);
    });
    
    it('should handle NaN scroll Y gracefully', () => {
        const result = computeHeroProgress(NaN, 800, defaultHeroConfig);
        
        expect(result.titleOpacity).toBe(1);
        expect(result.progress).toBe(0);
        expect(result.stage).toBe(0);
    });
});

describe('Normal Cases - Should Still Work', () => {
    it('should work normally with valid inputs', () => {
        const result = computeHeroProgress(100, 800, defaultHeroConfig);
        
        expect(result.titleOpacity).toBeGreaterThan(0);
        expect(result.titleOpacity).toBeLessThanOrEqual(1);
        expect(result.progress).toBeGreaterThan(0);
        expect(result.stage).toBeGreaterThanOrEqual(0);
    });
});
