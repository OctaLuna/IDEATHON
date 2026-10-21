import { useEffect, useState } from "react";

export interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownState {
  timeLeft: TimeUnits;
  isBeforeDeadline: boolean;
}

function calculateCountdown(
  targetDate: string | Date,
  deadlineDate?: string | Date,
): CountdownState {
  const now = Date.now();
  const difference = new Date(targetDate).getTime() - now;

  return {
    timeLeft:
      !Number.isFinite(difference) || difference <= 0
        ? { days: 0, hours: 0, minutes: 0, seconds: 0 }
        : {
            days: Math.floor(difference / 86_400_000),
            hours: Math.floor((difference % 86_400_000) / 3_600_000),
            minutes: Math.floor((difference % 3_600_000) / 60_000),
            seconds: Math.floor((difference % 60_000) / 1_000),
          },
    isBeforeDeadline: deadlineDate ? now < new Date(deadlineDate).getTime() : false,
  };
}

export function useCountdown(targetDate: string | Date, deadlineDate?: string | Date) {
  const [countdown, setCountdown] = useState(() => calculateCountdown(targetDate, deadlineDate));

  useEffect(() => {
    const update = () => setCountdown(calculateCountdown(targetDate, deadlineDate));
    update();
    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, [targetDate, deadlineDate]);

  return countdown;
}
