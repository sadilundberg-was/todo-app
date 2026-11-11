"use client";

import { createContext, useState } from "react";
import { findMockUser } from "@/features/auth/mockUsers";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [clientId, setClientId] = useState(null);
  const [user, setUser] = useState(null);

  function login(nextClientId, userId) {
    const next = findMockUser(nextClientId, userId);
    if (!next) return false;
    setClientId(nextClientId);
    setUser(next);
    return true;
  }

  function logout() {
    setClientId(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        clientId,
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
