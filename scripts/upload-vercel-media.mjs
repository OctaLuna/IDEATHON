import { spawnSync } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "src", "features", "videos", "data", "media-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const uploadedOrigins = new Set();
const localEnv = dotenv.parse(
  await readFile(path.join(root, ".env.local"), "utf8").catch(() => ""),
);
const blobToken = process.env.BLOB_READ_WRITE_TOKEN || localEnv.BLOB_READ_WRITE_TOKEN;

if (!blobToken) {
  throw new Error(
    "Falta BLOB_READ_WRITE_TOKEN; conecta el almacén y descarga las variables locales de Vercel.",
  );
}

// The CLI may load an OIDC token without a store ID from .env.local. Run it
// outside the project and provide only the Blob token to avoid that conflict.
const childEnv = { ...process.env, BLOB_READ_WRITE_TOKEN: blobToken };
delete childEnv.VERCEL_OIDC_TOKEN;
delete childEnv.BLOB_STORE_ID;

if (!Array.isArray(manifest) || manifest.length === 0) {
  throw new Error("El manifiesto de medios no contiene videos para cargar.");
}

for (const asset of manifest) {
  const filename = asset.src?.replace(/^\/media\/videos\//, "");
  if (!filename || path.basename(filename) !== filename || !/^[a-z0-9-]+\.mp4$/i.test(filename)) {
    throw new Error(`Ruta de video no válida en el manifiesto: ${asset.src}`);
  }

  const localPath = path.join(root, "public", "media", "videos", filename);
  const info = await stat(localPath).catch(() => null);
  if (!info?.isFile() || info.size === 0) {
    throw new Error(`No se encontró el MP4 optimizado ${localPath}.`);
  }

  const args = [
    "blob",
    "put",
    process.platform === "win32" ? `"${localPath}"` : localPath,
    "--pathname",
    `media/videos/${filename}`,
    "--access",
    "public",
    "--allow-overwrite",
    "--no-color",
  ];
  const result = spawnSync("vercel", args, {
    cwd: tmpdir(),
    env: childEnv,
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
    shell: process.platform === "win32",
    windowsHide: true,
  });

  if (result.error || result.status !== 0) {
    throw new Error(
      `Falló la carga de ${filename} con Vercel CLI. Inicia sesión y conecta un Blob público.\n${(result.stderr || result.error?.message || "Sin detalle adicional.").replaceAll(blobToken, "[redactado]")}`,
    );
  }

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  const urls = output.match(/https:\/\/[^\s"'<>]+/g) ?? [];
  for (const candidate of urls) {
    try {
      const url = new URL(candidate.replace(/[),.;]+$/, ""));
      if (url.hostname.endsWith(".public.blob.vercel-storage.com")) uploadedOrigins.add(url.origin);
    } catch {
      // Ignore command output fragments that are not URLs.
    }
  }

  process.stdout.write(`Cargado ${filename} (${(info.size / 1024 / 1024).toFixed(1)} MiB).\n`);
}

if (uploadedOrigins.size === 1) {
  process.stdout.write(`Configura MEDIA_BLOB_BASE_URL=${[...uploadedOrigins][0]} en Vercel.\n`);
} else {
  process.stdout.write(
    "Carga terminada. Configura MEDIA_BLOB_BASE_URL con el origen público del almacén en Vercel.\n",
  );
}
