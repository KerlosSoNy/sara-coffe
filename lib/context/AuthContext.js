"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, loginUser } from "@/lib/woocommerce";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email, phone }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load from localStorage
  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        try {
          const profile = await getUserProfile(storedToken);
          setToken(storedToken);
          setUser(profile);
        } catch (err) {
          console.error("Auth load error:", err);
          logout();
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (token) => {
    try {
      const profile = await getUserProfile(token);
      setToken(token);
      setUser(profile);
      localStorage.setItem("authToken", token);
    } catch (err) {
      console.error("Login failed:", err);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    router.push("/user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
