# Mr. Sahil IT — deployment guide

## 1. Recommended hosting

Deploy the Next.js app to Vercel, Railway, Render, or a Node-compatible VPS. Use a managed PostgreSQL database (Neon, Supabase, Railway, or RDS). For durable production file storage, configure Cloudinary; the local `.data/uploads` fallback is for development only.

## 2. Required environment variables

- `DATABASE_URL`: PostgreSQL connection string.
- `NEXT_PUBLIC_APP_URL`: final HTTPS origin, without a trailing slash.
- `ADMIN_EMAIL`: Sahil's exact login email. Create/sign in with this email to receive admin access.
- `NEXT_PUBLIC_CONTACT_EMAIL`: public support email.
- `NEXT_PUBLIC_WHATSAPP_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`: optional full social URLs.

Authentication:
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: optional Google OAuth credentials. Add `{APP_URL}/api/auth/google/callback` as an authorized redirect URI.

Email:
- `RESEND_API_KEY`, `EMAIL_FROM`: optional but required for production reset/status emails. Verify the sending domain in Resend.

Stripe:
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`. Add `{APP_URL}/api/payments/stripe/webhook` and subscribe to `checkout.session.completed`.

PayPal:
- `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_ENV` (`sandbox` or `live`), and `PAYPAL_PKR_PER_USD`. PayPal checkout is charged in USD because PayPal does not process PKR; keep the conversion rate current and disclose this to customers.

Pakistan wallets:
- `NEXT_PUBLIC_JAZZCASH_ACCOUNT`, `NEXT_PUBLIC_EASYPAISA_ACCOUNT`: optional merchant numbers shown at checkout. Submitted transaction IDs stay pending until verified in Admin. For direct merchant-API automation, obtain approved merchant credentials and replace the manual verification adapter with the provider's current signed API.

Storage:
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## 3. Database and build

Install dependencies, push the Drizzle schema, then build:

1. `npm install`
2. `npx drizzle-kit push`
3. `npm run build`
4. `npm run start`

The first storefront request inserts the ten canonical service listings with no prices. Sign in as `ADMIN_EMAIL`, open Admin → Services & pricing, and publish genuine prices, delivery estimates, and HTTPS portfolio URLs.

## 4. Production checklist

- Set an HTTPS custom domain and update every OAuth/payment callback URL.
- Configure Cloudinary before accepting uploads.
- Configure Resend and test signup recovery plus order-status email.
- Run Stripe and PayPal sandbox transactions, then verify webhook/capture status in the dashboard.
- Enter only genuine JazzCash/Easypaisa merchant details and verify transaction IDs before marking paid.
- Add real contact/social links and reviewed legal business details.
- Create the admin account using the exact `ADMIN_EMAIL` value.
- Back up PostgreSQL and define retention/deletion procedures for client files.
- Replace the default public contact email before launch.
