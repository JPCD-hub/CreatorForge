import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="#inicio" className="logo" aria-label="Creator Forge, ir al inicio"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M31 10 21 20l10 10H18L8 20l10-10h13Z" fill="currentColor" /><path d="m18 10-8 10 8 10h7l-8-10 8-10h-7Z" fill="#0b0b0b" /></svg>{!compact && <span>Creator <b>Forge</b></span>}</Link>;
}
