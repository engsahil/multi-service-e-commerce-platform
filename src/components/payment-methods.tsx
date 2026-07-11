import CopyButton from "./CopyButton";
export default function PaymentMethods() {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl space-y-8">

      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
          Secure Checkout
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Payment Methods
        </h2>

        <p className="mt-2 text-neutral-400">
          Complete your payment using any method below. After payment,
          send your payment screenshot on WhatsApp for verification.
        </p>
      </div>

      {/* Meezan Bank */}

      <div className="rounded-2xl border border-emerald-700/40 bg-gradient-to-br from-emerald-950 to-neutral-900 p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-3xl">
              🏦
            </div>

            <div>

              <h3 className="text-xl font-bold text-white">
                Meezan Bank
              </h3>

              <p className="text-sm text-neutral-300">
                Bank Transfer
              </p>

            </div>

          </div>

          <span className="rounded-full bg-emerald-600/20 px-4 py-2 text-sm font-medium text-emerald-300">
            Secure
          </span>

        </div>

        <div className="mt-6 space-y-5">

          <div>

            <p className="mb-2 text-sm text-neutral-400">
              Account Title
            </p>

            <div className="rounded-xl border border-neutral-700 bg-black/50 p-4 font-medium text-white">
              M. Sanwal Rasheed
            </div>

          </div>

          <div>

            <p className="mb-2 text-sm text-neutral-400">
              Account Number
            </p>

            <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-black/50 p-4">

              <span className="font-mono text-white">
                00300114134514
              </span>

              <CopyButton value="00300114134514" />

            </div>

          </div>

          <div>

            <p className="mb-2 text-sm text-neutral-400">
              IBAN
            </p>

            <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-black/50 p-4">

              <span className="font-mono text-white break-all">
                PK52MEZN0000300114134514
              </span>

              <CopyButton value="PK52MEZN0000300114134514" />

            </div>

          </div>

        </div>

      </div>

      {/* Easypaisa */}

      <div className="rounded-2xl border border-green-600/40 bg-gradient-to-br from-green-950 to-neutral-900 p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold text-white">
              Easypaisa
            </h3>

            <p className="text-sm text-neutral-300">
              Mobile Wallet
            </p>

          </div>

          <span className="rounded-full bg-green-600 px-4 py-2 text-sm text-white">
            Active
          </span>

        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-neutral-700 bg-black/50 p-4">

          <span className="font-mono text-white">
            03258104093
          </span>

          <CopyButton value="03258104093" />
        </div>

      </div>

      {/* JazzCash */}

      <div className="rounded-2xl border border-red-600/40 bg-gradient-to-br from-red-950 to-neutral-900 p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold text-white">
              JazzCash
            </h3>

            <p className="text-sm text-neutral-300">
              Mobile Wallet
            </p>

          </div>

          <span className="rounded-full bg-red-600 px-4 py-2 text-sm text-white">
            Active
          </span>

        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-neutral-700 bg-black/50 p-4">

          <span className="font-mono text-white">
            03258104093
          </span>

          <CopyButton value="03258104093" />
        </div>

      </div>

      <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">

        <h4 className="text-lg font-bold text-white">
          Payment Instructions
        </h4>

        <ol className="mt-4 list-decimal space-y-3 pl-5 text-neutral-300">
          <li>Select your preferred payment method.</li>
          <li>Complete the payment.</li>
          <li>Take a screenshot of your payment receipt.</li>
          <li>Send the screenshot via WhatsApp.</li>
          <li>Your order will be verified and processed.</li>
        </ol>

      </div>

    </section>
  );
}