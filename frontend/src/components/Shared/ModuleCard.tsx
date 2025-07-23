import React from "react";
import styled from "styled-components";
import AnimatedContainer from "./AnimatedContainer";

// Define a interface para as propriedades do módulo
interface ModuleProps {
  module: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
}

const Card = styled.div`
  border: 2px solidrgb(241, 47, 167);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h3`
  color:rgb(86, 241, 47);
`;

const ModuleCard: React.FC<ModuleProps> = ({ module }) => (
  <AnimatedContainer>
    <Card>
      <img src={module.imageUrl} alt={module.title} style={{ width: "100%" }} />
      <Title>{module.title}</Title>
      <p>{module.description}</p>
    </Card>
  </AnimatedContainer>
);

export default ModuleCard;
