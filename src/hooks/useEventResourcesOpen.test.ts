import { visibleNavigationLinks } from "@/config/navigation";
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useEventResourcesOpen } from "./useEventResourcesOpen";

describe("event resources opening", () => {
  afterEach(() => vi.useRealTimers());

  it("reveals both navigation links at 09:00 in Bolivia without a reload", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-06T08:59:59-04:00"));
    const { result } = renderHook(() => useEventResourcesOpen());
    expect(result.current).toBe(false);
    expect(visibleNavigationLinks(result.current).map((link) => link.path)).not.toContain(
      "/reportes",
    );
    expect(visibleNavigationLinks(result.current).map((link) => link.path)).not.toContain(
      "/videos",
    );
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toBe(true);
    expect(visibleNavigationLinks(result.current).map((link) => link.path)).toEqual(
      expect.arrayContaining(["/reportes", "/videos"]),
    );
  });

  it("rechecks the clock when a suspended tab regains focus", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-06T08:59:00-04:00"));
    const { result } = renderHook(() => useEventResourcesOpen());
    vi.setSystemTime(new Date("2026-11-06T09:01:00-04:00"));
    act(() => window.dispatchEvent(new Event("focus")));
    expect(result.current).toBe(true);
  });
});
