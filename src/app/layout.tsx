import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SaaSHealer",
  description: "Sua solução completa para gestão de saúde",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

