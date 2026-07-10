import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";

const COOKIE_NAME = "msit_session";
const SESSION_DAYS = 30;

export function hashToken(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function makeToken() {
  return randomBytes(32).toString("hex");
}

export async function createSession(userId: string) {
  const token = makeToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
  await db.insert(sessions).values({ userId, tokenHash: hashToken(token), expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
  cookieStore.set(COOKIE_NAME, "", { httpOnly: true, path: "/", expires: new Date(0) });
}

export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const rows = await db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role, image: users.image, emailVerified: users.emailVerified })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, hashToken(token)), gt(sessions.expiresAt, new Date())))
    .limit(1);
  return rows[0] ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("FORBIDDEN");
  return user;
}

export function adminRoleFor(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return adminEmail && email.toLowerCase() === adminEmail ? "admin" : "customer";
}
