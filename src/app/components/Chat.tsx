"use client"

import { useState } from "react"

interface Message {
  id: number
  sender: string
  text: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([{ id: 1, sender: "Sistema", text: "Bem-vindo ao chat!" }])
  const [newMessage, setNewMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "Você", text: newMessage }])
      setNewMessage("")
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 h-64 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <strong>{message.sender}:</strong> {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite sua mensagem..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

