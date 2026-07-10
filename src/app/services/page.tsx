import type { Metadata } from "next";
import { ServicesExplorer } from "@/components/services-explorer";
import { getServices } from "@/lib/catalog";

export const metadata: Metadata = { title: "Services", description: "Explore creative, development, writing, digital, and practical tech services." };
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  return <ServicesExplorer services={await getServices()} />;
}