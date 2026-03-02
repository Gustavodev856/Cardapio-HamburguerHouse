import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

// Converte "R$ 20,00" em número
function precoParaNumero(precoString) {
  if (!precoString) return 0;
  return Number(precoString.replace("R$ ", "").replace(".", "").replace(",", "."));
}

// Converte número em "R$ 20,00"
function numeroParaPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

export default function CardItem({ item }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Seleção de opções
  const [selectedOptions, setSelectedOptions] = useState({});
  // Descrição personalizada do cliente
  const [customNote, setCustomNote] = useState("");

  const handleOptionChange = (nome, preco) => {
    setSelectedOptions(prev => ({
      ...prev,
      [nome]: prev[nome] ? undefined : preco
    }));
  };

  // Preço base do item
  const precoBase = precoParaNumero(item.preco);

  // Total com extras
  const totalPrice =
    precoBase +
    Object.values(selectedOptions).reduce((acc, val) => acc + (val || 0), 0);

  const handleAddToCart = () => {
    // Transformar selectedOptions em array de acompanhamentos
    const acompanhamentos = Object.entries(selectedOptions)
      .filter(([_, preco]) => preco !== undefined)
      .map(([nome, preco]) => ({ nome, preco }));

    // Adiciona ao carrinho com todas informações no formato correto
    addToCart({
      ...item,
      quantidade: 1,
      acompanhamentos,
      descricao: customNote || item.description // já aparece no carrinho
    });

    setIsOpen(false);
    navigate("/carrinho");
  };

  return (
    <>
      {/* Card principal */}
      <div
        className="bg-white border p-4 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={item.imagem}
          alt={item.nome}
          className="w-full h-36 sm:h-40 md:h-44 object-contain rounded-xl mb-4"
        />
        <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.nome}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <span className="font-bold text-indigo-600 text-lg">{item.preco}</span>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">{item.nome}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>

            {/* Acompanhamentos */}
            {item.opcoes && item.opcoes.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Escolha seus acompanhamentos:</h3>
                {item.opcoes.map(opt => (
                  <label key={opt.nome} className="flex items-center space-x-2 mb-1">
                    <input
                      type="checkbox"
                      checked={!!selectedOptions[opt.nome]}
                      onChange={() => handleOptionChange(opt.nome, opt.preco)}
                    />
                    <span className="capitalize">
                      {opt.nome} (+{numeroParaPreco(opt.preco)})
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Observação do cliente */}
            {/* <div className="mb-4">
              <label className="font-semibold mb-1 block">Observação:</label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ex: sem cebola, bem passado..."
                className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
              />
            </div> */}

            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-600 text-lg">
                {numeroParaPreco(totalPrice)}
              </span>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg"
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}