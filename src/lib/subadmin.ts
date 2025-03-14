// Simulação de banco de dados para médicos
let medicos = [
    {
      id: "1",
      nome: "Dra. Ana Souza",
      especialidade: "Cardiologia",
      crm: "12345-SP",
      email: "ana@exemplo.com",
      status: "Ativo",
    },
    {
      id: "2",
      nome: "Dr. Carlos Santos",
      especialidade: "Ortopedia",
      crm: "54321-SP",
      email: "carlos@exemplo.com",
      status: "Ativo",
    },
    {
      id: "3",
      nome: "Dr. Roberto Almeida",
      especialidade: "Dermatologia",
      crm: "67890-SP",
      email: "roberto@exemplo.com",
      status: "Inativo",
    },
  ]
  
  export async function getMedicos() {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    return medicos
  }
  
  export async function createMedico(data: {
    nome: string
    especialidade: string
    crm: string
    email: string
    senha: string
    status: string
  }) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Verifica se o e-mail já está em uso
    if (medicos.some((m) => m.email === data.email)) {
      throw new Error("E-mail já cadastrado")
    }
  
    // Verifica se o CRM já está em uso
    if (medicos.some((m) => m.crm === data.crm)) {
      throw new Error("CRM já cadastrado")
    }
  
    // Cria um novo médico
    const novoMedico = {
      id: (medicos.length + 1).toString(),
      nome: data.nome,
      especialidade: data.especialidade,
      crm: data.crm,
      email: data.email,
      status: data.status,
    }
  
    // Adiciona o médico ao "banco de dados"
    medicos.push(novoMedico)
  
    return novoMedico
  }
  
  export async function updateMedico(
    id: string,
    data: {
      nome?: string
      especialidade?: string
      crm?: string
      email?: string
      status?: string
    },
  ) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Encontra o médico pelo ID
    const index = medicos.findIndex((m) => m.id === id)
  
    if (index === -1) {
      throw new Error("Médico não encontrado")
    }
  
    // Atualiza os dados do médico
    medicos[index] = {
      ...medicos[index],
      ...data,
    }
  
    return medicos[index]
  }
  
  export async function deleteMedico(id: string) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Encontra o médico pelo ID
    const index = medicos.findIndex((m) => m.id === id)
  
    if (index === -1) {
      throw new Error("Médico não encontrado")
    }
  
    // Remove o médico do "banco de dados"
    medicos = medicos.filter((m) => m.id !== id)
  
    return true
  }
  
  