import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-lg">
          Bem-vindo ao SaaSHealer
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
          Sua solução completa para gestão de saúde
        </p>
        <Link
          href="/login"
          className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <span>Começar Agora</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

      </div>
    </section>
  )
}