"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { MedicoLayout } from "@/src/components/layouts/medico-layout"
import { DataTable } from "@/src/components/data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Calendar } from "@/src/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { CalendarIcon, ClipboardList, Clock, Pencil, Trash2, Users } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  getConsultas,
  getPacientes,
  createConsulta,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "@/src/lib/medico"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"

// Definindo interfaces para os tipos
interface Consulta {
  id: string
  pacienteId: string
  paciente: string
  data: string
  hora: string
  tipo: string
  status: string
}

interface Paciente {
  id: string
  nome: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  endereco: string
  ultimaConsulta: string
}

export default function MedicoDashboard() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  // Define a tab ativa com base no parâmetro da URL ou usa "agenda" como padrão
  const [activeTab, setActiveTab] = useState(tabParam || "agenda")

  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openConsultaDialog, setOpenConsultaDialog] = useState(false)
  const [openPacienteDialog, setOpenPacienteDialog] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isEditing, setIsEditing] = useState(false)
  const [currentPaciente, setCurrentPaciente] = useState<Paciente | null>(null)
  const [pacienteToDelete, setPacienteToDelete] = useState<Paciente | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)

  const [consultaForm, setConsultaForm] = useState({
    pacienteId: "",
    data: new Date(),
    hora: "",
    tipo: "Consulta",
    observacoes: "",
  })

  const [pacienteForm, setPacienteForm] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    endereco: "",
  })

  useEffect(() => {
    loadData()

    // Atualiza a tab ativa quando o parâmetro da URL muda
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const consultasData = await getConsultas()
      const pacientesData = await getPacientes()

      setConsultas(consultasData)
      setPacientes(pacientesData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConsultaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConsultaForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePacienteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPacienteForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "pacienteId") {
      setConsultaForm((prev) => ({ ...prev, pacienteId: value }))
    } else if (name === "tipo") {
      setConsultaForm((prev) => ({ ...prev, tipo: value }))
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setConsultaForm((prev) => ({ ...prev, data: date }))
    }
  }

  const handleEditPaciente = (paciente: Paciente) => {
    setCurrentPaciente(paciente)
    setPacienteForm({
      nome: paciente.nome,
      cpf: paciente.cpf,
      dataNascimento: paciente.dataNascimento,
      telefone: paciente.telefone,
      email: paciente.email,
      endereco: paciente.endereco,
    })
    setIsEditing(true)
    setOpenPacienteDialog(true)
  }

  const handleDeletePaciente = (paciente: Paciente) => {
    setPacienteToDelete(paciente)
    setDeleteDialogOpen(true)
  }

  const handleViewDetails = (paciente: Paciente) => {
    setSelectedPaciente(paciente)
    setDetailsDialogOpen(true)
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setPacienteToDelete(null)
  }

  const confirmDeletePaciente = async () => {
    if (!pacienteToDelete) return

    setIsLoading(true)
    try {
      await deletePaciente(pacienteToDelete.id)
      await loadData() // Recarrega a lista após excluir
    } catch (error) {
      console.error("Erro ao excluir paciente:", error)
    } finally {
      setIsLoading(false)
      setDeleteDialogOpen(false)
      setPacienteToDelete(null)
    }
  }

  const resetPacienteForm = () => {
    setPacienteForm({
      nome: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      email: "",
      endereco: "",
    })
    setIsEditing(false)
    setCurrentPaciente(null)
    setOpenPacienteDialog(false)
  }

  const resetConsultaForm = () => {
    setConsultaForm({
      pacienteId: "",
      data: new Date(),
      hora: "",
      tipo: "Consulta",
      observacoes: "",
    })
    setOpenConsultaDialog(false)
  }

  const handleConsultaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createConsulta(consultaForm)
      await loadData() // Recarrega a lista após criar
      resetConsultaForm()
    } catch (error) {
      console.error("Erro ao criar consulta:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePacienteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && currentPaciente) {
        // Atualiza paciente existente
        await updatePaciente(currentPaciente.id, pacienteForm)
      } else {
        // Cria novo paciente
        await createPaciente(pacienteForm)
      }

      await loadData() // Recarrega a lista após criar/atualizar
      resetPacienteForm()
    } catch (error) {
      console.error("Erro ao salvar paciente:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Colunas para a tabela de consultas
  const consultasColumns = [
    {
      accessorKey: "data",
      header: "Data",
    },
    {
      accessorKey: "hora",
      header: "Hora",
    },
    {
      accessorKey: "paciente",
      header: "Paciente",
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: { status: string } } }) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            row.original.status === "Confirmada"
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
      cell: ({ row }: { row: { original: Consulta } }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Atender">
            <ClipboardList className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Prontuário">
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  // Colunas para a tabela de pacientes
  const pacientesColumns = [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }: { row: { original: Paciente } }) => (
        <button
          className="text-primary hover:underline text-left font-medium"
          onClick={() => handleViewDetails(row.original)}
        >
          {row.original.nome}
        </button>
      ),
    },
    {
      accessorKey: "cpf",
      header: "CPF",
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "ultimaConsulta",
      header: "Última Consulta",
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: Paciente } }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEditPaciente(row.original)} title="Editar">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => handleDeletePaciente(row.original)}
            title="Remover"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <MedicoLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard Médico</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 consultas pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pacientes.length}</div>
            <p className="text-xs text-muted-foreground">+5 novos este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prontuários Atualizados</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Última atualização: hoje</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
          <TabsTrigger value="prontuarios">Prontuários</TabsTrigger>
        </TabsList>
        <TabsContent value="agenda" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Agenda de Consultas</h2>
            <Dialog
              open={openConsultaDialog}
              onOpenChange={(open) => {
                setOpenConsultaDialog(open)
                if (!open) resetConsultaForm()
              }}
            >
              <DialogTrigger asChild>
                <Button>Agendar Consulta</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleConsultaSubmit}>
                  <DialogHeader>
                    <DialogTitle>Agendar Nova Consulta</DialogTitle>
                    <DialogDescription>Preencha os dados para agendar uma nova consulta</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="paciente">Paciente</Label>
                      <Select
                        value={consultaForm.pacienteId}
                        onValueChange={(value) => handleSelectChange("pacienteId", value)}
                      >
                        <SelectTrigger id="paciente">
                          <SelectValue placeholder="Selecione o paciente" />
                        </SelectTrigger>
                        <SelectContent>
                          {pacientes.map((paciente) => (
                            <SelectItem key={paciente.id} value={paciente.id}>
                              {paciente.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {consultaForm.data ? (
                              format(consultaForm.data, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={consultaForm.data as Date}
                            onSelect={handleDateSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="hora">Horário</Label>
                      <Input
                        id="hora"
                        name="hora"
                        type="time"
                        value={consultaForm.hora}
                        onChange={handleConsultaChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tipo">Tipo de Consulta</Label>
                      <Select value={consultaForm.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                        <SelectTrigger id="tipo">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Consulta">Consulta</SelectItem>
                          <SelectItem value="Retorno">Retorno</SelectItem>
                          <SelectItem value="Exame">Exame</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        name="observacoes"
                        value={consultaForm.observacoes}
                        onChange={handleConsultaChange}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Agendando..." : "Agendar"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Card>
            <CardContent className="p-0">
              <DataTable columns={consultasColumns} data={consultas} isLoading={isLoading} searchColumn="paciente" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pacientes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pacientes</h2>
            <Dialog
              open={openPacienteDialog}
              onOpenChange={(open) => {
                setOpenPacienteDialog(open)
                if (!open) resetPacienteForm()
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setIsEditing(false)
                    resetPacienteForm()
                  }}
                >
                  Cadastrar Paciente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handlePacienteSubmit}>
                  <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Paciente" : "Cadastrar Novo Paciente"}</DialogTitle>
                    <DialogDescription>
                      {isEditing
                        ? "Atualize os dados do paciente"
                        : "Preencha os dados para cadastrar um novo paciente"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input id="nome" name="nome" value={pacienteForm.nome} onChange={handlePacienteChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" name="cpf" value={pacienteForm.cpf} onChange={handlePacienteChange} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                      <Input
                        id="dataNascimento"
                        name="dataNascimento"
                        type="date"
                        value={pacienteForm.dataNascimento}
                        onChange={handlePacienteChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={pacienteForm.telefone}
                        onChange={handlePacienteChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={pacienteForm.email}
                        onChange={handlePacienteChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Textarea
                        id="endereco"
                        name="endereco"
                        value={pacienteForm.endereco}
                        onChange={handlePacienteChange}
                        rows={2}
                      />
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
              <DataTable columns={pacientesColumns} data={pacientes} isLoading={isLoading} searchColumn="nome" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="prontuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prontuários Eletrônicos</CardTitle>
              <CardDescription>Acesse e atualize os prontuários dos seus pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input placeholder="Buscar paciente..." className="max-w-sm" />
                  <Button variant="outline">Buscar</Button>
                </div>
                <div className="rounded-md border">
                  <div className="p-4 text-center text-muted-foreground">
                    Selecione um paciente para visualizar o prontuário
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de confirmação de exclusão */}
      {pacienteToDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o paciente "{pacienteToDelete.nome}"? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={handleCancelDelete} className="mt-2 sm:mt-0">
                Cancelar
              </Button>
              <Button
                onClick={confirmDeletePaciente}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Diálogo de detalhes do paciente */}
      {selectedPaciente && (
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Paciente</DialogTitle>
              <DialogDescription>Informações completas do paciente selecionado</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className="font-medium text-muted-foreground">Nome:</span>
                <span>{selectedPaciente.nome}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className="font-medium text-muted-foreground">CPF:</span>
                <span>{selectedPaciente.cpf}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className="font-medium text-muted-foreground">Data Nasc.:</span>
                <span>{selectedPaciente.dataNascimento}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className="font-medium text-muted-foreground">Telefone:</span>
                <span>{selectedPaciente.telefone}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className="font-medium text-muted-foreground">E-mail:</span>
                <span>{selectedPaciente.email}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className="font-medium text-muted-foreground">Endereço:</span>
                <span>{selectedPaciente.endereco}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className="font-medium text-muted-foreground">Última Consulta:</span>
                <span>{selectedPaciente.ultimaConsulta}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                Fechar
              </Button>
              <Button
                onClick={() => {
                  setDetailsDialogOpen(false)
                  handleEditPaciente(selectedPaciente)
                }}
              >
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MedicoLayout>
  )
}

