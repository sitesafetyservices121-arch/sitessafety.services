{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  name = "studio-dev";

  buildInputs = [
    pkgs.nodejs_20
    pkgs.sudo
    pkgs.glib
    pkgs.xorg.libXrandr
    pkgs.playwright
    pkgs.git
    pkgs.python3
    pkgs.firebase-tools
    pkgs.openssl
    pkgs.pkg-config
    pkgs.cairo
    pkgs.pango
    pkgs.gtk3
    pkgs.atk
    pkgs.libffi
  ];

  shellHook = ''
    echo "🧩 Studio dev shell ready."
    echo "Node: $(node -v)"
    echo "npm:  $(npm -v)"
    echo "Python: $(python3 --version)"

    # ensure vercel CLI is installed globally (if not already)
    if ! command -v vercel >/dev/null 2>&1; then
      echo "Installing Vercel CLI globally..."
      npm install -g vercel
    fi
  '';
}

