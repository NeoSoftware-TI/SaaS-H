"use client";

// admin.js (Página do Admin)

import { useState, useEffect } from 'react';

interface Medico {
  id: number;
  nome: string;
  especialidade: string;
}

const AdminPage = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  useEffect(() => {
    const medicosArmazenados: Medico[] = JSON.parse(localStorage.getItem('medicos') || '[]');
    setMedicos(medicosArmazenados);
  }, []);

  const adicionarMedico = () => {
    if (!nome || !especialidade) return alert('Preencha todos os campos');
    const novoMedico: Medico = { id: Date.now(), nome, especialidade };
    const medicosAtualizados = [...medicos, novoMedico];
    setMedicos(medicosAtualizados);
    localStorage.setItem('medicos', JSON.stringify(medicosAtualizados));
    setNome('');
    setEspecialidade('');
  };

  const removerMedico = (id: number) => {
    const medicosAtualizados = medicos.filter(medico => medico.id !== id);
    setMedicos(medicosAtualizados);
    localStorage.setItem('medicos', JSON.stringify(medicosAtualizados));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Médicos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={adicionarMedico} className="bg-blue-500 text-white p-2">Adicionar</button>
      </div>
      <ul>
        {medicos.map(medico => (
          <li key={medico.id} className="flex justify-between items-center border-b p-2">
            <span>{medico.nome} - {medico.especialidade}</span>
            <button onClick={() => removerMedico(medico.id)} className="bg-red-500 text-white p-1">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
