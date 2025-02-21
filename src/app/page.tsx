import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 via-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="relative rounded-xl bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white shadow-lg md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">SaaS Saúde</h1>
              <p className="text-lg opacity-90">Sua plataforma completa para gestão de saúde</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-2 font-medium text-blue-600 hover:bg-blue-50"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="inline-flex items-center justify-center rounded-md border border-white px-6 py-2 font-medium text-white hover:bg-white/10"
                >
                  Cadastrar
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Healthcare"
                width={300}
                height={300}
                className="ml-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Agendamento Online</h3>
            <p className="text-gray-600">Marque suas consultas de forma rápida e prática</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Atendimento Garantido</h3>
            <p className="text-gray-600">Profissionais qualificados à sua disposição</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Suporte Online</h3>
            <p className="text-gray-600">Atendimento e suporte quando precisar</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-green-500 px-4 py-12 md:py-24">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Pronto para começar?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white text-opacity-90">
            Junte-se a milhares de pacientes e profissionais que já estão transformando o cuidado com a saúde.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 font-medium text-blue-600 hover:bg-blue-50"
          >
            Criar conta gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}

