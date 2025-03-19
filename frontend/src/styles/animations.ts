// src/styles/animations.ts
import { keyframes, css } from "styled-components";

// Animação de Fade In
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animação de escala (exemplo para botões)
export const scaleUp = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
`;

// Mixins para facilitar a aplicação das animações
export const animations = {
  fadeIn: css`
    animation: ${fadeIn} 0.5s ease-in-out forwards;
  `,
  scaleUp: css`
    animation: ${scaleUp} 0.3s ease-in-out forwards;
  `,
};
