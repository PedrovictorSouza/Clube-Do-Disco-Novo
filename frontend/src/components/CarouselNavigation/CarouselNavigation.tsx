import React from "react";

interface CarouselNavigationProps {
  carouselIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
  isMobile?: boolean;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  carouselIndex,
  totalItems,
  onNext,
  onPrev,
  isMobile = false
}) => {
  const buttonStyle = {
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
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginTop: isMobile ? 18 : 40
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={buttonGroupStyle}>
        <button
          className="carousel-arrow"
          style={buttonStyle}
          onClick={onPrev}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="17,6 9,12 17,18" fill="#f1891d" />
          </svg>
        </button>
        <button
          className="carousel-arrow"
          style={buttonStyle}
          onClick={onNext}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polygon points="7,6 15,12 7,18" fill="#f1891d" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarouselNavigation; 