import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Header() {
  const { cartItems } = useContext(CartContext);

  // Soma total de itens no carrinho
  const totalItens = cartItems.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <>
      {/* Logo e topo (desktop) */}
      <header className="hidden sm:flex justify-between items-center bg-gray-700 p-6 shadow-md w-full">
        <div className="w-28">
          <Link to="/">
            <img
              src="/Logoofc.png"
              alt="Logo"
              className="w-full h-auto object-contain"
            />
          </Link>
        </div>

        <nav>
          <ul className="flex gap-6 items-center font-medium text-white">
            <li>
              <Link className="hover:text-indigo-400 transition" to="/Hamburguer">
                Hamburguer
              </Link>
            </li>
            <li>
              <Link className="hover:text-indigo-400 transition" to="/Beirute">
                Beirute
              </Link>
            </li>
            <li>
              <Link className="hover:text-indigo-400 transition" to="/Bebidas">
                Bebidas
              </Link>
            </li>

            {/* Carrinho Desktop */}
            <li>
              <Link
                to="/Carrinho"
                className="relative flex items-center gap-2 hover:text-indigo-400 transition"
              >
                <ShoppingCartIcon className="w-6 h-6" />

                {/* Badge */}
                {totalItens > 0 && (
                  <span className="absolute -top-2 -right-3 
                                   bg-indigo-600 text-white 
                                   text-xs font-bold 
                                   w-5 h-5 flex items-center 
                                   justify-center rounded-full">
                    {totalItens}
                  </span>
                )}

                <span>Carrinho</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Barra fixa inferior (mobile) */}
      <nav className="sm:hidden fixed bottom-0 w-full bg-gray-700 text-white flex justify-around p-3 shadow-inner z-50">

        <Link className="flex flex-col items-center text-sm hover:text-indigo-400 transition" to="/Hamburguer">
          🍔
          <span>Hamburguer</span>
        </Link>

        <Link className="flex flex-col items-center text-sm hover:text-indigo-400 transition" to="/Beirute">
          🥪
          <span>Beirute</span>
        </Link>

        <Link className="flex flex-col items-center text-sm hover:text-indigo-400 transition" to="/Bebidas">
          🥤
          <span>Bebidas</span>
        </Link>

        {/* Carrinho Mobile */}
        <Link
          className="relative flex flex-col items-center text-sm hover:text-indigo-400 transition"
          to="/Carrinho"
        >
          <ShoppingCartIcon className="w-6 h-6" />

          {totalItens > 0 && (
            <span className="absolute -top-1 right-3 
                             bg-indigo-600 text-white 
                             text-xs font-bold 
                             w-5 h-5 flex items-center 
                             justify-center rounded-full">
              {totalItens}
            </span>
          )}

          <span>Carrinho</span>
        </Link>
      </nav>

      {/* Espaço inferior para não cortar conteúdo atrás da barra */}
      <div className="sm:hidden h-20"></div>
    </>
  );
}