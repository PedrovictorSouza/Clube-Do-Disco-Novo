import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface SpriteAnimationProps {
  imageUrl: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  speed?: number; // Opcional, com padrão de 150ms
}

const SpriteContainer = styled.div<{ frameWidth: number; frameHeight: number }>`
  width: ${({ frameWidth }) => frameWidth}px;
  height: ${({ frameHeight }) => frameHeight}px;
  background-repeat: no-repeat;
  background-size: auto 100%;
`;

const SpriteAnimation: React.FC<SpriteAnimationProps> = ({
  imageUrl,
  frameCount,
  frameWidth,
  frameHeight,
  speed = 150,
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % frameCount);
    }, speed);

    return () => clearInterval(interval);
  }, [frameCount, speed]);

  return (
    <SpriteContainer
      frameWidth={frameWidth}
      frameHeight={frameHeight}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${frame * frameWidth}px 0px`,
      }}
    />
  );
};

export default SpriteAnimation;
