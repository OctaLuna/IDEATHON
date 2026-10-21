import { useCountdown } from "@/hooks/useCountdown";
import { PROGRAM_DATA } from "@/config/event";
import { Clock } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
export const CountdownTimer: React.FC = () => {
  const { timeLeft, isBeforeDeadline: isPostulationOpen } = useCountdown(
    PROGRAM_DATA.countdownTarget,
    PROGRAM_DATA.postulationDeadline,
  );
  const prevSecondsRef = useRef<number>(timeLeft.seconds);
  const [secChanged, setSecChanged] = useState(false);

  useEffect(() => {
    if (timeLeft.seconds !== prevSecondsRef.current) {
      prevSecondsRef.current = timeLeft.seconds;
      setSecChanged(true);
      const timer = setTimeout(() => setSecChanged(false), 200);
      return () => clearTimeout(timer);
    }
  }, [timeLeft.seconds]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2 text-center select-none font-mono">
        <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow">
          <span className="font-display font-black text-xl sm:text-2xl text-[var(--accent-blue)] block leading-none">
            {timeLeft.days}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold block mt-1">
            Días
          </span>
        </div>

        <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow">
          <span className="font-display font-black text-xl sm:text-2xl text-[var(--text-main)] block leading-none">
            {timeLeft.hours}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold block mt-1">
            Horas
          </span>
        </div>

        <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow">
          <span className="font-display font-black text-xl sm:text-2xl text-[var(--accent-orange)] block leading-none">
            {timeLeft.minutes}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold block mt-1">
            Min
          </span>
        </div>

        <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow">
          <span
            className={`font-display font-black text-xl sm:text-2xl text-[var(--accent-mint)] block leading-none transition-transform duration-150 ${
              secChanged ? "-translate-y-1 scale-110" : "translate-y-0 scale-100"
            }`}
          >
            {timeLeft.seconds}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold block mt-1">
            Seg
          </span>
        </div>
      </div>

      {isPostulationOpen && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--accent-yellow)] text-[#111111] text-[11px] font-mono font-bold border border-[var(--border-ink)] sticker-shadow">
          <Clock className="w-3.5 h-3.5 text-[#111111] shrink-0" />
          <span>Postulación hasta el 23 de octubre</span>
        </div>
      )}
    </div>
  );
};

// Versión compacta (días · horas · min) para el Hero
export const CompactCountdown: React.FC = () => {
  const { timeLeft } = useCountdown(PROGRAM_DATA.countdownTarget);

  return (
    <div className="inline-flex items-center gap-2 p-2 px-3.5 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow font-mono text-xs">
      <Clock className="w-4 h-4 text-[var(--accent-orange)] shrink-0 animate-pulse" />
      <span className="text-[var(--text-muted)] font-bold hidden sm:inline">Faltan:</span>
      <div className="flex items-center gap-1.5 font-display font-black text-sm text-[var(--text-main)]">
        <span className="text-[var(--accent-blue)]">{timeLeft.days}d</span>
        <span>:</span>
        <span className="text-[var(--text-main)]">{String(timeLeft.hours).padStart(2, "0")}h</span>
        <span>:</span>
        <span className="text-[var(--accent-orange)]">
          {String(timeLeft.minutes).padStart(2, "0")}m
        </span>
      </div>
    </div>
  );
};
