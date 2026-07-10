import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { adminRoleFor, createSession } from "@/lib/auth";
import { safeRedirect } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  const role = adminRoleFor(email);
  if (role === "admin" && user.role !== "admin") await db.update(users).set({ role: "admin", updatedAt: new Date() }).where(eq(users.id, user.id));
  await createSession(user.id);
  return NextResponse.json({ ok: true, redirect: safeRedirect(body.next, role === "admin" ? "/admin" : "/dashboard") });
}