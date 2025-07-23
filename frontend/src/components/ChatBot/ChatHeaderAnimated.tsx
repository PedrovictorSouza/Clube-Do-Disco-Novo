import React, { useEffect, useState } from "react";

interface ChatHeaderAnimatedProps {
  show: boolean;
}

const HEADER_TEXT = "Quem é o clube do disco";
const HEADER_ANIMATION_DURATION = 3000; // ms
const TOTAL_POINTS = 55; // ajuste conforme necessário para o comprimento desejado
const POINTS_ANIMATION_DURATION = 1500; // ms

const ChatHeaderAnimated: React.FC<ChatHeaderAnimatedProps> = ({ show }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [visiblePoints, setVisiblePoints] = useState(0);

  useEffect(() => {
    if (!show) {
      setVisibleLetters(0);
      setVisiblePoints(0);
      return;
    }
    // Animação das letras
    setVisibleLetters(0);
    const letterInterval = HEADER_ANIMATION_DURATION / HEADER_TEXT.length;
    let currentLetter = 0;
    const letterTimer = setInterval(() => {
      currentLetter++;
      setVisibleLetters(currentLetter);
      if (currentLetter >= HEADER_TEXT.length) clearInterval(letterTimer);
    }, letterInterval);

    // Animação dos pontos
    setVisiblePoints(0);
    const pointInterval = POINTS_ANIMATION_DURATION / TOTAL_POINTS;
    let currentPoint = 0;
    const pointTimer = setInterval(() => {
      currentPoint++;
      setVisiblePoints(currentPoint);
      if (currentPoint >= TOTAL_POINTS) clearInterval(pointTimer);
    }, pointInterval);

    return () => {
      clearInterval(letterTimer);
      clearInterval(pointTimer);
    };
  }, [show]);

  return (
    <>
      <span className="inline-block">
        {HEADER_TEXT.split("").map((char, i) => (
          <span
            key={i}
            style={{
              opacity: i < visibleLetters ? 1 : 0,
              transition: "opacity 0.3s",
              display: "inline-block"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <div className="w-full md:w-3/4 text-left text-gray-400 select-none leading-none mt-1 tracking-widest text-base whitespace-nowrap">
        {Array.from({ length: visiblePoints })
          .map((_, i) => (i < visiblePoints - 1 ? ". " : "."))}
      </div>
    </>
  );
};

export default ChatHeaderAnimated; 