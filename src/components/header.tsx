"use client";

import Link from "next/link";
import { LogOut, Menu, Moon, ShoppingBag, Sun, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { useApp } from "./providers";

type HeaderUser = { name: string; role: string } | null;

export function Header({ user }: { user: HeaderUser }) {
  const { t, locale, setLocale, theme, toggleTheme, cart } = useApp();
  const [open, setOpen] = useState(false);
  const links = [["/", "home"], ["/services", "services"], ["/about", "about"], ["/contact", "contact"]] as const;

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([href, key]) => <Link key={href} href={href}>{t(key)}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label={t("theme")}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="lang-button" onClick={() => setLocale(locale === "en" ? "ur" : "en")}>{t("language")}</button>
          <Link className="cart-button" href="/cart" aria-label={`${t("cart")}: ${cart.length}`}><ShoppingBag size={19} /><span>{cart.length}</span></Link>
          {user ? (
            <>
              <Link className="icon-button account-button" href={user.role === "admin" ? "/admin" : "/dashboard"} aria-label={t("dashboard")}><UserRound size={19} /></Link>
              <form action="/api/auth/logout" method="post" className="desktop-only"><button className="icon-button" aria-label={t("logout")}><LogOut size={18} /></button></form>
            </>
          ) : <Link className="button button-small desktop-only" href="/login">{t("login")}</Link>}
          <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav shell" aria-label="Mobile navigation">
          {links.map(([href, key]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{t(key)}</Link>)}
          {user ? <><Link href={user.role === "admin" ? "/admin" : "/dashboard"}>{t("dashboard")}</Link><form action="/api/auth/logout" method="post"><button>{t("logout")}</button></form></> : <Link href="/login">{t("login")}</Link>}
        </nav>
      )}
    </header>
  );
}