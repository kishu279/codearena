import { NextResponse } from "next/server";

// import { createUser } from "@/lib/db";  // ← uncomment when DB is ready
import { createMockUser } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username ?? "").trim();
    const email = String(body.email ?? "").trim();
    const password = String(body.password ?? "");

    if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Email is invalid." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    // await createUser(username, email, "");  // ← uncomment when DB is ready
    const result = createMockUser({ username, email, password });

    if (!result.ok) {
      return NextResponse.json({ error: result.reason }, { status: 409 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Failed to create account." }, { status: 500 });
  }
}
