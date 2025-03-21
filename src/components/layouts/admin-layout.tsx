"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { Building2, FileText, LogOut, Menu, Settings, Stethoscope, User, Users, Bell, ChevronDown } from "lucide-react"
import { cn } from "@/src/lib/utils"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "subadmins"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Rotas do menu com verificação de rota ativa
  const routes = [
    {
      href: "/admin/dashboard?tab=subadmins",
      label: "Subadministradores",
      icon: Users,
      active: pathname === "/admin/dashboard" && searchParams.get("tab") === "subadmins",
    },
    {
      href: "/admin/dashboard?tab=relatorios",
      label: "Relatórios",
      icon: FileText,
      active: pathname === "/admin/dashboard" && searchParams.get("tab") === "relatorios",
    },
    {
      href: "/admin/dashboard?tab=configuracoes",
      label: "Configurações",
      icon: Settings,
      active: pathname === "/admin/dashboard" && searchParams.get("tab") === "configuracoes",
    },
  ]

  // Navegação programática
  const handleNavigate = (path: string) => router.push(path)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white shadow-sm px-4 md:px-6">
        {/* Menu Mobile (Sheet) com fundo branco */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          {/* Adicionamos "bg-white" para garantir o fundo branco no menu mobile */}
          <SheetContent side="left" className="w-72 bg-white">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Building2 className="h-6 w-6" />
                <span className="font-bold">ClinicaGestão</span>
              </Link>
              <div className="my-4 h-px bg-muted" />
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

        {/* Ações de Perfil e Notificações */}
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
                  <span className="text-sm font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">admin@clinicagestao.com.br</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4} className="bg-white">
              <DropdownMenuItem onClick={() => handleNavigate("/admin/dashboard?tab=subadmins")}>
                <User className="h-4 w-4 mr-2" />
                <span>Minha Conta</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/admin/dashboard?tab=configuracoes")}>
                <Settings className="h-4 w-4 mr-2" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/login")}>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/admin/dashboard?tab=configuracoes">
            <Button variant="ghost" size="icon" title="Configurações">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  )
}
