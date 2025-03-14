"use client"

import React from "react"
import Link from "next/link"

// Componente de links de navegação com rolagem suave para seções
export function NavLinks() {
  // Função que impede a navegação padrão e realiza a rolagem suave para o elemento com o id fornecido
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
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
      <Link
        href="/precos"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
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
