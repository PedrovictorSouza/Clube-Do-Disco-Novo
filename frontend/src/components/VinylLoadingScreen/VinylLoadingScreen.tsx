import React, { useEffect, useState } from 'react';
import styles from './VinylLoadingScreen.module.css';

interface VinylLoadingScreenProps {
  onComplete: () => void;
}

const VinylLoadingScreen: React.FC<VinylLoadingScreenProps> = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState('carregando');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'carregando') return 'carregando.';
        if (prev === 'carregando.') return 'carregando..';
        if (prev === 'carregando..') return 'carregando...';
        return 'carregando';
      });
    }, 500);

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`${styles.loadingContainer} ${isFadingOut ? styles.fadingOut : ''}`}
      data-testid="loading-container"
    >
      <div className={styles.wrapper}>
        <svg 
          id="playme" 
          className={`${styles.playme} ${styles.isPlaying}`}
          data-testid="playme-svg"
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 280 200" 
          shapeRendering="geometricPrecision" 
          textRendering="geometricPrecision"
        >
          <g id="playme-notes-right" transform="matrix(0.55751 0.256485 -0.256485 0.55751 -97.615604 -136.209744)">
            <g id="playme-note4_to" transform="translate(628.554433,154.494302)">
              <g id="playme-note4_tr" transform="rotate(2.491167)">
                <g id="playme-note4" transform="scale(0.933596,0.918556) translate(-630.129303,-145.651569)" opacity="0">
                  <path id="playme-path1" d="M633.3,119.9C633.9,121.9,634.6,123.4,637.1,126.2C639.6,129,642.3,130.5,643.6,133.4C643.925497,133.995465,644.16137,134.63569,644.3,135.3C644.808963,137.516518,644.56258,139.839554,643.6,141.9" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="playme-path2" d="M633.3,119.9C633.055764,123.943296,633.88368,127.979382,635.7,131.6C638.1,135.9,640.8,137,642.5,141.1C643.890016,144.608027,644.06603,148.480335,643,152.1" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <line id="playme-line1" x1="633.3" y1="121.1" x2="633.3" y2="166.2" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="playme-path3" d="M633.3,166.2C633.5,163,628.7,159.9,624.4,159.9C620.1,159.9,615.7,162.5,615.7,165.6C615.7,168.7,620.4,171.3,624.4,171.4C628.4,171.5,633.1,169.2,633.3,166.2Z" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            </g>
            <g id="playme-note3_to" transform="translate(599.237024,96.48133)">
              <g id="playme-note3_tr" transform="rotate(0)">
                <g id="playme-note3" transform="scale(0.847748,0.847748) translate(-622.450806,-142.950005)" opacity="0">
                  <polyline id="playme-polyline1" points="614.8,155 614.8,116.8 647.5,124 647.5,162.9" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="playme-path4" d="M614.8,155.7C614.8,152.6,610.4,150,606.6,149.8C602.8,149.6,597.4,152.6,597.4,155.8C597.4,159,602.1,161.4,606.1,161.4C610.1,161.4,614.8,158.8,614.8,155.7Z" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="playme-path5" d="M647.5,163.3C647.6,160.2,643.1,157.6,639.3,157.4C635.5,157.2,630.1,160.2,630.2,163.4C630.3,166.6,634.9,169.1,638.8,169.1C642.7,169.1,647.5,166.5,647.5,163.3Z" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            </g>
          </g>
          <g id="playme-mix-tools" transform="matrix(1 0 0 1 16.776743 -58.590975)">
            <g id="playme-vinyl_tr" transform="translate(125.500279,154.001562) rotate(0)">
              <g id="playme-vinyl" transform="scale(0.999992,0.999992) translate(-125.5,-154)">
                <path id="playme-path6" d="M64.3,179.5C69.4,191.7,78,202.1,88.9,209.3L125.5,154.1L64.3,179.5Z" fill="rgb(255,255,255)" stroke="rgba(0,0,0,0)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <polygon id="playme-polygon1" points="181.4,118.5 170.8,106.4 125.5,154" fill="rgb(255,255,255)" stroke="rgba(0,0,0,0)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <g id="playme-g1">
                  <g id="playme-hover-circle">
                    <circle id="playme-circle2" r="24.7" transform="matrix(1 0 0 1 125.5 154)" fill="rgb(255,255,255)" stroke="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <g id="playme-ripple-circle">
                    <circle id="playme-circle3" r="9.6" transform="matrix(0.5 0 0 0.5 125.5 154)" opacity="0.008923" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle id="playme-circle4" r="9.6" transform="matrix(0.5 0 0 0.5 125.5 154)" opacity="0.030761" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle id="playme-circle5" r="9.6" transform="matrix(0.5 0 0 0.5 125.5 154)" opacity="0.00304" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <circle id="playme-circle6" r="9.6" transform="matrix(1 0 0 1 125.5 154)" fill="rgb(255,255,255)" stroke="rgba(0,0,0,0)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <circle id="playme-circle1" r="66.3" transform="matrix(1 0 0 1 125.5 154)" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
            <g id="playme-riding-head_tr" transform="translate(200.502829,216.587099) rotate(60.927958)">
              <g id="playme-riding-head" transform="translate(-203.091128,-224.644183)">
                <path id="playme-path7" d="M160,196.7L172.2,213.2C174.7,216.5,178.6,219.5,183.8,220.6" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path id="playme-path8" d="M160,196.7L172.2,213.2C174.7,216.5,178.6,219.5,183.8,220.6C189.9,221.8,203,224.4,203,224.4" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path id="playme-path9" d="M169.5,197.3C171.4,199.8,171,203.3,168.5,205.3L166.3,207C163.8,208.9,160.3,208.5,158.3,206L151,196.6C149.1,194.1,149.5,190.6,152,188.6L154.2,186.9C156.7,185,160.2,185.4,162.2,187.9L169.5,197.3Z" transform="matrix(1 0 0 1 0.490775 0.098572)" fill="rgb(255,255,255)" stroke="rgba(0,0,0,0)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle id="playme-circle7" r="9.9" transform="matrix(1 0 0 1 203.1 224.6)" fill="rgb(255,255,255)" stroke="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
            <g id="playme-svg-line" transform="matrix(1 0 0 1 0.50029 -8.174752)">
              <line id="playme-line2" x1="162.7" y1="236.7" x2="87.3" y2="236.7" transform="matrix(1 0 0 1 1.893839 11.248364)" fill="rgba(0,0,0,0)" stroke="rgb(255,255,255)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          <g id="playme-notes-left" transform="matrix(0.669902 -0.255492 0.255492 0.669903 -202.729504 131.160881)">
            <g id="playme-note2_to" transform="translate(376.349907,107.570774)">
              <g id="playme-note2_tr" transform="rotate(0)">
                <g id="playme-note2" transform="scale(0.641022,0.641019) translate(-362.849319,-61.149998)" opacity="0">
                  <polyline id="playme-polyline2" points="388.2,73.6 388.2,34.6 354.9,42.6 354.9,82.4" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="playme-path10" d="M388.2,74.1C388.2,71.1,383.8,68.5,380.1,68.3C376.4,68.1,370.9,71.1,371,74.3C371.1,77.5,375.6,79.9,379.6,79.9C383.6,79.9,388.2,77.3,388.2,74.1Z" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="playme-path11" d="M354.9,81.9C354.9,78.8,350.5,76.2,346.7,76C342.9,75.8,337.4,78.8,337.5,82C337.6,85.2,342.2,87.7,346.2,87.7C350.2,87.7,354.9,85.1,354.9,81.9Z" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <line id="playme-line3" x1="354.9" y1="48.4" x2="388.2" y2="40.3" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <line id="playme-line4" x1="354.9" y1="54.6" x2="388.2" y2="47" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            </g>
            <g id="playme-note1_to" transform="translate(417.525928,16.382583)">
              <g id="playme-note1_tr" transform="rotate(0)">
                <g id="playme-note1" transform="scale(0.794404,0.794404) translate(-369.714297,-60.304541)" opacity="0">
                  <path id="playme-path12" d="M371.8,79.5C371.8,76.4,367.3,73.7,363.5,73.6C359.7,73.5,354.2,76.4,354.3,79.6C354.4,82.8,359,85.3,363,85.3C367,85.3,371.8,82.7,371.8,79.5Z" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <line id="playme-line5" x1="371.8" y1="79.5" x2="371.8" y2="33.3" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path id="playme-path13" d="M371.8,33.4C372.569455,36.177881,373.785307,38.812229,375.4,41.2C379.1,46.9,383,48.2,384.2,52.8C384.7,54.5,384.9,57.2,383.3,61.1" fill="rgba(0,0,0,0)" stroke="rgb(255,97,216)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <h2 className={styles.loadingText}>{loadingText}</h2>
      </div>
    </div>
  );
};

export default VinylLoadingScreen;
