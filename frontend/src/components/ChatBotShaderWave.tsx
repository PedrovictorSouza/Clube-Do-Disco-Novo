import React, { useRef, useEffect } from "react";

interface ChatBotShaderWaveProps {
  width: number;
  height: number;
  color?: string;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

// Renders a sine wave across the center of the canvas
const ChatBotShaderWave: React.FC<ChatBotShaderWaveProps> = ({
  width,
  height,
  color = "#ffe600",
  amplitude = 32,
  frequency = 2,
  speed = 0.02,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);
  const freqAnimRef = useRef(0);

  useEffect(() => {
    let animationFrame: number;
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Animate frequency: oscillate between 1.2 and 3.5
      freqAnimRef.current += 0.012;
      const freqNow = 2.2 + Math.sin(freqAnimRef.current) * 1.3;
      for (let x = 0; x <= width; x += 2) {
        const y = height / 2 + Math.sin((x / width) * freqNow * Math.PI * 2 + phaseRef.current) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
      phaseRef.current += speed;
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [width, height, color, amplitude, speed]);

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
        zIndex: 1,
        width: width,
        height: height,
      }}
    />
  );
};

export default ChatBotShaderWave;
