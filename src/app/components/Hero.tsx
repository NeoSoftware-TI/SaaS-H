import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full min-h-screen pt-16 flex items-center justify-center">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-white mb-8">Bem-vindo ao SaaSHealer</h1>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">Sua solução completa para gestão de saúde</p>
        <Link
          href="/cadastro"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Começar Agora
        </Link>
      </div>
    </section>
  )
}

