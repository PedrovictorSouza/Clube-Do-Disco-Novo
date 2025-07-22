import React from "react";

interface TitleAnimationProps {
  text: string;
  delay?: number;
  className?: string;
}

const TitleAnimation: React.FC<TitleAnimationProps> = ({ text, delay = 50, className }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1
        className={className}
        style={{
          fontSize: '8vw',
          fontWeight: 900,
          fontFamily: 'Karla, Sour Gummy, sans-serif',
          whiteSpace: 'nowrap',
          letterSpacing: 4,
          color: '#222',
          marginBottom: 16,
          maxWidth: '100vw',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-fadeIn"
            style={{ animationDelay: `${index * delay}ms` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TitleAnimation;
