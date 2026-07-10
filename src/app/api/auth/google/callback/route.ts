import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { adminRoleFor, createSession } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("google_oauth_state")?.value;
  cookieStore.delete("google_oauth_state");
  if (!code || !state || state !== expectedState) return NextResponse.redirect(new URL("/login?error=oauth_state", request.url));
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return NextResponse.redirect(new URL("/login?error=google_not_configured", request.url));
  const origin = process.env.NEXT_PUBLIC_APP_URL || url.origin;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: `${origin}/api/auth/google/callback`, grant_type: "authorization_code" }) });
  if (!tokenResponse.ok) return NextResponse.redirect(new URL("/login?error=oauth_exchange", request.url));
  const token = await tokenResponse.json() as { access_token: string };
  const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` } });
  if (!profileResponse.ok) return NextResponse.redirect(new URL("/login?error=oauth_profile", request.url));
  const profile = await profileResponse.json() as { email?: string; name?: string; picture?: string; email_verified?: boolean };
  if (!profile.email || !profile.email_verified) return NextResponse.redirect(new URL("/login?error=email_not_verified", request.url));
  const email = profile.email.toLowerCase();
  let [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const role = adminRoleFor(email);
  if (!user) [user] = await db.insert(users).values({ email, name: profile.name || "Customer", image: profile.picture, emailVerified: true, role }).returning();
  else await db.update(users).set({ image: profile.picture ?? user.image, emailVerified: true, role: role === "admin" ? "admin" : user.role, updatedAt: new Date() }).where(eq(users.id, user.id));
  await createSession(user.id);
  return NextResponse.redirect(new URL(role === "admin" ? "/admin" : "/dashboard", request.url));
}