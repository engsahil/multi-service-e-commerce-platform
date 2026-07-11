import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { AppProviders } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Servixa — Digital & Tech Services",
    template: "%s | Servixa",
  },
  description:
    "Genuine digital services, custom development, creative work, and practical tech support with clear order tracking.",
  keywords: [
    "Servixa",
    "web development",
    "photo editing",
    "video editing",
    "app development",
    "Windows installation Pakistan",
  ],
  openGraph: {
    title: "Servixa",
    description: "Real work. Clear process.",
    type: "website",
    locale: "en_PK",
  },
};

// Set your WhatsApp number here (country code, no +, no spaces, no dashes)
const WHATSAPP_NUMBER = "923258104093";
const WHATSAPP_MESSAGE = "Hi Servixa! I'd like to know more about your services.";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders user={user}>
          <Header />
          <main>{children}</main>
          <Footer />

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
          </Link>
        </AppProviders>
      </body>
    </html>
  );
}
