import type { Metadata } from "next";
import { LegalContent } from "@/components/public-pages";
export const metadata: Metadata = { title: "Privacy policy" };
export default function PrivacyPage() { return <LegalContent type="privacy"/>; }