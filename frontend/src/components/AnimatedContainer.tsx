import React, { ReactNode } from "react";
import { useFadeIn } from "../hooks/useFadeIn";

// Define as propriedades que o componente aceita, incluindo `children`.
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
