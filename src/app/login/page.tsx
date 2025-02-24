"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import GlassmorphismCard from "../components/glassmorphism-card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 

  return (
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <GlassmorphismCard>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Login</h1>
              <p className="text-white/80">Bem-vindo de volta!</p>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Entrar
              </button>
            </form>

            <p className="mt-6 text-center text-white/80">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-white hover:text-white/90 underline">
                Cadastre-se
              </Link>
            </p>
          </GlassmorphismCard>
        </div>
      </div>
    </main>
  )
}

