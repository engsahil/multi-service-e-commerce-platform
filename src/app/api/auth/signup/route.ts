import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { adminRoleFor, createSession } from "@/lib/auth";
import { errorMessage } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    if (name.length < 2 || name.length > 120) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
    if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    const [user] = await db.insert(users).values({ name, email, passwordHash: await bcrypt.hash(password, 12), role: adminRoleFor(email) }).returning({ id: users.id });
    await createSession(user.id);
    return NextResponse.json({ ok: true, redirect: user ? "/dashboard" : "/" });
  } catch (error) {
    console.error("signup", errorMessage(error));
    return NextResponse.json({ error: "Could not create your account." }, { status: 500 });
  }
}