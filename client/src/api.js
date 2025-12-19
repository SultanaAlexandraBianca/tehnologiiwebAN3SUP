const API_URL = "http://localhost:4000";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  register: (email, password) =>
    request("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password }) }),

  login: (email, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  createSearch: (query) =>
    request("/api/searches", { method: "POST", body: JSON.stringify({ query }) }),

  listSearches: () => request("/api/searches"),

  getSearch: (id) => request(`/api/searches/${id}`),

  updateSearch: (id, query) =>
    request(`/api/searches/${id}`, { method: "PUT", body: JSON.stringify({ query }) }),

  deleteSearch: (id) => request(`/api/searches/${id}`, { method: "DELETE" })
};
