import { PROGRAM_DATA } from "@/config/event";
import { describe, expect, it } from "vitest";
import { IDEATION_STAGES, METHODOLOGY_STEPS } from "./methodology";

describe("methodology sequence", () => {
  it("orders ideation, Lean Canvas, prototyping, and presentation", () => {
    expect(METHODOLOGY_STEPS.slice(4).map((step) => step.title)).toEqual([
      "Ideación (Design Thinking)",
      "Lean Canvas",
      "Prototipado (Design Thinking)",
      "Pitch y premiación",
    ]);
  });

  it("breaks Design Thinking ideation into user, problems, and solution idea", () => {
    expect(IDEATION_STAGES.map((stage) => stage.title)).toEqual([
      "USUARIO",
      "PROBLEMAS",
      "IDEA / SOLUCIÓN",
    ]);
  });

  it("reflects the same sequence in the event agenda", () => {
    expect(PROGRAM_DATA.dayAgenda.slice(2, 5).map(({ time }) => time)).toEqual([
      "10:00",
      "10:45",
      "11:30",
    ]);
    expect(PROGRAM_DATA.dayAgenda[2].title).toContain("usuario, problemas e idea/solución");
    expect(PROGRAM_DATA.dayAgenda[3].title).toContain("Lean Canvas y prototipado");
    expect(PROGRAM_DATA.dayAgenda[4].badge).toBe("Exposición");
  });
});
