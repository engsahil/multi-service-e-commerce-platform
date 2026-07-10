type EmailInput = { to: string; subject: string; html: string };

export async function sendEmail({ to, subject, html }: EmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.info(`[email skipped] ${subject} -> ${to}`);
    return { sent: false };
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });
  if (!response.ok) throw new Error(`Email provider error: ${response.status}`);
  return { sent: true };
}

export function statusEmail(name: string, orderNumber: string, status: string) {
  const safeName = escapeHtml(name);
  const safeOrder = escapeHtml(orderNumber);
  const safeStatus = escapeHtml(status.replaceAll("_", " "));
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto"><h2>Mr. Sahil IT</h2><p>Hello ${safeName},</p><p>Your order <strong>${safeOrder}</strong> is now <strong>${safeStatus}</strong>.</p><p>Sign in to your dashboard for messages, files, and complete tracking.</p></div>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}
