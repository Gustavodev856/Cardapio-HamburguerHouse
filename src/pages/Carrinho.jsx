import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Carrinho() {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false); // estado para mensagem

  if (cartItems.length === 0) return <h2 className="text-center text-2xl mt-10">Carrinho vazio</h2>;

  const finalizarPedido = () => {
    setPedidoFinalizado(true); // ativa a mensagem
    // Aqui você pode adicionar integração com pagamento ou API
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Carrinho</h2>

      <div className="grid gap-4">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              <img src={item.imagem} alt={item.nome} className="w-20 h-20 object-contain rounded" />
              <div>
                <h3 className="font-semibold">{item.nome}</h3>
                <span className="text-indigo-600 font-bold">{item.preco}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-gray-200 px-2 rounded" onClick={() => updateQuantity(item, item.quantidade - 1)}>-</button>
              <span>{item.quantidade}</span>
              <button className="bg-gray-200 px-2 rounded" onClick={() => updateQuantity(item, item.quantidade + 1)}>+</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(item)}>X</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-md">
        <span className="text-xl font-bold">Total: R$ {getTotal()}</span>
        <button
          className="mt-2 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={finalizarPedido}
        >
          Finalizar Pedido
        </button>
      </div>

      {/* Mensagem de confirmação */}
      {pedidoFinalizado && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
          Pedido finalizado com sucesso!
        </div>
      )}
    </div>
  );
}