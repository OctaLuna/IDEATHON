import { createWriteStream } from "node:fs";
import { randomUUID } from "node:crypto";
import { mkdir, open, readFile, rename, rm } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "src", "features", "videos", "data", "media-manifest.json");
const outputDirectory = path.join(root, "public", "media", "videos");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const baseUrlValue = process.env.MEDIA_BLOB_BASE_URL;

if (!baseUrlValue) {
  throw new Error(
    "Falta MEDIA_BLOB_BASE_URL. Configura el origen público de Vercel Blob en el entorno de build.",
  );
}

const baseUrl = new URL(baseUrlValue);
const isLocalHttp =
  baseUrl.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(baseUrl.hostname);
if (
  (baseUrl.protocol !== "https:" && !isLocalHttp) ||
  baseUrl.pathname !== "/" ||
  baseUrl.search ||
  baseUrl.hash ||
  baseUrl.username ||
  baseUrl.password
) {
  throw new Error(
    "MEDIA_BLOB_BASE_URL debe ser el origen HTTPS público del almacén, sin ruta, credenciales ni parámetros.",
  );
}

if (!Array.isArray(manifest) || manifest.length === 0) {
  throw new Error("El manifiesto de medios no contiene videos para sincronizar.");
}

await mkdir(outputDirectory, { recursive: true });

async function replaceFile(source, destination) {
  const backupPath = `${destination}.${randomUUID()}.previous`;
  let hasBackup = false;

  try {
    await rename(destination, backupPath);
    hasBackup = true;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  try {
    await rename(source, destination);
  } catch (error) {
    if (hasBackup) await rename(backupPath, destination);
    throw error;
  }

  if (hasBackup) await rm(backupPath);
}

for (const asset of manifest) {
  const filename = asset.src?.replace(/^\/media\/videos\//, "");
  if (!filename || path.basename(filename) !== filename || !/^[a-z0-9-]+\.mp4$/i.test(filename)) {
    throw new Error(`Ruta de video no válida en el manifiesto: ${asset.src}`);
  }

  const url = new URL(`media/videos/${encodeURIComponent(filename)}`, baseUrl);
  const destination = path.join(outputDirectory, filename);
  const temporaryPath = `${destination}.${process.pid}.download`;
  const response = await fetch(url, { signal: AbortSignal.timeout(300_000) });

  if (!response.ok || !response.body) {
    throw new Error(`No se pudo descargar ${filename} desde Blob (HTTP ${response.status}).`);
  }

  const contentType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (
    contentType &&
    !["video/mp4", "application/octet-stream", "binary/octet-stream"].includes(contentType)
  ) {
    throw new Error(`Blob devolvió ${contentType} para ${filename}, se esperaba un MP4.`);
  }

  try {
    await pipeline(Readable.fromWeb(response.body), createWriteStream(temporaryPath));
    const file = await open(temporaryPath, "r");
    try {
      const header = Buffer.alloc(12);
      const { bytesRead } = await file.read(header, 0, header.length, 0);
      if (bytesRead < 12 || header.toString("ascii", 4, 8) !== "ftyp") {
        throw new Error(`La respuesta de Blob para ${filename} no es un MP4 válido.`);
      }
    } finally {
      await file.close();
    }
    await replaceFile(temporaryPath, destination);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }

  process.stdout.write(`Sincronizado ${filename} desde Blob.\n`);
}
