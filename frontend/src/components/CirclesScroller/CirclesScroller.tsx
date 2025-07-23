import React from "react";
import styles from "./CirclesScroller.module.css";

interface CirclesScrollerProps {
  circles?: Array<React.ReactNode>;
}

const curiosities = [
  "Butch Vig convenceu Kurt Cobain a dobrar as vozes dizendo que John Lennon fez isso em 'Imagine'",
  "O vinil gira a 33 ou 45 rotações por minuto, mas DJs usam 78 para efeitos especiais",
  "A capa de 'Dark Side of the Moon' foi inspirada em um experimento de prisma de luz",
  "O disco mais vendido da história é 'Thriller' de Michael Jackson"
];

const CirclesScroller: React.FC<CirclesScrollerProps> = ({ circles }) => {
  return (
    <div className={styles.scroller}>
      {(circles || curiosities).map((circle, idx) => (
        <div key={idx} className={styles.circle}><span>{circle}</span></div>
      ))}
    </div>
  );
};

export default CirclesScroller;
