"use client"
import GlassmorphismCard from "../../components/glassmorphism-card"
import { Users, Calendar, Activity, Settings } from "lucide-react"

export default function AdminDashboard() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Painel Administrativo</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassmorphismCard>
            <div className="flex flex-col items-center text-center p-2">
              <Users className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-1">Usuários</h3>
              <p className="text-white/80">1,245</p>
            </div>
          </GlassmorphismCard>

          <GlassmorphismCard>
            <div className="flex flex-col items-center text-center p-2">
              <Calendar className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-1">Consultas</h3>
              <p className="text-white/80">328</p>
            </div>
          </GlassmorphismCard>

          <GlassmorphismCard>
            <div className="flex flex-col items-center text-center p-2">
              <Activity className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-1">Médicos</h3>
              <p className="text-white/80">42</p>
            </div>
          </GlassmorphismCard>

          <GlassmorphismCard>
            <div className="flex flex-col items-center text-center p-2">
              <Settings className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-1">Configurações</h3>
              <p className="text-white/80">Sistema</p>
            </div>
          </GlassmorphismCard>
        </div>

        <GlassmorphismCard>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white mb-4">Visão Geral do Sistema</h2>
            <p className="text-white/80 mb-6">
              Bem-vindo ao painel administrativo do SaaSHealer. Aqui você pode gerenciar usuários, médicos, consultas e
              configurações do sistema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Atividades Recentes</h3>
                <ul className="space-y-2">
                  <li className="text-white/80">Novo médico cadastrado - 2h atrás</li>
                  <li className="text-white/80">15 novas consultas agendadas - 5h atrás</li>
                  <li className="text-white/80">Atualização do sistema - 1d atrás</li>
                  <li className="text-white/80">Backup de dados realizado - 2d atrás</li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-2">Tarefas Pendentes</h3>
                <ul className="space-y-2">
                  <li className="text-white/80">Aprovar 5 novos médicos</li>
                  <li className="text-white/80">Revisar relatórios mensais</li>
                  <li className="text-white/80">Atualizar termos de serviço</li>
                  <li className="text-white/80">Verificar segurança do sistema</li>
                </ul>
              </div>
            </div>
          </div>
        </GlassmorphismCard>
      </div>
    </main>
  )
}

