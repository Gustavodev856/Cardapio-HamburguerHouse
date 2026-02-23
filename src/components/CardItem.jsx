import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function CardItem({ item }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="bg-white border p-4 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:scale-105">
      <img src={item.imagem} alt={item.nome} className="w-full h-36 sm:h-40 md:h-44 object-contain rounded-xl mb-4" />
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.nome}</h3>
      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

      <div className="flex flex-col items-center">
        <span className="font-bold text-indigo-600 text-lg mb-2">{item.preco}</span>
        <button
          className="w-28 h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300"
          onClick={() => {
            addToCart(item);
            navigate("/carrinho");
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}