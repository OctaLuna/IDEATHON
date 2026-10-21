import React from "react";

interface DoodleProps {
  className?: string;
  color?: string;
  size?: number;
  id?: string;
}

export const CrownDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "currentColor",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M12 62L8 24L34 42L50 14L66 42L92 24L88 62H12Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className="doodle-path"
    />
    <circle cx="8" cy="22" r="5" fill={color} />
    <circle cx="50" cy="12" r="5" fill={color} />
    <circle cx="92" cy="22" r="5" fill={color} />
    <path
      d="M22 62H78"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      className="doodle-path"
    />
  </svg>
);

export const StarDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "currentColor",
  size = 40,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M40 8L49 28L71 31L55 46L59 68L40 57L21 68L25 46L9 31L31 28L40 8Z"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
  </svg>
);

export const SparkleDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "currentColor",
  size = 36,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M30 4C30 18 18 30 4 30C18 30 30 42 30 56C30 42 42 30 56 30C42 30 30 18 30 4Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      fillOpacity="0.15"
      className="doodle-path"
    />
  </svg>
);

export const SmileyDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "currentColor",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <circle
      cx="40"
      cy="40"
      r="34"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      className="doodle-path"
    />
    <circle cx="28" cy="32" r="4.5" fill={color} />
    <circle cx="52" cy="32" r="4.5" fill={color} />
    <path
      d="M24 46C27 57 53 57 56 46"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      className="doodle-path"
    />
  </svg>
);

