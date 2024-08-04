import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <Link href="/">
        <h1 className="text-2xl font-bold">TFDIM</h1>
      </Link>
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link href="/account">Account</Link>
        <Link href="/metadata">Metadata</Link>
      </nav>
    </header>
  );
}
