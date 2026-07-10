"use client";

import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export function ForgotForm() {
  const [loading, setLoading] = useState(false); const [message, setMessage] = useState(""); const [devUrl, setDevUrl] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); const email = String(new FormData(event.currentTarget).get("email")); const response = await fetch("/api/auth/forgot", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); const data = await response.json(); setMessage(data.message); setDevUrl(data.devResetUrl || ""); setLoading(false); }
  return <RecoveryShell title="Reset your password" text="Enter your account email. If it matches an account, we’ll send a secure one-hour reset link."><form onSubmit={submit} className="auth-form"><div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" name="email" required autoComplete="email"/></div>{message && <div className="form-success">{message}</div>}{devUrl && <a className="dev-link" href={devUrl}>Open local development reset link</a>}<button className="button button-accent" disabled={loading}>{loading && <LoaderCircle className="spin" size={17}/>}Send reset link</button></form></RecoveryShell>;
}

export function ResetForm() {
  const token = useSearchParams().get("token") || ""; const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const password = String(new FormData(event.currentTarget).get("password")); const response = await fetch("/api/auth/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) }); const data = await response.json(); if (!response.ok) { setError(data.error); setLoading(false); return; } setSuccess(true); }
  return <RecoveryShell title="Choose a new password" text="Use at least eight characters and avoid reusing a password from another site.">{success ? <div><div className="form-success">Your password has been updated.</div><Link className="button button-accent recovery-login" href="/login">Continue to login</Link></div> : <form onSubmit={submit} className="auth-form"><div className="field"><label htmlFor="password">New password</label><input id="password" type="password" name="password" required minLength={8} autoComplete="new-password"/></div>{error && <div className="form-error">{error}</div>}<button className="button button-accent" disabled={loading || !token}>{loading && <LoaderCircle className="spin" size={17}/>}Update password</button></form>}</RecoveryShell>;
}

function RecoveryShell({ title, text, children }: { title: string; text: string; children: React.ReactNode }) { return <section className="recovery-page"><div className="form-card recovery-card"><Link href="/login" className="back-link"><ArrowLeft size={16}/> Back to login</Link><p className="eyebrow">Account recovery</p><h1>{title}</h1><p className="muted">{text}</p>{children}</div></section>; }
