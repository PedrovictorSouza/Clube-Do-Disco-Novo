import React, { useEffect, useState } from "react";
import Home from "./modules/Home";
import Layout from './components/Layout/Layout';
import ProgressBar from './components/ProgressBar';
import VinylLoadingScreen from './components/VinylLoadingScreen/VinylLoadingScreen';
import { usePreventHorizontalScroll } from "./hooks/usePreventHorizontalScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useProgressBar } from "./hooks/useProgressBar";
import { VisibilityProvider } from "./contexts/VisibilityContext";
import { initScrollObserver} from "./hooks/scroll/scrollObserver.ts";
import "./styles/ContactSectionFix.css";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  usePreventHorizontalScroll();
  
  useScrollToTop();
  
  const { progress } = useProgressBar();

  useEffect(() => {
    initScrollObserver();
    const next = () => {
    };
    const prev = () => {
    };
    window.addEventListener("carousel-next", next);
    window.addEventListener("carousel-prev", prev);
    return () => {
      window.removeEventListener("carousel-next", next);
      window.removeEventListener("carousel-prev", prev);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <VinylLoadingScreen onComplete={handleLoadingComplete} />}
      <VisibilityProvider>
        <Layout>
          <ProgressBar progress={progress} />
          <Home />
          
        </Layout>
      </VisibilityProvider>
    </>
  );
};

export default App;