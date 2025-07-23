import React from "react";
import styles from "./RecordShelf.module.css";
import { CarouselItem, RecordShelfProps } from "./types";

const RecordShelf: React.FC<RecordShelfProps> = ({ carouselIndex, items, setCarouselIndex }) => {
  const handleNext = () => {
    setCarouselIndex((carouselIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCarouselIndex((carouselIndex - 1 + items.length) % items.length);
  };

  const visibleItems = [];

  for (let offset = 2; offset >= 0; offset--) {
    const idx = (carouselIndex + offset) % items.length;

    let className = styles.record;
    if (offset === 0) className += ` ${styles.main}`;
    else if (offset === 1) className += ` ${styles.middle}`;
    else if (offset === 2) className += ` ${styles.back}`;

    const sizeStep = 10;
    const base = 350;
    const maxBase = 400;

    const baseClamp = `clamp(${base}px, ${base / 16}vw, ${maxBase}px)`;
    const increment = (2 - offset) * sizeStep;
    const incrementClamp = `clamp(${increment}px, ${increment / 16}vw, ${increment}px)`;

    visibleItems.push(
      <img
        key={idx}
        src={items[idx].cover}
        alt={items[idx].artist}
        className={className}
        style={{
          top: `${(2 - offset) * 10}px`,
          width: `calc(${baseClamp} + ${incrementClamp})`,
          height: `calc(${baseClamp} + ${incrementClamp})`,
        }}
      />
    );
  }

  return (
    <div className={styles.recordShelf}>
      {visibleItems}

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: '40px' }}>
        <button
          onClick={handlePrev}
          className="carousel-arrow"
          style={{
            background: '#000',
            border: '2px solid #f1891d',
            borderRadius: 8,
            padding: '6px 18px',
            fontWeight: 700,
            color: '#f1891d',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="7,6 15,12 7,18" fill="#f1891d" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="carousel-arrow"
          style={{
            background: '#000',
            border: '2px solid #f1891d',
            borderRadius: 8,
            padding: '6px 18px',
            fontWeight: 700,
            color: '#f1891d',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="17,6 9,12 17,18" fill="#f1891d" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecordShelf;
