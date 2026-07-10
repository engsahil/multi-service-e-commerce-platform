import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { notifications, orders } from "@/db/schema";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET; const key = process.env.STRIPE_SECRET_KEY; const signature = request.headers.get("stripe-signature");
  if (!secret || !key || !signature) return new Response("Not configured", { status: 400 });
  let event: Stripe.Event;
  try { event = new Stripe(key).webhooks.constructEvent(await request.text(), signature, secret); } catch { return new Response("Invalid signature", { status: 400 }); }
  if (event.type === "checkout.session.completed") { const session = event.data.object; const orderId = session.metadata?.orderId; if (orderId) { const [order] = await db.update(orders).set({ paymentStatus: "paid", updatedAt: new Date() }).where(eq(orders.id, orderId)).returning(); if (order) await db.insert(notifications).values({ userId: order.userId, title: "Payment confirmed", message: `Payment for ${order.orderNumber} was confirmed.`, href: "/dashboard" }); } }
  return Response.json({ received: true });
}