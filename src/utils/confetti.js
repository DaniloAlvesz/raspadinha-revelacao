import confetti from 'canvas-confetti';

export const triggerBoyConfetti = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;

  // Blue boy color palette: Sky blue, Royal blue, Baby blue, Gold accents, Crisp white
  const colors = ['#38bdf8', '#3b82f6', '#1d4ed8', '#93c5fd', '#facc15', '#ffffff'];

  // 1. Initial big celebratory pop
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2,
  });

  // 2. Stars burst
  confetti({
    particleCount: 40,
    spread: 360,
    ticks: 60,
    origin: { y: 0.5 },
    colors: ['#38bdf8', '#60a5fa', '#fef08a'],
    shapes: ['star'],
    scalar: 1.5,
  });

  // 3. Side cannons stream for duration
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });
  }, 250);
};
