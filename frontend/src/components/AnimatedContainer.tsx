import React, { ReactNode } from "react";
import { useFadeIn } from "../hooks/useFadeIn";

interface AnimatedContainerProps {
  children: ReactNode; // Define `children` como propriedade obrigatória
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children }) => {
  const fadeRef = useFadeIn();

  return (
    <div ref={fadeRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default AnimatedContainer;
