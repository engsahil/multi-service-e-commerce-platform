import type { Metadata } from "next";
import { ContactContent } from "@/components/public-pages";
export const metadata: Metadata = { title: "Contact & custom request", description: "Send a project brief or request a custom service from Mr. Sahil IT." };
export default function ContactPage() { return <ContactContent email={process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.ADMIN_EMAIL || ""} whatsapp={process.env.NEXT_PUBLIC_WHATSAPP_URL}/>; }