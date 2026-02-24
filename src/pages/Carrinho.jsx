import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Carrinho() {
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  const finalizarPedido = () => {
    setPedidoFinalizado(true);
    // Aqui futuramente entra integração com pagamento / API
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-3xl font-bold mb-2">🛒 Carrinho vazio</h2>
        <p className="text-gray-500">Adicione itens para continuar</p>
        <Link
          to="/hamburguer"
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-32 px-4 pt-6">
      <h2 className="text-3xl font-extrabold text-center mb-6">
        Seu Carrinho
      </h2>

      {/* Lista de itens */}
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between"
          >
            {/* Produto */}
            <div className="flex items-center gap-4">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.nome}</h3>
                <p className="text-indigo-600 font-bold">
                  R$ {Number(
                    item.preco.toString().replace("R$", "").replace(",", ".").trim()
                  ).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Controles */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item, Math.max(1, item.quantidade - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 font-bold"
                >
                  −
                </button>
                <span className="font-semibold">{item.quantidade}</span>
                <button
                  onClick={() => updateQuantity(item, item.quantidade + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="text-sm text-red-500 hover:underline"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo / Total com ambos os botões */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 z-50">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-2xl font-extrabold">
            Total: R$ {getTotal()}
          </span>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={finalizarPedido}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Finalizar Pedido
            </button>

            <Link
              to="/hamburguer"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition text-center"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>

      {/* Confirmação */}
      {pedidoFinalizado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 text-center max-w-sm w-full animate-scale">
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Pedido realizado!
            </h3>
            <p className="text-gray-600 mb-4">
              Seu pedido foi finalizado com sucesso 🍔
            </p>
            <button
              onClick={() => setPedidoFinalizado(false)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}