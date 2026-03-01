"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl justify-center px-4 py-14 sm:px-6">
      <Card className="w-full max-w-md rounded-2xl bg-surface">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-foreground">Login to CodeArena</h1>
          <p className="mt-2 text-sm text-text-secondary">Use your username or email and password.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-username" className="text-text-secondary">Username or email</Label>
              <Input
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-surface-2"
                placeholder="sourav or sourav@codearena.dev"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-text-secondary">Password</Label>
              <Input
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-surface-2"
                placeholder="password123"
                required
              />
            </div>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-text-secondary">
            New here?{" "}
            <Link href="/auth/signup" className="text-accent hover:underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
