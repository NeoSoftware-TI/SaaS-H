"use client";
import { useRouter } from "next/navigation"; // Importação correta

export default function ChatAdmin() {
  const router = useRouter(); // Definição correta do router

  return (
    <div>
      <h1>Chat do Admin</h1>
      <button onClick={() => router.push("/admin/dashboard")}>Voltar para Dashboard</button>
    </div>
  );
}
