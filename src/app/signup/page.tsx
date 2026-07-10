import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Create account" };
export default async function SignupPage() { const user = await getCurrentUser(); if (user) redirect(user.role === "admin" ? "/admin" : "/dashboard"); return <Suspense><AuthForm mode="signup" googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)}/></Suspense>; }