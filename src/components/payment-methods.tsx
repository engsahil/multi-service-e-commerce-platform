export default function PaymentMethods() {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Secure Payment Methods
      </h2>

      <p className="text-neutral-400">
        Complete your payment using any of the methods below.
        After payment, send the screenshot on WhatsApp for order verification.
      </p>

      {/* Meezan */}

      <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-6">

        <div className="flex items-center gap-3 mb-5">

          <span className="text-3xl">🏦</span>

          <div>
            <h3 className="text-xl font-bold">
              Meezan Bank
            </h3>

            <p className="text-sm text-neutral-400">
              Bank Transfer
            </p>
          </div>

        </div>

        <div className="space-y-3">

          <div>
            <p className="text-sm text-neutral-400">
              Account Title
            </p>

            <div className="bg-black rounded-lg p-3 font-mono">
              M. Sanwal Rasheed
            </div>
          </div>

          <div>
            <p className="text-sm text-neutral-400">
              IBAN
            </p>

            <div className="bg-black rounded-lg p-3 font-mono text-green-400">
              PK52MEZN0000300114134514
            </div>
          </div>

          <div>
            <p className="text-sm text-neutral-400">
              Account Number
            </p>

            <div className="bg-black rounded-lg p-3 font-mono">
              00300114134514
            </div>
          </div>

        </div>

      </div>

      {/* Easypaisa */}

      <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-6">

        <div className="flex items-center gap-3 mb-5">

          <span className="text-3xl">💳</span>

          <div>

            <h3 className="text-xl font-bold">
              Easypaisa
            </h3>

            <p className="text-sm text-neutral-400">
              Mobile Wallet
            </p>

          </div>

        </div>

        <div className="bg-black rounded-lg p-3 font-mono text-green-400">
          03258104093
        </div>

      </div>

      {/* JazzCash */}

      <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-6">

        <div className="flex items-center gap-3 mb-5">

          <span className="text-3xl">📱</span>

          <div>

            <h3 className="text-xl font-bold">
              JazzCash
            </h3>

            <p className="text-sm text-neutral-400">
              Mobile Wallet
            </p>

          </div>

        </div>

        <div className="bg-black rounded-lg p-3 font-mono text-orange-400">
          03258104093
        </div>

      </div>

      <div className="rounded-xl bg-orange-500/10 border border-orange-500/30 p-5">

        <h4 className="font-semibold mb-2">
          Payment Instructions
        </h4>

        <ol className="list-decimal pl-5 space-y-2 text-neutral-300">

          <li>Select your preferred payment method.</li>

          <li>Send the payment.</li>

          <li>Take a screenshot of the payment receipt.</li>

          <li>Send the screenshot on WhatsApp.</li>

          <li>Your order will be confirmed after verification.</li>

        </ol>

      </div>

    </div>
  );
}