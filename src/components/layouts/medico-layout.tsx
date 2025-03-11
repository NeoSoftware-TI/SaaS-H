"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  LogOut,
  Menu,
  Settings,
  Stethoscope,
  User,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MedicoLayoutProps {
  children: React.ReactNode
}

export function MedicoLayout({ children }: MedicoLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Remover a entrada de configurações do array de rotas
  const routes = [
    {
      href: "/medico/dashboard",
      label: "Dashboard",
      icon: Stethoscope,
      active: pathname === "/medico/dashboard",
    },
    {
      href: "/medico/agenda",
      label: "Agenda",
      icon: Calendar,
      active: pathname === "/medico/agenda",
    },
    {
      href: "/medico/pacientes",
      label: "Pacientes",
      icon: Users,
      active: pathname === "/medico/pacientes",
    },
    {
      href: "/medico/prontuarios",
      label: "Prontuários",
      icon: ClipboardList,
      active: pathname === "/medico/prontuarios",
    },
  ]

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white shadow-sm px-4 md:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Stethoscope className="h-6 w-6" />
                <span className="font-bold">ClinicaGestão</span>
              </Link>
              <div className="my-4 h-px bg-muted" />
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md",
                    route.active ? "text-primary bg-muted" : "text-muted-foreground",
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
        <Link href="/" className="flex items-center gap-2 md:ml-0">
          <Stethoscope className="h-6 w-6" />
          <span className="font-bold hidden md:inline-block">ClinicaGestão</span>
        </Link>
        <div className="flex-1">
          <nav className="hidden md:flex gap-6 ml-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium",
                  route.active ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
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
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">Dr. Carlos Santos</span>
                  <span className="text-xs text-muted-foreground">carlos@exemplo.com.br</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4} className="bg-white">
              <DropdownMenuItem onClick={() => handleNavigate("/medico/perfil")}>
                <User className="h-4 w-4 mr-2" />
                <span>Minha Conta</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/medico/configuracoes")}>
                <Settings className="h-4 w-4 mr-2" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/login")}>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/medico/configuracoes">
            <Button variant="ghost" size="icon" title="Configurações">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  )
}

