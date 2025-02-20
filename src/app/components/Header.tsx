import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="text-lg font-semibold text-gray-800">
              SaaSSaúde
            </Link>
          </li>
          <li className="flex items-center space-x-4">
            <Link href="/agendamento" className="text-gray-600 hover:text-gray-800">
              Agendar Consulta
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
            <Link href="/cadastro" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> 
              Cadastro
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}



