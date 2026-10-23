/* global document, HTMLMediaElement */
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  let videoRequests = 0;
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/media/videos/")) videoRequests += 1;
  });

  await page.goto(new URL("/videos", baseUrl).href, { waitUntil: "networkidle" });
  assert.equal(await page.locator('button[aria-label^="Ver video"]').count(), 8);
  assert.equal(videoRequests, 0, "Video files should not load before the visitor opens a player.");

  await page.getByRole("button", { name: "Reproducir video Guesandina" }).click();
  const horizontal = page.locator('[role="dialog"] video');
  await horizontal.waitFor({ state: "visible" });
  await page.waitForFunction(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return dialog?.contains(document.activeElement) ?? false;
  });
  const dialogState = await page.locator('[role="dialog"]').evaluate((dialog) => ({
    hasFocus: dialog.contains(document.activeElement),
    bodyOverflow: document.body.style.overflow,
  }));
  assert.equal(
    dialogState.hasFocus,
    true,
    "Opening the player should move keyboard focus into the dialog.",
  );
  assert.equal(dialogState.bodyOverflow, "hidden", "The dialog should lock page scrolling.");
  await horizontal.evaluate((video) =>
    video.readyState >= HTMLMediaElement.HAVE_METADATA
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          video.addEventListener("loadedmetadata", resolve, { once: true });
          video.addEventListener(
            "error",
            () => reject(new Error("Horizontal video failed to load.")),
            {
              once: true,
            },
          );
        }),
  );
  const horizontalDimensions = await horizontal.evaluate((video) => [
    video.videoWidth,
    video.videoHeight,
  ]);
  assert.deepEqual(horizontalDimensions, [1280, 720]);
  assert.ok(videoRequests > 0, "Opening the player should request its local MP4.");
  await page.waitForFunction(() => {
    const video = document.querySelector('[role="dialog"] video');
    return video && video.currentTime > 0.5;
  });
  await page.keyboard.press("Escape");
  await page.locator('[role="dialog"]').waitFor({ state: "detached" });
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");

  await page.getByRole("button", { name: "Ver video Alwacafe" }).click();
  const vertical = page.locator('[role="dialog"] video');
  await vertical.waitFor({ state: "visible" });
  await vertical.evaluate((video) =>
    video.readyState >= HTMLMediaElement.HAVE_METADATA
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          video.addEventListener("loadedmetadata", resolve, { once: true });
          video.addEventListener(
            "error",
            () => reject(new Error("Vertical video failed to load.")),
            {
              once: true,
            },
          );
        }),
  );
  const verticalDimensions = await vertical.evaluate((video) => [
    video.videoWidth,
    video.videoHeight,
  ]);
  assert.deepEqual(verticalDimensions, [368, 656]);
  await page.keyboard.press("Escape");
  await page.locator('[role="dialog"]').waitFor({ state: "detached" });

  const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(pageWidth <= 360, `The video page overflows the 360px viewport (${pageWidth}px).`);

  await page.goto(new URL("/videos?socio=samuel", baseUrl).href, { waitUntil: "networkidle" });
  assert.equal(await page.locator('button[aria-label^="Ver video"]').count(), 4);
  await page.goto(new URL("/", baseUrl).href, { waitUntil: "networkidle" });
  assert.equal(
    await page.getByText(/Administración de Empresas/i).count(),
    0,
    "The public site should not associate the event with the degree program.",
  );
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(
      documentWidth <= width,
      `The homepage overflows the ${width}px viewport (${documentWidth}px).`,
    );
  }
  await page.goto(new URL("/metodologia", baseUrl).href, { waitUntil: "networkidle" });
  assert.deepEqual(
    (await page.locator(".methodology-step-card h3").allTextContents()).slice(4, 8),
    [
      "Ideación (Design Thinking)",
      "Lean Canvas",
      "Prototipado (Design Thinking)",
      "Pitch y premiación",
    ],
    "The methodology timeline should follow the event sequence.",
  );
  assert.deepEqual(await page.locator("#ideation-section ol h3").allTextContents(), [
    "USUARIO",
    "PROBLEMAS",
    "IDEA / SOLUCIÓN",
  ]);
  const detailedSectionPositions = await page
    .locator("#ideation-section, #lean-canvas-section, #prototyping-section")
    .evaluateAll((sections) => sections.map((section) => section.getBoundingClientRect().top));
  assert.ok(
    detailedSectionPositions[0] < detailedSectionPositions[1] &&
      detailedSectionPositions[1] < detailedSectionPositions[2],
    "The detailed methodology should show ideation, Lean Canvas, and prototyping in order.",
  );
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(
      documentWidth <= width,
      `The methodology page overflows the ${width}px viewport (${documentWidth}px).`,
    );
  }
  console.log(
    "Local video playback, organizer copy, methodology order, and methodology widths pass.",
  );
} finally {
  await browser.close();
}
