import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { decodeJwtPayload } from "./auth";

const AuthContext = createContext(null);

const TOKEN_KEY = "dsw_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => decodeJwtPayload(token));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);

    setUser(decodeJwtPayload(token));
  }, [token]);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await api.login({ email, password });
      setToken(result.token);
      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken("");
  }, []);

  const refreshMe = useCallback(async () => {
    if (!token) return null;
    const me = await api.me({ token });
    return me;
  }, [token]);

  const value = useMemo(
    () => ({ token, user, loading, login, logout, refreshMe }),
    [token, user, loading, login, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
