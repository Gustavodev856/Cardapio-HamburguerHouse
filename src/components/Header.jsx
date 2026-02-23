import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="flex flex-col sm:flex-row justify-between items-center bg-gray-700 p-6 w-full shadow-md">
      {/* Logo */}
      <div>
        <h1 className="w-28 transition-transform duration-300 hover:-translate-y-1">
          <img src="src/assets/Logoofc.png" alt="Logo" className="w-full h-auto object-contain"/>
        </h1>
      </div>

      {/* Botão Hamburger para mobile */}
      <button
        className="sm:hidden mt-4 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Navegação */}
      <nav className={`w-full sm:w-auto mt-4 sm:mt-0 ${menuOpen ? "block" : "hidden"} sm:block`}>
        <ul className="flex flex-col sm:flex-row gap-6 items-center font-medium text-white">
          <li>
            <Link
              to="/Hamburguer"
              className="transition-transform duration-300 hover:-translate-y-1 hover:text-indigo-400"
            >
              Hamburguer
            </Link>
          </li>
          <li>
            <Link
              to="/Beirute"
              className="transition-transform duration-300 hover:-translate-y-1 hover:text-indigo-400"
            >
              Beirute
            </Link>
          </li>
          <li>
            <Link
              to="/Bebidas"
              className="transition-transform duration-300 hover:-translate-y-1 hover:text-indigo-400"
            >
              Bebidas
            </Link>
          </li>
          <li>
            <Link
              to="/Carrinho"
              className="flex items-center gap-2 transition-transform duration-300 hover:-translate-y-1 hover:text-indigo-400"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="font-semibold">Carrinho</span>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}