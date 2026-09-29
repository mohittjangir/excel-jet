"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PRESET_USERS: Record<string, { pass: string; user: User }> = {
  "admin@warehouse.com": {
    pass: "Admin@123456",
    user: { id: "u-admin", name: "Admin Manager", email: "admin@warehouse.com", role: "ADMIN" }
  },
  "rahul@warehouse.com": {
    pass: "Staff@123456",
    user: { id: "u-staff", name: "Rahul Sharma", email: "rahul@warehouse.com", role: "STAFF" }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("exceljet_wms_user");
    const isLoggedOut = localStorage.getItem("exceljet_wms_logged_out");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("exceljet_wms_user");
      }
    } else if (!isLoggedOut) {
      // First visit default to Admin
      const defaultUser = PRESET_USERS["admin@warehouse.com"].user;
      setUser(defaultUser);
      localStorage.setItem("exceljet_wms_user", JSON.stringify(defaultUser));
    }
  }, []);

  const login = (email: string, pass: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const preset = PRESET_USERS[trimmedEmail];

    let loggedInUser: User;

    if (preset) {
      if (preset.pass === pass) {
        loggedInUser = preset.user;
      } else {
        return { success: false, error: "Invalid password for this account." };
      }
    } else {
      if (!trimmedEmail || !pass) {
        return { success: false, error: "Please provide both email and password." };
      }
      loggedInUser = {
        id: `u-${Date.now()}`,
        name: trimmedEmail.split("@")[0].toUpperCase(),
        email: trimmedEmail,
        role: trimmedEmail.includes("admin") ? "ADMIN" : "STAFF"
      };
    }

    setUser(loggedInUser);
    localStorage.setItem("exceljet_wms_user", JSON.stringify(loggedInUser));
    localStorage.removeItem("exceljet_wms_logged_out");
    setIsLoginModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("exceljet_wms_user");
    localStorage.setItem("exceljet_wms_logged_out", "true");
    setIsLoginModalOpen(true);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider value={{ user: mounted ? user : null, login, logout, isLoginModalOpen, openLoginModal, closeLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
