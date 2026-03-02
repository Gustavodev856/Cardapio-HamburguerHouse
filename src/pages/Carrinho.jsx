import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
  const { cartItems, removeFromCart, updateQuantity, getTotal, updateItem } = useContext(CartContext);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const navigate = useNavigate();

  // Para editar item
  const [itemEditando, setItemEditando] = useState(null);
  const [novosDadosItem, setNovosDadosItem] = useState({ acompanhamentos: [], observacao: "" });

  const finalizarPedido = () => setPedidoFinalizado(true);

  // Calcula preço total incluindo acompanhamentos
  const precoItem = (item) => {
    const precoBase = Number(item.preco.toString().replace("R$", "").replace(",", ".").trim()) || 0;
    const precoAcomp = item.acompanhamentos
      ? item.acompanhamentos.reduce((acc, a) => acc + Number(a.preco || 0), 0)
      : 0;
    return (precoBase + precoAcomp) * (item.quantidade || 0);
  };

  // Abre modal de edição
  const abrirEdicao = (item) => {
    setItemEditando(item);
    setNovosDadosItem({
      acompanhamentos: item.acompanhamentos || [],
      observacao: item.observacao || "",
    });
  };

  // Salva edição
  const salvarEdicao = () => {
    updateItem(itemEditando, { 
      acompanhamentos: novosDadosItem.acompanhamentos,
      observacao: novosDadosItem.observacao
    });
    setItemEditando(null);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-3xl font-bold mb-2">🛒 Carrinho vazio</h2>
        <p className="text-gray-500">Adicione itens para continuar</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-32 px-4 pt-6">
      <h2 className="text-3xl font-extrabold text-center mb-6">Seu Carrinho</h2>

      {/* Lista de itens */}
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.nome}</h3>
                <p className="text-indigo-600 font-bold mt-1">
                  R$ {precoItem(item).toFixed(2)}
                </p>

                {/* Observação ou descrição adicionada pelo cliente */}
                <p className="text-gray-600 text-sm mt-1">
                  {item.observacao || "Sem observações"}
                </p>

                {/* Acompanhamentos */}
                {item.acompanhamentos && item.acompanhamentos.length > 0 && (
                  <p className="text-gray-500 text-sm mt-1">
                    Acompanhamentos: {item.acompanhamentos.map(a => a.nome).join(", ")}
                  </p>
                )}
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
              <button
                onClick={() => abrirEdicao(item)}
                className="text-sm text-blue-500 hover:underline"
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total e botões */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 z-50">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-2xl font-extrabold">
            Total: R$ {cartItems.reduce((acc, item) => acc + precoItem(item), 0).toFixed(2)}
          </span>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={finalizarPedido}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Finalizar Pedido
            </button>

            {/* Botão Continuar Comprando */}
            <button
              onClick={() => navigate("/Hamburguer")} // volta para home ou menu
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {itemEditando && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 text-center max-w-md w-full animate-scale">
            <h3 className="text-2xl font-bold mb-4">Editar {itemEditando.nome}</h3>

            {/* Observação */}
            <textarea
              className="border p-2 rounded w-full mb-4"
              placeholder="Digite uma observação"
              value={novosDadosItem.observacao}
              onChange={(e) => setNovosDadosItem(prev => ({ ...prev, observacao: e.target.value }))}
            />

            {/* Acompanhamentos */}
            <p className="font-semibold text-left mb-2">Acompanhamentos:</p>
            {novosDadosItem.acompanhamentos.map((acomp, i) => (
              <div key={i} className="flex justify-between items-center mb-1">
                <span>{acomp.nome} (R$ {acomp.preco})</span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() =>
                    setNovosDadosItem(prev => ({
                      ...prev,
                      acompanhamentos: prev.acompanhamentos.filter((_, idx) => idx !== i)
                    }))
                  }
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2 mb-4"
              onClick={() =>
                setNovosDadosItem(prev => ({
                  ...prev,
                  acompanhamentos: [...prev.acompanhamentos, { nome: "Novo acompanhamento", preco: 0 }]
                }))
              }
            >
              Adicionar Acompanhamento
            </button>

            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded font-bold"
                onClick={salvarEdicao}
              >
                Salvar
              </button>
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded font-bold"
                onClick={() => setItemEditando(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmação de pedido */}
      {pedidoFinalizado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 text-center max-w-sm w-full animate-scale">
            <h3 className="text-2xl font-bold text-green-600 mb-2">Pedido realizado!</h3>
            <p className="text-gray-600 mb-4">Seu pedido foi finalizado com sucesso 🍔</p>
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