import { gsap, useGSAP } from "@/animations/gsap";
import React, { useRef } from "react";

export const ReadingProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar) return;

      const tween = gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
          },
        },
      );

      return () => {
        tween.kill();
      };
    },
    { scope: barRef },
  );

  return <div ref={barRef} className="reading-progress-bar" aria-hidden="true" />;
};
