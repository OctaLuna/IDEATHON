import { spawnSync } from "node:child_process";
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import ffprobePath from "@derhuerst/ffprobe-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "BORRAR");
const videoOut = path.join(root, "public", "media", "videos");
const posterOut = path.join(root, "public", "media", "posters");
const partnerOut = path.join(root, "public", "media", "partners");
const assets = [
  { slug: "guesandina", partner: "manqa", optimize: true },
  { slug: "miski-muu", partner: "manqa", optimize: true },
  { slug: "qarwita", partner: "manqa", optimize: true },
  { slug: "wayna", partner: "manqa", optimize: true },
  { slug: "alwacafe", partner: "samuel", optimize: false },
  { slug: "bio-bol", partner: "samuel", optimize: false },
  { slug: "du-de-una", partner: "samuel", optimize: false },
  { slug: "sin-etiquetas", partner: "samuel", optimize: false },
];

function run(executable, args) {
  const result = spawnSync(executable, args, { cwd: root, encoding: "utf8", windowsHide: true });
  if (result.status !== 0) {
    throw new Error(result.stderr || `${path.basename(executable)} failed (${result.status})`);
  }
  return result.stdout;
}

function normalized(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function listFiles(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await listFiles(file)));
    else result.push(file);
  }
  return result;
}

const inputs = await listFiles(sourceRoot);
const videos = inputs.filter((file) => /\.mp4$/i.test(file));
await Promise.all([
  mkdir(videoOut, { recursive: true }),
  mkdir(posterOut, { recursive: true }),
  mkdir(partnerOut, { recursive: true }),
]);

const manifest = [];
for (const asset of assets) {
  const input = videos.find((file) =>
    normalized(path.basename(file, path.extname(file))).includes(asset.slug),
  );
  if (!input) throw new Error(`No se encontró el video de ${asset.slug} dentro de BORRAR/.`);
  const videoPath = path.join(videoOut, `${asset.slug}.mp4`);
  const posterPath = path.join(posterOut, `${asset.slug}.jpg`);
  const probe = JSON.parse(
    run(ffprobePath, ["-v", "error", "-show_streams", "-show_format", "-of", "json", input]),
  );
  const videoStream = probe.streams.find((stream) => stream.codec_type === "video");
  if (!videoStream || videoStream.codec_name !== "h264")
    throw new Error(`${asset.slug} no tiene video H.264 de origen.`);
  const rotation = Number(
    videoStream.tags?.rotate ??
      videoStream.side_data_list?.find((item) => item.rotation !== undefined)?.rotation ??
      0,
  );
  const width = Math.abs(rotation) === 90 ? videoStream.height : videoStream.width;
  const height = Math.abs(rotation) === 90 ? videoStream.width : videoStream.height;
  const orientation = width >= height ? "horizontal" : "vertical";
  if (asset.optimize) {
    run(ffmpegPath, [
      "-y",
      "-i",
      input,
      "-vf",
      "scale='min(1280,iw)':-2",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "24",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      videoPath,
    ]);
  } else {
    await copyFile(input, videoPath);
  }
  run(ffmpegPath, [
    "-y",
    "-ss",
    "1",
    "-i",
    input,
    "-frames:v",
    "1",
    "-vf",
    "scale='min(1280,iw)':-2",
    "-q:v",
    "3",
    posterPath,
  ]);
  manifest.push({
    id: asset.slug,
    src: `/media/videos/${asset.slug}.mp4`,
    poster: `/media/posters/${asset.slug}.jpg`,
    width,
    height,
    orientation,
    durationSeconds: Number(probe.format.duration),
    videoCodec: videoStream.codec_name,
    audioCodec: probe.streams.find((stream) => stream.codec_type === "audio")?.codec_name ?? null,
  });
  process.stdout.write(
    `Prepared ${asset.slug} (${orientation}, ${Math.round(probe.format.duration)} s)\n`,
  );
}

for (const file of inputs.filter(
  (item) => /logo/i.test(path.basename(item)) && /\.(jpe?g|png)$/i.test(item),
)) {
  const partner = normalized(file).includes("samuel") ? "samuel" : "manqa";
  const ext = path.extname(file).toLowerCase();
  await copyFile(file, path.join(partnerOut, `${partner}-logo${ext}`));
}

await writeFile(
  path.join(root, "src", "features", "videos", "data", "media-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
