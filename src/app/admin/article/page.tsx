"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importação do useRouter

const articleTemplates = [
  {
    id: 1,
    title: "Dicas de Saúde",
    content:
      "Aqui estão 5 dicas importantes para manter sua saúde em dia:\n\n1. [Dica 1]\n2. [Dica 2]\n3. [Dica 3]\n4. [Dica 4]\n5. [Dica 5]\n\nLembre-se, sua saúde é seu bem mais precioso!",
  },
  {
    id: 2,
    title: "Novidades na Medicina",
    content:
      "Recentemente, uma nova descoberta na área de [Especialidade] promete revolucionar o tratamento de [Condição]. Saiba mais sobre como isso pode impactar a vida de milhões de pacientes.",
  },
  {
    id: 3,
    title: "Perfil do Profissional",
    content:
      "Conheça o Dr./Dra. [Nome], especialista em [Especialidade]. Com [X] anos de experiência, [ele/ela] tem se destacado por [Realizações]. Agende sua consulta e conte com um atendimento de excelência!",
  },
];

export default function ArtigosLinkedIn() {
  const [selectedTemplate, setSelectedTemplate] = useState(articleTemplates[0]);
  const [customizedContent, setCustomizedContent] = useState(selectedTemplate.content);
  const router = useRouter(); // Hook para navegação

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const template = articleTemplates.find((t) => t.id === Number.parseInt(e.target.value));
    if (template) {
      setSelectedTemplate(template);
      setCustomizedContent(template.content);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Criação de Artigos para LinkedIn</h1>
      <div className="mb-4">
        <label htmlFor="template" className="block text-gray-700 text-sm font-bold mb-2">
          Selecione um modelo
        </label>
        <select
          id="template"
          value={selectedTemplate.id}
          onChange={handleTemplateChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {articleTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Conteúdo do Artigo
        </label>
        <textarea
          id="content"
          value={customizedContent}
          onChange={(e) => setCustomizedContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
        />
      </div>
      <button
        onClick={() => alert("Artigo gerado e pronto para publicação no LinkedIn!")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Gerar Artigo
      </button>

      {/* Botão para acessar o chat */}
      <button
        onClick={() => router.push("/admin/chat")}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ir para o Chat
      </button>
    </div>
  );
}