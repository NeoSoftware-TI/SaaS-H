"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubadminLayout } from "@/components/layouts/subadmin-layout"
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
import { BarChart, FileText, Stethoscope, Users } from "lucide-react"
import { getMedicos, createMedico, updateMedico, deleteMedico } from "@/lib/subadmin"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Medico {
  id: string
  nome: string
  especialidade: string
  crm: string
  email: string
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

export default function SubadminDashboard() {
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [faturamento, setFaturamento] = useState<FaturamentoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentMedico, setCurrentMedico] = useState<Medico | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [medicoToDelete, setMedicoToDelete] = useState<Medico | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
    crm: "",
    email: "",
    senha: "",
    status: "Ativo",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const medicosData = await getMedicos()
      setMedicos(medicosData)

      // Simulação de dados de faturamento
      setFaturamento([
        {
          id: "001",
          data: "01/06/2023",
          paciente: "João Silva",
          medico: "Dra. Ana Souza",
          valor: 250.0,
          status: "Pago",
        },
        {
          id: "002",
          data: "03/06/2023",
          paciente: "Maria Oliveira",
          medico: "Dr. Carlos Santos",
          valor: 300.0,
          status: "Pago",
        },
        {
          id: "003",
          data: "05/06/2023",
          paciente: "Pedro Costa",
          medico: "Dra. Ana Souza",
          valor: 250.0,
          status: "Pendente",
        },
        {
          id: "004",
          data: "08/06/2023",
          paciente: "Lucia Ferreira",
          medico: "Dr. Carlos Santos",
          valor: 350.0,
          status: "Cancelado",
        },
        {
          id: "005",
          data: "10/06/2023",
          paciente: "Roberto Alves",
          medico: "Dra. Ana Souza",
          valor: 250.0,
          status: "Pago",
        },
      ])
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
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

  const handleEdit = (medico: Medico) => {
    setCurrentMedico(medico)
    setFormData({
      nome: medico.nome,
      especialidade: medico.especialidade,
      crm: medico.crm,
      email: medico.email,
      senha: "",
      status: medico.status,
    })
    setIsEditing(true)
    setOpenDialog(true)
  }

  const handleDelete = (medico: Medico) => {
    setMedicoToDelete(medico)
    setDeleteDialogOpen(true)
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setMedicoToDelete(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && currentMedico) {
        const updatedData = { ...formData }
        if (!updatedData.senha) {
          const { senha, ...dataWithoutSenha } = updatedData
          await updateMedico(currentMedico.id, dataWithoutSenha)
        } else {
          await updateMedico(currentMedico.id, updatedData)
        }
      } else {
        await createMedico(formData)
      }

      await loadData()
      resetForm()
    } catch (error) {
      console.error("Erro ao salvar médico:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      especialidade: "",
      crm: "",
      email: "",
      senha: "",
      status: "Ativo",
    })
    setIsEditing(false)
    setCurrentMedico(null)
    setOpenDialog(false)
  }

  const confirmDelete = async () => {
    if (!medicoToDelete) return

    try {
      setIsLoading(true)
      await deleteMedico(medicoToDelete.id)
      await loadData()
      setDeleteDialogOpen(false)
      setMedicoToDelete(null)
    } catch (error) {
      console.error("Erro ao excluir médico:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "especialidade",
      header: "Especialidade",
    },
    {
      accessorKey: "crm",
      header: "CRM",
    },
    {
      accessorKey: "email",
      header: "E-mail",
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
      cell: ({ row }: { row: { original: any } }) => (
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

  const faturamentoColumns = [
    {
      accessorKey: "id",
      header: "Nº",
    },
    {
      accessorKey: "data",
      header: "Data",
    },
    {
      accessorKey: "paciente",
      header: "Paciente",
    },
    {
      accessorKey: "medico",
      header: "Médico",
    },
    {
      accessorKey: "valor",
      header: "Valor",
      cell: ({ row }: { row: { original: FaturamentoItem } }) => (
        <div>R$ {row.original.valor.toFixed(2).replace(".", ",")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: FaturamentoItem } }) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            row.original.status === "Pago"
              ? "bg-green-100 text-green-800"
              : row.original.status === "Pendente"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: FaturamentoItem } }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Emitir NF
          </Button>
          <Button variant="ghost" size="sm">
            Detalhes
          </Button>
        </div>
      ),
    },
  ]

  return (
    <SubadminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard da Clínica</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Médicos</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicos.length}</div>
            <p className="text-xs text-muted-foreground">+1 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Atendidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+18% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Mensal</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 32.450,00</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notas Fiscais Emitidas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="medicos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="medicos">Médicos</TabsTrigger>
          <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
        </TabsList>
        <TabsContent value="medicos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gerenciar Médicos</h2>
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
                  Adicionar Médico
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Médico" : "Adicionar Médico"}</DialogTitle>
                    <DialogDescription>
                      {isEditing ? "Atualize os dados do médico" : "Preencha os dados para cadastrar um novo médico"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="especialidade">Especialidade</Label>
                      <Input
                        id="especialidade"
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="crm">CRM</Label>
                      <Input id="crm" name="crm" value={formData.crm} onChange={handleChange} required />
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
              <DataTable columns={columns} data={medicos} isLoading={isLoading} searchColumn="nome" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faturamento" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Faturamento e Notas Fiscais</h2>
            <Button>Emitir Nova Nota Fiscal</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={faturamentoColumns}
                data={faturamento}
                isLoading={isLoading}
                searchColumn="paciente"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="desempenho" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Médicos</CardTitle>
              <CardDescription>Análise de produtividade e satisfação dos pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Consultas Realizadas por Médico</h3>
                  <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Gráfico de barras com total de consultas por médico</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Avaliação dos Pacientes</h3>
                  <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Gráfico de satisfação dos pacientes por médico</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de confirmação de exclusão */}
      {medicoToDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o médico "{medicoToDelete.nome}"? Esta ação não pode ser desfeita.
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
    </SubadminLayout>
  )
}

