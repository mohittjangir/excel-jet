"use client";

import { AuthProvider } from "@/context/AuthContext";
import SimpleLoginModal from "./SimpleLoginModal";

export default function CustomAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <SimpleLoginModal />
    </AuthProvider>
  );
}
