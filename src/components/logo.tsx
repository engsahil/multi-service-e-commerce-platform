import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Servixa home">
      <Image
        src="/logo.png"
        alt="Servixa"
        width={40}
        height={40}
        priority
      />

      {!compact && (
        <span
          style={{
            fontWeight: 700,
            fontSize: "1.25rem",
            marginLeft: "10px",
          }}
        >
          Servixa
        </span>
      )}
    </Link>
  );
}