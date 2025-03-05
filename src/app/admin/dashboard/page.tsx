"use client";

import { useState } from "react";
import Chat from "@/app/components/Chat";
import { MessageCircle } from "lucide-react";

// Importações do Chart.js e react-chartjs-2
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export default function AdminDashboard() {
  const [showChat, setShowChat] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: 1, name: "Dr. João Silva", specialty: "Cardiologia" },
    { id: 2, name: "Dra. Maria Santos", specialty: "Pediatria" },
  ]);

  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState("");

  // Dados para o gráfico de desempenho dos médicos
  const data = {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    datasets: [
      {
        label: "Dr. João Silva",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Dra. Maria Santos",
        data: [8, 15, 7, 12, 6],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Opções do gráfico
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Atendimentos por Dia",
      },
    },
  };

  // Função para adicionar um novo médico
  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDoctorName.trim() && newDoctorSpecialty.trim()) {
      const newId = doctors.length > 0 ? Math.max(...doctors.map((d) => d.id)) + 1 : 1;
      const newDoctor: Doctor = {
        id: newId,
        name: newDoctorName,
        specialty: newDoctorSpecialty,
      };
      setDoctors((prev) => [...prev, newDoctor]);
      setNewDoctorName("");
      setNewDoctorSpecialty("");
    }
  };

  // Função para excluir um médico
  const handleDeleteDoctor = (id: number) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard do Admin</h1>

      <div className="flex space-x-4 mb-8">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowDoctors(!showDoctors)}
        >
          Ver Médicos
        </button>
      </div>

      {/* Card de Médicos */}
      {showDoctors && (
        <div className="mb-8 bg-blue-950 backdrop-blur-xl rounded-2xl p-6 shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Médicos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-blue-900">
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Especialidade</th>
                  <th className="px-4 py-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-4 py-2">{doctor.name}</td>
                    <td className="px-4 py-2">{doctor.specialty}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={handleAddDoctor} className="mt-4 flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Nome do Médico"
              value={newDoctorName}
              onChange={(e) => setNewDoctorName(e.target.value)}
              className="p-2 rounded border border-gray-700 bg-blue-900 text-white"
              required
            />
            <input
              type="text"
              placeholder="Especialidade"
              value={newDoctorSpecialty}
              onChange={(e) => setNewDoctorSpecialty(e.target.value)}
              className="p-2 rounded border border-gray-700 bg-blue-900 text-white"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Adicionar Médico
            </button>
          </form>
        </div>
      )}

      {/* Card do Gráfico */}
      <div className="mb-8 bg-blue-950 backdrop-blur-xl rounded-2xl p-6 shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-4">Desempenho dos Médicos</h2>
        <Bar data={data} options={options} />
      </div>

      {/* Botão flutuante do Chat */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
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
            <button className="text-red-500" onClick={() => setShowChat(false)}>
              X
            </button>
          </div>
          <Chat usuario="admin" />
        </div>
      )}
    </div>
  );
}