import { isResourceLinkVisible, visibleNavigationLinks } from "@/config/navigation";
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useEventResourcesOpen } from "./useEventResourcesOpen";

describe("event resources opening", () => {
  afterEach(() => vi.useRealTimers());

  it("shows videos immediately and keeps reports hidden after 09:00 in Bolivia", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-06T08:59:59-04:00"));
    const { result } = renderHook(() => useEventResourcesOpen());
    expect(result.current).toBe(false);
    expect(visibleNavigationLinks(result.current).map((link) => link.path)).not.toContain(
      "/reportes",
    );
    expect(visibleNavigationLinks(result.current).map((link) => link.path)).toContain("/videos");
    expect(isResourceLinkVisible("/videos", result.current)).toBe(true);
    expect(isResourceLinkVisible("/reportes", result.current)).toBe(false);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toBe(true);
    expect(visibleNavigationLinks(result.current).map((link) => link.path)).toContain("/videos");
    expect(visibleNavigationLinks(result.current).map((link) => link.path)).not.toContain(
      "/reportes",
    );
    expect(isResourceLinkVisible("/reportes", result.current)).toBe(false);
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
