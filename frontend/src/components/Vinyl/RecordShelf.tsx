import React from "react";
import { carouselItems } from "../../modules/carouselItems";

interface RecordShelfProps {
  carouselIndex: number;
}

const RecordShelf: React.FC<RecordShelfProps> = ({ carouselIndex }) => (
  <div style={{ position: 'relative', width: '100%', maxWidth: 320, height: 200, margin: '0 auto 40px auto' }}>
    {carouselItems.map((item, idx) => {
      const pos = (idx - carouselIndex + carouselItems.length) % carouselItems.length;
      if (idx === carouselIndex) {
        return (
          <img
            key={idx}
            src={item.cover}
            alt={item.artist}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%) scale(1.2)', // 20% larger
              zIndex: 3,
              width: 216,
              height: 216,
              borderRadius: 3,
              boxShadow: '0 4px 24px #0002',
              background: '#fff',
              transition: 'all 0.3s',
            }}
          />
        );
      }
      if (pos === 1) {
        return (
          <img
            key={idx}
            src={item.cover}
            alt={item.artist}
            style={{
              position: 'absolute',
              left: '50%',
              top: -24,
              transform: 'translateX(-50%) scale(1.104)', // 20% larger than 0.92
              zIndex: 2,
              width: 198,
              height: 198,
              borderRadius: 3,
              boxShadow: '0 2px 12px #0001',
              opacity: 0.8,
              background: '#fff',
              transition: 'all 0.3s',
            }}
          />
        );
      }
      if (pos === 2) {
        return (
          <img
            key={idx}
            src={item.cover}
            alt={item.artist}
            style={{
              position: 'absolute',
              left: '50%',
              top: -48,
              transform: 'translateX(-50%) scale(0.96)', // 20% larger than 0.8
              zIndex: 1,
              width: 168,
              height: 168,
              borderRadius: 3,
              boxShadow: '0 1px 8px #0001',
              opacity: 0.6,
              background: '#fff',
              transition: 'all 0.3s',
            }}
          />
        );
      }
      return null;
    })}
  </div>
);

export default RecordShelf;
