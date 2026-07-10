import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { contactRequests, orders, users } from "@/db/schema";
import { AdminView } from "@/components/admin-view";
import { getCurrentUser } from "@/lib/auth";
import { getServices } from "@/lib/catalog";
import { getOrdersWithDetails } from "@/lib/data";

export const metadata: Metadata = { title: "Admin dashboard" };
export const dynamic = "force-dynamic";
export default async function AdminPage() { const user = await getCurrentUser(); if (!user) redirect("/login?next=/admin"); if (user.role !== "admin") redirect("/dashboard"); const [orderData, serviceData, contacts, customerRows, revenueRows] = await Promise.all([getOrdersWithDetails(), getServices(true), db.select().from(contactRequests).orderBy(desc(contactRequests.createdAt)), db.select({ count: sql<number>`count(*)::int` }).from(users).where(eq(users.role, "customer")), db.select({ total: sql<number>`coalesce(sum(${orders.totalPkr}), 0)::int` }).from(orders).where(eq(orders.paymentStatus, "paid"))]); return <AdminView name={user.name} orders={orderData} services={serviceData} contacts={contacts} customerCount={customerRows[0]?.count ?? 0} paidRevenue={revenueRows[0]?.total ?? 0}/>; }