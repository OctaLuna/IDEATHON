#!/usr/bin/env bash
# Root-owned entrypoint. Accepts exactly one SSH_ORIGINAL_COMMAND argument.
set -Eeuo pipefail
export PATH=/usr/sbin:/usr/bin:/sbin:/bin
if [[ $# -ne 1 || ! "$1" =~ ^([0-9a-f]{40})\ (sha256:[0-9a-f]{64})$ ]]; then
  echo 'Invalid release request.' >&2
  exit 2
fi
commit=${BASH_REMATCH[1]}
digest=${BASH_REMATCH[2]}
image="ghcr.io/octaluna/ideathon@$digest"
config=/etc/ideathon-deploy.conf
state_dir=/var/lib/ideathon-deploy
overlay="$state_dir/ideathon.override.yaml"
[[ $(id -u) -eq 0 && -d "$state_dir" && ! -L "$state_dir" ]] || exit 3
[[ -f "$config" && ! -L "$config" && $(stat -c '%u:%a' "$config") == '0:600' ]] || {
  echo 'Root-owned deployment configuration with mode 600 is required.' >&2; exit 3;
}
# This file is created and reviewed by the server administrator; it is never committed.
source "$config"
project_dir=${IDEATHON_PROJECT_DIR:?}
project_name=${IDEATHON_PROJECT_NAME:?}
container=${IDEATHON_CONTAINER_NAME:?}
[[ "$project_dir" =~ ^/[a-zA-Z0-9._/-]+$ && "$project_name" =~ ^[a-z0-9_-]+$ && "$container" =~ ^[a-zA-Z0-9_.-]+$ ]] || exit 3
[[ -f "$project_dir/compose.yaml" ]] || exit 3
exec 9>"$state_dir/deploy.lock"
flock -n 9 || { echo 'Another IDEATHON deployment is running.' >&2; exit 4; }
old_image=$(docker inspect --format '{{.Image}}' "$container")
[[ "$old_image" =~ ^sha256:[0-9a-f]{64}$ ]] || exit 3
available_kb=$(df -Pk "$state_dir" | awk 'NR==2 {print $4}')
[[ "$available_kb" =~ ^[0-9]+$ ]] && (( available_kb >= 2097152 )) || {
  echo 'Less than 2 GiB available; deployment stopped.' >&2; exit 5;
}
cd "$project_dir"
docker pull "$image"
backup="$state_dir/previous.override.yaml"
if [[ -f "$overlay" && ! -L "$overlay" ]]; then
  cp -- "$overlay" "$backup"
  had_overlay=1
else
  had_overlay=0
fi
write_overlay() {
  local reference=$1 tmp
  tmp=$(mktemp "$state_dir/.ideathon.XXXXXXXX")
  printf 'services:\n  ideathon-web:\n    image: "%s"\n' "$reference" > "$tmp"
  chmod 600 "$tmp"
  mv -f -- "$tmp" "$overlay"
}
compose=(docker compose -p "$project_name" -f "$project_dir/compose.yaml" -f "$overlay")
rollback() {
  echo "Deployment failed; restoring previous IDEATHON image $old_image." >&2
  if (( had_overlay )); then
    cp -- "$backup" "$overlay"
  else
    write_overlay "$old_image"
  fi
  "${compose[@]}" up -d --no-deps --no-build --pull never ideathon-web || {
    echo 'Rollback failed; operator intervention is required.' >&2
    return 1
  }
}
write_overlay "$image"
if ! "${compose[@]}" up -d --no-deps --no-build --pull never ideathon-web; then
  rollback || true
  exit 1
fi
ready=0
for ((i=0; i<60; i++)); do
  health=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}missing{{end}}' "$container" 2>/dev/null || true)
  if [[ "$health" == healthy ]]; then ready=1; break; fi
  if [[ "$health" == unhealthy ]]; then break; fi
  sleep 2
done
if (( ! ready )) || ! docker exec "$container" wget -q --spider http://127.0.0.1/media/docs/guia-rapida-del-equipo.pdf; then
  rollback || true
  exit 1
fi
for video in guesandina miski-muu qarwita wayna alwacafe bio-bol du-de-una sin-etiquetas; do
  if ! docker exec "$container" wget -S -O /dev/null --header='Range: bytes=0-0' \
    "http://127.0.0.1/media/videos/$video.mp4" 2>&1 | grep -Eq 'HTTP/[0-9.]+ 206'; then
    echo "Video range check failed: $video" >&2
    rollback || true
    exit 1
  fi
done
public_ok=0
for ((i=0; i<5; i++)); do
  pdf=$(curl -fsS --max-time 10 -o /dev/null -w '%{http_code} %{content_type}' https://ideathon.adm-ucb.lat/media/docs/guia-rapida-del-equipo.pdf 2>/dev/null || true)
  video=$(curl -fsS --max-time 10 -o /dev/null -H 'Range: bytes=0-0' -w '%{http_code} %{content_type}' https://ideathon.adm-ucb.lat/media/videos/guesandina.mp4 2>/dev/null || true)
  if [[ "$pdf" == '200 application/pdf'* && "$video" == '206 video/mp4'* ]]; then
    public_ok=1
    break
  fi
  sleep 5
done
if (( ! public_ok )); then
  echo 'Public HTTPS media checks failed.' >&2
  rollback || true
  exit 1
fi
printf '%s %s\n' "$commit" "$digest" > "$state_dir/current-release.txt"
echo "IDEATHON is healthy at commit $commit ($digest). Previous image: $old_image"
