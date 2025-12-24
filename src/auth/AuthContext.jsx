import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("erp_user"))
  );
  const [loading, setLoading] = useState(true);

  // 🔑 Restore token + sync /me on app load
  useEffect(() => {
    const token = localStorage.getItem("erp_token");
    if (token) {
      api.setToken(token);
      refreshMe();
    } else {
      setLoading(false);
    }
  }, []);

  // 🔄 Sync logged-in user from backend
  const refreshMe = async () => {
    try {
      const res = await api.request("/admin/me");

      const normalizedUser = {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role?.name,
        permissions: res.role?.permissions?.map(p => p.key) || []
      };

      localStorage.setItem("erp_user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
    } catch (err) {
      logout(); // token invalid / expired
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await api.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    api.setToken(res.token);
    localStorage.setItem("erp_user", JSON.stringify(res.user));
    setUser(res.user);
  };

  const logout = async () => {
    try {
      await api.request("/auth/logout", { method: "POST" });
    } catch (_) {}
    api.setToken(null);
    localStorage.removeItem("erp_user");
    setUser(null);
    setLoading(false);
  };

  const can = (permission) =>
    !!user && user.permissions?.includes(permission);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, can, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
