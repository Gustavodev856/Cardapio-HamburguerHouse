import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Adiciona item ao carrinho
  const addToCart = (item) => {
    setCartItems(prev => {
      // Procura se existe item igual (nome + observação + acompanhamentos)
      const existing = prev.find(i => 
        i.nome === item.nome &&
        (i.observacao || "") === (item.observacao || "") &&
        JSON.stringify(i.acompanhamentos || []) === JSON.stringify(item.acompanhamentos || [])
      );

      if (existing) {
        // Se já existe, aumenta a quantidade
        return prev.map(i =>
          i === existing ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }

      // Se não existe, adiciona novo
      return [
        ...prev,
        {
          ...item,
          quantidade: 1,
          observacao: item.observacao || "",
          acompanhamentos: item.acompanhamentos || []
        }
      ];
    });
  };

  // Remove item específico
  const removeFromCart = (item) => {
    setCartItems(prev =>
      prev.filter(i =>
        !(
          i.nome === item.nome &&
          (i.observacao || "") === (item.observacao || "") &&
          JSON.stringify(i.acompanhamentos || []) === JSON.stringify(item.acompanhamentos || [])
        )
      )
    );
  };

  // Atualiza quantidade (quantidade mínima 1)
  const updateQuantity = (item, quantidade) => {
    if (quantidade < 1) return;
    setCartItems(prev =>
      prev.map(i =>
        i.nome === item.nome &&
        (i.observacao || "") === (item.observacao || "") &&
        JSON.stringify(i.acompanhamentos || []) === JSON.stringify(item.acompanhamentos || [])
          ? { ...i, quantidade }
          : i
      )
    );
  };

  // Atualiza item inteiro (ex: acompanhamentos)
  const updateItem = (item, novosDados) => {
    setCartItems(prev =>
      prev.map(i =>
        i.nome === item.nome &&
        (i.observacao || "") === (item.observacao || "") &&
        JSON.stringify(i.acompanhamentos || []) === JSON.stringify(item.acompanhamentos || [])
          ? { ...i, ...novosDados }
          : i
      )
    );
  };

  // Total do carrinho incluindo acompanhamentos
  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        let precoBase = 0;
        if (item.preco) {
          precoBase = Number(item.preco.toString().replace("R$", "").replace(",", ".").trim());
          if (isNaN(precoBase)) precoBase = 0;
        }

        const precoAcompanhamentos = item.acompanhamentos
          ? item.acompanhamentos.reduce((acc, a) => acc + Number(a.preco || 0), 0)
          : 0;

        return total + (precoBase + precoAcompanhamentos) * (item.quantidade || 1);
      }, 0)
      .toFixed(2);
  };

  // Total de itens (para badge do header)
  const getTotalItens = () => {
    return cartItems.reduce((acc, item) => acc + (item.quantidade || 0), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateItem,
      getTotal,
      getTotalItens
    }}>
      {children}
    </CartContext.Provider>
  );
}