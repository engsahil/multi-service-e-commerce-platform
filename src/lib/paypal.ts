const base = () => process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

async function accessToken() {
  const id = process.env.PAYPAL_CLIENT_ID; const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error("PayPal is not configured");
  const response = await fetch(`${base()}/v1/oauth2/token`, { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" }, body: "grant_type=client_credentials", cache: "no-store" });
  if (!response.ok) throw new Error("PayPal authentication failed");
  return ((await response.json()) as { access_token: string }).access_token;
}

export async function createPayPalOrder(orderId: string, totalPkr: number, returnBase: string) {
  const rate = Number(process.env.PAYPAL_PKR_PER_USD);
  if (!Number.isFinite(rate) || rate <= 0) throw new Error("PayPal conversion rate is not configured");
  const value = (totalPkr / rate).toFixed(2);
  const response = await fetch(`${base()}/v2/checkout/orders`, { method: "POST", headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json", "PayPal-Request-Id": orderId }, body: JSON.stringify({ intent: "CAPTURE", purchase_units: [{ reference_id: orderId, amount: { currency_code: "USD", value } }], application_context: { brand_name: "Servixa", return_url: `${returnBase}/api/payments/paypal/capture?orderId=${orderId}`, cancel_url: `${returnBase}/dashboard?payment=cancelled`, user_action: "PAY_NOW" } }) });
  if (!response.ok) throw new Error("Could not create PayPal payment");
  const result = await response.json() as { id: string; links: Array<{ rel: string; href: string }> };
  return { id: result.id, approvalUrl: result.links.find((link) => link.rel === "approve")?.href };
}

export async function capturePayPalOrder(id: string) {
  const response = await fetch(`${base()}/v2/checkout/orders/${encodeURIComponent(id)}/capture`, { method: "POST", headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json" }, body: "{}" });
  if (!response.ok) throw new Error("PayPal capture failed");
  return response.json() as Promise<{ status: string }>;
}