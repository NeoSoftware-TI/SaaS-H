import Chat from "@/app/components/Chat";

export default function MedicoChat() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Chat do Médico</h1>
      <Chat usuario="medico" />
    </div>
  );
}
