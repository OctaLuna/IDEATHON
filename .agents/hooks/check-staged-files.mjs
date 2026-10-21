import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

let root = process.cwd();
while (root !== dirname(root)) {
  if (existsSync(resolve(root, "package.json"))) break;
  root = dirname(root);
}
const git = (args, options = {}) => execFileSync("git", ["-c", `safe.directory=${root}`, ...args], options);
const files = git(["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"], {
  encoding: "utf8",
}).split("\0").filter(Boolean);

const maxBytes = 5 * 1024 * 1024;
const errors = [];

for (const file of files) {
  const content = git(["show", `:${file}`], { encoding: null, maxBuffer: 64 * 1024 * 1024 });
  const isBinary = content.subarray(0, Math.min(content.length, 8192)).includes(0);
  const isPublicRasterAsset = /^public\/.*\.(?:avif|gif|jpe?g|png|webp)$/i.test(file);

  if (isBinary && !isPublicRasterAsset) errors.push(`${file}: unapproved binary files are not allowed`);
  if (content.length > maxBytes) errors.push(`${file}: ${content.length} bytes exceeds the 5 MiB limit`);
}

if (errors.length) {
  console.error("Pre-commit rejected staged files:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
