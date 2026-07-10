import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { notifications, orderFiles, orders } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { storeFile } from "@/lib/storage";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(); const { id } = await params;
    const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    if (!order || user.role !== "admin" && order.userId !== user.id) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    const form = await request.formData(); const file = form.get("file"); const requestedKind = String(form.get("kind") ?? "reference"); const kind = user.role === "admin" && requestedKind === "deliverable" ? "deliverable" : "reference";
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file." }, { status: 400 });
    const stored = await storeFile(file);
    await db.insert(orderFiles).values({ orderId: id, uploadedBy: user.id, kind, originalName: file.name.slice(0, 255), mimeType: file.type || "application/octet-stream", size: stored.size, storageKey: stored.storageKey, remoteUrl: stored.remoteUrl });
    if (kind === "deliverable") await db.insert(notifications).values({ userId: order.userId, title: "New deliverable", message: `A file is ready on ${order.orderNumber}.`, href: "/dashboard" });
    return NextResponse.json({ ok: true });
  } catch (error) { const message = error instanceof Error ? error.message : "Upload failed"; return NextResponse.json({ error: message }, { status: message === "UNAUTHORIZED" ? 401 : 400 }); }
}