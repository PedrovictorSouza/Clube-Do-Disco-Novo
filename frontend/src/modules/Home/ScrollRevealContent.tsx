import React, { useRef, useEffect, useState } from "react";
import styles from "./ScrollRevealContent.module.css";

const ScrollRevealContent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calcula o quanto do container está visível na viewport
      const visible = Math.max(0, windowHeight - rect.top);
      const percent = Math.min(visible / rect.height, 1);
      setProgress(percent);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={styles.parallaxContainer}>
      <div
        className={styles.bg1}
        style={{ opacity: 1 - progress, zIndex: 1 }}
      />
      <div
        className={styles.bg2}
        style={{ opacity: progress, zIndex: 2 }}
      />
      <div
        className={styles.content}
        style={{ opacity: progress > 0.5 ? (progress - 0.5) * 2 : 0, zIndex: 3 }}
      >
        Acesso a frequências, mudando a mixagem dentro de nossas próprias conexões neurais. O trabalho passa a fluir naturalmente, sem consumir a vida, liberando espaço para a experiência humana plena.
      </div>
    </div>
  );
};

export default ScrollRevealContent;