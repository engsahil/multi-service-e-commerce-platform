"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Download, ImageOff, Plus, ShieldCheck, Star } from "lucide-react";
import type { Service } from "@/db/schema";
import { formatDate, formatPkr } from "@/lib/utils";
import { useApp } from "./providers";
import { ServiceIcon } from "./service-icon";

type Review = { id: string; rating: number; comment: string; createdAt: Date; userName: string };

export function ServiceDetail({ service, reviews, average }: { service: Service; reviews: Review[]; average: number | null }) {
  const { locale, t, addToCart, cart } = useApp();
  const title = locale === "ur" ? service.titleUr : service.titleEn;
  const description = locale === "ur" ? service.descriptionUr : service.descriptionEn;
  const delivery = locale === "ur" ? service.deliveryUr : service.deliveryEn;
  const added = cart.some((item) => item.id === service.id);
  return <>
    <section className="detail-hero"><div className="shell"><Link href="/services" className="back-link"><ArrowLeft size={16}/>{t("allServices")}</Link><div className="detail-grid"><div><div className="detail-icon"><ServiceIcon name={service.icon} size={38}/></div><p className="eyebrow">{service.category}</p><h1 className="display">{title}</h1><p className="lead">{description}</p></div><aside className="quote-box"><div><small>{service.pricePkr === null ? (locale === "ur" ? "آپ کے کام کے مطابق" : "Tailored to your project") : service.priceLabel}</small><strong>{formatPkr(service.pricePkr)}</strong></div><div className="quote-row"><Clock3 size={18}/><span><small>{t("delivery")}</small><b>{delivery}</b></span></div><div className="quote-row"><ShieldCheck size={18}/><span><small>{locale === "ur" ? "طریقہ" : "Fulfilment"}</small><b>{service.fulfillmentType === "booking" ? (locale === "ur" ? "تصدیق شدہ بکنگ" : "Confirmed booking") : (locale === "ur" ? "محفوظ ڈیجیٹل فراہمی" : "Protected digital delivery")}</b></span></div><button className="button button-accent" disabled={added} onClick={() => addToCart({ id: service.id, slug: service.slug, titleEn: service.titleEn, titleUr: service.titleUr, pricePkr: service.pricePkr, fulfillmentType: service.fulfillmentType })}><Plus size={18}/>{added ? (locale === "ur" ? "شامل ہو گیا" : "Added to project") : t("add")}</button><p className="quote-note"><CheckCircle2 size={15}/>{t("quoteRequired")}</p></aside></div></div></section>
    <section className="section-tight"><div className="shell"><div className="section-head"><div><p className="eyebrow">{locale === "ur" ? "اصل نمونے" : "Genuine samples"}</p><h2 className="section-title">{locale === "ur" ? "کام کی گیلری" : "Work gallery"}</h2></div></div>{service.gallery.length ? <div className="gallery-grid">{service.gallery.map((image) => <a href={image} target="_blank" rel="noreferrer" key={image}><img src={image} alt={`${title} sample`}/><Download size={18}/></a>)}</div> : <div className="empty-panel"><ImageOff size={30}/><h3>{locale === "ur" ? "ابھی کوئی نمونہ شائع نہیں ہوا" : "No samples published yet"}</h3><p>{locale === "ur" ? "صرف ساحل کی جانب سے تصدیق شدہ اصل کام یہاں دکھایا جائے گا۔" : "Only verified, genuine work uploaded by Sahil will appear here."}</p></div>}</div></section>
    <section className="section-tight reviews-section"><div className="shell"><div className="section-head"><div><p className="eyebrow">{locale === "ur" ? "تصدیق شدہ گاہک" : "Verified clients"}</p><h2 className="section-title">{locale === "ur" ? "حقیقی جائزے" : "Real reviews"}</h2></div>{average !== null && <div className="rating-summary"><Star fill="currentColor" size={20}/><strong>{average.toFixed(1)}</strong><span>({reviews.length})</span></div>}</div>{reviews.length ? <div className="review-grid">{reviews.map((review) => <article className="review-card" key={review.id}><div>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill={i < review.rating ? "currentColor" : "none"}/>)}</div><p>“{review.comment}”</p><footer><b>{review.userName}</b><span>{formatDate(review.createdAt)}</span></footer></article>)}</div> : <div className="empty-panel"><Star size={30}/><h3>{locale === "ur" ? "ابھی کوئی جائزہ نہیں" : "No reviews yet"}</h3><p>{locale === "ur" ? "صرف مکمل آرڈر والے گاہک جائزہ دے سکتے ہیں۔" : "Reviews can only be submitted by clients with a delivered order."}</p></div>}</div></section>
  </>;
}