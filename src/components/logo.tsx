import Link from "next/link";
import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Servixa home">
      <Image
        src="/servixa-logo.png"
        alt="Servixa"
        width={170}
        height={60}
        priority
      />
    </Link>
  );
}