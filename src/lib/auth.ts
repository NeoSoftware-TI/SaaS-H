// Simulação de banco de dados para autenticação
const users = [
    { id: "1", nome: "Admin", email: "admin@exemplo.com", senha: "senha123", role: "admin" },
    { id: "2", nome: "Clínica ABC", email: "clinica@exemplo.com", senha: "senha123", role: "subadmin" },
    { id: "3", nome: "Dr. Carlos Santos", email: "carlos@exemplo.com", senha: "senha123", role: "medico" },
  ]
  
  export async function loginUser(email: string, password: string) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    const user = users.find((u) => u.email === email && u.senha === password)
  
    if (!user) {
      throw new Error("Credenciais inválidas")
    }
  
    // Simula o armazenamento do usuário na sessão
    localStorage.setItem("currentUser", JSON.stringify(user))
  
    return user
  }
  
  export async function registerUser(userData: {
    nome: string
    email: string
    senha: string
    role: string
  }) {
    // Simula um atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Verifica se o e-mail já está em uso
    if (users.some((u) => u.email === userData.email)) {
      throw new Error("E-mail já cadastrado")
    }
  
    // Cria um novo usuário
    const newUser = {
      id: (users.length + 1).toString(),
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha,
      role: userData.role,
    }
  
    // Adiciona o usuário ao "banco de dados"
    users.push(newUser)
  
    return newUser
  }
  
  export async function getCurrentUser() {
    // Simula a obtenção do usuário atual da sessão
    const userJson = localStorage.getItem("currentUser")
  
    if (!userJson) {
      return null
    }
  
    return JSON.parse(userJson)
  }
  
  export async function logoutUser() {
    // Simula o logout removendo o usuário da sessão
    localStorage.removeItem("currentUser")
  
    return true
  }
  
  