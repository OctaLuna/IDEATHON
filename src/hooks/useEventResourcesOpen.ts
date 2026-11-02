import { PROGRAM_DATA } from "@/config/event";
import { useEffect, useState } from "react";

const openingTime = new Date(PROGRAM_DATA.countdownTarget).getTime();
const MAX_TIMEOUT = 2_147_483_647;

export function useEventResourcesOpen() {
  const [isOpen, setIsOpen] = useState(() => Date.now() >= openingTime);

  useEffect(() => {
    let timeout: number | undefined;
    const update = () => {
      window.clearTimeout(timeout);
      const remaining = openingTime - Date.now();
      setIsOpen(remaining <= 0);
      if (remaining > 0) timeout = window.setTimeout(update, Math.min(remaining, MAX_TIMEOUT));
    };
    update();
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return isOpen;
}
