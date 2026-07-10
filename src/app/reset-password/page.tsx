import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetForm } from "@/components/recovery-form";
export const metadata: Metadata = { title: "Choose new password" };
export default function ResetPasswordPage() { return <Suspense><ResetForm/></Suspense>; }