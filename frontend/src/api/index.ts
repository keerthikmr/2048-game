const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export async function ping() {
  const res = await fetch(`${API_URL}/ping`)
  return res.json()
}