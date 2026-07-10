import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orderFiles, orders } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { loadLocalFile } from "@/lib/storage";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(); const { id } = await params;
    const [record] = await db.select({ file: orderFiles, ownerId: orders.userId }).from(orderFiles).innerJoin(orders, eq(orderFiles.orderId, orders.id)).where(eq(orderFiles.id, id)).limit(1);
    if (!record || user.role !== "admin" && record.ownerId !== user.id) return new Response("Not found", { status: 404 });
    const data = record.file.remoteUrl ? Buffer.from(await (await fetch(record.file.remoteUrl)).arrayBuffer()) : await loadLocalFile(record.file.storageKey);
    const filename = record.file.originalName.replace(/["\r\n]/g, "_");
    return new Response(data, { headers: { "Content-Type": record.file.mimeType, "Content-Length": String(data.length), "Content-Disposition": `attachment; filename="${filename}"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response("Unauthorized", { status: 401 }); }
}