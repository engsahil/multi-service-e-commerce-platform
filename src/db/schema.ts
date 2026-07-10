import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash"),
    image: text("image"),
    role: varchar("role", { length: 20 }).notNull().default("customer"),
    emailVerified: boolean("email_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)],
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 64 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("sessions_token_idx").on(table.tokenHash), index("sessions_user_idx").on(table.userId)],
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 64 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("reset_token_idx").on(table.tokenHash)],
);

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 100 }).notNull(),
    category: varchar("category", { length: 60 }).notNull(),
    icon: varchar("icon", { length: 40 }).notNull().default("sparkles"),
    titleEn: varchar("title_en", { length: 150 }).notNull(),
    titleUr: varchar("title_ur", { length: 150 }).notNull(),
    shortEn: text("short_en").notNull(),
    shortUr: text("short_ur").notNull(),
    descriptionEn: text("description_en").notNull(),
    descriptionUr: text("description_ur").notNull(),
    deliveryEn: varchar("delivery_en", { length: 100 }).notNull(),
    deliveryUr: varchar("delivery_ur", { length: 100 }).notNull(),
    pricePkr: integer("price_pkr"),
    priceLabel: varchar("price_label", { length: 80 }).default("Starting from"),
    fulfillmentType: varchar("fulfillment_type", { length: 20 }).notNull().default("digital"),
    active: boolean("active").notNull().default(true),
    featured: boolean("featured").notNull().default(false),
    gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("services_slug_idx").on(table.slug), index("services_active_idx").on(table.active)],
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNumber: varchar("order_number", { length: 24 }).notNull(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
    status: varchar("status", { length: 30 }).notNull().default("pending"),
    paymentStatus: varchar("payment_status", { length: 30 }).notNull().default("unpaid"),
    paymentProvider: varchar("payment_provider", { length: 30 }).notNull().default("quote"),
    externalPaymentId: text("external_payment_id"),
    transactionReference: text("transaction_reference"),
    subtotalPkr: integer("subtotal_pkr"),
    totalPkr: integer("total_pkr"),
    currency: varchar("currency", { length: 3 }).notNull().default("PKR"),
    customerName: varchar("customer_name", { length: 120 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 30 }),
    address: text("address"),
    serviceMode: varchar("service_mode", { length: 30 }),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    notes: text("notes"),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("orders_number_idx").on(table.orderNumber), index("orders_user_idx").on(table.userId), index("orders_status_idx").on(table.status)],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    serviceId: uuid("service_id").references(() => services.id, { onDelete: "set null" }),
    title: varchar("title", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),
    quantity: integer("quantity").notNull().default(1),
    unitPricePkr: integer("unit_price_pkr"),
    requirements: text("requirements"),
    fulfillmentType: varchar("fulfillment_type", { length: 20 }).notNull(),
  },
  (table) => [index("order_items_order_idx").on(table.orderId)],
);

export const orderFiles = pgTable(
  "order_files",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    uploadedBy: uuid("uploaded_by").notNull().references(() => users.id, { onDelete: "restrict" }),
    kind: varchar("kind", { length: 20 }).notNull().default("reference"),
    originalName: varchar("original_name", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 150 }).notNull(),
    size: integer("size").notNull(),
    storageKey: text("storage_key").notNull(),
    remoteUrl: text("remote_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("order_files_order_idx").on(table.orderId)],
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceId: uuid("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    comment: text("comment").notNull(),
    approved: boolean("approved").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("reviews_order_service_idx").on(table.orderId, table.serviceId), index("reviews_service_idx").on(table.serviceId)],
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 160 }).notNull(),
    message: text("message").notNull(),
    href: text("href"),
    read: boolean("read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("notifications_user_idx").on(table.userId)],
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    senderId: uuid("sender_id").notNull().references(() => users.id, { onDelete: "restrict" }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("messages_order_idx").on(table.orderId)],
);

export const contactRequests = pgTable("contact_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  subject: varchar("subject", { length: 180 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type User = typeof users.$inferSelect;
export type Order = typeof orders.$inferSelect;
