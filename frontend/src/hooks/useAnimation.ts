// src/hooks/useAnimation.ts
import { useState, useEffect } from "react";

export const useAnimation = (initialState = false) => {
  const [active, setActive] = useState(initialState);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => setActive(false), 500); // Reseta a animação após 0.5s
      return () => clearTimeout(timer);
    }
  }, [active]);

  return { active, trigger: () => setActive(true) };
};
