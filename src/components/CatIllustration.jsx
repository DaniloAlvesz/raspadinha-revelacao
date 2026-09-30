import React from 'react';

export const CatIllustration = ({ type, className = "w-full h-full" }) => {
  switch (type) {
    case 'shocked':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#fef3c7"/>
          {/* Ears */}
          <polygon points="26,45 36,12 58,35" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <polygon points="94,45 84,12 62,35" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <polygon points="32,38 38,20 52,32" fill="#fde68a"/>
          <polygon points="88,38 82,20 68,32" fill="#fde68a"/>
          {/* Cat Head */}
          <circle cx="60" cy="62" r="42" fill="#fffbeb" stroke="#b45309" strokeWidth="2.5"/>
          {/* Shocked big round eyes */}
          <circle cx="44" cy="54" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5"/>
          <circle cx="76" cy="54" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5"/>
          <circle cx="44" cy="54" r="6" fill="#0f172a" />
          <circle cx="76" cy="54" r="6" fill="#0f172a" />
          <circle cx="41" cy="51" r="2.5" fill="#ffffff"/>
          <circle cx="73" cy="51" r="2.5" fill="#ffffff"/>
          {/* Open O mouth */}
          <ellipse cx="60" cy="84" rx="10" ry="15" fill="#ef4444" stroke="#991b1b" strokeWidth="2"/>
          <ellipse cx="60" cy="89" rx="6" ry="6" fill="#f87171"/>
          {/* Whiskers */}
          <line x1="16" y1="62" x2="33" y2="64" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
          <line x1="14" y1="72" x2="33" y2="70" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
          <line x1="104" y1="62" x2="87" y2="64" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
          <line x1="106" y1="72" x2="87" y2="70" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );

    case 'smug':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#f3e8ff"/>
          <polygon points="26,45 36,12 58,35" fill="#a855f7" stroke="#7e22ce" strokeWidth="2"/>
          <polygon points="94,45 84,12 62,35" fill="#a855f7" stroke="#7e22ce" strokeWidth="2"/>
          <circle cx="60" cy="62" r="42" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2.5"/>
          {/* Smug eyebrows */}
          <path d="M 36 44 Q 48 38 56 46" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M 84 44 Q 72 38 64 46" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none"/>
          {/* Half-closed smug eyes */}
          <path d="M 38 56 Q 48 50 56 56" stroke="#1e293b" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 64 56 Q 72 50 82 56" stroke="#1e293b" strokeWidth="4" strokeLinecap="round"/>
          {/* Smug crooked smile */}
          <path d="M 50 78 Q 65 86 78 72" stroke="#7e22ce" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <polygon points="58,68 62,68 60,72" fill="#ec4899"/>
        </svg>
      );

    case 'diaper':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#fef9c3"/>
          <polygon points="26,45 36,12 58,35" fill="#ca8a04"/>
          <polygon points="94,45 84,12 62,35" fill="#ca8a04"/>
          <circle cx="60" cy="62" r="42" fill="#fefce8" stroke="#ca8a04" strokeWidth="2.5"/>
          {/* Baby bonnet */}
          <path d="M 25 45 Q 60 10 95 45" stroke="#facc15" strokeWidth="7" fill="#fef08a" strokeLinecap="round"/>
          {/* Laughing eyes */}
          <path d="M 40 54 Q 48 62 56 54" stroke="#1e293b" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M 64 54 Q 72 62 80 54" stroke="#1e293b" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          {/* Chupeta */}
          <circle cx="60" cy="76" r="11" fill="#38bdf8" stroke="#0284c7" strokeWidth="2.5"/>
          <circle cx="60" cy="76" r="4" fill="#ffffff"/>
          <path d="M 53 85 Q 60 93 67 85" stroke="#0284c7" strokeWidth="3" fill="none"/>
        </svg>
      );

    case 'suspicious':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#ecfdf5"/>
          <polygon points="26,45 36,12 58,35" fill="#10b981"/>
          <polygon points="94,45 84,12 62,35" fill="#10b981"/>
          <circle cx="60" cy="62" r="42" fill="#f0fdf4" stroke="#047857" strokeWidth="2.5"/>
          {/* Squinting eyes */}
          <line x1="36" y1="52" x2="54" y2="52" stroke="#064e3b" strokeWidth="5" strokeLinecap="round"/>
          <line x1="66" y1="52" x2="84" y2="52" stroke="#064e3b" strokeWidth="5" strokeLinecap="round"/>
          {/* Flat line mouth */}
          <line x1="48" y1="74" x2="72" y2="74" stroke="#064e3b" strokeWidth="3.5" strokeLinecap="round"/>
          <polygon points="58,64 62,64 60,68" fill="#047857"/>
        </svg>
      );

    case 'hairball':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#ffe4e6"/>
          <polygon points="26,45 36,12 58,35" fill="#f43f5e"/>
          <polygon points="94,45 84,12 62,35" fill="#f43f5e"/>
          <circle cx="60" cy="62" r="42" fill="#fff1f2" stroke="#e11d48" strokeWidth="2.5"/>
          <ellipse cx="42" cy="50" rx="7" ry="9" fill="#1e293b"/>
          <ellipse cx="78" cy="50" rx="7" ry="9" fill="#1e293b"/>
          {/* Yarn ball 🧶 */}
          <circle cx="60" cy="78" r="15" fill="#fb7185" stroke="#e11d48" strokeWidth="2.5"/>
          <path d="M 51 73 Q 60 83 69 73" stroke="#ffffff" strokeWidth="2" fill="none"/>
          <path d="M 54 83 Q 60 73 66 83" stroke="#ffffff" strokeWidth="2" fill="none"/>
        </svg>
      );

    case 'error404':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#e0f2fe"/>
          <polygon points="26,45 36,12 58,35" fill="#0284c7"/>
          <polygon points="94,45 84,12 62,35" fill="#0284c7"/>
          <circle cx="60" cy="62" r="42" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5"/>
          <rect x="38" y="46" width="14" height="14" fill="#0369a1" rx="3"/>
          <rect x="68" y="46" width="14" height="14" fill="#0369a1" rx="3"/>
          <text x="60" y="80" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0369a1" fontFamily="monospace">404</text>
        </svg>
      );

    case 'polite':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#ede9fe"/>
          <polygon points="26,45 36,12 58,35" fill="#6366f1"/>
          <polygon points="94,45 84,12 62,35" fill="#6366f1"/>
          <circle cx="60" cy="62" r="42" fill="#f5f3ff" stroke="#4f46e5" strokeWidth="2.5"/>
          <circle cx="44" cy="48" r="8.5" fill="#1e293b"/>
          <circle cx="76" cy="48" r="8.5" fill="#1e293b"/>
          <circle cx="42" cy="46" r="3" fill="#ffffff"/>
          <circle cx="74" cy="46" r="3" fill="#ffffff"/>
          <path d="M 42 70 Q 60 82 78 70" stroke="#4338ca" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </svg>
      );

    case 'anxious':
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="120" fill="#fae8ff"/>
          <polygon points="26,45 36,12 58,35" fill="#d946ef"/>
          <polygon points="94,45 84,12 62,35" fill="#d946ef"/>
          <circle cx="60" cy="62" r="42" fill="#fdf4ff" stroke="#c026d3" strokeWidth="2.5"/>
          <circle cx="44" cy="50" r="9" fill="#1e293b"/>
          <circle cx="76" cy="50" r="9" fill="#1e293b"/>
          {/* Sweat drop */}
          <path d="M 88 36 C 88 36 91 43 88 46 C 85 46 85 43 88 36 Z" fill="#38bdf8"/>
          {/* Paw biting */}
          <ellipse cx="60" cy="72" rx="13" ry="8" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2.5"/>
        </svg>
      );

    case 'prince_boy':
    default:
      return (
        <svg viewBox="0 0 120 120" className={className} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Full Boy Blue Background */}
          <rect width="120" height="120" fill="#0369a1"/>
          {/* Golden Prince Crown */}
          <polygon points="40,22 45,7 60,16 75,7 80,22" fill="#fbbf24" stroke="#b45309" strokeWidth="2"/>
          <circle cx="45" cy="7" r="2.5" fill="#60a5fa"/>
          <circle cx="60" cy="16" r="3" fill="#38bdf8"/>
          <circle cx="75" cy="7" r="2.5" fill="#60a5fa"/>
          {/* Blue Kitten Ears */}
          <polygon points="30,42 38,18 56,37" fill="#0284c7" stroke="#0369a1" strokeWidth="2"/>
          <polygon points="90,42 82,18 64,37" fill="#0284c7" stroke="#0369a1" strokeWidth="2"/>
          {/* Cute Kitten Face */}
          <circle cx="60" cy="64" r="38" fill="#f0f9ff" stroke="#0284c7" strokeWidth="3"/>
          {/* Big Adorable Baby Blue Eyes */}
          <circle cx="46" cy="58" r="9.5" fill="#0284c7"/>
          <circle cx="43" cy="55" r="4" fill="#ffffff"/>
          <circle cx="48" cy="60" r="1.5" fill="#ffffff"/>
          <circle cx="74" cy="58" r="9.5" fill="#0284c7"/>
          <circle cx="71" cy="55" r="4" fill="#ffffff"/>
          <circle cx="76" cy="60" r="1.5" fill="#ffffff"/>
          {/* Nose and Smile */}
          <polygon points="58,66 62,66 60,69" fill="#f43f5e"/>
          <path d="M 53 71 Q 60 76 67 71" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          {/* Royal Blue Bow Tie */}
          <polygon points="48,86 60,90 48,94" fill="#0284c7"/>
          <polygon points="72,86 60,90 72,94" fill="#0284c7"/>
          <circle cx="60" cy="90" r="3.5" fill="#38bdf8"/>
        </svg>
      );
  }
};
