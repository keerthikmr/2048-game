const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function ping() {
  const res = await fetch(`${API_URL}/ping`);
  return res.json();
}

export async function startGame(size: number) {
    const res = await fetch(`${API_URL}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size }),
    });
    return res.json();
}

export async function makeMove(gameId: string, direction: string, board: number[][]) {
  const res = await fetch(`${API_URL}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_id: gameId, direction, board }),
  });
  return res.json();
}