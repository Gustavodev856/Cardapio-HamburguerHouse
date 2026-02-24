import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "motion-plus/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "/Logoofc.png";

export default function LandingPage() {
  const [text, setText] = useState("O Melhor Hambúrguer da Cidade");

  useEffect(() => {
    const timer = setTimeout(() => {
      setText("Suculento, Crocante e Feito com Amor 🍔");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Landing Page fixa */}
      <section
        className="fixed inset-0 w-full h-full bg-cover bg-center flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('/hamburger-bg.jpg')" }}
      >
        {/* Overlay degradê */}
        <div className="absolute inset-0 bg-gray-700"></div>

        {/* Conteúdo central */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          {/* Logo */}
          <img src={Logo} alt="Logo" className="w-32 mb-6 animate-bounce" />

          {/* Título com Typewriter */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            <Typewriter backspace="all">{text}</Typewriter>
          </h1>

          {/* Subtítulo com Typewriter */}
          <p className="text-xl md:text-2xl text-yellow-300 mb-8 drop-shadow-md">
            <Typewriter backspace="word">
              Suculento, crocante e feito com amor 🍔
            </Typewriter>
          </p>

          {/* Botão */}
          <Link
            to="/hamburguer"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition duration-300"
          >
            Confira o Cardápio
          </Link>
        </div>

        {/* Gradiente inferior apenas para mobile */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent sm:hidden"></div>
      </section>

      {/* Menu fixo inferior (mobile) */}
      <nav className="fixed bottom-0 w-full bg-gray-700 text-white flex justify-around p-3 shadow-inner sm:hidden z-50">
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
    </div>
  );
}