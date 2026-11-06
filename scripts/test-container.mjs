import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = new URL(process.env.IDEATHON_TEST_URL || "http://127.0.0.1:18080");
if (!["127.0.0.1", "localhost", "::1", "[::1]"].includes(base.hostname)) {
  throw new Error("Esta prueba solo admite un servidor local.");
}
const manifest = JSON.parse(
  await readFile(
    new URL("../src/features/videos/data/media-manifest.json", import.meta.url),
    "utf8",
  ),
);

for (const [path, status, type] of [
  ["/metodologia", 200, "text/html"],
  ["/videos", 200, "text/html"],
  ["/media/docs/guia-rapida-del-equipo.pdf", 200, "application/pdf"],
  ["/media/docs/articulo-empleo-juvenil-2026.pdf", 200, "application/pdf"],
  ["/media/docs/archivo-inexistente.pdf", 404, ""],
  ["/media/videos/archivo-inexistente.mp4", 404, ""],
]) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, status, `${path}: estado inesperado`);
  assert.ok(
    (response.headers.get("content-type") || "").includes(type),
    `${path}: tipo inesperado`,
  );
  await response.body?.cancel();
  console.log(`${path}: ${status}`);
}

for (const asset of manifest) {
  assert.match(asset.src, /^\/media\/videos\/[a-z0-9-]+\.mp4$/);
  const response = await fetch(new URL(asset.src, base), { headers: { Range: "bytes=0-1023" } });
  assert.equal(response.status, 206, `${asset.src}: no acepta rangos`);
  assert.match(response.headers.get("content-range") || "", /^bytes 0-1023\/\d+$/);
  await response.body?.cancel();
  console.log(`${asset.src}: 206`);
}
console.log(`Verificados ${manifest.length} videos por rango.`);
