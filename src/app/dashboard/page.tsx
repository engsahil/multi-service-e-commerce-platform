import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { DashboardView } from "@/components/dashboard-view";
import { getCurrentUser } from "@/lib/auth";
import { getOrdersWithDetails } from "@/lib/data";

export const metadata: Metadata = { title: "My dashboard" };
export const dynamic = "force-dynamic";
export default async function DashboardPage() { const user = await getCurrentUser(); if (!user) redirect("/login?next=/dashboard"); if (user.role === "admin") redirect("/admin"); const [orderData, notes] = await Promise.all([getOrdersWithDetails(user.id), db.select().from(notifications).where(eq(notifications.userId, user.id)).orderBy(desc(notifications.createdAt)).limit(20)]); await db.update(notifications).set({ read: true }).where(eq(notifications.userId, user.id)); return <DashboardView name={user.name} userId={user.id} orders={orderData} notifications={notes}/>; }