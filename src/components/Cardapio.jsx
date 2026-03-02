import { useState } from "react";
import CardItem from "./CardItem"; // mesmo components
import { todosProdutos } from "../data/produto";

export default function Cardapio({ items }) {
  const [search, setSearch] = useState("");

  // Se o usuário digitar algo, busca em todosProdutos
  // Caso contrário, mostra apenas os itens da página atual
  // Função auxiliar para remover acentos e deixar em minúsculo
const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const filteredItems = search
  ? todosProdutos.filter(item =>
      normalizeText(item.nome).includes(normalizeText(search)) ||
      normalizeText(item.description).includes(normalizeText(search))
    )
  : items;

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      {/* Barra de busca */}
      <input
        type="text"
        placeholder="Buscar item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Lista de itens ou mensagem caso não haja resultados */}
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