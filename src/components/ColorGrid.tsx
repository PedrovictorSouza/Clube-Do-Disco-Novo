import React, { useState, useEffect } from "react";
import { GridContainer, GridItem } from "./styles/ColorGrid.styles";

const ROWS = 5;
const COLUMNS = 50;
const COLORS = ["#ea4a19", "#fff8f8", "#f1891d", "#191a1a", "#2d97d5", "#005b44", "#f6b5be"];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const ColorGrid: React.FC = () => {
  const [gridColors, setGridColors] = useState<string[]>(
    Array.from({ length: ROWS * COLUMNS }, getRandomColor)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGridColors((prevColors) => {
        const newColors = [...prevColors];
        const randomIndex = Math.floor(Math.random() * newColors.length);
        newColors[randomIndex] = getRandomColor(); // Altera uma cor aleatória por vez
        return newColors;
      });
    }, 300); // 🔹 Muda uma célula a cada 300ms (ajustável)

    return () => clearInterval(interval);
  }, []);

  return (
    <GridContainer rows={ROWS} columns={COLUMNS}>
      {gridColors.map((color, index) => (
        <GridItem key={index} color={color} />
      ))}
    </GridContainer>
  );
};

export default ColorGrid;
