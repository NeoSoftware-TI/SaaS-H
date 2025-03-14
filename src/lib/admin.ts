// Simulação de banco de dados para subadmins
let subadmins = [
    { id: "1", nome: "Clínica ABC", email: "clinica@exemplo.com", clinica: "Clínica ABC", status: "Ativo" },
    { id: "2", nome: "Clínica XYZ", email: "xyz@exemplo.com", clinica: "Clínica XYZ", status: "Ativo" },
    { id: "3", nome: "Centro Médico", email: "centro@exemplo.com", clinica: "Centro Médico", status: "Inativo" },
  ]
  
  export async function getSubadmins() {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    return subadmins
  }
  
  export async function createSubadmin(data: {
    nome: string
    email: string
    clinica: string
    senha: string
    status: string
  }) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Verifica se o e-mail já está em uso
    if (subadmins.some((s) => s.email === data.email)) {
      throw new Error("E-mail já cadastrado")
    }
  
    // Cria um novo subadmin
    const newSubadmin = {
      id: (subadmins.length + 1).toString(),
      nome: data.nome,
      email: data.email,
      clinica: data.clinica,
      status: data.status,
    }
  
    // Adiciona o subadmin ao "banco de dados"
    subadmins.push(newSubadmin)
  
    return newSubadmin
  }
  
  export async function updateSubadmin(
    id: string,
    data: {
      nome?: string
      email?: string
      clinica?: string
      status?: string
    },
  ) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Encontra o subadmin pelo ID
    const index = subadmins.findIndex((s) => s.id === id)
  
    if (index === -1) {
      throw new Error("Subadmin não encontrado")
    }
  
    // Atualiza os dados do subadmin
    subadmins[index] = {
      ...subadmins[index],
      ...data,
    }
  
    return subadmins[index]
  }
  
  export async function deleteSubadmin(id: string) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Encontra o subadmin pelo ID
    const index = subadmins.findIndex((s) => s.id === id)
  
    if (index === -1) {
      throw new Error("Subadmin não encontrado")
    }
  
    // Remove o subadmin do "banco de dados"
    subadmins = subadmins.filter((s) => s.id !== id)
  
    return true
  }
  
  