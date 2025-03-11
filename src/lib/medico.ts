// Simulação de banco de dados para consultas
let consultas = [
    {
      id: "1",
      pacienteId: "1",
      paciente: "João Silva",
      data: "01/06/2023",
      hora: "09:00",
      tipo: "Consulta",
      status: "Confirmada",
    },
    {
      id: "2",
      pacienteId: "2",
      paciente: "Maria Oliveira",
      data: "01/06/2023",
      hora: "10:30",
      tipo: "Retorno",
      status: "Confirmada",
    },
    {
      id: "3",
      pacienteId: "3",
      paciente: "Pedro Costa",
      data: "01/06/2023",
      hora: "14:00",
      tipo: "Exame",
      status: "Pendente",
    },
    {
      id: "4",
      pacienteId: "4",
      paciente: "Lucia Ferreira",
      data: "02/06/2023",
      hora: "08:30",
      tipo: "Consulta",
      status: "Confirmada",
    },
    {
      id: "5",
      pacienteId: "5",
      paciente: "Roberto Alves",
      data: "02/06/2023",
      hora: "11:00",
      tipo: "Consulta",
      status: "Cancelada",
    },
  ]
  
  // Simulação de banco de dados para pacientes
  let pacientes = [
    {
      id: "1",
      nome: "João Silva",
      cpf: "123.456.789-00",
      dataNascimento: "1980-05-15",
      telefone: "(11) 98765-4321",
      email: "joao@exemplo.com",
      endereco: "Rua A, 123",
      ultimaConsulta: "01/06/2023",
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      cpf: "987.654.321-00",
      dataNascimento: "1975-10-20",
      telefone: "(11) 91234-5678",
      email: "maria@exemplo.com",
      endereco: "Av. B, 456",
      ultimaConsulta: "01/06/2023",
    },
    {
      id: "3",
      nome: "Pedro Costa",
      cpf: "456.789.123-00",
      dataNascimento: "1990-03-25",
      telefone: "(11) 92345-6789",
      email: "pedro@exemplo.com",
      endereco: "Rua C, 789",
      ultimaConsulta: "01/06/2023",
    },
    {
      id: "4",
      nome: "Lucia Ferreira",
      cpf: "789.123.456-00",
      dataNascimento: "1985-12-10",
      telefone: "(11) 93456-7890",
      email: "lucia@exemplo.com",
      endereco: "Av. D, 1010",
      ultimaConsulta: "02/06/2023",
    },
    {
      id: "5",
      nome: "Roberto Alves",
      cpf: "321.654.987-00",
      dataNascimento: "1970-07-30",
      telefone: "(11) 94567-8901",
      email: "roberto@exemplo.com",
      endereco: "Rua E, 1111",
      ultimaConsulta: "02/06/2023",
    },
  ]
  
  export async function getConsultas() {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    return consultas
  }
  
  export async function getPacientes() {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    return pacientes
  }
  
  export async function createConsulta(data: {
    pacienteId: string
    data: Date
    hora: string
    tipo: string
    observacoes: string
  }) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Encontra o paciente pelo ID
    const paciente = pacientes.find((p) => p.id === data.pacienteId)
  
    if (!paciente) {
      throw new Error("Paciente não encontrado")
    }
  
    // Formata a data
    const dataFormatada = `${data.data.getDate().toString().padStart(2, "0")}/${(data.data.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${data.data.getFullYear()}`
  
    // Cria uma nova consulta
    const novaConsulta = {
      id: (consultas.length + 1).toString(),
      pacienteId: data.pacienteId,
      paciente: paciente.nome,
      data: dataFormatada,
      hora: data.hora,
      tipo: data.tipo,
      status: "Pendente",
    }
  
    // Adiciona a consulta ao "banco de dados"
    consultas.push(novaConsulta)
  
    // Atualiza a última consulta do paciente
    const pacienteIndex = pacientes.findIndex((p) => p.id === data.pacienteId)
    pacientes[pacienteIndex].ultimaConsulta = dataFormatada
  
    return novaConsulta
  }
  
  export async function createPaciente(data: {
    nome: string
    cpf: string
    dataNascimento: string
    telefone: string
    email: string
    endereco: string
  }) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Verifica se o CPF já está em uso
    if (pacientes.some((p) => p.cpf === data.cpf)) {
      throw new Error("CPF já cadastrado")
    }
  
    // Cria um novo paciente
    const novoPaciente = {
      id: (pacientes.length + 1).toString(),
      nome: data.nome,
      cpf: data.cpf,
      dataNascimento: data.dataNascimento,
      telefone: data.telefone,
      email: data.email,
      endereco: data.endereco,
      ultimaConsulta: "-",
    }
  
    // Adiciona o paciente ao "banco de dados"
    pacientes.push(novoPaciente)
  
    return novoPaciente
  }
  
  export async function updatePaciente(
    id: string,
    data: {
      nome?: string
      cpf?: string
      dataNascimento?: string
      telefone?: string
      email?: string
      endereco?: string
    },
  ) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Encontra o paciente pelo ID
    const index = pacientes.findIndex((p) => p.id === id)
  
    if (index === -1) {
      throw new Error("Paciente não encontrado")
    }
  
    // Verifica se o CPF já está em uso por outro paciente
    if (data.cpf && data.cpf !== pacientes[index].cpf) {
      if (pacientes.some((p) => p.cpf === data.cpf && p.id !== id)) {
        throw new Error("CPF já cadastrado para outro paciente")
      }
    }
  
    // Atualiza os dados do paciente
    pacientes[index] = {
      ...pacientes[index],
      ...data,
    }
  
    return pacientes[index]
  }
  
  export async function deletePaciente(id: string) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Encontra o paciente pelo ID
    const index = pacientes.findIndex((p) => p.id === id)
  
    if (index === -1) {
      throw new Error("Paciente não encontrado")
    }
  
    // Remove o paciente do "banco de dados"
    pacientes = pacientes.filter((p) => p.id !== id)
  
    // Remove também as consultas associadas a este paciente
    consultas = consultas.filter((c) => c.pacienteId !== id)
  
    return true
  }
  
  