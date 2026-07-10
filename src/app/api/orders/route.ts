import { NextResponse } from "next/server";
import Stripe from "stripe";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { notifications, orderItems, orders, services } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { makeOrderNumber } from "@/lib/utils";
import { createPayPalOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const user = await requireUser(); const body = await request.json();
    const requested = Array.isArray(body.items) ? body.items.slice(0, 20) as Array<{ id: string; quantity?: number }> : [];
    const ids = requested.map((item) => String(item.id));
    if (!ids.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    const listed = await db.select().from(services).where(and(inArray(services.id, ids), eq(services.active, true)));
    if (listed.length !== new Set(ids).size) return NextResponse.json({ error: "One or more services are unavailable." }, { status: 400 });
    const hasQuote = listed.some((service) => service.pricePkr === null); const hasBooking = listed.some((service) => service.fulfillmentType === "booking");
    const total = hasQuote ? null : listed.reduce((sum, service) => sum + (service.pricePkr ?? 0) * Math.max(1, Math.min(10, requested.find((item) => item.id === service.id)?.quantity ?? 1)), 0);
    let provider = String(body.provider ?? "quote");
    if (hasQuote) provider = "quote";
    if (!["quote", "stripe", "paypal", "jazzcash", "easypaisa"].includes(provider)) return NextResponse.json({ error: "Invalid payment method." }, { status: 400 });
    if (provider === "stripe" && !process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: "Stripe is not configured." }, { status: 400 });
    if (provider === "paypal" && (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_PKR_PER_USD)) return NextResponse.json({ error: "PayPal is not configured." }, { status: 400 });
    if (provider === "jazzcash" && !process.env.NEXT_PUBLIC_JAZZCASH_ACCOUNT || provider === "easypaisa" && !process.env.NEXT_PUBLIC_EASYPAISA_ACCOUNT) return NextResponse.json({ error: "That wallet is not configured." }, { status: 400 });
    const name = String(body.name ?? "").trim(); const email = String(body.email ?? "").trim(); const notes = String(body.notes ?? "").trim();
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || notes.length < 10) return NextResponse.json({ error: "Complete your contact details and project brief." }, { status: 400 });
    let scheduledAt: Date | null = null; const mode = hasBooking ? String(body.serviceMode ?? "remote") : null; const address = hasBooking && mode === "on_site" ? String(body.address ?? "").trim() : null;
    if (hasBooking) { scheduledAt = new Date(String(body.scheduledAt ?? "")); if (Number.isNaN(scheduledAt.getTime()) || scheduledAt < new Date()) return NextResponse.json({ error: "Choose a future appointment time." }, { status: 400 }); if (mode === "on_site" && !address) return NextResponse.json({ error: "An address is required for an on-site visit." }, { status: 400 }); }
    const transactionReference = ["jazzcash", "easypaisa"].includes(provider) ? String(body.transactionReference ?? "").trim() : null;
    if (["jazzcash", "easypaisa"].includes(provider) && transactionReference!.length < 4) return NextResponse.json({ error: "Enter the wallet transaction ID." }, { status: 400 });
    const orderNumber = makeOrderNumber();
    const order = await db.transaction(async (tx) => {
      const [created] = await tx.insert(orders).values({ orderNumber, userId: user.id, status: "pending", paymentStatus: provider === "quote" ? "unpaid" : ["jazzcash", "easypaisa"].includes(provider) ? "verification_pending" : "payment_pending", paymentProvider: provider, transactionReference, subtotalPkr: total, totalPkr: total, customerName: name, customerEmail: email, customerPhone: String(body.phone ?? "").trim() || null, address, serviceMode: mode, scheduledAt, notes }).returning();
      await tx.insert(orderItems).values(listed.map((service) => ({ orderId: created.id, serviceId: service.id, title: service.titleEn, slug: service.slug, quantity: Math.max(1, Math.min(10, requested.find((item) => item.id === service.id)?.quantity ?? 1)), unitPricePkr: service.pricePkr, fulfillmentType: service.fulfillmentType })));
      await tx.insert(notifications).values({ userId: user.id, title: "Order received", message: `${orderNumber} has been created and is pending review.`, href: "/dashboard" });
      return created;
    });
    const base = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    if (provider === "stripe" && total !== null) { const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); const session = await stripe.checkout.sessions.create({ mode: "payment", customer_email: email, metadata: { orderId: order.id, orderNumber }, line_items: listed.map((service) => ({ quantity: requested.find((item) => item.id === service.id)?.quantity ?? 1, price_data: { currency: "pkr", unit_amount: service.pricePkr! * 100, product_data: { name: service.titleEn } } })), success_url: `${base}/dashboard?payment=success`, cancel_url: `${base}/checkout?payment=cancelled` }); await db.update(orders).set({ externalPaymentId: session.id }).where(eq(orders.id, order.id)); return NextResponse.json({ orderNumber, redirect: session.url }); }
    if (provider === "paypal" && total !== null) { const paypal = await createPayPalOrder(order.id, total, base); await db.update(orders).set({ externalPaymentId: paypal.id }).where(eq(orders.id, order.id)); return NextResponse.json({ orderNumber, redirect: paypal.approvalUrl }); }
    return NextResponse.json({ ok: true, orderNumber });
  } catch (error) { console.error(error); return NextResponse.json({ error: error instanceof Error && error.message === "UNAUTHORIZED" ? "Please sign in." : "Could not place the order. Please try again." }, { status: error instanceof Error && error.message === "UNAUTHORIZED" ? 401 : 500 }); }
}