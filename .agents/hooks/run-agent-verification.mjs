import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function findProjectRoot() {
  let directory = process.cwd();
  while (directory !== dirname(directory)) {
    if (existsSync(resolve(directory, "package.json"))) return directory;
    directory = dirname(directory);
  }
  return process.cwd();
}

export function runAgentVerification() {
  const result = spawnSync(npmCommand, ["run", "verify:agent"], {
    cwd: findProjectRoot(),
    encoding: "utf8",
    shell: process.platform === "win32",
    timeout: 170_000,
    windowsHide: true,
  });

  if (result.stdout) process.stderr.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  return {
    ok: !result.error && result.status === 0,
    error: result.error?.message,
  };
}
