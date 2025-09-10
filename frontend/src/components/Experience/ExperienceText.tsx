import React from "react";

interface ExperienceTextProps {
  children?: React.ReactNode;
}

const ExperienceText: React.FC<ExperienceTextProps> = ({ children }) => (
  <div
    style={{
      color: '#fff',
      fontSize: '2rem',
      textAlign: 'left',
      maxWidth: 700,
      opacity: 1,
      transition: 'opacity 0.3s',
      paddingLeft: 20,
      paddingBottom: 40,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maskImage: 'linear-gradient(to top, black 100%, transparent 0%)',
      WebkitMaskImage: 'linear-gradient(to top, black 100%, transparent 0%)',
    }}
  >
    {children}
  </div>
);

export default ExperienceText;
