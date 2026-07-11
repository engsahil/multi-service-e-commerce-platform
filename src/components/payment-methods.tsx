import Image from "next/image";
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

    
{/* Meezan Bank */}

<div className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#1F2937] p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/20">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
  <Image
    src="/meezan-bank.svg"
    alt="Meezan Bank"
    width={44}
    height={44}
  />
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

      className="rounded-2xl border border-green-600/40 bg-gradient-to-br from-green-950 to-neutral-900 p-6 shadow-lg"

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

  <div className="rounded-xl bg-white p-2 shadow-lg">
    <Image
      src="/easypaisa.svg"
      alt="Easypaisa"
      width={42}
      height={42}
    />
  </div>

  <div>

    <h3 className="text-xl font-bold text-white">
      Easypaisa
    </h3>

    <p className="text-sm text-neutral-400">
      Mobile Wallet
    </p>

  </div>

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


      <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#220909] via-[#1A1111] to-[#111827] p-7 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/20">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white p-2 shadow-lg">
              <Image
                src="/jazzcash.svg.png"
                alt="JazzCash"
                width={44}
                height={44}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                JazzCash
              </h3>

              <p className="text-sm text-neutral-400">
                Mobile Wallet
              </p>
            </div>

          </div>

          <span className="rounded-full bg-red-600/20 px-4 py-2 text-sm font-medium text-red-300">
            Active
          </span>

        </div>

        <div className="mt-6">

          <p className="mb-2 text-sm text-neutral-400">
            Mobile Number
          </p>

          <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-black/50 p-4">

            <span className="font-mono text-white">
              03258104093
            </span>

            <CopyButton value="03258104093" />

          </div>

        </div>

      </div>

      {/* Payment Instructions */}

      <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-neutral-900 p-7">

        <h4 className="text-xl font-bold text-white">
          Payment Instructions
        </h4>

        <p className="mt-2 text-neutral-400">
          Please follow these steps to complete your order.
        </p>

        <div className="mt-6 space-y-4">

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              1
            </div>
            <p className="text-neutral-300">
              Choose your preferred payment method.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              2
            </div>
            <p className="text-neutral-300">
              Complete your payment.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              3
            </div>
            <p className="text-neutral-300">
              Take a screenshot of the payment receipt.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              4
            </div>
            <p className="text-neutral-300">
              Send the screenshot to us on WhatsApp.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              5
            </div>
            <p className="text-neutral-300">
              Your payment will be verified and your order will be processed.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}