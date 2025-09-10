import React, { useState, useEffect } from 'react';
import { useHeroProgress } from '../hooks/heroProgress/useHeroProgress';

const DebugScroll: React.FC = () => {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const { progress, stage, gridOpacity, titleOpacity, aboutOpacity, contactOpacity } = useHeroProgress();

    const logValues = (
        sx: number,
        sy: number,
        vw: number,
        vh: number,
        percent: number
    ) => {
        console.clear(); // opcional, deixa o log “limpo” a cada scroll
        console.table({
            'Viewport Width': `${vw}px`,
            'Viewport Height': `${vh}px`,
            'Scroll X': `${sx}px`,
            'Scroll Y': `${sy}px`,
            'Scroll %': `${percent}%`,
            'Y/vh': (sy / vh).toFixed(2),
            '% da tela': `${Math.round((sy / vh) * 100)}%`
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const sx = window.scrollX;
            const sy = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = totalHeight > 0 ? (sy / totalHeight) * 100 : 0;

            setScrollX(sx);
            setScrollY(sy);
            setScrollPercentage(Math.round(percent));

            logValues(sx, sy, viewportWidth, viewportHeight, Math.round(percent));
        };

        const handleResize = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            setViewportWidth(vw);
            setViewportHeight(vh);
            handleScroll(); // já recalcula scroll também
        };

        handleResize();
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [viewportWidth, viewportHeight]); // dependências garantem log consistente

    return (
        <div style={{ 
            position: 'fixed', 
            top: '20px', 
            right: '20px', 
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            minWidth: '200px'
        }}>
            <div>Viewport: {viewportWidth}x{viewportHeight}</div>
            <div>Scroll: {scrollX}, {scrollY}</div>
            <div>Scroll %: {scrollPercentage}%</div>
            <div>Y/vh: {(scrollY / viewportHeight).toFixed(2)}</div>
            <div>% da tela: {Math.round((scrollY / viewportHeight) * 100)}%</div>
            <div style={{ borderTop: '1px solid #333', marginTop: '5px', paddingTop: '5px' }}>
                <div>🎯 Progress: {(progress * 100).toFixed(1)}%</div>
                <div>📊 Stage: {stage}</div>
                <div>🎨 Grid Opacity: {gridOpacity.toFixed(2)}</div>
                <div>📝 Title Opacity: {titleOpacity.toFixed(2)}</div>
                <div>ℹ️ About Opacity: {aboutOpacity.toFixed(2)}</div>
                <div>📞 Contact Opacity: {contactOpacity.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default DebugScroll;
