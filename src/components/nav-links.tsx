"use client"

import type React from "react"

import Link from "next/link"

export function NavLinks() {
  // Função para rolagem suave
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <Link
        href="#features"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        onClick={(e) => scrollToSection(e, "features")}
      >
        Sobre
      </Link>
      <Link href="/precos" className="transition-colors hover:text-foreground/80 text-foreground/60">
        Preços
      </Link>
      <Link
        href="#contato"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
        onClick={(e) => scrollToSection(e, "contato")}
      >
        Contato
      </Link>
    </nav>
  )
}

