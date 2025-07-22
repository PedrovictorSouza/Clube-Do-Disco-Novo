import React, { useEffect, useState } from "react";

const carouselItems = [1, 2, 3, 4];

const ScrollEndMessage: React.FC = () => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY >= docHeight - 2) {
        setShow(true);
        setTimeout(() => setAnimate(true), 10);
      } else {
        setAnimate(false);
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "50vh",
        background: "yellow",
        color: "#111",
        fontSize: "1.5rem",
        textAlign: "center",
        zIndex: 10000,
        fontFamily: "'Karla', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.7s cubic-bezier(.4,1.7,.6,.97), opacity 0.7s cubic-bezier(.4,1.7,.6,.97)",
        transform: animate ? "translateY(0)" : "translateY(-100%)",
        opacity: animate ? 1 : 0,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: "100vw",
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          gap: 32,
          padding: "0 32px"
        }}
      >
        {carouselItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: 300,
              height: 300,
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              borderRadius: 300,
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              userSelect: "none",
              flex: "0 0 auto"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollEndMessage; 