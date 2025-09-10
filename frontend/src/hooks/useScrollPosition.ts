import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
  viewportWidth: number;
  viewportHeight: number;
  scrollPercentage: number;
  scrollYRelative: number; 
  scrollYPercentage: number; 
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollX: 0,
    scrollY: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    scrollPercentage: 0,
    scrollYRelative: 0,
    scrollYPercentage: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const totalHeight = document.documentElement.scrollHeight - viewportHeight;
      const scrollPercentage = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

      const scrollYRelative = scrollY / viewportHeight;
      const scrollYPercentage = (scrollY / viewportHeight) * 100;

      setScrollPosition({
        scrollX,
        scrollY,
        viewportWidth,
        viewportHeight,
        scrollPercentage: Math.round(scrollPercentage),
        scrollYRelative,
        scrollYPercentage: Math.round(scrollYPercentage)
      });
    };

    const handleResize = () => {
      handleScroll(); // Recalcular após resize
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return scrollPosition;
};

export const useScrollTrigger = (
  triggerValue: number,
  triggerType: 'pixels' | 'percentage' | 'relative' = 'pixels',
  threshold: number = 50
): boolean => {
  const scrollPosition = useScrollPosition();
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    let currentValue: number;

    switch (triggerType) {
      case 'pixels':
        currentValue = scrollPosition.scrollY;
        break;
      case 'percentage':
        currentValue = scrollPosition.scrollPercentage;
        break;
      case 'relative':
        currentValue = scrollPosition.scrollYRelative;
        break;
      default:
        currentValue = scrollPosition.scrollY;
    }

    if (currentValue >= triggerValue - threshold && currentValue <= triggerValue + threshold) {
      setIsTriggered(true);
    } else {
      setIsTriggered(false);
    }
  }, [scrollPosition, triggerValue, triggerType, threshold]);

  return isTriggered;
}; 