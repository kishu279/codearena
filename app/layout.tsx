import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getAuthSession } from "@/lib/auth";

import "./globals.css";

export const metadata: Metadata = {
  title: "CodeArena",
  description:
    "Master DSA & competitive programming with contests and leaderboards.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <html lang="en" data-theme="vscode-dark">
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar
              isAuthenticated={!!session?.user}
              username={
                session?.user?.username ?? session?.user?.name ?? undefined
              }
            />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
