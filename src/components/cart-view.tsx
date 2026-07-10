"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, ShoppingBag, Trash2 } from "lucide-react";
import { formatPkr } from "@/lib/utils";
import { useApp } from "./providers";

export function CartView() {
  const { cart, locale, t, removeFromCart } = useApp();
  const fullyPriced = cart.length > 0 && cart.every((item) => item.pricePkr !== null);
  const total = fullyPriced ? cart.reduce((sum, item) => sum + (item.pricePkr ?? 0) * item.quantity, 0) : null;
  return <><section className="page-hero"><div className="shell page-hero-grid"><div><p className="eyebrow">{locale === "ur" ? "آپ کا انتخاب" : "Your selection"}</p><h1 className="display">{t("yourCart")}</h1></div><p className="lead">{t("quoteRequired")}</p></div></section><section className="section-tight"><div className="shell cart-layout">{cart.length === 0 ? <div className="empty-panel cart-empty"><ShoppingBag size={35}/><h3>{t("emptyCart")}</h3><p>{locale === "ur" ? "اپنے پروجیکٹ کے لیے کوئی خدمت منتخب کریں۔" : "Choose one or more services for your project."}</p><Link href="/services" className="button button-accent">{t("explore")} <ArrowRight size={17}/></Link></div> : <><div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}><div className="cart-item-icon">{item.titleEn.slice(0, 1)}</div><div><p>{item.fulfillmentType}</p><h3>{locale === "ur" ? item.titleUr : item.titleEn}</h3><span><Clock3 size={14}/>{item.fulfillmentType === "booking" ? (locale === "ur" ? "بکنگ ضروری" : "Booking required") : (locale === "ur" ? "ڈیجیٹل فراہمی" : "Digital delivery")}</span></div><strong>{formatPkr(item.pricePkr)}</strong><button onClick={() => removeFromCart(item.id)} aria-label={t("remove")}><Trash2 size={18}/></button></article>)}</div><aside className="cart-summary"><h2>{locale === "ur" ? "خلاصہ" : "Project summary"}</h2><div><span>{locale === "ur" ? "خدمات" : "Services"}</span><b>{cart.length}</b></div><div className="summary-total"><span>{t("total")}</span><strong>{formatPkr(total)}</strong></div>{!fullyPriced && <p>{t("quoteRequired")}</p>}<Link href="/checkout" className="button button-accent">{t("checkout")} <ArrowRight size={17}/></Link><Link href="/services" className="continue-link"><ArrowLeft size={15}/>{locale === "ur" ? "مزید خدمات" : "Add another service"}</Link></aside></>}</div></section></>;
}