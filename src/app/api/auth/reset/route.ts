import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { hashToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const token = String(body.token ?? "");
  const password = String(body.password ?? "");
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  const [record] = await db.select().from(passwordResetTokens).where(and(eq(passwordResetTokens.tokenHash, hashToken(token)), gt(passwordResetTokens.expiresAt, new Date()), isNull(passwordResetTokens.usedAt))).limit(1);
  if (!record) return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
  await db.transaction(async (tx) => {
    await tx.update(users).set({ passwordHash: await bcrypt.hash(password, 12), updatedAt: new Date() }).where(eq(users.id, record.userId));
    await tx.update(passwordResetTokens).set({ usedAt: new Date() }).where(eq(passwordResetTokens.id, record.id));
  });
  return NextResponse.json({ ok: true });
}