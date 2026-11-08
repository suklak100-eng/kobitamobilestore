#!/bin/zsh

PROJECT_DIR="${0:A:h}"
cd "$PROJECT_DIR" || exit 1

SITE_URL="http://127.0.0.1:4173/"

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Node.js 20 or newer is needed to run this website."
  echo "Opening the official Node.js download page..."
  open "https://nodejs.org/en/download"
  echo "Install the macOS LTS version, then double-click this file again."
  read "REPLY?Press Return to close this window. "
  exit 1
fi

if /usr/bin/curl --silent --fail "$SITE_URL" >/dev/null 2>&1; then
  open "$SITE_URL"
  exit 0
fi

npm run dev &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null' EXIT INT TERM

for attempt in {1..40}; do
  if /usr/bin/curl --silent --fail "$SITE_URL" >/dev/null 2>&1; then
    open "$SITE_URL"
    echo "KABITA website is open in your browser. Leave this window open while using it."
    echo "Press Control+C here to stop the website."
    wait "$SERVER_PID"
    exit $?
  fi
  sleep 0.5
done

echo "The local website did not start. Please share the message shown above."
wait "$SERVER_PID"
