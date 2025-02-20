"use client"

import type React from "react"

import { useState } from "react"

export default function Cadastro() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [cpf, setCpf] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [telefone, setTelefone] = useState("")
  const [genero, setGenero] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você normalmente enviaria os dados para o backend
    console.log("Cadastro enviado:", { email, senha, cpf, dataNascimento, telefone, genero })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full px-6 py-8 rounded-lg shadow-md text-black">
        <h1 className="text-2xl font-bold mb-5">Cadastro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="senha" className="block mb-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block mb-1">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="dataNascimento" className="block mb-1">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="dataNascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="telefone" className="block mb-1">
              Número de Telefone
            </label>
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="genero" className="block mb-1">
              Gênero
            </label>
            <select
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione o gênero</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

