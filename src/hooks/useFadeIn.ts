import { useEffect, useRef } from "react";

export const useFadeIn = (duration = 1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transition = `opacity ${duration}s`;
      ref.current.style.opacity = "1";
    }
  }, [duration]);

  return ref;
};
