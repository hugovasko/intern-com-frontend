// src/components/layouts/RootLayout.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export function RootLayout() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Toaster />
    </AuthProvider>
  );
}
