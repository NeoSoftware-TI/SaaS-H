"use client"

import { useState } from "react"
import Link from "next/link"

interface Doctor {
  id: number
  name: string
  specialty: string
}

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: "Dr. João Silva", specialty: "Cardiologia" },
    { id: 2, name: "Dra. Maria Santos", specialty: "Pediatria" },
  ])

  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "" })

  const addDoctor = (e: React.FormEvent) => {
    e.preventDefault()
    setDoctors([...doctors, { id: doctors.length + 1, ...newDoctor }])
    setNewDoctor({ name: "", specialty: "" })
  }

  const removeDoctor = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Dashboard do Administrador</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Médicos</h2>
        <form onSubmit={addDoctor} className="mb-4">
          <input
            type="text"
            placeholder="Nome do médico"
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            className="mr-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Especialidade"
            value={newDoctor.specialty}
            onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
            className="mr-2 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Adicionar Médico
          </button>
        </form>
        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id} className="mb-2 p-2 border rounded flex justify-between items-center">
              <span>
                {doctor.name} - {doctor.specialty}
              </span>
              <button onClick={() => removeDoctor(doctor.id)} className="text-red-600">
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/admin/chat" className="bg-blue-600 text-white px-4 py-2 rounded">
        Chat com Médicos
      </Link>
    </div>
  )
}

