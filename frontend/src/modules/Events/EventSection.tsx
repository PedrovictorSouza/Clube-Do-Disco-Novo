
import React, { useState, useEffect, useMemo } from "react";
import styles from "./EventSection.module.css";
import RecordShelf from "../../components/RecordShelf/RecordShelf";
import RecordInfoBlock from "../../components/RecordInfoBlock";
import { carouselItems } from "../Carousel/carouselItems";

type Props = {
  stage: number; // 0=Hero, 1=Programação, 2=About
};

const EventSection: React.FC<Props> = ({ stage }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hideButton, setHideButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const className = useMemo(() => {
    const classes = [styles.container];
    if (stage >= 1) classes.push(styles.triggered);
    if (stage >= 2 && styles.exited) classes.push(styles.exited); // opcional, só aplica se existir no CSS
    return classes.join(" ");
  }, [stage]);

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
        <section className={className} aria-label="Programação">
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
        </section>

        {}
        {showTransition && <div className={`${styles.transitionCircle} ${styles.active}`} />}
      </>
  );
};

export default EventSection;
