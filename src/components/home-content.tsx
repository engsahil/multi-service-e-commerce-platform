"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock3, Code2, Languages, LockKeyhole, MonitorCog, MoveUpRight, PackageCheck, Sparkles, UploadCloud, Video } from "lucide-react";
import type { Service } from "@/db/schema";
import { useApp } from "./providers";
import { ServiceCard } from "./service-card";

export function HomeContent({ services }: { services: Service[] }) {
  const { locale, t } = useApp();
  const featured = services.filter((service) => service.featured).slice(0, 6);
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">{locale === "ur" ? "تخلیقی • ڈیولپمنٹ • ٹیک سپورٹ" : "Creative • Development • Tech support"}</p>
            <h1 className="display">{locale === "ur" ? <>آپ کا خیال۔<br/><span style={{ color: "var(--accent)" }}>صحیح انداز میں تیار۔</span></> : <>Your idea.<br/><span style={{ color: "var(--accent)" }}>Built right.</span></>}</h1>
            <p className="lead">{locale === "ur" ? "ڈیجیٹل اور عملی ٹیک خدمات ایک واضح بریف، ایماندار قیمت اور مکمل آرڈر ٹریکنگ کے ساتھ۔" : "Digital and hands-on tech services with a clear brief, honest pricing, and order tracking from request to delivery."}</p>
            <div className="hero-actions"><Link href="/services" className="button button-accent">{t("explore")} <ArrowRight size={18}/></Link><Link href="/contact" className="button button-outline">{t("quote")}</Link></div>
            <div className="hero-proof"><span><Check size={16}/>{t("genuine")}</span><span><LockKeyhole size={16}/>{locale === "ur" ? "محفوظ فائلیں" : "Protected project files"}</span></div>
          </div>
          <div className="hero-visual reveal" style={{ animationDelay: "120ms" }} aria-label="Mr. Sahil IT service overview">
            <div className="visual-card visual-main"><div className="visual-grid"><div className="visual-tile"><Code2 size={31}/><div><b>{locale === "ur" ? "کسٹم ڈیولپمنٹ" : "Custom development"}</b><br/><small>{locale === "ur" ? "ویب سائٹس اور ایپس" : "Websites & apps"}</small></div></div><div className="visual-tile"><Video size={26}/><div><b>{locale === "ur" ? "تخلیقی کام" : "Creative work"}</b></div></div><div className="visual-tile"><MonitorCog size={26}/><div><b>{locale === "ur" ? "ٹیک سپورٹ" : "Tech support"}</b></div></div></div></div>
            <div className="visual-card floating-note"><span><Check size={16}/></span><div>{locale === "ur" ? "کام مکمل" : "Delivery ready"}<br/><small className="muted">{locale === "ur" ? "محفوظ ڈاؤن لوڈ" : "Protected download"}</small></div></div>
            <div className="visual-card floating-order"><i className="pulse"/>{locale === "ur" ? "لائیو آرڈر ٹریکنگ" : "Live order tracking"}</div>
          </div>
        </div>
      </section>
      <div className="stats-strip"><div className="shell stats-grid"><div className="stat"><PackageCheck size={21}/>{t("track")}</div><div className="stat"><UploadCloud size={21}/>{t("upload")}</div><div className="stat"><Languages size={21}/>{t("bilingual")}</div><div className="stat"><LockKeyhole size={21}/>{t("secure")}</div></div></div>
      <section className="section"><div className="shell"><div className="section-head"><div><p className="eyebrow">{locale === "ur" ? "ہم کیا کرتے ہیں" : "What we do"}</p><h2 className="section-title">{locale === "ur" ? "ایک جگہ، کئی مہارتیں۔" : "One place, many skills."}</h2></div><Link href="/services" className="text-link">{t("allServices")} <MoveUpRight size={17}/></Link></div><div className="service-grid">{featured.map((service, index) => <ServiceCard key={service.id} service={service} index={index}/>)}</div></div></section>
      <section className="section process"><div className="shell process-grid"><div><p className="eyebrow">{locale === "ur" ? "واضح طریقہ" : "A clear process"}</p><h2 className="section-title">{locale === "ur" ? "اندازوں کے بجائے وضاحت۔" : "Clarity over guesswork."}</h2><p className="lead">{t("noFake")}</p></div><div className="steps"><ProcessStep n="01" title={locale === "ur" ? "اپنی ضرورت بتائیں" : "Share the brief"} text={locale === "ur" ? "مقصد، فائلیں، وقت اور ضروری نتائج فراہم کریں۔" : "Tell us the goal, source files, timeline, and result you need."}/><ProcessStep n="02" title={locale === "ur" ? "دائرۂ کار اور قیمت" : "Scope & quote"} text={locale === "ur" ? "آپ کو کام شروع ہونے سے پہلے واضح قیمت اور وقت ملے گا۔" : "Receive a clear scope, genuine price, and schedule before work starts."}/><ProcessStep n="03" title={locale === "ur" ? "کام کی نگرانی" : "Follow the work"} text={locale === "ur" ? "اپنے ڈیش بورڈ میں حالت، پیغامات اور فائلیں دیکھیں۔" : "Track status, exchange messages, and manage files in your dashboard."}/><ProcessStep n="04" title={locale === "ur" ? "محفوظ فراہمی" : "Protected delivery"} text={locale === "ur" ? "تیار فائلیں اپنے آرڈر سے محفوظ طریقے سے ڈاؤن لوڈ کریں۔" : "Download completed files securely from the related order."}/></div></div></section>
      <section className="section"><div className="shell cta-panel"><div><p className="eyebrow" style={{ color: "white", opacity: .8 }}>{locale === "ur" ? "کچھ مختلف؟" : "Something different?"}</p><h2>{locale === "ur" ? "اپنے اگلے پروجیکٹ کے بارے میں بتائیں۔" : "Tell us about your next project."}</h2></div><Link href="/contact" className="button">{t("quote")} <Sparkles size={18}/></Link></div></section>
    </>
  );
}

function ProcessStep({ n, title, text }: { n: string; title: string; text: string }) { return <div className="step"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></div>; }
