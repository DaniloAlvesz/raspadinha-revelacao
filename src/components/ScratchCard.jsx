import React, { useRef, useEffect, useState, useCallback } from 'react';
import { soundManager } from '../utils/audio';
import { CatIllustration } from './CatIllustration';
import { Sparkles } from 'lucide-react';

export const ScratchCard = ({
  index,
  cardData,
  onFirstInteract,
  onRevealed,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const lastPosRef = useRef(null);
  const isInitializedRef = useRef(false);
  const isRevealedRef = useRef(false);
  const strokeCountRef = useRef(0);

  // Pintar a superfície da raspadinha apenas UMA VEZ no mount
  const paintLotteryLayer = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width || 110;
    const height = rect.height || 110;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Gradiente metálico prateado
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.35, '#cbd5e1');
    grad.addColorStop(0.5, '#f8fafc');
    grad.addColorStop(0.7, '#cbd5e1');
    grad.addColorStop(1, '#64748b');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Partículas metálicas sutis
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Padrão de interrogações
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(100, 116, 139, 0.35)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const step = 28;
    for (let x = 14; x < width; x += step) {
      for (let y = 14; y < height; y += step) {
        ctx.fillText('?', x, y);
      }
    }

    // Selo central "RASPE 🐾"
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.28;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(248, 250, 252, 0.95)';
    ctx.shadowColor = 'rgba(15, 23, 42, 0.3)';
    ctx.shadowBlur = 6;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#f9a8d4';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText('🐾', cx, cy - 8);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 11px system-ui, sans-serif';
    ctx.fillText('RASPE', cx, cy + 12);
  }, []);

  useEffect(() => {
    if (!isInitializedRef.current) {
      const timer = setTimeout(() => {
        paintLotteryLayer();
        isInitializedRef.current = true;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [paintLotteryLayer]);

  // Verificar porcentagem transparente (amostragem 20x20)
  const checkTransparency = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const samplesX = 20;
      const samplesY = 20;
      const stepX = Math.floor(w / samplesX);
      const stepY = Math.floor(h / samplesY);

      let transparentCount = 0;
      let totalSampled = 0;

      for (let y = Math.floor(stepY / 2); y < h; y += stepY) {
        for (let x = Math.floor(stepX / 2); x < w; x += stepX) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] < 128) {
            transparentCount++;
          }
          totalSampled++;
        }
      }

      if (totalSampled > 0) {
        const pct = Math.round((transparentCount / totalSampled) * 100);

        if (pct >= 45 && !isRevealedRef.current) {
          isRevealedRef.current = true;
          setIsRevealed(true);
          setIsFading(true);

          if (cardData?.isReveal) {
            soundManager.playGrandFanfare();
          } else {
            soundManager.playCardRevealed();
          }

          if (onRevealed) {
            onRevealed(index, cardData);
          }
        }
      }
    } catch {
      // Ignora erro eventual de amostragem
    }
  }, [cardData, index, onRevealed]);

  // Apagar traço suave no canvas
  const scratchTo = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const brushRadius = Math.max(24, rect.width * 0.2) * dpr;

    if (lastPosRef.current) {
      ctx.lineWidth = brushRadius * 2;
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPosRef.current = { x, y };

    soundManager.playScratch();

    strokeCountRef.current++;
    if (strokeCountRef.current % 3 === 0) {
      checkTransparency();
    }
  };

  const handleStart = (clientX, clientY) => {
    if (isRevealedRef.current) return;
    setIsScratching(true);

    if (onFirstInteract) {
      onFirstInteract(index);
    }

    lastPosRef.current = null;
    scratchTo(clientX, clientY);
  };

  const handleMove = (clientX, clientY) => {
    if (!isScratching || isRevealedRef.current) return;
    scratchTo(clientX, clientY);
  };

  const handleEnd = () => {
    setIsScratching(false);
    lastPosRef.current = null;
    checkTransparency();
  };

  const isFinalBoyCard = cardData?.isReveal;

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square rounded-2xl overflow-hidden select-none transition-all duration-300 ${
        isRevealed && isFinalBoyCard
          ? 'ring-4 ring-white z-20 scale-[1.04] shadow-[0_0_50px_rgba(255,255,255,0.7)]'
          : 'ring-1 ring-white/20 shadow-md hover:ring-white/30'
      }`}
    >
      {/* CAMADA 100% LIMPA: IMAGEM/GIF OCUPA O CARD INTEIRO SEM NENHUM TEXTO BLOQUEANDO */}
      <div className="absolute inset-0 w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
        {cardData?.image && !imgError ? (
          <img
            src={cardData.image}
            alt="Meme de Gatinho"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900">
            <CatIllustration
              type={cardData?.illustrationType || 'shocked'}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Brilho especial no cartão final sem bloquear a imagem */}
        {isFinalBoyCard && (
          <div className="absolute inset-0 pointer-events-none ring-inset ring-4 ring-sky-400/90 shadow-[inset_0_0_25px_rgba(56,189,248,0.6)] flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-sky-200 animate-spin opacity-80" />
          </div>
        )}
      </div>

      {/* CAMADA SUPERIOR DO CANVAS (RASPADINHA PRATEADA) */}
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          if (e.button === 0) handleStart(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            if (e.cancelable) e.preventDefault();
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={handleEnd}
        className={`absolute inset-0 w-full h-full cursor-pointer touch-none z-20 transition-opacity duration-300 ease-out ${
          isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />
    </div>
  );
};
