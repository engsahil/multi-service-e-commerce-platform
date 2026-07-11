import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { contactRequests, notifications, users } from "@/db/schema";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json(); const name = String(body.name ?? "").trim(); const email = String(body.email ?? "").trim().toLowerCase(); const phone = String(body.phone ?? "").trim(); const subject = String(body.subject ?? "").trim(); const message = String(body.message ?? "").trim();
    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || subject.length < 3 || message.length < 15 || message.length > 5000) return NextResponse.json({ error: "Complete all required fields with a clear project brief." }, { status: 400 });
    await db.insert(contactRequests).values({ name, email, phone: phone || null, subject: subject.slice(0, 180), message });
    const [admin] = await db.select({ id: users.id }).from(users).where(eq(users.role, "admin")).limit(1);
    if (admin) await db.insert(notifications).values({ userId: admin.id, title: "New enquiry", message: `${name} sent a request: ${subject}`, href: "/admin" });
    const ownerEmail = process.env.ADMIN_EMAIL; if (ownerEmail) await sendEmail({ to: ownerEmail, subject: `New Servixa enquiry: ${subject}`, html: `<div style="font-family:Arial,sans-serif"><h2>New enquiry</h2><p><b>From:</b> ${name} (${email})</p><p>${message.replace(/[<>]/g, "")}</p></div>` }).catch(console.error);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Could not send your request. Please try again." }, { status: 500 }); }
}