import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Configuração da fonte Inter (Latin)
const inter = Inter({ subsets: ["latin"] })

// Metadados da aplicação
export const metadata: Metadata = {
  title: "ClinicaGestão - Sistema de Gestão para Clínicas Médicas",
  description:
    "Sistema completo de gestão para clínicas médicas com controle de pacientes, agendamentos e faturamento",
}

// Layout raiz da aplicação Next.js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
