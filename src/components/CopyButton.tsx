"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = {
  value: string;
};

export default function CopyButton({ value }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
        copied
          ? "bg-green-600 text-white"
          : "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105"
      }`}
    >
      {copied ? (
        <>
          <Check size={16} />
          Copied
        </>
      ) : (
        <>
          <Copy size={16} />
          Copy
        </>
      )}
    </button>
  );
}