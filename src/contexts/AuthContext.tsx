// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api, { auth, auth as authApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";


export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  role: "candidate" | "partner" | "admin";
  cv?: Buffer;
  cvFileName?: string;
  cvMimeType?: string;
  phoneNumber?: string;
  createdAt: string;
  companyCoordinates?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  loginWithGitHub: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGitHub = async (code: string) => {
    try {
      
      const response = await auth.post("/auth/github/callback", { code });
  
      localStorage.setItem("token", response.data.token);
  
      
      setUser(response.data.user);
  
      navigate("/");
    } catch (error) {
      console.error("GitHub login error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem("token", response.data.access_token);
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      console.log("Register payload: ", data);
      await authApi.register(data);
      await login(data.email, data.password);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, loginWithGitHub }}>
      {children}
    </AuthContext.Provider>
  );

  
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


