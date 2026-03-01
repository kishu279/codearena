import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// import { findUserByEmail } from "@/lib/db";  // ← uncomment when DB is ready
import { getAuthUser } from "@/lib/mock-data";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const email = String(body.email ?? "").trim();
        const password = String(body.password ?? "");

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        // const user = await findUserByEmail(email);  // ← uncomment when DB is ready
        const user = getAuthUser(email);

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 401 });
        }

        if (password !== user.password) {
            return NextResponse.json({ error: "Invalid password." }, { status: 401 });
        }

        const cookieStore = await cookies();
        cookieStore.set("codearena_session", JSON.stringify({
            id: user.id,
            name: user.username,
            email: user.email,
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return NextResponse.json({
            ok: true,
            user: { id: user.id, name: user.username, email: user.email },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
