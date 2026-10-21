import { ScrollTrigger } from "@/animations/gsap";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const timer = window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        ScrollTrigger.refresh();
      }, 120);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
