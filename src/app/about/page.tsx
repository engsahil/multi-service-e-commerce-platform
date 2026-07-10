import type { Metadata } from "next";
import { AboutContent } from "@/components/public-pages";
export const metadata: Metadata = { title: "About", description: "The honest, transparent approach behind Mr. Sahil IT." };
export default function AboutPage() { return <AboutContent/>; }