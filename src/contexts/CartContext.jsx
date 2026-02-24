import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.nome === item.nome);
      if (existing) {
        return prev.map(i =>
          i.nome === item.nome ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantidade: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems(prev =>
      prev.filter(i => i.nome !== item.nome)
    );
  };

  const updateQuantity = (item, quantidade) => {
    setCartItems(prev =>
      prev.map(i =>
        i.nome === item.nome ? { ...i, quantidade } : i
      )
    );
  };

const getTotal = () => {
  return cartItems
    .reduce((total, item) => {
      // Pega preço seguro: string ou número
      let precoNumerico = 0;

      if (item.preco) {
        precoNumerico = Number(
          item.preco
            .toString()
            .replace("R$", "")
            .replace(",", ".")
            .trim()
        );

        if (isNaN(precoNumerico)) precoNumerico = 0;
      }

      return total + precoNumerico * (item.quantidade || 0);
    }, 0)
    .toFixed(2);
};

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}