import React from "react";
import { GridContainer, GridItem } from "./styles/ColorGrid.styles";

const colors = [
  "#ea4a19", "#f1891d", "#2d97d5", "#f6b5be", "#FFD700", "#900C3F", "#C70039", "#FF5733"
];

const EventGrid: React.FC = () => (
  <GridContainer rows={2} columns={4}>
    {colors.map((color, idx) => (
      <GridItem key={idx} color={color} />
    ))}
  </GridContainer>
);

export default EventGrid;
