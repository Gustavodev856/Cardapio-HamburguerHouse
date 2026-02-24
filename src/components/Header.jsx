import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <>
      {/* Logo e topo (desktop) */}
      <header className="hidden sm:flex justify-between items-center bg-gray-700 p-6 shadow-md w-full">
        <div className="w-28">
          <img src="/Logoofc.png" alt="Logo" className="w-full h-auto object-contain" />
        </div>
        <nav>
          <ul className="flex gap-6 items-center font-medium text-white">
            <li>
              <Link className="hover:text-indigo-400 transition" to="/Hamburguer">Hamburguer</Link>
            </li>
            <li>
              <Link className="hover:text-indigo-400 transition" to="/Beirute">Beirute</Link>
            </li>
            <li>
              <Link className="hover:text-indigo-400 transition" to="/Bebidas">Bebidas</Link>
            </li>
            <li className="flex items-center gap-2">
              <ShoppingCartIcon className="w-6 h-6" />
              <Link className="hover:text-indigo-400 transition" to="/Carrinho">Carrinho</Link>
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
        <Link className="flex flex-col items-center text-sm hover:text-indigo-400 transition" to="/Carrinho">
          <ShoppingCartIcon className="w-6 h-6" />
          <span>Carrinho</span>
        </Link>
      </nav>

      {/* Espaço inferior para não cortar conteúdo atrás da barra */}
      <div className="sm:hidden h-20"></div>
    </>
  );
}