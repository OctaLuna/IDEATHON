import { gsap, useGSAP } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent<HTMLElement>) => void;
  isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("ideaton_theme");
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch {
      /* Storage can be unavailable in private browsing contexts. */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const transitionOverlayRef = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP({ scope: transitionOverlayRef });

  // Sync class, colorScheme, meta and localStorage
  const applyThemeToDOM = (t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    const metaThemeColor = document.getElementById("theme-color-meta");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", t === "dark" ? "#0A1128" : "#F6F2E9");
    }
    try {
      localStorage.setItem("ideaton_theme", t);
    } catch {
      /* Storage can be unavailable in private browsing contexts. */
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = contextSafe((event?: React.MouseEvent<HTMLElement>) => {
    if (isAnimating) return;

    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    if (prefersReducedMotion) {
      setTheme(nextTheme);
      applyThemeToDOM(nextTheme);
      return;
    }

    const overlay = transitionOverlayRef.current;
    if (!overlay) {
      setTheme(nextTheme);
      applyThemeToDOM(nextTheme);
      return;
    }

    // Determine circular expansion coordinates from button
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    setIsAnimating(true);
    const nextBgColor = nextTheme === "dark" ? "#0A1128" : "#F6F2E9";

    gsap.set(overlay, {
      backgroundColor: nextBgColor,
      clipPath: `circle(0px at ${x}px ${y}px)`,
      opacity: 1,
      display: "block",
      zIndex: 9999,
    });

    gsap.to(overlay, {
      clipPath: `circle(${maxRadius * 1.05}px at ${x}px ${y}px)`,
      duration: 0.65,
      ease: "power2.inOut",
      onComplete: () => {
        // EXACT moment when circle covers screen: switch theme
        setTheme(nextTheme);
        applyThemeToDOM(nextTheme);
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.15,
          ease: "none",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
            setIsAnimating(false);
          },
        });
      },
    });
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating }}>
      {children}
      <div
        ref={transitionOverlayRef}
        className="fixed inset-0 pointer-events-none hidden"
        style={{ zIndex: 9999 }}
        aria-hidden="true"
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
