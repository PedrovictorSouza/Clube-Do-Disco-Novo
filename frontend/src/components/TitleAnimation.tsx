import React from "react";
import styled from "styled-components";

// Container estilizado
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  max-height: 100px;
  @media (max-width: 768px) {
    max-height: 30px; /* 🔹 Evita que fique muito espaçado, mas sem cortar */
    gap: 5px; /* 🔹 Reduz o espaçamento entre os elementos internos */
    margin-bottom: 10px; /* 🔹 Garante um espaçamento controlado */
  }
`;

// Animação das letras com fade-in
const Letter = styled.span<{ delay: number }>`
  opacity: 0;
  animation: fadeIn 1.5s ease-in-out forwards;
  animation-delay: ${({ delay }) => delay}ms;
  font-weight: 900;
  text-align: left;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Estilização do título
const StyledTitle = styled.h1`
  font-size: 6em;
  font-weight: 300;
  color: black;
  margin-bottom: 10px;

   @media (max-width: 768px) {
    font-size: 4em;
  }
`;

// Estilização do slogan (mantendo separação)
// const StyledSlogan = styled.p`
//   font-size: 1em;
//   color: white;
//   margin-top: 10px;
// `;

interface TitleAnimationProps {
  text: string;
  delay?: number;
}

const TitleAnimation: React.FC<TitleAnimationProps> = ({ text, delay = 50 }) => {
  return (
    <TitleContainer>
      {/* Animação do Título */}
      <StyledTitle>
        {text.split("").map((char, index) => (
          <Letter key={index} delay={index * delay}>
            {char}
          </Letter>
        ))}
      </StyledTitle>
    </TitleContainer>
  );
};

export default TitleAnimation;
