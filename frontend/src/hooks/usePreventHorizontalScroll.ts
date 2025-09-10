import { useEffect } from 'react';

export const usePreventHorizontalScroll = () => {
  useEffect(() => {
    const preventHorizontalScroll = () => {

      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
      }
    };

    const ensureScrollToTop = () => {

      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const startX = touch.clientX;

        if (Math.abs(touch.clientX - startX) > 10) {
          e.preventDefault();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', preventHorizontalScroll, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    preventHorizontalScroll();
    ensureScrollToTop();

    const timer = setTimeout(() => {
      ensureScrollToTop();
    }, 100);

    return () => {
      window.removeEventListener('scroll', preventHorizontalScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);
}; 