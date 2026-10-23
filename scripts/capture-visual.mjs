import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:3000";
const outputDir = resolve(process.argv[2] ?? ".visual-baseline");
const routes = ["/", "/reportes", "/videos", "/metodologia", "/socios"];
const widths = [360, 768, 1024, 1440];
const browser = await chromium.launch({ headless: true });

try {
  for (const route of routes) {
    for (const width of widths) {
      for (const theme of ["light", "dark"]) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          colorScheme: theme === "dark" ? "dark" : "light",
          reducedMotion: "no-preference",
        });
        await context.addInitScript((initialTheme) => {
          localStorage.setItem("ideathon_theme", initialTheme);
        }, theme);

        const page = await context.newPage();
        const response = await page.goto(new URL(route, baseUrl).href, {
          waitUntil: "networkidle",
        });
        if (!response?.ok()) {
          throw new Error(`Failed to load ${route}: ${response?.status() ?? "no response"}`);
        }

        await page.evaluate(async () => {
          /* global document, window */
          await document.fonts.ready;
          const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((resolve) => window.setTimeout(resolve, 90));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(900);

        const routeName = route === "/" ? "home" : route.slice(1);
        const folder = resolve(outputDir, routeName);
        await mkdir(folder, { recursive: true });
        await page.screenshot({
          path: resolve(folder, `${width}-${theme}.png`),
          fullPage: true,
          animations: "disabled",
        });
        await context.close();
        console.log(`${route} ${width}px ${theme}`);
      }
    }
  }
} finally {
  await browser.close();
}
