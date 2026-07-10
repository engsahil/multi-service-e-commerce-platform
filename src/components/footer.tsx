"use client";

import Link from "next/link";
import { Camera, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { useApp } from "./providers";

export function Footer({ email, whatsapp, instagram }: { email: string; whatsapp?: string; instagram?: string }) {
  const { t } = useApp();
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><Logo /><p>Digital craft and practical tech support, handled with a clear brief and an honest process.</p></div>
        <div><h3>{t("services")}</h3><Link href="/services/photo-editing">Photo editing</Link><Link href="/services/website-development">Web development</Link><Link href="/services/windows-installation">Windows installation</Link><Link href="/services/other-services">Custom requests</Link></div>
        <div><h3>Company</h3><Link href="/about">{t("about")}</Link><Link href="/contact">{t("contact")}</Link><Link href="/terms">{t("terms")}</Link><Link href="/privacy">{t("privacy")}</Link></div>
        <div><h3>{t("contact")}</h3>{email && <a href={`mailto:${email}`}><Mail size={16} />{email}</a>}{whatsapp && <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} />WhatsApp</a>}{instagram && <a href={instagram} target="_blank" rel="noreferrer"><Camera size={16} />Instagram</a>}</div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Mr. Sahil IT. {t("rights")}</span><span>Built for real work—not vanity metrics.</span></div>
    </footer>
  );
}