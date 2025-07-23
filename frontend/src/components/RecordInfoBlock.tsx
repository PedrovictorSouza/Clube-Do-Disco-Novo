import React from "react";
import { carouselItems } from "../modules/carouselItems";
import CarouselNavigation from "./CarouselNavigation/CarouselNavigation";

interface RecordInfoBlockProps {
  carouselIndex: number;
  isMobile: boolean;
  setCarouselIndex: (index: number) => void;
}

const RecordInfoBlock: React.FC<RecordInfoBlockProps> = ({ carouselIndex, isMobile, setCarouselIndex }) => {
  const currentItem = carouselItems[carouselIndex];
  
  const handleNext = () => {
    setCarouselIndex((carouselIndex + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setCarouselIndex((carouselIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 320, margin: '0 auto' }}>
        <div style={{ background: '#f1891d', color: '#fff', fontWeight: 700, fontSize: 14, borderRadius: 6, padding: '6px 12px', minWidth: 64, textAlign: 'center', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Karla, sans-serif' }}>
          {currentItem.date}
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: 'Karla, sans-serif', fontWeight: 700, fontSize: 9.9, letterSpacing: 2, color: '#fdfdfd', textTransform: 'uppercase', margin: '0 12px', minWidth: 160, wordBreak: 'break-word', lineHeight: 1.25 }}>
          {currentItem.artist}
        </div>
        <div style={{ color: '#f1891d', fontWeight: 900, fontSize: 16, minWidth: 64, textAlign: 'right', letterSpacing: 2, fontFamily: 'Karla, sans-serif' }}>
          {currentItem.hour}
        </div>
      </div>
      
      {/* Botões de navegação só aparecem no desktop */}
      {!isMobile && (
        <CarouselNavigation
          carouselIndex={carouselIndex}
          totalItems={carouselItems.length}
          onNext={handleNext}
          onPrev={handlePrev}
          isMobile={false}
        />
      )}
      
      {/* Pontinhos do carrossel para mobile */}
      {isMobile && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 18 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {carouselItems.map((_, idx) => (
              <span
                key={idx}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: idx === carouselIndex ? '#f1891d' : '#fff',
                  opacity: idx === carouselIndex ? 1 : 0.5,
                  transition: 'background 0.2s',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecordInfoBlock;
