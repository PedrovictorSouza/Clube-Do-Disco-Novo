import styled from "styled-components";

interface GridProps {
  rows: number;
  columns: number;
}

export const GridContainer = styled.div<GridProps>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 2fr);
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);

  width: 50vw;
  height: 100vh;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

interface GridItemProps {
  color: string;
}

export const GridItem = styled.div<GridItemProps>`
  background-color: ${(props) => props.color};
  transition: background-color 1s ease-in-out; // 🔹 Transição suave ao alterar as cores
  width: 100%;
  height: 100%;
  min-height: 50px;
  
  &:hover {
    filter: brightness(1.1);  // 🔹 Pequeno brilho ao passar o mouse
  }
`;
