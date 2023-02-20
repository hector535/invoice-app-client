import { useEffect, useRef } from "react";

export const useViewportWidth = () => {
  const viewportWidth = useRef<number>(window.innerWidth);

  useEffect(() => {
    const resizeHandler = (e: Event) => {
      const { innerWidth } = e.target as Window;
      viewportWidth.current = innerWidth;
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return { viewportWidth };
};
