"use client";

import { useMemo, useState } from "react";
import type { Service } from "@/db/schema";
import { useApp } from "./providers";
import { ServiceCard } from "./service-card";

export function ServicesExplorer({ services }: { services: Service[] }) {
  const { locale, t } = useApp();
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => ["all", ...Array.from(new Set(services.map((service) => service.category)))], [services]);
  const visible = category === "all" ? services : services.filter((service) => service.category === category);
  return <>
    <section className="page-hero"><div className="shell page-hero-grid"><div><p className="eyebrow">Mr. Sahil IT</p><h1 className="display">{t("allServices")}</h1></div><p className="lead">{t("allServicesSub")}</p></div></section>
    <section className="section-tight"><div className="shell"><div className="filter-row">{categories.map((item) => <button key={item} className={`filter-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item === "all" ? (locale === "ur" ? "تمام" : "All") : item}</button>)}</div><div className="service-grid">{visible.map((service, index) => <ServiceCard key={service.id} service={service} index={index}/>)}</div></div></section>
  </>;
}