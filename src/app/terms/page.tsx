import type { Metadata } from "next";
import { LegalContent } from "@/components/public-pages";
export const metadata: Metadata = { title: "Terms of service" };
export default function TermsPage() { return <LegalContent type="terms"/>; }