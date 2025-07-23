import React, { useRef, useEffect } from "react";

interface ChatBotShaderProps {
  width?: number;
  height?: number;
  numPoints?: number;
}

// Simple vanilla JS shader: draws random 1px points on a canvas
const ChatBotShader: React.FC<ChatBotShaderProps> = ({ width = 420, height = 220, numPoints = 120 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    // Draw random points
    for (let i = 0; i < numPoints; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(x, y, 1, 1);
    }
  }, [width, height, numPoints]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
        width: width,
        height: height,
      }}
    />
  );
};

export default ChatBotShader;
