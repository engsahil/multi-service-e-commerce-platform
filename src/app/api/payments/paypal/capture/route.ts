import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { notifications, orders } from "@/db/schema";
import { capturePayPalOrder } from "@/lib/paypal";

export async function GET(request: Request) {
  const url = new URL(request.url); const orderId = url.searchParams.get("orderId"); const token = url.searchParams.get("token");
  if (!orderId || !token) return NextResponse.redirect(new URL("/dashboard?payment=failed", request.url));
  const [order] = await db.select().from(orders).where(and(eq(orders.id, orderId), eq(orders.externalPaymentId, token), eq(orders.paymentProvider, "paypal"))).limit(1);
  if (!order) return NextResponse.redirect(new URL("/dashboard?payment=failed", request.url));
  try { const result = await capturePayPalOrder(token); if (result.status === "COMPLETED") { await db.update(orders).set({ paymentStatus: "paid", updatedAt: new Date() }).where(eq(orders.id, order.id)); await db.insert(notifications).values({ userId: order.userId, title: "Payment confirmed", message: `Payment for ${order.orderNumber} was confirmed.`, href: "/dashboard" }); return NextResponse.redirect(new URL("/dashboard?payment=success", request.url)); } } catch (error) { console.error(error); }
  return NextResponse.redirect(new URL("/dashboard?payment=failed", request.url));
}