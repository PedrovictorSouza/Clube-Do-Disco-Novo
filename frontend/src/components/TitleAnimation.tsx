import React from "react";

interface TitleAnimationProps {
  text: string;
  delay?: number;
  className?: string;
}

const TitleAnimation: React.FC<TitleAnimationProps> = ({ text, delay = 50, className }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className={className}>
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
