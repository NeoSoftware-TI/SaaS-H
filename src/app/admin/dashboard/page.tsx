"use client"

import { AlertDialogFooter } from "@/components/ui/alert-dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { DataTable } from "@/components/data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Building2, Users } from "lucide-react"
import { getSubadmins, createSubadmin, updateSubadmin, deleteSubadmin } from "@/lib/admin"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Definindo interfaces para os tipos
interface Subadmin {
  id: string
  nome: string
  email: string
  clinica: string
  status: string
}

interface FaturamentoItem {
  id: string
  data: string
  paciente: string
  medico: string
  valor: number
  status: string
}

export default function AdminDashboard() {
  const [subadmins, setSubadmins] = useState<Subadmin[]>([])
  const [faturamento, setFaturamento] = useState<FaturamentoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentSubadmin, setCurrentSubadmin] = useState<Subadmin | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [subadminToDelete, setSubadminToDelete] = useState<Subadmin | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    clinica: "",
    senha: "",
    status: "Ativo",
  })

  useEffect(() => {
    loadSubadmins()
  }, [])

  const loadSubadmins = async () => {
    setIsLoading(true)
    try {
      const data = await getSubadmins()
      setSubadmins(data)
    } catch (error) {
      console.error("Erro ao carregar subadmins:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleEdit = (subadmin: Subadmin) => {
    setCurrentSubadmin(subadmin)
    setFormData({
      nome: subadmin.nome,
      email: subadmin.email,
      clinica: subadmin.clinica,
      senha: "",
      status: subadmin.status,
    })
    setIsEditing(true)
    setOpenDialog(true)
  }

  const handleDelete = (subadmin: Subadmin) => {
    setSubadminToDelete(subadmin)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!subadminToDelete) return

    setIsLoading(true)
    try {
      await deleteSubadmin(subadminToDelete.id)
      await loadSubadmins() // Recarrega a lista após excluir
    } catch (error) {
      console.error("Erro ao excluir subadmin:", error)
    } finally {
      setIsLoading(false)
      setDeleteDialogOpen(false)
      setSubadminToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setSubadminToDelete(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && currentSubadmin) {
        // Atualiza subadmin existente
        const updatedData = { ...formData }
        // Remove senha se estiver vazia (não atualiza a senha)
        if (!updatedData.senha) {
          const { senha, ...dataWithoutSenha } = updatedData
          await updateSubadmin(currentSubadmin.id, dataWithoutSenha)
        } else {
          await updateSubadmin(currentSubadmin.id, updatedData)
        }
      } else {
        // Cria novo subadmin
        await createSubadmin(formData)
      }

      // Recarrega a lista após criar/atualizar
      await loadSubadmins()

      // Reseta o formulário e fecha o diálogo
      resetForm()
    } catch (error) {
      console.error("Erro ao salvar subadmin:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      clinica: "",
      senha: "",
      status: "Ativo",
    })
    setIsEditing(false)
    setCurrentSubadmin(null)
    setOpenDialog(false)
  }

  // Colunas para a tabela de subadmins
  const columns = [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "clinica",
      header: "Clínica",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: { status: string } } }) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            row.original.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: Subadmin } }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleEdit(row.original)}>
            Editar
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(row.original)}>
            Remover
          </Button>
        </div>
      ),
    },
  ]

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Subadmins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subadmins.length}</div>
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clínicas Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subadmins" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subadmins">Subadministradores</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="subadmins" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gerenciar Subadministradores</h2>
            <Dialog
              open={openDialog}
              onOpenChange={(open) => {
                setOpenDialog(open)
                if (!open) resetForm()
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setIsEditing(false)
                    resetForm()
                  }}
                >
                  Adicionar Subadmin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Subadministrador" : "Adicionar Subadministrador"}</DialogTitle>
                    <DialogDescription>
                      {isEditing
                        ? "Atualize os dados do subadministrador"
                        : "Preencha os dados para criar um novo subadministrador"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="clinica">Nome da Clínica</Label>
                      <Input id="clinica" name="clinica" value={formData.clinica} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="senha">
                        {isEditing ? "Senha (deixe em branco para manter a atual)" : "Senha"}
                      </Label>
                      <Input
                        id="senha"
                        name="senha"
                        type="password"
                        value={formData.senha}
                        onChange={handleChange}
                        required={!isEditing}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={handleSelectChange}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Card>
            <CardContent className="p-0">
              <DataTable columns={columns} data={subadmins} isLoading={isLoading} searchColumn="nome" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Visualize e exporte relatórios do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Relatório de Clínicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Relatório de Faturamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Gerar Relatório
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="configuracoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Gerencie as configurações gerais do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input id="company-name" defaultValue="ClinicaGestão" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">E-mail de Suporte</Label>
                  <Input id="support-email" type="email" defaultValue="suporte@clinicagestao.com.br" />
                </div>
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de confirmação de exclusão */}
      {subadminToDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o subadministrador "{subadminToDelete.nome}"? Esta ação não pode ser
                desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={handleCancelDelete} className="mt-2 sm:mt-0">
                Cancelar
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AdminLayout>
  )
}