export const ArrowDoodle: React.FC<DoodleProps & { direction?: "right" | "down" | "curved" }> = ({
  className = "",
  color = "currentColor",
  size = 50,
  direction = "right",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    {direction === "curved" ? (
      <>
        <path
          d="M10 45C30 15 65 15 88 35"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          className="doodle-path"
        />
        <path
          d="M72 38L90 36L86 18"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="doodle-path"
        />
      </>
    ) : (
      <>
        <path
          d="M12 30H85"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          className="doodle-path"
        />
        <path
          d="M65 14L88 30L65 46"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="doodle-path"
        />
      </>
    )}
  </svg>
);

export const UnderlineCurly: React.FC<DoodleProps & { width?: number; height?: number }> = ({
  className = "",
  color = "var(--accent-yellow)",
  width = 240,
  height = 24,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 240 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`overflow-visible ${className}`}
  >
    <path
      d="M3 14C35 4 65 20 105 13C145 6 180 18 237 8"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      className="doodle-path underline-path"
    />
    <path
      d="M8 20C45 12 90 22 140 16C185 10 215 18 232 14"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.7"
      className="doodle-path"
    />
  </svg>
);

export const LightbulbDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "currentColor",
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M40 12C26 12 16 22 16 34C16 43 22 49 26 55H54C58 49 64 43 64 34C64 22 54 12 40 12Z"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      className="doodle-path"
    />
    <path
      d="M28 58H52"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      className="doodle-path"
    />
    <path
      d="M32 64H48"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      className="doodle-path"
    />
    <path
      d="M36 70H44"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      className="doodle-path"
    />
    <line x1="40" y1="4" x2="40" y2="8" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="12" x2="57" y2="15" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <line x1="20" y1="12" x2="23" y2="15" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// Rocket Vehicle SVG in authentic streetwear sticker style
// Orientado horizontalmente (0° = hacia la derecha / morro adelante) para que autoRotate en GSAP
// y trayectorias curvas mantengan siempre la punta apuntando hacia adelante y el fuego propulsando detrás.
export const RocketVehicleSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = "",
}) => (
  <svg
    width={size}
    height={(size * 68) / 114}
    viewBox="0 0 114 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`overflow-visible select-none drop-shadow-[2px_3px_0px_var(--shadow-color)] ${className}`}
  >
    {/* White Sticker Die-Cut Outline (Borde sticker troquelado grueso que envuelve nave y fuego) */}
    <path
      d="M102 34 
         C90 18 68 15 48 15 
         L36 6 L36 18 
         L26 21 
         L6 26 L12 32 L4 34 L12 36 L6 42 
         L26 47 
         L36 50 L36 62 
         L48 53 
         C68 53 90 50 102 34 Z"
      fill="var(--bg-surface)"
      stroke="var(--border-ink)"
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* Exhaust Flame Group - UNIDO EXACTAMENTE AL PROPULSOR TRASERO (X: 6 a 28, Y: 22 a 46) */}
    <g className="animate-rocket-flame pointer-events-none rocket-flame-group">
      {/* Outer Comic Flame Tongue (Orange with bold ink border) */}
      <path
        d="M28 23 
           C18 20 10 24 4 34 
           C10 44 18 48 28 45 
           L22 39 L26 34 L22 29 Z"
        fill="var(--accent-orange)"
        stroke="var(--border-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Mid Energetic Flame (Electric Yellow) */}
      <path
        d="M28 26 
           C20 25 14 28 8 34 
           C14 40 20 43 28 42 
           L23 37 L26 34 L23 31 Z"
        fill="var(--accent-yellow)"
      />
      {/* Hot Core Plasma Tongue (White) */}
      <path d="M28 29 C22 29 18 31 14 34 C18 37 22 39 28 39 Z" fill="#FFFFFF" />
      {/* Little flying combustion sparks */}
      <circle cx="2" cy="34" r="1.8" fill="var(--accent-yellow)" />
      <circle cx="5" cy="24" r="1.2" fill="var(--accent-orange)" />
      <circle cx="5" cy="44" r="1.2" fill="var(--accent-orange)" />
    </g>

    {/* Top Stabilizer Delta Fin */}
    <path
      d="M52 18 L34 8 L36 22 Z"
      fill="var(--accent-orange)"
      stroke="var(--border-ink)"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* Bottom Stabilizer Delta Fin */}
    <path
      d="M52 50 L34 60 L36 46 Z"
      fill="var(--accent-orange)"
      stroke="var(--border-ink)"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* Fuselage Main Body (Cobalt Blue with sticker ink contour) */}
    <path
      d="M100 34 
         C84 21 58 20 30 22 
         L30 46 
         C58 48 84 47 100 34 Z"
      fill="var(--accent-blue)"
      stroke="var(--border-ink)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* Top Gloss Reflection Slash on Fuselage */}
    <path
      d="M40 24 C58 23 76 25 86 30"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeOpacity="0.8"
    />

    {/* Aerodynamic Nose Cone (Bright Yellow) */}
    <path
      d="M100 34 
         C90 27 82 23 76 22 
         L76 46 
         C82 45 90 41 100 34 Z"
      fill="var(--accent-yellow)"
      stroke="var(--border-ink)"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="94" cy="34" r="1.5" fill="#FFFFFF" />

    {/* Metallic Porthole Window with Glass Reflection */}
    <circle
      cx="56"
      cy="34"
      r="8"
      fill="var(--accent-yellow)"
      stroke="var(--border-ink)"
      strokeWidth="2.5"
    />
    <circle cx="56" cy="34" r="5" fill="#FFFFFF" stroke="var(--border-ink)" strokeWidth="1.5" />
    <path d="M54 32 L58 36" stroke="var(--accent-blue)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Engine Exhaust Nozzle (Dark Ink base at rear) */}
    <path
      d="M30 24 L24 26 L24 42 L30 44 Z"
      fill="#111111"
      stroke="var(--border-ink)"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const RocketDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "currentColor",
  size = 52,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M58 22C58 22 46 16 32 30C24 38 22 48 22 52L28 58C32 58 42 56 50 48C64 34 58 22 58 22Z"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
    <circle cx="44" cy="36" r="4" fill="var(--accent-yellow)" />
    <path
      d="M22 48L12 52L16 64L28 58"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      className="doodle-path"
    />
    <path
      d="M32 58L26 64L14 68L22 76L26 64"
      stroke="var(--accent-orange)"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M48 22L52 12L64 16L58 28"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      className="doodle-path"
    />
  </svg>
);

export const HeartDoodle: React.FC<DoodleProps> = ({
  className = "",
  color = "currentColor",
  size = 36,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M30 18C25 8 10 10 10 24C10 36 28 48 30 50C32 48 50 36 50 24C50 10 35 8 30 18Z"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
  </svg>
);

export const TapeBadge: React.FC<{ text: string; rotate?: string; color?: string }> = ({
  text,
  rotate = "-2deg",
  color = "var(--accent-yellow)",
}) => {
  const isDarkColor = color.includes("blue");
  return (
    <div
      style={{ transform: `rotate(${rotate})`, backgroundColor: color }}
      className={`inline-block px-3.5 py-1.5 font-display font-black text-xs sm:text-sm tracking-wider uppercase shadow-xs border-2 border-[var(--border-ink)] rounded-lg ${
        isDarkColor ? "text-white" : "text-[#111111]"
      }`}
    >
      {text}
    </div>
  );
};
