#!/bin/bash
# CityStore — abre o site no navegador com o servidor de desenvolvimento.
# Basta dar duplo clique neste arquivo no Finder.

cd "$(dirname "$0")" || exit 1

pause_and_exit() {
  echo
  read -n 1 -s -r -p "Pressione qualquer tecla para fechar..."
  echo
  exit "${1:-1}"
}

if ! command -v npm >/dev/null 2>&1; then
  echo "ERRO: Node.js/npm não encontrado."
  echo "Instale em https://nodejs.org e tente novamente."
  pause_and_exit 1
fi

if [ ! -d node_modules ]; then
  echo "Instalando dependências (só na primeira vez)..."
  npm install --no-fund --no-audit || pause_and_exit 1
fi

# Procura uma porta livre a partir de 5199
PORT=5199
while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  if [ "$PORT" -gt 5210 ]; then
    echo "ERRO: Não encontrei uma porta livre entre 5199 e 5210."
    pause_and_exit 1
  fi
done

URL="http://localhost:$PORT"

echo "Iniciando CityStore em $URL"
echo "   Feche esta janela ou pressione Ctrl+C para parar o servidor."
echo

./node_modules/.bin/vite --port "$PORT" --strictPort &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" 2>/dev/null
  wait "$SERVER_PID" 2>/dev/null
}
trap cleanup EXIT INT TERM HUP

# Espera o servidor responder antes de abrir o navegador
for _ in $(seq 1 60); do
  if curl -s -o /dev/null "$URL"; then
    break
  fi

  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "ERRO: O servidor encerrou antes de iniciar."
    pause_and_exit 1
  fi

  sleep 0.5
done

# CITYSTORE_NO_OPEN=1 permite testar o script sem abrir o navegador
if [ "${CITYSTORE_NO_OPEN:-0}" != "1" ]; then
  open "$URL"
fi

wait "$SERVER_PID"
