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
    expect(
      screen.getByRole("heading", { level: 2, name: /Bolivia necesita trabajo digno/i }),
    ).toBeInTheDocument();
    const download = screen.getByRole("link", { name: /Descargar PDF/i });
    expect(download).toHaveAttribute("href", "/media/docs/articulo-empleo-juvenil-2026.pdf");
    expect(download).toHaveAttribute("download");
    expect(screen.getByRole("button", { name: /Ampliar reporte$/i })).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /Vista previa de la/i })).toHaveLength(2);
    expect(screen.queryByText(/Contenido de muestra/i)).not.toBeInTheDocument();
  });
});
