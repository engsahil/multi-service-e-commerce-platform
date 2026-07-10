import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout-form";
import { getCurrentUser } from "@/lib/auth";
export const metadata: Metadata = { title: "Checkout" };
export default async function CheckoutPage() { const user = await getCurrentUser(); if (!user) redirect("/login?next=/checkout"); return <CheckoutForm user={{ name: user.name, email: user.email }} stripe={Boolean(process.env.STRIPE_SECRET_KEY)} paypal={Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET && process.env.PAYPAL_PKR_PER_USD)} jazzcash={process.env.NEXT_PUBLIC_JAZZCASH_ACCOUNT} easypaisa={process.env.NEXT_PUBLIC_EASYPAISA_ACCOUNT}/>; }