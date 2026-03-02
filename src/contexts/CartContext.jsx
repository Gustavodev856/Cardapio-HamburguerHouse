import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Adiciona item ao carrinho
const addToCart = (item, observacao = "") => {
  setCartItems(prev => {
    const existing = prev.find(i => i.nome === item.nome && i.observacao === observacao);
    if (existing) {
      return prev.map(i =>
        i.nome === item.nome && i.observacao === observacao
          ? { ...i, quantidade: i.quantidade + 1 }
          : i
      );
    } else {
      return [
        ...prev,
        {
          ...item,
          quantidade: 1,
          observacao, // <-- A observação do cliente
          acompanhamentos: item.acompanhamentos || []
        }
      ];
    }
  });
};

  // Remove item do carrinho
  const removeFromCart = (item) => {
    setCartItems(prev => prev.filter(i => i.nome !== item.nome));
  };

  // Atualiza quantidade
  const updateQuantity = (item, quantidade) => {
    setCartItems(prev =>
      prev.map(i => i.nome === item.nome ? { ...i, quantidade } : i)
    );
  };

  // Atualiza o item inteiro (ex: acompanhamentos)
  const updateItem = (item, novosDados) => {
    setCartItems(prev =>
      prev.map(i => i.nome === item.nome ? { ...i, ...novosDados } : i)
    );
  };

  // Calcula total incluindo acompanhamentos
  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        let precoBase = 0;

        if (item.preco) {
          precoBase = Number(
            item.preco.toString().replace("R$", "").replace(",", ".").trim()
          );
          if (isNaN(precoBase)) precoBase = 0;
        }

        // Soma os acompanhamentos
        const precoAcompanhamentos = item.acompanhamentos
          ? item.acompanhamentos.reduce((acc, a) => acc + Number(a.preco || 0), 0)
          : 0;

        return total + (precoBase + precoAcompanhamentos) * (item.quantidade || 0);
      }, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateItem,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}