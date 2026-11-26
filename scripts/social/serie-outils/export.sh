#!/bin/sh
# Exporte le visuel d'annonce du calendrier de l'Avent en PNG avec Chrome sans interface.
# Usage : sh scripts/social/serie-outils/export.sh
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p png
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=1 --virtual-time-budget=3000 \
  --window-size=1080,1350 --screenshot="$PWD/png/calendrier-avent.png" "file://$PWD/visuels.html" 2>/dev/null
ls -l png
