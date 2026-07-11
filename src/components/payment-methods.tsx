export default function PaymentMethods() {
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-6 space-y-6 text-white">

      <h2 className="text-2xl font-bold text-white">
        💳 Payment Methods
      </h2>

      {/* Meezan Bank */}
      <div className="rounded-lg border border-neutral-700 bg-neutral-800 p-5">
        <h3 className="text-xl font-bold text-orange-400">
          🏦 Meezan Bank
        </h3>

        <p className="mt-3">
          <strong>Account Title:</strong> M. Sanwal Rasheed
        </p>

        <p>
          <strong>IBAN:</strong>
        </p>

        <code className="block rounded bg-black p-2 mt-1 text-green-400">
          PK52MEZN0000300114134514
        </code>

        <p className="mt-3">
          <strong>Account Number:</strong>
        </p>

        <code className="block rounded bg-black p-2 mt-1 text-green-400">
          00300114134514
        </code>
      </div>

      {/* Easypaisa */}
      <div className="rounded-lg border border-green-700 bg-neutral-800 p-5">
        <h3 className="text-xl font-bold text-green-400">
          💚 Easypaisa
        </h3>

        <code className="block rounded bg-black p-2 mt-3 text-green-400">
          0325-8104093
        </code>
      </div>

      {/* JazzCash */}
      <div className="rounded-lg border border-red-700 bg-neutral-800 p-5">
        <h3 className="text-xl font-bold text-red-400">
          ❤️ JazzCash
        </h3>

        <code className="block rounded bg-black p-2 mt-3 text-red-400">
          0325-8104093
        </code>
      </div>

    </div>
  );
}