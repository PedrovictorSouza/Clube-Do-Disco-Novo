import React, { useState, useEffect } from "react";
import ScrollRevealContent from "./ScrollRevealContent";
import ScrollEndMessage from "./ScrollEndMessage";
import LoadingView from "./Views/LoadingView";
import StartView from "./Views/StartView";
import HomeHeroSection from "./HomeHeroSection";


const Home: React.FC = () => {
  const [startTransition, setStartTransition] = useState(false);
  const [showTransitionScreen, setShowTransitionScreen] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const handleStartCourse = () => {
    setHideButton(true);
    setStartTransition(true);
  };

  useEffect(() => {
    if (startTransition) {
      const timer = setTimeout(() => {
        setShowTransitionScreen(true);
      }, 1000); // Reduzido de 1500ms para 1000ms
      return () => clearTimeout(timer);
    }
  }, [startTransition]);

  return (
    <>
      {!showTransitionScreen ? (
        <StartView
          onStartCourse={handleStartCourse}
          hideButton={hideButton}
          startTransition={startTransition}
        />
      ) : (
        <LoadingView />
      )}
      {/* Agora o ScrollRevealContent fica fora do main, logo abaixo da Home */}
      {!showTransitionScreen && <ScrollRevealContent />}
      <ScrollEndMessage />
    </>
  );
};

export default Home; 