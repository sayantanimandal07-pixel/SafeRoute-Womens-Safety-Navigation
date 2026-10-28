import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-rose-600">
          SheSafe
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/sos" className="hover:text-rose-600">
            SOS
          </Link>
          <Link href="/map" className="hover:text-rose-600">
            Live Map
          </Link>
          <Link href="/volunteer" className="hover:text-rose-600">
            Volunteer
          </Link>
          <Link href="/helplines" className="hover:text-rose-600">
            Helplines
          </Link>
        </nav>
      </div>
    </header>
  );
}
