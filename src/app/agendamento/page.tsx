"use client";

import { useState } from "react";
import GlassmorphismCard from "../components/glassmorphism-card";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export default function Agendamento() {
  const [doctors] = useState<Doctor[]>([
    { id: 1, name: "Dr. João Silva", specialty: "Cardiologia" },
    { id: 2, name: "Dra. Maria Santos", specialty: "Pediatria" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para enviar os dados do agendamento
    alert("Agendamento realizado com sucesso!");
    // Limpar o formulário
    setSelectedDoctor("");
    setDate("");
    setTime("");
    setName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)] px-4 py-8">
      <GlassmorphismCard>
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          Agendar Consulta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="doctor"
              className="block text-white text-sm font-semibold mb-1"
            >
              Médico
            </label>
            <select
              id="doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            >
              <option value="">Selecione um médico</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id.toString()}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-white text-sm font-semibold mb-1"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-white text-sm font-semibold mb-1"
            >
              Horário
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-white text-sm font-semibold mb-1"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            Agendar Consulta
          </button>
        </form>
      </GlassmorphismCard>
    </div>
  );
}