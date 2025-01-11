// src/components/layouts/RootLayout.tsx
import { Outlet, ScrollRestoration } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

export function RootLayout() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
        <ScrollRestoration />
      </ThemeProvider>
    </>
  );
}
