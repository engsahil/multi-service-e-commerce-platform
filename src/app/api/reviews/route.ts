import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { orderItems, orders, reviews } from "@/db/schema";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await requireUser(); const body = await request.json(); const orderId = String(body.orderId ?? ""); const serviceId = String(body.serviceId ?? ""); const rating = Number(body.rating); const comment = String(body.comment ?? "").trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || comment.length < 10 || comment.length > 1500) return NextResponse.json({ error: "Add a 1–5 rating and a review of at least 10 characters." }, { status: 400 });
    const [eligible] = await db.select({ itemId: orderItems.id }).from(orders).innerJoin(orderItems, eq(orders.id, orderItems.orderId)).where(and(eq(orders.id, orderId), eq(orders.userId, user.id), eq(orders.status, "delivered"), eq(orderItems.serviceId, serviceId))).limit(1);
    if (!eligible) return NextResponse.json({ error: "Only clients with a delivered order can review this service." }, { status: 403 });
    await db.insert(reviews).values({ orderId, serviceId, userId: user.id, rating, comment });
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error && error.message.includes("unique") ? "You already reviewed this service for this order." : "Could not save this review." }, { status: 400 }); }
}