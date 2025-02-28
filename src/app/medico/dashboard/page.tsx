"use client"

import { useState } from "react"
import Link from "next/link"
import Chat from "@/app/components/Chat";
import { MessageCircle } from "lucide-react";

interface Appointment {
  id: number
  patientName: string
  date: string
  time: string
}

export default function MedicoDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 pt-16"> {/* Adicionado padding-top para evitar sobreposição do cabeçalho */}
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Dashboard do Médico</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Consultas Agendadas</h2>
        <ul>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment.id} className="mb-2 p-2 border rounded">
                {appointment.patientName} - {appointment.date} às {appointment.time}
              </li>
            ))
          ) : (
            <p>Nenhuma consulta agendada.</p>
          )}
        </ul>
      </div>

      <div className="flex space-x-4">
        <Link href="/medico/avaliacoes" className="bg-blue-600 text-white px-4 py-2 rounded">
          Gerenciar Avaliações
        </Link>
      </div>

      {/* Botão do Chat flutuante */}
      <div className="fixed bottom-4 right-4">
        <button 
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Popup do Chat */}
      {showChat && (
        <div className="fixed bottom-16 right-4 bg-white border rounded-lg shadow-lg w-80 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chat</h2>
            <button className="text-red-500" onClick={() => setShowChat(false)}>X</button>
          </div>
          <Chat usuario="medico" />
        </div>
      )}
    </div>
  )
}

