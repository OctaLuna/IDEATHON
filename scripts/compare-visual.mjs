import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve, relative, sep } from "node:path";

const [baselineArg = ".visual-baseline", currentArg = ".visual-current"] = process.argv.slice(2);
const baselineDir = resolve(baselineArg);
const currentDir = resolve(currentArg);
const diffDir = resolve(".visual-diff");
const threshold = Number(process.env.VISUAL_DIFF_RATIO ?? "0.002");
const homeThreshold = Number(process.env.VISUAL_HOME_DIFF_RATIO ?? "0.004");

async function findPngFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = resolve(directory, entry.name);
      if (entry.isDirectory()) return findPngFiles(fullPath);
      return entry.isFile() && entry.name.endsWith(".png") ? [fullPath] : [];
    }),
  );
  return files.flat();
}

const baselineFiles = (await findPngFiles(baselineDir)).filter(
  (file) => relative(baselineDir, file).split(sep)[0] !== "videos",
);
let failed = false;

for (const baselinePath of baselineFiles) {
  const name = relative(baselineDir, baselinePath);
  const currentPath = resolve(currentDir, name);
  const baseline = PNG.sync.read(await readFile(baselinePath));
  const current = PNG.sync.read(await readFile(currentPath));
  if (baseline.width !== current.width || baseline.height !== current.height) {
    console.error(
      `${name}: dimensions differ (${baseline.width}x${baseline.height} vs ${current.width}x${current.height})`,
    );
    failed = true;
    continue;
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const differingPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    baseline.width,
    baseline.height,
    { threshold: 0.1, includeAA: false },
  );
  const ratio = differingPixels / (baseline.width * baseline.height);
  // The homepage has a live countdown. Allow its changing numerals small pixel variance.
  const allowedRatio = name.split(sep)[0] === "home" ? homeThreshold : threshold;
  if (ratio > allowedRatio) {
    const diffPath = resolve(diffDir, name.split(sep).join("/"));
    await mkdir(dirname(diffPath), { recursive: true });
    await writeFile(diffPath, PNG.sync.write(diff));
    console.error(
      `${name}: ${(ratio * 100).toFixed(3)}% pixels differ (limit ${(allowedRatio * 100).toFixed(2)}%)`,
    );
    failed = true;
  }
}

if (baselineFiles.length !== 32) {
  console.error(`Expected 32 stable-route screenshots, found ${baselineFiles.length}`);
  failed = true;
}

if (failed) process.exitCode = 1;
else
  console.log(
    `All ${baselineFiles.length} stable-route screenshots match within ${(threshold * 100).toFixed(2)}% (home countdown: ${(homeThreshold * 100).toFixed(2)}%).`,
  );
