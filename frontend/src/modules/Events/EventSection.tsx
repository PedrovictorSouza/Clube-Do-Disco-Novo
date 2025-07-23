// EventSection.tsx
import React, { useState, useEffect } from "react";
import styles from "./EventSection.module.css";
import RecordShelf from "../../components/RecordShelf/RecordShelf";
import RecordInfoBlock from "../../components/RecordInfoBlock";
import { useScrollTrigger } from "../../hooks/useScrollPosition";
import { useVisibility } from "../../contexts/VisibilityContext";
import { carouselItems } from "../carouselItems";  

const EventSection: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hideButton, setHideButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Contexto de visibilidade
  const { isEventSectionVisible, setEventSectionVisible } = useVisibility();

  // Estado para memorizar a posição onde apareceu pela primeira vez
  const [firstAppearancePosition, setFirstAppearancePosition] = useState<number | null>(null);
  
  // Estado para controlar se deve ficar oculto por scroll para baixo
  const [isHiddenByScrollDown, setIsHiddenByScrollDown] = useState(false);

  // Detectar quando o scroll Y chegar no ponto de aparecer (diferente para mobile e desktop)
  const triggerPoint = isMobile ? 150 : 312;
  const isAtTriggerPoint = useScrollTrigger(triggerPoint, 'pixels', 10);
  
  // Estado para manter o elemento visível uma vez que apareça
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);
  
  // Debug: log quando o trigger for ativado
  useEffect(() => {
    if (isAtTriggerPoint && !hasBeenTriggered && !isHiddenByScrollDown) {
      console.log('EventSection triggered!');
      console.log('Current scroll Y:', window.scrollY);
      setHasBeenTriggered(true);
      setEventSectionVisible(true);
      // Memorizar a posição onde apareceu pela primeira vez
      setFirstAppearancePosition(window.scrollY);
    }
  }, [isAtTriggerPoint, hasBeenTriggered, setEventSectionVisible, isHiddenByScrollDown]);

  // Lógica para esconder apenas se subir além da posição memorizada
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollYvh = currentScrollY / viewportHeight;
      
      // Se chegou em Y/vh: 100, oculta o EventSection
      if (scrollYvh >= 1.0 && hasBeenTriggered && isEventSectionVisible) {
        console.log('EventSection hiding - reached Y/vh: 100!');
        setEventSectionVisible(false);
        setIsHiddenByScrollDown(true);
      }
      
      // Se subiu além da posição memorizada, oculta e reseta
      if (hasBeenTriggered && firstAppearancePosition !== null && !isHiddenByScrollDown) {
        const hideThreshold = firstAppearancePosition - 20; // 20px de tolerância
        
        console.log('Scroll check:', {
          currentScrollY,
          firstAppearancePosition,
          hideThreshold,
          shouldHide: currentScrollY < hideThreshold
        });
        
        if (currentScrollY < hideThreshold) {
          console.log('EventSection hiding - scrolled above first appearance position!');
          setEventSectionVisible(false);
          setHasBeenTriggered(false);
          setFirstAppearancePosition(null);
        }
      }
      
      // Se voltou para a posição de trigger e estava oculto por scroll para baixo, permite reaparecer
      if (isHiddenByScrollDown && currentScrollY <= triggerPoint) {
        console.log('EventSection can reappear - back to trigger position!');
        setIsHiddenByScrollDown(false);
      }
    };

    if (hasBeenTriggered || isHiddenByScrollDown) {
      console.log('Adding scroll listener. First appearance position:', firstAppearancePosition);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hasBeenTriggered, firstAppearancePosition, setEventSectionVisible, isHiddenByScrollDown, isEventSectionVisible, triggerPoint]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const delta = touchStartX - touchEndX;
      if (delta > 50) setCarouselIndex((carouselIndex + 1) % carouselItems.length);
      else if (delta < -50) setCarouselIndex((carouselIndex - 1 + carouselItems.length) % carouselItems.length);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const onStartCourse = () => {
  setHideButton(true);
  setShowTransition(true);
  setTimeout(() => setShowTransition(false), 1500);
};

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <div className={`${styles.container} ${isEventSectionVisible ? styles.triggered : ''}`}>
        <div className={styles.contentBlock}>
          <div className={styles.titleSection}>
            <div className={styles.marqueeContainer}>
              <h2 className={styles.programTitle}>PROGRAMAÇÃO</h2>
              <h2 className={styles.programTitle}>PROGRAMAÇÃO</h2>
              <h2 className={styles.programTitle}>PROGRAMAÇÃO</h2>
            </div>
          </div>
          <div
            className={styles.carouselWrapper}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            
         <RecordShelf
            carouselIndex={carouselIndex}
            items={carouselItems}
            setCarouselIndex={setCarouselIndex}
          />

          </div>
          <div className={styles.infoBlock}>
            <RecordInfoBlock 
              carouselIndex={carouselIndex} 
              isMobile={isMobile} 
              setCarouselIndex={setCarouselIndex}
            />
          </div>
        </div>

        {!hideButton && (
          <div className={styles.buttonWrapper}>
            <button onClick={onStartCourse} className={styles.button}>
              que clube é esse?
            </button>
          </div>
        )}
      </div>

      {/* Overlay de transição deve ficar aqui, fora do botão */}
      {showTransition && (
        <div className={`${styles.transitionCircle} ${styles.active}`} />
      )}
    </>
  );

};

export default EventSection;
