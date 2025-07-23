import React, { useState, useEffect } from "react";
import Home from "./modules/Home";
import EventSection from "./modules/Events/EventSection";
import VinylSection from "./components/VinylSection";
import DebugScroll from "./components/DebugScroll";
import { usePreventHorizontalScroll } from "./hooks/usePreventHorizontalScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { VisibilityProvider } from "./contexts/VisibilityContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { carouselItems } from "./modules/carouselItems"; // ajuste se o caminho for outro

const App: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hideButton, setHideButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Prevenir scroll horizontal
  usePreventHorizontalScroll();
  
  // Garantir que a página sempre comece no topo
  useScrollToTop();

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
    // aqui você pode acionar uma transição ou navegação se quiser
  };

  return (
    <VisibilityProvider>
      <div>
        <GlobalStyles />
        <DebugScroll />
        <Home />
        <VinylSection />
      </div>
    </VisibilityProvider>
  );
};

export default App;
