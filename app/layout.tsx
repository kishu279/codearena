import type { Metadata } from "next";
import { cookies } from "next/headers";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "CodeArena",
  description: "Master DSA & competitive programming with contests and leaderboards.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get("codearena_session");

  let session = null;
  try {
    session = sessionCookie ? JSON.parse(sessionCookie.value) : null;
  } catch {
    session = null;
  }

  return (
    <html lang="en" data-theme="vscode-dark">
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar isAuthenticated={!!session} username={session?.name} />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
