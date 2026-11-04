#!/usr/bin/env bash
set -eu
exec /usr/bin/sudo -n /usr/local/sbin/ideathon-release "${SSH_ORIGINAL_COMMAND:-}"
