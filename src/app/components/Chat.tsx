"use client";

import { useState, useEffect, useRef } from "react";

interface ChatProps {
  usuario: "medico" | "admin";
}

interface Mensagem {
  remetente: "medico" | "admin";
  texto: string;
}

export default function Chat({ usuario }: ChatProps) {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-resposta: dispara somente se a última mensagem for do usuário
  useEffect(() => {
    if (
      mensagens.length > 0 &&
      mensagens[mensagens.length - 1].remetente === usuario
    ) {
      const timer = setTimeout(() => {
        setMensagens((prev) => [
          ...prev,
          {
            remetente: usuario === "medico" ? "admin" : "medico",
            texto: "Mensagem automática de resposta",
          },
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mensagens, usuario]);

  // Rola automaticamente para a última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviarMensagem = () => {
    if (mensagem.trim() !== "") {
      setMensagens((prev) => [
        ...prev,
        { remetente: usuario, texto: mensagem },
      ]);
      setMensagem("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-100 rounded-lg">
        {mensagens.length > 0 ? (
          mensagens.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-2 rounded-lg break-words transition-all ${
                msg.remetente === usuario
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-gray-900 self-start"
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

      {/* Entrada de mensagem */}
      <div className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 text-white px-1 py-2 rounded-r-lg hover:bg-blue-700 transition"
          onClick={enviarMensagem}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}