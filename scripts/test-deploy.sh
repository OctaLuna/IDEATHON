#!/usr/bin/env bash
set -eu
t=$(mktemp -d /tmp/ideathon-mock.XXXXXXXX)
case "$t" in /tmp/ideathon-mock.*) ;; *) exit 1;; esac
trap 'rm -rf -- "$t"' EXIT
mkdir -p "$t/bin" "$t/state" "$t/project"
touch "$t/project/compose.yaml"
cat > "$t/config" <<EOF
IDEATHON_PROJECT_DIR=$t/project
IDEATHON_PROJECT_NAME=isolated
IDEATHON_CONTAINER_NAME=ideathon-test
EOF
chmod 600 "$t/config"
cat > "$t/bin/id" <<'EOF'
#!/bin/sh
echo 0
EOF
cat > "$t/bin/docker" <<'EOF'
#!/bin/sh
printf '%s\n' "$*" >> "$MOCK_LOG"
case "$1" in
 inspect) case "$*" in *State.Health*) if [ "${MOCK_FAIL:-0}" = 1 ]; then echo unhealthy; else echo healthy; fi;; *) printf 'sha256:'; printf 'a%.0s' $(seq 1 64); printf '\n';; esac;;
 exec) case "$*" in *videos*) echo 'HTTP/1.1 206 Partial Content';; esac;;
esac
exit 0
EOF
cat > "$t/bin/curl" <<'EOF'
#!/bin/sh
case "$*" in *.pdf*) echo '200 application/pdf';; *) echo '206 video/mp4';; esac
EOF
chmod +x "$t/bin/"*
owner=$(stat -c '%u' "$t/config")
sed -e "s|export PATH=/usr/sbin:/usr/bin:/sbin:/bin|export PATH=$t/bin:/usr/sbin:/usr/bin:/sbin:/bin|" \
 -e "s|config=/etc/ideathon-deploy.conf|config=$t/config|" \
 -e "s|state_dir=/var/lib/ideathon-deploy|state_dir=$t/state|" \
 -e "s|'0:600'|'$owner:600'|" \
 deploy/ideathon-release.sh > "$t/release.sh"
sha=$(printf 'b%.0s' $(seq 1 40))
digest="sha256:$(printf 'c%.0s' $(seq 1 64))"
export MOCK_LOG="$t/docker.log"
bash "$t/release.sh" "$sha $digest"
test -f "$t/state/current-release.txt"
grep -q -- '--no-deps --no-build --pull never ideathon-web' "$MOCK_LOG"
rm "$t/state/ideathon.override.yaml"
: > "$MOCK_LOG"
export MOCK_FAIL=1
if bash "$t/release.sh" "$sha $digest"; then echo 'FAIL: rollback was not triggered'; exit 1; fi
grep -q 'image: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"' "$t/state/ideathon.override.yaml"
test "$(grep -c ' up -d --no-deps --no-build --pull never ideathon-web' "$MOCK_LOG")" = 2
echo 'PASS: isolated success and rollback simulations'
