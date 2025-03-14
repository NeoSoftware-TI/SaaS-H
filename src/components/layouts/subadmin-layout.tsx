"use client"

import React, { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import {
  BarChart,
  Bell,
  Building2,
  ChevronDown,
  FileText,
  LogOut,
  Menu,
  Settings,
  Stethoscope,
  User,
} from "lucide-react"
import { cn } from "@/src/lib/utils"

interface SubadminLayoutProps {
  children: React.ReactNode
}

export function SubadminLayout({ children }: SubadminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Define a aba atual a partir do query param "tab" ou "medicos" por padrão
  const currentTab = searchParams.get("tab") || "medicos"
  // Estado para controlar o menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Rotas do menu com ícone e verificação se a rota está ativa
  const routes = [
    {
      href: "/subadmin?tab=medicos",
      label: "Médicos",
      icon: Stethoscope,
      active: currentTab === "medicos",
    },
    {
      href: "/subadmin?tab=faturamento",
      label: "Faturamento",
      icon: BarChart,
      active: currentTab === "faturamento",
    },
    {
      href: "/subadmin?tab=desempenho",
      label: "Desempenho",
      icon: BarChart,
      active: currentTab === "desempenho",
    },
  ]

  // Função para navegação programática
  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white shadow-sm px-4 md:px-6">
        {/* Menu Mobile com Sheet */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              {/* Logo no menu mobile */}
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building2 className="h-6 w-6" />
                <span className="font-bold">ClinicaGestão</span>
              </Link>
              <div className="my-4 h-px bg-muted" />
              {/* Renderização das rotas do menu */}
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md",
                    route.active ? "text-primary bg-muted" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo para Desktop */}
        <Link href="/" className="flex items-center gap-2 md:ml-0">
          <Building2 className="h-6 w-6" />
          <span className="font-bold hidden md:inline-block">ClinicaGestão</span>
        </Link>

        {/* Menu Desktop */}
        <div className="flex-1">
          <nav className="hidden md:flex gap-6 ml-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium",
                  route.active ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Ações de perfil e notificações */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">Clínica ABC</span>
                  <span className="text-xs text-muted-foreground">clinica@exemplo.com.br</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4} className="bg-white">
              <DropdownMenuItem onClick={() => handleNavigate("/subadmin/perfil")}>
                <User className="h-4 w-4 mr-2" />
                <span>Minha Conta</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/subadmin/configuracoes")}>
                <Settings className="h-4 w-4 mr-2" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/login")}>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/subadmin/configuracoes">
            <Button variant="ghost" size="icon" title="Configurações">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  )
}
