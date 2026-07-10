export type CartItem = {
  id: string;
  slug: string;
  titleEn: string;
  titleUr: string;
  pricePkr: number | null;
  fulfillmentType: string;
  quantity: number;
};

export type Locale = "en" | "ur";

export type DashboardOrder = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentProvider: string;
  totalPkr: number | null;
  customerName: string;
  customerEmail: string;
  scheduledAt: Date | null;
  notes: string | null;
  createdAt: Date;
  items: Array<{ id: string; serviceId: string | null; title: string; slug: string; quantity: number; unitPricePkr: number | null; fulfillmentType: string }>;
  files: Array<{ id: string; originalName: string; kind: string; size: number; createdAt: Date }>;
  messages: Array<{ id: string; body: string; senderId: string; senderName: string; createdAt: Date }>;
};
