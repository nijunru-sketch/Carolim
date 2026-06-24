#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

: "${SERVER_HOST:?SERVER_HOST is required}"
: "${SERVER_USER:?SERVER_USER is required}"
TARGET_DIR="${TARGET_DIR:-/var/www/junru-portfolio}"
SSH_KEY="${SSH_KEY:-}"

SSH_ARGS=()
if [[ -n "$SSH_KEY" ]]; then
  SSH_ARGS+=(-i "$SSH_KEY")
fi

RUNTIME_FILES=(
  "index.html"
  "styles.css"
  "main.js"
  "career-exory.html"
  "career-exory.js"
  "career-moody.html"
  "career-zuijiao.html"
  "whyme.html"
  "whyme-detail.html"
  "why-cork.html"
  "why-cork-section.css"
  "why-cork-section.js"
  "contact.html"
  "assets"
)

TMP_MANIFEST="$(mktemp)"
trap 'rm -f "$TMP_MANIFEST"' EXIT

cd "$ROOT_DIR"
printf "%s\n" "${RUNTIME_FILES[@]}" > "$TMP_MANIFEST"

ssh "${SSH_ARGS[@]}" "${SERVER_USER}@${SERVER_HOST}" "mkdir -p '${TARGET_DIR}'"

rsync -av --delete \
  -e "ssh ${SSH_ARGS[*]:-}" \
  --files-from="$TMP_MANIFEST" \
  "$ROOT_DIR/" \
  "${SERVER_USER}@${SERVER_HOST}:${TARGET_DIR}/"

echo "Published static site to ${SERVER_USER}@${SERVER_HOST}:${TARGET_DIR}"
