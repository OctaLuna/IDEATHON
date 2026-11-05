#!/usr/bin/env bash
# Forced SSH command for the IDEATHON GitHub Actions deploy key.
set -Eeuo pipefail

request=${SSH_ORIGINAL_COMMAND:-}
if [[ ! "$request" =~ ^([0-9a-f]{40})\ (sha256:[0-9a-f]{64})$ ]]; then
  echo 'Invalid IDEATHON deployment request.' >&2
  exit 2
fi
commit=${BASH_REMATCH[1]}
digest=${BASH_REMATCH[2]}
image="ghcr.io/octaluna/ideathon@$digest"
tag="tedx-platform-ideathon:$commit"
root=/home/adminkaaiya/projects/tedx-facultyweek-platform
compose=(docker compose --env-file .env -f compose.yaml)

exec 9>/tmp/tedx-platform-deploy.lock
flock -w 180 9 || { echo 'Another platform deployment is running.' >&2; exit 4; }
available_kb=$(df -Pk "$root" | awk 'NR==2 {print $4}')
[[ "$available_kb" =~ ^[0-9]+$ ]] && (( available_kb >= 2097152 )) || {
  echo 'Less than 2 GiB is available; deployment stopped.' >&2
  exit 5
}
cd "$root"
backup=$(mktemp)
cp .env "$backup"
chmod 600 "$backup"
updated=0
finish() {
  rc=$?
  if (( rc != 0 && updated )); then
    cp "$backup" .env
    "${compose[@]}" up -d --no-deps --no-build --pull never ideathon-web || true
  fi
  rm -f "$backup"
  exit "$rc"
}
trap finish EXIT

docker pull "$image"
docker tag "$image" "$tag"
if grep -q '^IDEATHON_IMAGE_TAG=' .env; then
  sed -i "s|^IDEATHON_IMAGE_TAG=.*|IDEATHON_IMAGE_TAG=$commit|" .env
else
  printf '\nIDEATHON_IMAGE_TAG=%s\n' "$commit" >> .env
fi
updated=1
"${compose[@]}" config --quiet
"${compose[@]}" up -d --no-deps --no-build --pull never ideathon-web

cid=$("${compose[@]}" ps -q ideathon-web)
ready=0
for ((attempt=0; attempt<60; attempt++)); do
  health=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}missing{{end}}' "$cid" 2>/dev/null || true)
  if [[ "$health" == healthy ]]; then ready=1; break; fi
  [[ "$health" == unhealthy ]] && break
  sleep 2
done
if (( ! ready )) || ! docker exec "$cid" wget -q --spider http://127.0.0.1/media/docs/guia-rapida-del-equipo.pdf; then
  echo 'IDEATHON container or PDF verification failed.' >&2
  exit 1
fi
for video in guesandina miski-muu qarwita wayna alwacafe bio-bol du-de-una sin-etiquetas; do
  response=$(docker exec "$cid" wget -S -O /dev/null --header='Range: bytes=0-0' \
    "http://127.0.0.1/media/videos/$video.mp4" 2>&1) || true
  grep -Eq 'HTTP/[0-9.]+ 206([[:space:]]|$)' <<< "$response" || {
    echo "IDEATHON media range verification failed: $video" >&2
    exit 1
  }
done
public_ok=0
for attempt in $(seq 1 5); do
  pdf=$(curl -fsS --max-time 10 -o /dev/null -w '%{http_code} %{content_type}' \
    https://ideathon.adm-ucb.lat/media/docs/guia-rapida-del-equipo.pdf 2>/dev/null || true)
  video=$(curl -fsS --max-time 10 -o /dev/null -H 'Range: bytes=0-0' -w '%{http_code} %{content_type}' \
    https://ideathon.adm-ucb.lat/media/videos/guesandina.mp4 2>/dev/null || true)
  if [[ "$pdf" == '200 application/pdf'* && "$video" == '206 video/mp4'* ]]; then public_ok=1; break; fi
  sleep 5
done
(( public_ok )) || { echo 'IDEATHON public HTTPS media verification failed.' >&2; exit 1; }
printf '%s %s\n' "$commit" "$digest" > "$root/ideathon-current-release.txt"
echo "IDEATHON deployed at $commit ($digest)."
