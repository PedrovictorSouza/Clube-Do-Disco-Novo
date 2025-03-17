import React from "react";
import styled from "styled-components";

// Estilização do slogan com largura máxima e quebra de linha somente entre palavras
const StyledSlogan = styled.p`
  font-size: 14pt;
  color: black;
  margin-top: 15px;
  text-align: left;
  overflow: visible;          // Permite expandir o texto
  line-height: 1.6;
  max-width: 30vw;            // Limita a largura a 30% da viewport
  word-break: normal;       // NÃO quebra palavras (mantém elas inteiras)
  white-space: normal; 
  overflow-wrap: break-word;  
  @media (max-width: 768px) {    
    font-size: 11pt;
  }
`;


const Letter = styled.span<{ delay: number }>`
  display: inline-block; // Permite aplicar transformações individuais a cada letra
  opacity: 0;
  transform: translateY(-20px); // Inicia mais acima
  animation: fadeInDrop 1.5s ease-in-out forwards;
  animation-delay: ${({ delay }) => delay}ms;

  @keyframes fadeInDrop {
    from {
      opacity: 0;
      transform: translateY(-20px); // Vem de cima
    }
    to {
      opacity: 1;
      transform: translateY(0); // Fica na posição final
    }
  }
`;

// Função que adiciona espaços corretamente
const formatText = (text: string) =>
  text.split("").map((char, index) => (
    <Letter key={index} delay={index * 50}>
      {char === " " ? "\u00A0" : char} {/* Usa espaço inquebrável para manter espaçamento */}
    </Letter>
  ));

const SloganAnimation: React.FC = () => {
  const slogan = "Smart agents factory.";
  return <StyledSlogan>{formatText(slogan)}</StyledSlogan>;
};

export default SloganAnimation;
