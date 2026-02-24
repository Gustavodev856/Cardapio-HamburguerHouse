// src/components/Cardapio.jsx
import { useState } from "react";
import CardItem from "../components/CardItem" 

export default function Cardapio({ items }) {
  const [search, setSearch] = useState("");

  // Filtra os itens enquanto o usuário digita
  const filteredItems = items.filter(item =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Buscar item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Lista de itens ou mensagem de nenhum item */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">
          Nenhum item encontrado 😢
        </p>
      )}
    </div>
  );
}