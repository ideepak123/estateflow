/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { login as loginRequest } from "../services/authService";

const AuthContext = createContext(null);

// The backend JWT only carries the user's email in its "sub" claim.
// We decode that client-side so the UI has something to display
// without needing a new backend endpoint.
function decodeEmailFromToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded.sub || null;
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (!decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [email, setEmail] = useState(() => {
    const existing = localStorage.getItem("token");
    return existing ? decodeEmailFromToken(existing) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = localStorage.getItem("token");
    if (existing && isTokenExpired(existing)) {
      localStorage.removeItem("token");
      queueMicrotask(() => {
        setToken(null);
        setEmail(null);
      });
    }
    queueMicrotask(() => setLoading(false));
  }, []);

  const login = useCallback(async (loginEmail, password) => {
    const response = await loginRequest(loginEmail, password);
    localStorage.setItem("token", response.token);
    setToken(response.token);
    setEmail(decodeEmailFromToken(response.token));
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setEmail(null);
  }, []);

  const value = {
    token,
    email,
    isAuthenticated: Boolean(token),
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
