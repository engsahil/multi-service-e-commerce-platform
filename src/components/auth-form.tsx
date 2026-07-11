"use client";

import Link from "next/link";
import { ArrowRight, CircleUserRound, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

type Mode = "login" | "signup";

export function AuthForm({ mode, googleEnabled }: { mode: Mode; googleEnabled: boolean }) {
  const search = useSearchParams();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(search.get("error") ? "Google sign-in could not be completed. Please try email instead." : "");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch(`/api/auth/${mode === "login" ? "login" : "signup"}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, next: search.get("next") }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Could not continue."); setLoading(false); return; }
    window.location.href = result.redirect || "/dashboard";
  }
  return <div className="auth-wrap"><div className="auth-intro"><p className="eyebrow">Servixa</p><h1>{mode === "login" ? "Welcome back." : "Let’s get to work."}</h1><p>{mode === "login" ? "Sign in to track orders, exchange project files, and talk directly with Sahil." : "One account for honest quotes, progress tracking, conversations, and protected delivery."}</p><div className="auth-quote">“A clear process makes better work.”</div></div><div className="form-card auth-card"><h2>{mode === "login" ? "Log in" : "Create your account"}</h2><p className="muted">{mode === "login" ? "Use your account email and password." : "Your project workspace takes less than a minute to create."}</p>{googleEnabled && <a className="google-button" href="/api/auth/google"><CircleUserRound size={18}/> Continue with Google</a>} {googleEnabled && <div className="or"><span/>or continue with email<span/></div>}<form onSubmit={submit} className="auth-form">{mode === "signup" && <div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" autoComplete="name" required minLength={2}/></div>}<div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required/></div><div className="field"><label htmlFor="password">Password</label><div className="password-input"><input id="password" name="password" type={show ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={8}/><button type="button" onClick={() => setShow(!show)} aria-label="Show password">{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>{mode === "login" && <Link className="forgot-link" href="/forgot-password">Forgot password?</Link>}{error && <div className="form-error">{error}</div>}<button className="button button-accent" disabled={loading}>{loading ? <LoaderCircle className="spin" size={18}/> : <>{mode === "login" ? "Log in" : "Create account"}<ArrowRight size={18}/></>}</button></form><p className="auth-switch">{mode === "login" ? "New to Servixa?" : "Already have an account?"} <Link href={mode === "login" ? "/signup" : "/login"}>{mode === "login" ? "Create account" : "Log in"}</Link></p></div></div>;
}