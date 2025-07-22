import React, { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  opacity: number;
  fadeIn: boolean;
  life: number;
  delay: number;
  color: string;
  size: number;
}

interface ChatBotShaderStarsProps {
  width: number;
  height: number;
  numStars?: number;
}

const ChatBotShaderStars: React.FC<ChatBotShaderStarsProps> = ({ width, height, numStars = 120 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  // Helper to create a new star
  function randomColor() {
    const colors = ["#fff", "#001f4d", "#e53935", "#ffe600"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  function createStar(): Star {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: 0,
      fadeIn: true,
      life: 0,
      delay: Math.random() * 120, // random delay in frames before fadeIn
      color: randomColor(),
      size: 1 + Math.floor(Math.random() * 3), // 1 to 3 px
    };
  }

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();
    function animate() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      let stars = starsRef.current;
      // Add stars if needed
      while (stars.length < numStars) {
        stars.push(createStar());
      }
      // Animate stars
      for (let star of stars) {
        if (star.delay > 0) {
          star.delay--;
          continue;
        }
        if (star.fadeIn) {
          star.opacity += 0.04 + Math.random() * 0.02;
          if (star.opacity >= 1) {
            star.opacity = 1;
            star.fadeIn = false;
            star.life = 0;
          }
        } else {
          star.opacity -= 0.01 + Math.random() * 0.02;
          if (star.opacity <= 0) {
            star.opacity = 0;
            star.fadeIn = true;
            star.x = Math.random() * width;
            star.y = Math.random() * height;
            star.delay = Math.random() * 120; // randomize delay again
            star.color = randomColor();
            star.size = 1 + Math.floor(Math.random() * 3); // randomize size again
          }
        }
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        ctx.globalAlpha = 1;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [width, height, numStars]);

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

export default ChatBotShaderStars;
