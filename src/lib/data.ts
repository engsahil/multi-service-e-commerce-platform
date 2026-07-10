import { db } from "@/db";
import { messages, orderFiles, orderItems, orders, users } from "@/db/schema";
import { asc, desc, eq, inArray } from "drizzle-orm";
import type { DashboardOrder } from "./types";

export async function getOrdersWithDetails(userId?: string): Promise<DashboardOrder[]> {
  const baseOrders = await db.select().from(orders).where(userId ? eq(orders.userId, userId) : undefined).orderBy(desc(orders.createdAt));
  if (!baseOrders.length) return [];
  const ids = baseOrders.map((order) => order.id);
  const [items, files, chats] = await Promise.all([
    db.select().from(orderItems).where(inArray(orderItems.orderId, ids)),
    db.select().from(orderFiles).where(inArray(orderFiles.orderId, ids)).orderBy(desc(orderFiles.createdAt)),
    db.select({ id: messages.id, orderId: messages.orderId, body: messages.body, senderId: messages.senderId, senderName: users.name, createdAt: messages.createdAt }).from(messages).innerJoin(users, eq(messages.senderId, users.id)).where(inArray(messages.orderId, ids)).orderBy(asc(messages.createdAt)),
  ]);
  return baseOrders.map((order) => ({
    ...order,
    items: items.filter((item) => item.orderId === order.id),
    files: files.filter((file) => file.orderId === order.id).map(({ id, originalName, kind, size, createdAt }) => ({ id, originalName, kind, size, createdAt })),
    messages: chats.filter((message) => message.orderId === order.id).map(({ id, body, senderId, senderName, createdAt }) => ({ id, body, senderId, senderName, createdAt })),
  }));
}
