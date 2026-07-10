"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, Plus } from "lucide-react";
import type { Service } from "@/db/schema";
import { formatPkr } from "@/lib/utils";
import { ServiceIcon } from "./service-icon";
import { useApp } from "./providers";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { locale, t, addToCart, cart } = useApp();
  const title = locale === "ur" ? service.titleUr : service.titleEn;
  const short = locale === "ur" ? service.shortUr : service.shortEn;
  const delivery = locale === "ur" ? service.deliveryUr : service.deliveryEn;
  const added = cart.some((item) => item.id === service.id);
  return (
    <article className="service-card reveal" style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}>
      <div className="service-card-top"><span className="service-icon"><ServiceIcon name={service.icon} /></span><span className="service-index">{String(index + 1).padStart(2, "0")}</span></div>
      <div><p className="eyebrow">{service.category}</p><h3>{title}</h3><p className="service-copy">{short}</p></div>
      <div className="service-meta"><span><Clock3 size={15} /> {delivery}</span><strong>{service.pricePkr === null ? t("noPrice") : formatPkr(service.pricePkr)}</strong></div>
      <div className="service-actions"><Link href={`/services/${service.slug}`}>{t("viewDetails")} <ArrowUpRight size={16} /></Link><button disabled={added} onClick={() => addToCart({ id: service.id, slug: service.slug, titleEn: service.titleEn, titleUr: service.titleUr, pricePkr: service.pricePkr, fulfillmentType: service.fulfillmentType })}><Plus size={16} />{added ? "✓" : t("add")}</button></div>
    </article>
  );
}