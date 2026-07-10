import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, avg, eq } from "drizzle-orm";
import { db } from "@/db";
import { reviews, services, users } from "@/db/schema";
import { ensureCatalog } from "@/lib/catalog";
import { ServiceDetail } from "@/components/service-detail";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await ensureCatalog();
  const { slug } = await params;
  const [service] = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return service ? { title: service.titleEn, description: service.shortEn } : { title: "Service not found" };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  await ensureCatalog();
  const { slug } = await params;
  const [service] = await db.select().from(services).where(and(eq(services.slug, slug), eq(services.active, true))).limit(1);
  if (!service) notFound();
  const genuineReviews = await db.select({ id: reviews.id, rating: reviews.rating, comment: reviews.comment, createdAt: reviews.createdAt, userName: users.name }).from(reviews).innerJoin(users, eq(reviews.userId, users.id)).where(and(eq(reviews.serviceId, service.id), eq(reviews.approved, true)));
  const [summary] = await db.select({ average: avg(reviews.rating) }).from(reviews).where(and(eq(reviews.serviceId, service.id), eq(reviews.approved, true)));
  return <ServiceDetail service={service} reviews={genuineReviews} average={summary?.average ? Number(summary.average) : null} />;
}