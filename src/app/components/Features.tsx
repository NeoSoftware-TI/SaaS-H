import GlassmorphismCard from "./glassmorphism-card"
import { MonitorSmartphone, Shield, Clock } from "lucide-react"

const features = [
  {
    title: "Acesso Multiplataforma",
    description: "Acesse seu painel médico de qualquer dispositivo, em qualquer lugar",
    icon: MonitorSmartphone,
  },
  {
    title: "Seguro & Privado",
    description: "Seus dados são protegidos com segurança de nível empresarial",
    icon: Shield,
  },
  {
    title: "Disponível 24/7",
    description: "Acesso aos serviços de saúde 24 horas por dia",
    icon: Clock,
  },
]

export default function Features() {
  return (
    <section className="w-full py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Nossos Recursos
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassmorphismCard key={index}>
              <div className="p-6 text-white">
                <feature.icon className="w-12 h-12 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            </GlassmorphismCard>
          ))}
        </div>
      </div>
    </section>
  )
}