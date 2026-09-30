import React, { useState, useCallback, useRef } from 'react';
import { TROLL_MEMES, FINAL_REVEAL } from './data/memes';
import { ScratchCard } from './components/ScratchCard';
import { SplashScreen } from './components/SplashScreen';
import { triggerBoyConfetti } from './utils/confetti';
import { soundManager } from './utils/audio';
import { Sparkles, Volume2, VolumeX, RotateCcw, Share2 } from 'lucide-react';
import bgScratch from './assets/bg_scratch.png';

// ─── Compartilhar ─────────────────────────────────────────────────────────────
const handleShare = async () => {
  const shareData = {
    title: 'É UM MENINO! 💙 - Levi chegou!',
    text: '🐾 Raspadinha do Chá Revelação: É UM MENINO! Bem-vindo, Levi! 👑💙🍼',
    url: window.location.href,
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(`🐾 É UM MENINO! Bem-vindo, Levi! 👑💙🍼\n${window.location.href}`);
      alert('✅ Link copiado! Compartilhe com todos!');
    } catch {
      alert('🐾 É UM MENINO! Bem-vindo, Levi! 👑💙🍼');
    }
  }
};
// ─────────────────────────────────────────────────────────────────────────────

export const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [assignedCards, setAssignedCards] = useState(() => Array(9).fill(null));
  const [revealedCount, setRevealedCount] = useState(0);
  const [isGrandReveal, setIsGrandReveal] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  const [activeMessage, setActiveMessage] = useState({
    title: "Raspadinha Pronta! 🐾",
    subtitle: "Passe o dedo ou o mouse sobre os cartões para raspar.",
    emoji: "🐾",
    isBoy: false,
  });

  const interactedOrderRef = useRef([]);

  const handleFirstInteract = useCallback((cardIndex) => {
    if (interactedOrderRef.current.includes(cardIndex)) return;
    interactedOrderRef.current.push(cardIndex);
    const orderPosition = interactedOrderRef.current.length - 1;
    const contentToAssign = orderPosition < 8 ? TROLL_MEMES[orderPosition] : FINAL_REVEAL;
    setActiveMessage({
      title: contentToAssign.title,
      subtitle: contentToAssign.subtitle,
      emoji: contentToAssign.emoji,
      isBoy: !!contentToAssign.isReveal,
    });
    setAssignedCards((prev) => {
      const updated = [...prev];
      updated[cardIndex] = contentToAssign;
      return updated;
    });
  }, []);

  const handleRevealed = useCallback((cardIndex, cardData) => {
    setRevealedCount((prev) => prev + 1);
    if (cardData) {
      setActiveMessage({
        title: cardData.title,
        subtitle: cardData.subtitle,
        emoji: cardData.emoji,
        isBoy: !!cardData.isReveal,
      });
    }
    if (cardData?.isReveal) {
      setIsGrandReveal(true);
      triggerBoyConfetti();
      setTimeout(() => setShowCelebrationModal(true), 1000);
    }
  }, []);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleRestart = () => {
    interactedOrderRef.current = [];
    setAssignedCards(Array(9).fill(null));
    setRevealedCount(0);
    setIsGrandReveal(false);
    setShowCelebrationModal(false);
    setActiveMessage({
      title: "Raspadinha Pronta! 🐾",
      subtitle: "Passe o dedo ou o mouse sobre os cartões para raspar.",
      emoji: "🐾",
      isBoy: false,
    });
    setGridKey((k) => k + 1);
    setShowSplash(true);
  };

  return (
    <>
      {showSplash && <SplashScreen onStart={() => setShowSplash(false)} />}

      <main
        className={`relative w-full h-[100dvh] h-screen max-h-[100dvh] overflow-hidden text-white flex flex-col justify-between items-center px-3 py-2 sm:py-3 max-w-md mx-auto select-none font-['Plus_Jakarta_Sans',sans-serif] transition-opacity duration-300 ${showSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {/* ── FUNDO ── */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img src={bgScratch} alt="" className="w-full h-full object-cover object-top" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* ── HEADER ── */}
        <header className="relative z-10 w-full flex flex-col items-center text-center pt-0.5">
          <div className="w-full flex items-center justify-between mb-1">
            {/* Badge neutro: branco translúcido */}
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-bold text-white/90">
              <Sparkles className="w-3 h-3 text-white/80" />
              <span>Chá Revelação Digital</span>
            </div>

            <button
              onClick={toggleSound}
              aria-label="Controle de Áudio"
              className="p-1 rounded-full bg-white/15 border border-white/20 text-white/80 hover:bg-white/25 transition-colors"
            >
              {isMuted
                ? <VolumeX className="w-4 h-4 text-white/50" />
                : <Volume2 className="w-4 h-4 text-white/80" />}
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Fredoka'] animate-float-slow leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Raspadinha da Revelação felina! 🐾
          </h1>
          <p className="text-[11px] sm:text-xs text-white/80 font-medium mt-0.5 drop-shadow">
            Raspe os 9 cartões para descobrir o segredo do bebê!
          </p>

          {/* Barra de progresso — branco/cinza neutro */}
          <div className="w-full max-w-[260px] mt-1.5 flex items-center gap-2">
            <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden border border-white/20 p-0.5">
              <div
                className="h-full bg-white/80 rounded-full transition-all duration-300"
                style={{ width: `${(revealedCount / 9) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-extrabold text-white/90 whitespace-nowrap drop-shadow">
              {revealedCount}/9 raspados
            </span>
          </div>
        </header>

        {/* ── GRID 3×3 ── */}
        <section
          key={gridKey}
          aria-label="Grid 3x3 de Raspadinhas"
          className="relative z-10 w-full flex-1 flex items-center justify-center my-1"
        >
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-[340px] sm:max-w-[370px] aspect-square p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-2xl">
            {Array.from({ length: 9 }).map((_, idx) => (
              <ScratchCard
                key={idx}
                index={idx}
                cardData={assignedCards[idx]}
                onFirstInteract={handleFirstInteract}
                onRevealed={handleRevealed}
              />
            ))}
          </div>
        </section>

        {/* ── MENSAGEM DO MEME ── */}
        <footer className="relative z-10 w-full flex flex-col items-center text-center pb-1.5 px-1">
          <div
            className={`w-full max-w-[340px] sm:max-w-[370px] py-2 px-3.5 rounded-2xl backdrop-blur-md border transition-all duration-300 flex items-center gap-3 ${
              activeMessage.isBoy
                ? 'bg-white/20 border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                : 'bg-black/35 border-white/15 shadow-lg'
            }`}
          >
            <div className="text-2xl shrink-0">
              {activeMessage.isBoy ? '👑' : activeMessage.emoji || '🐾'}
            </div>
            <div className="flex-1 text-left min-w-0">
              <h2 className="text-xs sm:text-sm font-black truncate leading-tight text-white">
                {activeMessage.title}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-white/75 truncate font-medium mt-0.5">
                {activeMessage.subtitle}
              </p>
            </div>
          </div>
        </footer>

        {/* ── MODAL DE CELEBRAÇÃO ── */}
        {showCelebrationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-xs bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/30 shadow-2xl text-center flex flex-col items-center">

              {/* Coroa */}
              <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center mb-3">
                <span className="text-3xl animate-bounce">👑</span>
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider text-white/80 bg-white/10 px-3 py-0.5 rounded-full border border-white/20 mb-2">
                Chá Revelação Oficial
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Fredoka'] mb-1 drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
                É UM MENINO! 💙
              </h2>

              {/* Nome Levi em destaque neutro/dourado */}
              <div className="mb-2 px-5 py-1.5 rounded-full bg-white/20 border border-white/30 shadow-lg">
                <span className="text-xl font-black text-white tracking-widest font-['Fredoka'] drop-shadow">
                  Bem-vindo, Levi! 👶
                </span>
              </div>

              <p className="text-xs text-white/80 font-medium mb-4 leading-relaxed">
                O principezinho da família está a caminho! Parabéns aos papais por essa bênção tão especial! 🍼✨
              </p>

              <div className="flex flex-col w-full gap-2">
                {/* Confetes */}
                <button
                  onClick={() => triggerBoyConfetti()}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Soltar Mais Confetes! 🎉</span>
                </button>

                {/* Compartilhar */}
                <button
                  onClick={handleShare}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar a Notícia! 💌</span>
                </button>

                {/* Recomeçar */}
                <button
                  onClick={handleRestart}
                  className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Raspar Novamente</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
