import App from "@/app/App";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { refresh: vi.fn() },
}));

describe("application routes", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/reportes");
  });

  it("renders the reports page at its configured route", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", { level: 1, name: /Reportes: los datos/i }),
    ).toBeInTheDocument();
  });
});
