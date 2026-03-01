"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Unable to create account.");
      setLoading(false);
      return;
    }

    setSuccess("Account created. Redirecting to login...");
    setTimeout(() => router.push("/auth/login"), 900);
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl justify-center px-4 py-14 sm:px-6">
      <Card className="w-full max-w-md rounded-2xl bg-surface">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-foreground">Create your CodeArena account</h1>
          <p className="mt-2 text-sm text-text-secondary">You can start with mock contests and stats immediately.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username" className="text-text-secondary">Username</Label>
              <Input
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-surface-2"
                placeholder="Enter username"
                minLength={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-text-secondary">Email</Label>
              <Input
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-surface-2"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-text-secondary">Password</Label>
              <Input
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-surface-2"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            {success ? <p className="text-sm text-green-300">{success}</p> : null}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
