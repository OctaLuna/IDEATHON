import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

let root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
while (!existsSync(resolve(root, "package.json")) && dirname(root) !== root) root = dirname(root);

const launcherNames =
  process.platform === "win32"
    ? [
        [".agents", "skills", "impeccable", "scripts", "impeccable.cmd"],
        [".claude", "skills", "impeccable", "scripts", "impeccable.cmd"],
      ]
    : [
        [".agents", "skills", "impeccable", "scripts", "impeccable"],
        [".claude", "skills", "impeccable", "scripts", "impeccable"],
      ];
const launcher = launcherNames.map((parts) => resolve(root, ...parts)).find(existsSync);

if (!launcher) process.exit(0);

const result =
  process.platform === "win32"
    ? spawnSync(launcher, ["hook"], {
        cwd: root,
        encoding: "utf8",
        shell: true,
        timeout: 25_000,
        windowsHide: true,
      })
    : spawnSync(launcher, ["hook"], {
        cwd: root,
        encoding: "utf8",
        timeout: 25_000,
      });

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.error) {
  console.error(result.error.message);
  process.exitCode = 1;
} else if (result.status !== 0) {
  process.exitCode = result.status ?? 1;
}
