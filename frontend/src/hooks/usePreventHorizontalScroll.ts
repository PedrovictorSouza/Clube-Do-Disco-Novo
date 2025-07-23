import { useEffect } from 'react';

export const usePreventHorizontalScroll = () => {
  useEffect(() => {
    const preventHorizontalScroll = () => {
      // Forçar scroll X para 0
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    };

    const ensureScrollToTop = () => {
      // Garantir que o scroll Y comece em 0
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    // Prevenir scroll horizontal com wheel
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    // Prevenir scroll horizontal com touch
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const startX = touch.clientX;
        
        // Se detectar movimento horizontal, prevenir
        if (Math.abs(touch.clientX - startX) > 10) {
          e.preventDefault();
        }
      }
    };

    // Prevenir scroll horizontal com teclado
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }
    };

    // Aplicar listeners
    window.addEventListener('scroll', preventHorizontalScroll, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    // Forçar posição inicial
    preventHorizontalScroll();
    ensureScrollToTop();

    // Garantir que comece no topo após um pequeno delay
    const timer = setTimeout(() => {
      ensureScrollToTop();
    }, 100);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', preventHorizontalScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);
}; 