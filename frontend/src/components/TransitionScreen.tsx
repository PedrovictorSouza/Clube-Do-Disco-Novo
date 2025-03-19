import React, { useEffect, useState } from "react";
import MainScreen from "./MainScreen";
import "./styles/TransitionScreen.css"; // Importa os estilos

const TransitionScreen: React.FC = () => {
  const [showMainScreen, setShowMainScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainScreen(true);
    }, 1500); // Duração da transição

    return () => clearTimeout(timer);
  }, []);

  return showMainScreen ? (
    <MainScreen />
  ) : (
    <div className="transition-container">
      <div className="color-layer"></div>
    </div>
  );
};

export default TransitionScreen;
