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
    {/* Card Premium */}
    <div
      className="group bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 
                 text-white border border-gray-800 
                 rounded-2xl overflow-hidden 
                 shadow-xl hover:shadow-indigo-500/20
                 transition-all duration-500 
                 hover:-translate-y-4 cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      {/* Badge pode ser retirado a qualquer momento */}
      <span className="absolute mt-4 ml-4 bg-indigo-600 text-xs px-3 py-1 rounded-full shadow-md z-10">
        Premium
      </span>

      {/* Imagem */}
      <div className="overflow-hidden">
        <img
          src={item.imagem}
          alt={item.nome}
          className="w-full h-52 object-cover 
                     transition-transform duration-700 
                     group-hover:scale-110"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">
          {item.nome}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl text-indigo-400">
            {item.preco}
          </span>

          {/* <span className="text-xs text-gray-500 group-hover:text-indigo-400 transition">
            Ver detalhes →
          </span> */}
        </div>
      </div>
    </div>

    {/* Modal Premium Melhorado */}
    {isOpen && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">

        <div className="bg-linear-to-br from-gray-900 to-gray-800 
                        text-white border border-gray-700 
                        rounded-2xl p-8 w-full max-w-lg 
                        relative shadow-2xl 
                        animate-[fadeIn_.3s_ease-in-out]">

          {/* Botão fechar */}
          <button
            className="absolute top-4 right-5 text-gray-400 hover:text-white text-xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-4 text-indigo-400">
            {item.nome}
          </h2>

          <p className="text-gray-300 mb-6">
            {item.description}
          </p>

          {/* Acompanhamentos */}
          {item.opcoes?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-lg border-b border-gray-700 pb-2">
                Escolha seus acompanhamentos
              </h3>

              {item.opcoes.map(opt => (
                <label
                  key={opt.nome}
                  className="flex items-center justify-between 
                             bg-gray-800/70 backdrop-blur 
                             p-3 rounded-lg mb-3 
                             hover:bg-gray-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!selectedOptions[opt.nome]}
                      onChange={() => handleOptionChange(opt.nome, opt.preco)}
                      className="accent-indigo-500 w-4 h-4"
                    />
                    <span className="capitalize">
                      {opt.nome}
                    </span>
                  </div>

                  <span className="text-indigo-400 font-semibold">
                    +{numeroParaPreco(opt.preco)}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Total + Botão */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-700">
            <span className="font-bold text-2xl text-indigo-400">
              {numeroParaPreco(totalPrice)}
            </span>

            <button
              className="bg-indigo-600 hover:bg-indigo-500 
                         transition-all duration-300 
                         text-white font-semibold 
                         px-6 py-3 rounded-xl 
                         shadow-lg hover:shadow-indigo-500/40"
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