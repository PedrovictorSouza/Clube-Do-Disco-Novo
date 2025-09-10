
import { useState, useEffect } from "react";
import { carouselItems } from "../modules/carouselItems";

export function useHomeState() {
  const [startTransition, setStartTransition] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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
      const delta = touchStartX - touchEndX;
      if (delta > 50) setCarouselIndex((i) => (i + 1) % carouselItems.length);
      else if (delta < -50) setCarouselIndex((i) => (i - 1 + carouselItems.length) % carouselItems.length);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleStartCourse = () => {
    setHideButton(true);
    setStartTransition(true);
  };


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const next = () => setCarouselIndex(i => (i + 1) % carouselItems.length);
    const prev = () => setCarouselIndex(i => (i - 1 + carouselItems.length) % carouselItems.length);
    window.addEventListener("carousel-next", next);
    window.addEventListener("carousel-prev", prev);
    return () => {
      window.removeEventListener("carousel-next", next);
      window.removeEventListener("carousel-prev", prev);
    };
  }, []);

  return {
    startTransition,
    hideButton,
    carouselIndex,
    isMobile,
    handleStartCourse,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
