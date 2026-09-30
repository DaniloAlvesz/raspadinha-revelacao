import React, { useState, useEffect } from 'react';
import introBanner from '../assets/intro_banner.png';

export const SplashScreen = ({ onStart }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para o fade-in inicial
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleStart = () => {
    setVisible(false);
    // Aguarda o fade-out antes de mostrar a raspadinha
    setTimeout(onStart, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-end bg-slate-950 transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      {/* Imagem ocupa a tela toda (modo portrait) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={introBanner}
          alt="Chá Revelação - Menino ou Menina?"
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
        {/* Gradiente escurecendo o rodapé para o botão ficar legível */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* Rodapé com CTA */}
      <div className="relative z-10 w-full flex flex-col items-center pb-10 px-6 gap-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🐾</span>
          <h1 className="text-lg font-black text-black font-['Fredoka'] tracking-wide text-center leading-tight">
            Raspadinha da Revelação!
          </h1>
          <span className="text-xl">🐾</span>
        </div>


        <button
          onClick={handleStart}
          className="w-full max-w-[300px] py-3.5 rounded-2xl bgblack text-white font-black text-base shadow-[0_0_30px_white] hover:shadow-[0_0_45px_rgba(236,72,153,0.8)] active:scale-95 transition-all duration-200 tracking-wide uppercase"
        >
          Começar a Raspar! 🪙
        </button>
      </div>
    </div>
  );
};
