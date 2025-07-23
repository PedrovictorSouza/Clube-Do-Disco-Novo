import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    // Função para forçar scroll para o topo
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Comportamento instantâneo para evitar animação
      });
    };

    // Forçar scroll para o topo imediatamente
    scrollToTop();

    // Garantir que fique no topo após um pequeno delay (para casos onde há carregamento assíncrono)
    const timer1 = setTimeout(scrollToTop, 50);
    const timer2 = setTimeout(scrollToTop, 200);
    const timer3 = setTimeout(scrollToTop, 500);

    // Listener para quando a página terminar de carregar
    const handleLoad = () => {
      scrollToTop();
    };

    // Listener para quando o DOM estiver pronto
    const handleDOMContentLoaded = () => {
      scrollToTop();
    };

    // Adicionar listeners
    window.addEventListener('load', handleLoad);
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

    // Cleanup
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);
}; 