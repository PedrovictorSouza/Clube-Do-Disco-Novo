import React, { useState } from "react";
import TitleAnimation from "../../components/TitleAnimation";
import ScrollRevealOverlay from "./ScrollRevealOverlay";
import styles from "./Home.module.css";
import { carouselItems } from "../carouselItems";
import RecordShelf from "../../components/RecordShelf";
import RecordInfoBlock from "../../components/RecordInfoBlock";

interface HomeHeroSectionProps {
    onStartCourse: () => void;
    hideButton: boolean;
    startTransition: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
    onStartCourse,
    hideButton,
    startTransition,
}) => {
    const circles = Array.from({ length: 5 }, (_, i) => (
        <div
            key={i}
            className={styles.circle}
            style={{ animationDelay: `${i * 4}s` }}
        />
    ));

    const [carouselIndex, setCarouselIndex] = useState(0);
    const currentItem = carouselItems[carouselIndex];

    // Swipe handlers para mobile
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setTouchStartX(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      setTouchEndX(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = () => {
      if (touchStartX !== null && touchEndX !== null) {
        const distance = touchStartX - touchEndX;
        if (distance > 50) {
          setCarouselIndex((carouselIndex + 1) % carouselItems.length); // swipe left
        } else if (distance < -50) {
          setCarouselIndex((carouselIndex - 1 + carouselItems.length) % carouselItems.length); // swipe right
        }
      }
      setTouchStartX(null);
      setTouchEndX(null);
    };

    const [isMobile, setIsMobile] = useState(false);
    React.useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    React.useEffect(() => {
      const next = () => setCarouselIndex((i) => (i + 1) % carouselItems.length);
      const prev = () => setCarouselIndex((i) => (i - 1 + carouselItems.length) % carouselItems.length);
      window.addEventListener('carousel-next', next);
      window.addEventListener('carousel-prev', prev);
      return () => {
        window.removeEventListener('carousel-next', next);
        window.removeEventListener('carousel-prev', prev);
      };
    }, [carouselItems.length]);

    return (
        <main className={styles.main}>
            <div className={styles.baseBg} />
            <div className={styles.background}>
                {circles}
            </div>
            <ScrollRevealOverlay />
            <div className={styles.container} style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '100vh', marginTop: 0, paddingTop: '5vh', paddingBottom: '5vh', boxSizing: 'border-box' }}>
                <div className={styles['animate-fadeIn']}>
                  <div className={styles.titleBlock}>
                    <h1 className={styles.liquidoRegular + ' ' + styles.titleRegular}>
                      CLUBE DO
                    </h1>
                    <h2 className={styles.liquidoFluid + ' ' + styles.titleFluid}>
                      DISCO
                    </h2>
                  </div>
                </div>
                <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 24, padding: 0, position: 'relative', zIndex: 0, height: 'auto', overflow: 'visible' }}>
                  <div
                    style={{ width: '100%', maxWidth: 320, height: 240, margin: '0 auto 0 auto', position: 'relative' }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <RecordShelf carouselIndex={carouselIndex} />
                  </div>
                  <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', borderRadius: 24, padding: '32px 0 0 0', position: 'relative', zIndex: 0, marginTop: 20, overflow: 'visible' }}>
                    <RecordInfoBlock
                      carouselIndex={carouselIndex}
                      isMobile={isMobile}
                    />
                  </div>
                </div>
                <div className={styles['animate-fadeIn']} style={{ animationDelay: '300ms', alignSelf: 'center', marginBottom: 0 }}>
                  {!hideButton && (
                    <button
                      onClick={onStartCourse}
                      className={styles.button + ' ' + (hideButton ? styles.fadeOut : '')}
                      style={{
                        minWidth: 256,
                        maxWidth: 320,
                        width: 'auto',
                        padding: '6px 26px',
                        background: 'rgb(255, 225, 0)',
                        border: '2px solid #222',
                        borderRadius: '32px',
                        fontFamily: 'Karla, Sour Gummy, sans-serif',
                        fontSize: 22.4,
                        fontWeight: 700,
                        color: '#222',
                        letterSpacing: 2,
                        textTransform: 'lowercase',
                        transition: 'all 0.2s',
                        outline: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        marginTop: 0,
                        marginBottom: 0,
                        position: 'relative',
                      }}
                    >
                      que clube é esse?
                    </button>
                  )}
                </div>
            </div>
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ height: '200px' }} />
            ))}
            <div className={`${styles.transitionCircle} ${startTransition ? styles.active : ''}`} />
        </main>
    );
}

export default HomeHeroSection;