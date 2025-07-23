import React, { useState, useEffect } from 'react';

const DebugScroll: React.FC = () => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
      
      // Calcular porcentagem de scroll baseada na altura total da página
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercentage(Math.round(percentage));
    };

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      handleScroll(); // Recalcular scroll após resize
    };

    // Definir valores iniciais
    handleResize();
    handleScroll();

    // Adicionar listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#f1891d',
        padding: '16px',
        borderRadius: '8px',
        fontFamily: 'Karla, sans-serif',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 9999,
        border: '2px solid #f1891d',
        minWidth: '140px',
        textAlign: 'left',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        lineHeight: '1.4'
      }}
    >
      <div style={{ marginBottom: '8px', borderBottom: '1px solid #f1891d', paddingBottom: '4px' }}>
        <strong>VIEWPORT</strong>
      </div>
      <div style={{ marginBottom: '4px' }}>
        W: {viewportWidth}px
      </div>
      <div style={{ marginBottom: '8px' }}>
        H: {viewportHeight}px
      </div>
      
      <div style={{ marginBottom: '8px', borderBottom: '1px solid #f1891d', paddingBottom: '4px' }}>
        <strong>SCROLL</strong>
      </div>
      <div style={{ marginBottom: '4px' }}>
        X: {scrollX}px
      </div>
      <div style={{ marginBottom: '4px' }}>
        Y: {scrollY}px
      </div>
      <div style={{ marginBottom: '8px' }}>
        %: {scrollPercentage}%
      </div>
      
      <div style={{ marginBottom: '8px', borderBottom: '1px solid #f1891d', paddingBottom: '4px' }}>
        <strong>RELATIVO</strong>
      </div>
      <div style={{ marginBottom: '4px' }}>
        Y/vh: {(scrollY / viewportHeight).toFixed(2)}
      </div>
      <div>
        % da tela: {Math.round((scrollY / viewportHeight) * 100)}%
      </div>
    </div>
  );
};

export default DebugScroll; 