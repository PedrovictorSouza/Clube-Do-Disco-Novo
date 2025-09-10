import { useMemo } from 'react';
import { useHeroProgress } from './heroProgress/useHeroProgress';
import { defaultHeroConfig } from './heroProgress/math';

export const useProgressBar = () => {
  const hero = useHeroProgress({ config: defaultHeroConfig });
  
  const progress = useMemo(() => {
    if (hero.contactOpacity >= 1) {
      return 1;
    }
    
    if (hero.contactOpacity > 0) {
      return hero.contactOpacity;
    }
    
    if (hero.aboutOpacity >= 1) {
      return 0.7;
    }
    
    if (hero.aboutOpacity > 0) {
      return 0.3 + (hero.aboutOpacity * 0.4);
    }
    
    if (hero.gridOpacity >= 1) {
      return 0.3;
    }
    
    if (hero.gridOpacity > 0) {
      return hero.gridOpacity * 0.3;
    }
    
    if (hero.titleOpacity < 1) {
      return (1 - hero.titleOpacity) * 0.1;
    }
    
    return 0;
  }, [hero.contactOpacity, hero.aboutOpacity, hero.gridOpacity, hero.titleOpacity]);
  
  return {
    progress,
    stage: hero.stage,
    contactOpacity: hero.contactOpacity,
    aboutOpacity: hero.aboutOpacity,
    gridOpacity: hero.gridOpacity,
    titleOpacity: hero.titleOpacity
  };
};
