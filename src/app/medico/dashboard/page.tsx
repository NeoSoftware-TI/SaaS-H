"use client"

import { useState } from "react"
import Link from "next/link"

interface Appointment {
  id: number
  patientName: string
  date: string
  time: string
}

export default function MedicoDashboard() {
  const [appointments] = useState<Appointment[]>([
    { id: 1, patientName: "João Silva", date: "2023-07-15", time: "14:00" },
    { id: 2, patientName: "Maria Santos", date: "2023-07-16", time: "10:30" },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Dashboard do Médico</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Próximas Consultas</h2>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id} className="mb-2 p-2 border rounded">
              {appointment.patientName} - {appointment.date} às {appointment.time}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <Link href="/medico/avaliacoes" className="bg-blue-600 text-white px-4 py-2 rounded">
          Gerenciar Avaliações
        </Link>
        <Link href="/medico/chat" className="bg-blue-600 text-white px-4 py-2 rounded">
          Chat
        </Link>
      </div>
    </div>
  )
}

