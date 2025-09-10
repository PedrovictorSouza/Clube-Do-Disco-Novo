import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Comportamento instantâneo para evitar animação
      });
    };

    scrollToTop();

    const timer1 = setTimeout(scrollToTop, 50);
    const timer2 = setTimeout(scrollToTop, 200);
    const timer3 = setTimeout(scrollToTop, 500);

    const handleLoad = () => {
      scrollToTop();
    };

    const handleDOMContentLoaded = () => {
      scrollToTop();
    };

    window.addEventListener('load', handleLoad);
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);
}; 