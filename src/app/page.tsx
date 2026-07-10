import { getServices } from "@/lib/catalog";
import { HomeContent } from "@/components/home-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const services = await getServices();
  return <HomeContent services={services} />;
}