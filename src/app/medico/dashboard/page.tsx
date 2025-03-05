"use client";

import { useState } from "react";
import Chat from "@/app/components/Chat";
import { MessageCircle } from "lucide-react";

interface Consultation {
  id: number;
  doctorName: string;
  specialization: string;
  patientName: string;
  date: string;
  time: string;
}

export default function MedicoDashboard() {
  const [consultations, setConsultations] = useState<Consultation[]>([
    { id: 1, doctorName: "Dr. João", specialization: "Cardiologia", patientName: "Maria Silva", date: "2025-03-01", time: "09:00" },
    { id: 2, doctorName: "Dr. João", specialization: "Cardiologia", patientName: "Pedro Santos", date: "2025-03-01", time: "10:00" },
    { id: 3, doctorName: "Dr. João", specialization: "Cardiologia", patientName: "Ana Costa", date: "2025-03-01", time: "11:00" },
    { id: 4, doctorName: "Dr. João", specialization: "Cardiologia", patientName: "Carlos Lima", date: "2025-03-01", time: "14:00" },
    { id: 5, doctorName: "Dr. João", specialization: "Cardiologia", patientName: "Fernanda Alves", date: "2025-03-01", time: "15:00" }
  ]);

  const [showChat, setShowChat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"new" | "edit">("new");
  const [currentConsultation, setCurrentConsultation] = useState<Consultation | null>(null);

  // Estados para os campos do formulário/modal
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleNewConsultation = () => {
    setModalMode("new");
    setCurrentConsultation(null);
    // Valores padrão para o médico
    setDoctorName("Dr. João");
    setSpecialization("Cardiologia");
    setPatientName("");
    setDate("");
    setTime("");
    setShowModal(true);
  };

  const handleEditConsultation = (consultation: Consultation) => {
    setModalMode("edit");
    setCurrentConsultation(consultation);
    setDoctorName(consultation.doctorName);
    setSpecialization(consultation.specialization);
    setPatientName(consultation.patientName);
    setDate(consultation.date);
    setTime(consultation.time);
    setShowModal(true);
  };

  const handleDeleteConsultation = (consultation: Consultation) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir a consulta:\nMédico: ${consultation.doctorName}\nEspecialização: ${consultation.specialization}\nPaciente: ${consultation.patientName}\nData/Horário: ${consultation.date} às ${consultation.time}?`
    );
    if (confirmDelete) {
      setConsultations(prev => prev.filter(c => c.id !== consultation.id));
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "new") {
      const newId = consultations.length > 0 ? Math.max(...consultations.map(c => c.id)) + 1 : 1;
      const newConsultation: Consultation = { id: newId, doctorName, specialization, patientName, date, time };
      setConsultations(prev => [...prev, newConsultation]);
    } else if (modalMode === "edit" && currentConsultation) {
      setConsultations(prev =>
        prev.map(c =>
          c.id === currentConsultation.id
            ? { ...c, doctorName, specialization, patientName, date, time }
            : c
        )
      );
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">Dashboard do Médico</h1>

      {/* Card com efeito glassmorphism para a tabela */}
      <div className="mb-8 bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Consultas Agendadas</h2>
        {consultations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-white/40">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Médico</th>
                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Especialização</th>
                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Paciente</th>
                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Data</th>
                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Horário</th>
                  <th className="px-4 py-2 text-left text-gray-900 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {consultations.map((consultation) => (
                  <tr key={consultation.id} className="bg-white/80">
                    <td className="px-4 py-2 text-gray-900">{consultation.doctorName}</td>
                    <td className="px-4 py-2 text-gray-900">{consultation.specialization}</td>
                    <td className="px-4 py-2 text-gray-900">{consultation.patientName}</td>
                    <td className="px-4 py-2 text-gray-900">{consultation.date}</td>
                    <td className="px-4 py-2 text-gray-900">{consultation.time}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                          onClick={() => handleEditConsultation(consultation)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                          onClick={() => handleDeleteConsultation(consultation)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-900">Nenhuma consulta agendada.</p>
        )}
      </div>

      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded transition hover:bg-blue-800"
          onClick={handleNewConsultation}
        >
          Agendar Nova Consulta
        </button>
      </div>

      {/* Modal para Agendar/Editar Consulta */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === "new" ? "Agendar Consulta" : "Editar Consulta"}
              </h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                X
              </button>
            </div>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Médico</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Especialização</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Paciente</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Data</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Horário</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white border border-blue-600 py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                {modalMode === "new" ? "Agendar Consulta" : "Salvar Alterações"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Botão flutuante do Chat */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Popup do Chat (reposicionado para não sobrepor o card) */}
      {showChat && (
        <div className="fixed bottom-20 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-2xl w-80 p-4">
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-900">Chat</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowChat(false)}>
              X
            </button>
          </div>
          <Chat usuario="medico" />
        </div>
      )}
    </div>
  );
}