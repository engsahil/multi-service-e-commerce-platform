import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { messages, notifications, orders, users } from "@/db/schema";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(); const { id } = await params; const body = String((await request.json()).body ?? "").trim();
    if (!body || body.length > 3000) return NextResponse.json({ error: "Message must be 1–3000 characters." }, { status: 400 });
    const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    if (!order || user.role !== "admin" && order.userId !== user.id) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    await db.insert(messages).values({ orderId: id, senderId: user.id, body });
    if (user.role === "admin") await db.insert(notifications).values({ userId: order.userId, title: "New message from Sahil", message: `There is a new message on ${order.orderNumber}.`, href: "/dashboard" });
    else { const [admin] = await db.select({ id: users.id }).from(users).where(eq(users.role, "admin")).limit(1); if (admin) await db.insert(notifications).values({ userId: admin.id, title: "New client message", message: `${order.orderNumber} has a new message.`, href: "/admin" }); }
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Please sign in." }, { status: 401 }); }
}