"use client";

import { useState, useEffect, useRef } from "react";

interface ChatProps {
  usuario: "medico" | "admin";
}

interface Mensagem {
  remetente: "medico" | "admin";
  texto: string;
}

export default function Chat({ usuario }: ChatProps) {  // Adicionando a tipagem correta
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Simula recebimento de mensagem do outro usuário após 2s
  useEffect(() => {
    const receberMensagem = () => {
      if (mensagens.length > 0) {
        setTimeout(() => {
          setMensagens((prev) => [
            ...prev,
            { remetente: usuario === "medico" ? "admin" : "medico", texto: "Mensagem automática de resposta" },
          ]);
        }, 2000);
      }
    };
    receberMensagem();
  }, [mensagens, usuario]);

  // Rola automaticamente para a última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviarMensagem = () => {
    if (mensagem.trim() !== "") {
      setMensagens([...mensagens, { remetente: usuario, texto: mensagem }]);
      setMensagem("");
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg w-80 p-4 flex flex-col">
      {/* Área de mensagens */}
      <div className="h-48 overflow-y-auto border-b mb-2 p-2 bg-gray-100 rounded">
        {mensagens.length > 0 ? (
          mensagens.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded break-words max-w-full ${
                msg.remetente === usuario ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
              }`}
            >
              {msg.texto}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Nenhuma mensagem ainda</p>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Entrada de texto e botão */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="border p-2 rounded text-sm flex-1 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          onClick={enviarMensagem}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
