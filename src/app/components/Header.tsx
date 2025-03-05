import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            SaaSHealer
          </Link>
          <nav>
            <Link href="/login" className="text-white/90 hover:text-white transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
