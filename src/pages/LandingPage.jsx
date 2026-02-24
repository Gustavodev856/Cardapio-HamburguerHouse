import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "motion-plus/react"; // importa o Typewriter
import Logo from "/Logoofc.png";

export default function LandingPage() {
  const [text, setText] = useState("O Melhor Hambúrguer da Cidade");

  // Exemplo: mudar o texto dinamicamente depois de alguns segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setText("Suculento, Crocante e Feito com Amor 🍔");
    }, 4000); // muda após 4s
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center pt-28"
      style={{ backgroundImage: "url('/hamburger-bg.jpg')" }}
    >
      {/* Overlay degradê */}
      <div className="absolute inset-0 bg-linear-to-b bg-gray-700"></div>

      {/* Conteúdo central */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
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

      {/* Gradiente final */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
    </section>
  );
}