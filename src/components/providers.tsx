"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Locale } from "@/lib/types";
import { translations, type TranslationKey } from "@/lib/i18n";

type AppContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  theme: "light" | "dark";
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedLocale = localStorage.getItem("msit_locale") as Locale | null;
    const savedTheme = localStorage.getItem("msit_theme") as "light" | "dark" | null;
    const savedCart = localStorage.getItem("msit_cart");
    if (savedLocale === "ur" || savedLocale === "en") setLocaleState(savedLocale);
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart) as CartItem[]); } catch { localStorage.removeItem("msit_cart"); }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ur" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("msit_locale", locale);
    localStorage.setItem("msit_theme", theme);
  }, [locale, theme]);

  useEffect(() => { localStorage.setItem("msit_cart", JSON.stringify(cart)); }, [cart]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggleTheme = useCallback(() => setTheme((current) => current === "light" ? "dark" : "light"), []);
  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => setCart((current) => current.some((entry) => entry.id === item.id) ? current : [...current, { ...item, quantity: 1 }]), []);
  const removeFromCart = useCallback((id: string) => setCart((current) => current.filter((item) => item.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const t = useCallback((key: TranslationKey) => translations[locale][key], [locale]);

  const value = useMemo(() => ({ locale, setLocale, t, theme, toggleTheme, cart, addToCart, removeFromCart, clearCart }), [locale, setLocale, t, theme, toggleTheme, cart, addToCart, removeFromCart, clearCart]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProviders");
  return context;
}

export function Localized({ k, className }: { k: TranslationKey; className?: string }) {
  const { t } = useApp();
  return <span className={className}>{t(k)}</span>;
}
