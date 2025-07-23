import React from "react";
import RecordShelf from "../Vinyl/RecordShelf";
import RecordInfoBlock from "../Vinyl/RecordInfoBlock";

interface HeroCarouselProps {
  carouselIndex: number;
  setCarouselIndex: (idx: number) => void;
  isMobile: boolean;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  carouselIndex,
  setCarouselIndex,
  isMobile,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => (
  <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 24, padding: 0, position: 'relative', zIndex: 0, height: 'auto', overflow: 'visible' }}>
    <div
      style={{ width: '100%', maxWidth: 320, height: 240, margin: '0 auto 0 auto', position: 'relative' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <RecordShelf carouselIndex={carouselIndex} />
    </div>
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', borderRadius: 24, padding: '32px 0 0 0', position: 'relative', zIndex: 0, marginTop: 20, overflow: 'visible' }}>
      <RecordInfoBlock carouselIndex={carouselIndex} isMobile={isMobile} />
    </div>
  </div>
);

export default HeroCarousel;
