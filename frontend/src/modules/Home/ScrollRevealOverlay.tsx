import React, { useEffect, useState } from "react";

const overlayText =
  "Ouvir é remixar por dentro. Em cada sinapse, em novas conexões, novas camadas de som. Não é o ouvido que escuta, é a mente que reinterpreta o mundo.";

const ScrollRevealOverlay: React.FC = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      setHeight(percent * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100vw",
        height: `${height}vh`,
        background: "#000",
        zIndex: 9999,
        transition: "height 0.1s linear",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        pointerEvents: height > 0 ? "auto" : "none"
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: "2rem",
          textAlign: "left",
          maxWidth: "700px",
          opacity: 1,
          transition: "opacity 0.3s",
          paddingLeft: 20,
          paddingBottom: 40,
          fontFamily: "'Liquido Regular', sans-serif",
          letterSpacing: "2px",
          // Máscara para revelar o texto de baixo para cima
          WebkitMaskImage: `linear-gradient(to top, black ${height}%, transparent 0%)`,
          maskImage: `linear-gradient(to top, black ${height}%, transparent 0%)`,
        }}
      >
        {overlayText}
      </div>
    </div>
  );
};

export default ScrollRevealOverlay;