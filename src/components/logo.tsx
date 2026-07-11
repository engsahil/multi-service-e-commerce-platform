import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Servixa home">
      <span className="logo-mark" aria-hidden="true">S</span>
      {!compact && <span>Mr. Sahil <b>IT</b></span>}
    </Link>
  );
}
