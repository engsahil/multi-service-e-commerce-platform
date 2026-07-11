import type { Metadata } from "next";
import { AboutContent } from "@/components/public-pages";
export const metadata: Metadata = { title: "About", description: "The honest, transparent approach behind Servixa." };
export default function AboutPage() { return <AboutContent/>; }