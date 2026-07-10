import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { notifications, orders } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { sendEmail, statusEmail } from "@/lib/email";

const validStatuses = ["pending", "in_progress", "delivered", "cancelled"];
const validPayment = ["unpaid", "payment_pending", "verification_pending", "paid", "failed", "refunded"];
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(); const { id } = await params; const body = await request.json(); const status = String(body.status ?? ""); const paymentStatus = String(body.paymentStatus ?? "");
    if (!validStatuses.includes(status) || !validPayment.includes(paymentStatus)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    const [previous] = await db.select().from(orders).where(eq(orders.id, id)).limit(1); if (!previous) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    const [order] = await db.update(orders).set({ status, paymentStatus, adminNotes: String(body.adminNotes ?? "").trim() || null, updatedAt: new Date() }).where(eq(orders.id, id)).returning();
    if (previous.status !== status) { await db.insert(notifications).values({ userId: order.userId, title: "Order status updated", message: `${order.orderNumber} is now ${status.replaceAll("_", " ")}.`, href: "/dashboard" }); await sendEmail({ to: order.customerEmail, subject: `${order.orderNumber} status update`, html: statusEmail(order.customerName, order.orderNumber, status) }).catch(console.error); }
    if (previous.paymentStatus !== paymentStatus) await db.insert(notifications).values({ userId: order.userId, title: "Payment status updated", message: `Payment for ${order.orderNumber} is now ${paymentStatus.replaceAll("_", " ")}.`, href: "/dashboard" });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Administrator access required." }, { status: 403 }); }
}