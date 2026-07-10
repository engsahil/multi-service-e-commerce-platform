import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { hashToken, makeToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  const email = String((await request.json()).email ?? "").trim().toLowerCase();
  const [user] = await db.select({ id: users.id, name: users.name, email: users.email }).from(users).where(eq(users.email, email)).limit(1);
  let devResetUrl: string | undefined;
  if (user) {
    const token = makeToken();
    await db.insert(passwordResetTokens).values({ userId: user.id, tokenHash: hashToken(token), expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const url = `${origin}/reset-password?token=${token}`;
    await sendEmail({ to: user.email, subject: "Reset your Mr. Sahil IT password", html: `<div style="font-family:Arial,sans-serif"><h2>Mr. Sahil IT</h2><p>Hello ${user.name},</p><p>Your password reset link is valid for one hour.</p><p><a href="${url}">Reset password</a></p><p>If you did not request this, ignore this email.</p></div>` }).catch(console.error);
    if (process.env.NODE_ENV !== "production") devResetUrl = url;
  }
  return NextResponse.json({ ok: true, message: "If an account exists, a reset link has been sent.", devResetUrl });
}