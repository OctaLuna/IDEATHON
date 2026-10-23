import { FAQS_DATA } from "@/features/home/data/faqs";
import { METHODOLOGY_STEPS } from "@/features/methodology/data/methodology";
import { describe, expect, it } from "vitest";
import { PROGRAM_DATA } from "./event";

describe("postulation deadline", () => {
  it("sets October 26, 2026 as the deadline in Bolivia", () => {
    expect(PROGRAM_DATA.postulationDeadline).toBe("2026-10-26T23:59:59-04:00");
    expect(PROGRAM_DATA.milestones.find((milestone) => milestone.isDeadline)?.date).toBe(
      "Hasta el 26 de octubre",
    );
    expect(FAQS_DATA.find((item) => item.question === "¿Cómo se postula?")?.answer).toContain(
      "hasta el 26 de octubre de 2026",
    );
    expect(METHODOLOGY_STEPS[0].description).toContain("hasta el 26 de octubre");
  });
});
