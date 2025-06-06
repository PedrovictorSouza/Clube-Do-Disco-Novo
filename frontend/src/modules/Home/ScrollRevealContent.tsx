import React, { useEffect, useRef, useState } from "react";

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet dictum, massa erat cursus enim, nec dictum ex enim eu sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam nec velit nec libero pretium pharetra. Suspendisse potenti. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nunc eu nisl. Mauris euismod, nisl eget aliquam ultricies, nunc nisl aliquam nunc, eget aliquam nisl nunc eu nisl. Mauris euismod, nisl eget aliquam ultricies, nunc nisl aliquam nunc, eget aliquam nisl nunc eu nisl.`;

const ScrollRevealContent: React.FC = () => {
  const [reveal, setReveal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Quanto do container está visível na viewport
      const visible = Math.max(0, windowHeight - rect.top);
      const percent = Math.min(visible / rect.height, 1);
      setReveal(percent);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // inicial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height: "600px",
        width: "100%",
        margin: "80px auto",
        background: "#222",
        color: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: `${reveal * 100}%`,
          background: "#fff",
          color: "#222",
          transition: "height 0.2s",
          padding: reveal > 0.05 ? "32px" : "0 32px",
          boxSizing: "border-box",
          borderRadius: "16px 16px 0 0",
          overflow: "hidden",
        }}
      >
        <div style={{ opacity: reveal, transition: "opacity 0.2s" }}>
          {LOREM}
        </div>
      </div>
    </div>
  );
};

export default ScrollRevealContent; 