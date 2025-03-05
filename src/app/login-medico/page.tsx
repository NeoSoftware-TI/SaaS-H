"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import Link from "next/link"
import GlassmorphismCard from "../components/glassmorphism-card"

export default function LoginMedico() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulação de login - em produção, você faria uma chamada à API
    if (email && password) {
      router.push("/medico/dashboard")
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <GlassmorphismCard>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Login do Médico</h1>
              <p className="text-white/80">Acesse sua área de gerenciamento</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
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
                className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Entrar
              </button>
            </form>

            <p className="mt-6 text-center text-white/80">
              <Link href="/login" className="text-white hover:text-white/90 underline">
                Voltar para login de usuário
              </Link>
            </p>
          </GlassmorphismCard>
        </div>
      </div>
    </main>
  )
}
