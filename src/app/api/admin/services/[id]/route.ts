import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(); const { id } = await params; const body = await request.json();
    const rawPrice = String(body.pricePkr ?? "").trim(); const pricePkr = rawPrice === "" ? null : Number(rawPrice);
    if (pricePkr !== null && (!Number.isInteger(pricePkr) || pricePkr < 0 || pricePkr > 100000000)) return NextResponse.json({ error: "Enter a valid whole PKR price." }, { status: 400 });
    const gallery = String(body.gallery ?? "").split(/[,\n]/).map((value) => value.trim()).filter((value) => /^https:\/\//.test(value)).slice(0, 20);
    await db.update(services).set({ pricePkr, priceLabel: String(body.priceLabel ?? "Starting from").trim().slice(0, 80), deliveryEn: String(body.deliveryEn ?? "Based on scope").trim().slice(0, 100), deliveryUr: String(body.deliveryUr ?? "کام کے مطابق").trim().slice(0, 100), active: Boolean(body.active), featured: Boolean(body.featured), gallery, updatedAt: new Date() }).where(eq(services.id, id));
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Administrator access required." }, { status: 403 }); }
}