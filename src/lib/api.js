const API_URL = "http://localhost:3000";

let token = localStorage.getItem("erp_token");

export const api = {
  setToken(t) {
    token = t;
    if (t) localStorage.setItem("erp_token", t);
    else localStorage.removeItem("erp_token");
  },

  async request(path, options = {}) {
    const res = await fetch(API_URL + path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  },
};
