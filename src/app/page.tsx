import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Bem-vindo ao SaúdeSaaS</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Plataforma inovadora para profissionais de saúde e pacientes, oferecendo automação de atendimentos, avaliações
        médicas, agendamentos e muito mais.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Acesso Profissional
        </Link>
        <Link
          href="/agendamento"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-300"
        >
          Agendar Consulta
        </Link>
      </div>
    </div>
  )
}

