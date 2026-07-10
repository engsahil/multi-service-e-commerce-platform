import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { AppProviders } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: { default: "Mr. Sahil IT — Digital & Tech Services", template: "%s | Mr. Sahil IT" },
  description: "Genuine digital services, custom development, creative work, and practical tech support with clear order tracking.",
  keywords: ["Mr. Sahil IT", "web development", "photo editing", "video editing", "app development", "Windows installation Pakistan"],
  openGraph: { title: "Mr. Sahil IT", description: "Real work. Clear process.", type: "website", locale: "en_PK" },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <Header user={user ? { name: user.name, role: user.role } : null} />
          <main className="page-main">{children}</main>
          <Footer email={process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.ADMIN_EMAIL || ""} whatsapp={process.env.NEXT_PUBLIC_WHATSAPP_URL} instagram={process.env.NEXT_PUBLIC_INSTAGRAM_URL} />
        </AppProviders>
      </body>
    </html>
  );
}