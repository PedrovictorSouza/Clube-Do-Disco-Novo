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

  // Detectar quando o scroll Y chegar no ponto de aparecer (diferente para mobile e desktop)
  const triggerPoint = isMobile ? 150 : 312;
  const isAtTriggerPoint = useScrollTrigger(triggerPoint, 'pixels', 10);
  
  // Detectar quando o scroll Y voltar para o ponto de esconder (diferente para mobile e desktop)
  const hidePoint = isMobile ? 140 : 300;
  const isAtHidePoint = useScrollTrigger(hidePoint, 'pixels', 10);
  
  // Estado para manter o elemento visível uma vez que apareça
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);
  
  // Debug: log quando o trigger for ativado
  useEffect(() => {
    if (isAtTriggerPoint && !hasBeenTriggered) {
      console.log('EventSection triggered!');
      setHasBeenTriggered(true);
      setEventSectionVisible(true);
    }
  }, [isAtTriggerPoint, hasBeenTriggered, setEventSectionVisible]);

  // Lógica para esconder quando voltar para cima
  useEffect(() => {
    if (isAtHidePoint && hasBeenTriggered) {
      console.log('EventSection hiding!');
      setEventSectionVisible(false);
      setHasBeenTriggered(false);
    }
  }, [isAtHidePoint, hasBeenTriggered, setEventSectionVisible]);

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
            <h2 className={styles.programTitle}>PROGRAMAÇÃO</h2>
            <h2 className={styles.programTitle}>PROGRAMAÇÃO</h2>
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
            <RecordInfoBlock carouselIndex={carouselIndex} isMobile={isMobile} />
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
