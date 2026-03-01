"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";

type NavbarProps = {
  isAuthenticated?: boolean;
  username?: string;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/contests", label: "Contests" },
  { href: "/code", label: "Code" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function Navbar({
  isAuthenticated = false,
  username,
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          CodeArena
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          Menu
        </Button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition ${isActive
                  ? "text-accent"
                  : "text-text-secondary hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link
                href={`/${username}/dashboard`}
                className="rounded-md px-3 py-2 text-sm text-text-secondary hover:text-foreground"
              >
                {username}
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { window.location.href = "/"; }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-md px-3 py-2 text-sm text-text-secondary hover:text-foreground"
              >
                Login
              </Link>
              <Button asChild>
                <Link href="/auth/signup">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {isOpen ? (
        <div className="space-y-1 border-t border-border px-4 py-3 md:hidden">
          <div className="mb-2">
            <ThemeToggle />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-2 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                href={`/${username}/dashboard`}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-2 hover:text-foreground"
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => { window.location.href = "/"; }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface-2 hover:text-foreground"
              >
                Login
              </Link>
              <Button asChild className="w-full">
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      ) : null}
    </header>
  );
}
