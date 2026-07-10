export function formatPkr(value: number | null) {
  if (value === null) return "Request a quote";
  return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-PK", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function makeOrderNumber() {
  const time = Date.now().toString(36).toUpperCase().slice(-7);
  const random = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `MSIT-${time}-${random}`;
}

export function safeRedirect(value: unknown, fallback = "/dashboard") {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}
