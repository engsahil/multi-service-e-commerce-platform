export default function PaymentMethods() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 space-y-6">

      <h2 className="text-2xl font-bold">
        Payment Methods
      </h2>

      {/* Meezan */}

      <div className="rounded-lg border border-neutral-700 p-4">

        <h3 className="font-bold text-lg">
          🏦 Meezan Bank
        </h3>

        <p><strong>Account Title:</strong> M. Sanwal Rasheed</p>

        <p><strong>IBAN:</strong></p>

        <code>
          PK52MEZN0000300114134514
        </code>

        <p><strong>Account Number:</strong></p>

        <code>
          00300114134514
        </code>

      </div>

      {/* Easypaisa */}

      <div className="rounded-lg border border-neutral-700 p-4">

        <h3 className="font-bold text-lg">
          💚 Easypaisa
        </h3>

        <p>0325-8104093</p>

      </div>

      {/* JazzCash */}

      <div className="rounded-lg border border-neutral-700 p-4">

        <h3 className="font-bold text-lg">
          ❤️ JazzCash
        </h3>

        <p>0325-8104093</p>

      </div>

    </div>
  );
}