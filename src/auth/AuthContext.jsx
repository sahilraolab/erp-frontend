import { createContext, useContext, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("erp_user"))
  );

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
      await api.request("/auth/logout", {
        method: "POST",
      });
    } catch (e) {
      // ignore error (token might already be expired)
    } finally {
      api.setToken(null);
      localStorage.removeItem("erp_user");
      setUser(null);
    }
  };

  const can = (permission) => user?.permissions?.includes(permission);

  return (
    <AuthContext.Provider value={{ user, login, logout, can }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
