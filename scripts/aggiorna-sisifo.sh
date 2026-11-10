#!/bin/sh
# Copia la demo a file unico di Sisifo (~/sisifo/dist-demo/index.html) in sisifo/index.html,
# aggiungendo icona e anteprima per i link condivisi. Da rilanciare a ogni nuova versione.
set -eu
cd "$(dirname "$0")/.."
SRC="${1:-$HOME/sisifo/dist-demo/index.html}"
SHOTS="${2:-$HOME/sisifo/reports/visual}"
mkdir -p sisifo assets
# Screenshot del gioco usati dalla scheda nel sito e dall'anteprima dei link.
cp "$SHOTS/desktop-fulmine-vetrina.jpg" assets/sisifo-desktop.jpg
cp "$SHOTS/mobile-gioco.jpg" assets/sisifo-phone.jpg
python3 -I - "$SRC" sisifo/index.html <<'EOF'
import sys
src, dst = sys.argv[1], sys.argv[2]
html = open(src, encoding="utf-8").read()
title = "<title>L'Ascesa di Sisifo — demo</title>"
assert html.count(title) == 1, "titolo non trovato o duplicato"
meta = title + """
  <meta name="description" content="Demo a crediti simulati de L’Ascesa di Sisifo: High-Low di carte con scalata, Totem, Fulmine ed Eclissi. Un progetto TRIA." />
  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <link rel="canonical" href="https://tria.playgroundai.space/sisifo/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="TRIA" />
  <meta property="og:title" content="L’Ascesa di Sisifo — demo" />
  <meta property="og:description" content="High-Low di carte con scalata. Demo a crediti simulati, nessun denaro reale." />
  <meta property="og:url" content="https://tria.playgroundai.space/sisifo/" />
  <meta property="og:image" content="https://tria.playgroundai.space/assets/sisifo-desktop.jpg" />
  <meta name="twitter:card" content="summary_large_image" />"""
open(dst, "w", encoding="utf-8").write(html.replace(title, meta))
EOF
echo "sisifo/index.html aggiornato da $SRC"
