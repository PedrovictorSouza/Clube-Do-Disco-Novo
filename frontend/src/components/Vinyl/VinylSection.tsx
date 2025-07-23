import React from "react";
import styles from "./VinylSection.module.css";

const VinylSection: React.FC = () => (
  <div className={styles.vinylSection}>
    <img src="/imgs/vinyl.png" alt="vinyl background" className={styles.vinylBg} />
    <div className={styles.vinylText}>
      Acesso a frequências, mudando a mixagem dentro de nossas próprias conexões neurais. O trabalho passa a fluir naturalmente, sem consumir a vida, liberando espaço para a experiência humana plena.
    </div>
  </div>
);

export default VinylSection;
