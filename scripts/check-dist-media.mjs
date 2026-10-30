import { open, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "src", "features", "videos", "data", "media-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

if (!Array.isArray(manifest) || manifest.length === 0) {
  throw new Error("El manifiesto de medios no contiene videos para publicar.");
}

async function assertMp4(filePath, label) {
  const info = await stat(filePath).catch(() => null);
  if (!info?.isFile() || info.size < 12) {
    throw new Error(`No se encontró el video de producción ${label} en dist.`);
  }

  const file = await open(filePath, "r");
  try {
    const header = Buffer.alloc(12);
    const { bytesRead } = await file.read(header, 0, header.length, 0);
    if (bytesRead < 12 || header.toString("ascii", 4, 8) !== "ftyp") {
      throw new Error(`El archivo ${label} en dist no parece ser un MP4 válido.`);
    }
  } finally {
    await file.close();
  }
}

await stat(path.join(root, "dist", "index.html"));

for (const asset of manifest) {
  const relativePath = asset.src?.replace(/^\/media\/videos\//, "");
  if (
    !relativePath ||
    path.basename(relativePath) !== relativePath ||
    !relativePath.endsWith(".mp4")
  ) {
    throw new Error(`Ruta de video no válida en el manifiesto: ${asset.src}`);
  }
  await assertMp4(path.join(root, "dist", "media", "videos", relativePath), relativePath);

  const posterPath = asset.poster?.replace(/^\//, "");
  if (!posterPath || !/^media\/posters\/[a-z0-9-]+\.jpg$/i.test(posterPath)) {
    throw new Error(`Ruta de póster no válida en el manifiesto: ${asset.poster}`);
  }
  await stat(path.join(root, "dist", posterPath));
}

process.stdout.write(`Verificados ${manifest.length} MP4 y sus pósteres dentro de dist.\n`);
