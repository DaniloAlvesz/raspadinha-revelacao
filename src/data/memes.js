// Importando os memes e gifs da pasta assets/memecats
import meme01 from '../assets/memecats/meme 01.jpg';
import meme02 from '../assets/memecats/meme 02.gif';
import meme03 from '../assets/memecats/meme 03.gif';
import meme04 from '../assets/memecats/meme 04.gif';
import meme05 from '../assets/memecats/meme 05.gif';
import meme06 from '../assets/memecats/meme 06.gif';
import meme07 from '../assets/memecats/meme 07.gif';
import meme08 from '../assets/memecats/meme 08.png';
import meninoReveal from '../assets/memecats/menino_reveal.png';

export const TROLL_MEMES = [
  {
    id: 1,
    title: "Ainda não... 🙀",
    subtitle: "Miau! Tenta outro cartão!",
    emoji: "🙀",
    image: meme01,
    illustrationType: "shocked"
  },
  {
    id: 2,
    title: "Miauuu, tenta outro! 😼",
    subtitle: "Achou que ia ser tão fácil?",
    emoji: "😼",
    image: meme02,
    illustrationType: "smug"
  },
  {
    id: 3,
    title: "Só fraldas sujas aqui 🍼😹",
    subtitle: "Pode ir preparando o lencinho!",
    emoji: "😹",
    image: meme03,
    illustrationType: "diaper"
  },
  {
    id: 4,
    title: "Achou que era agora? 🤔",
    subtitle: "Nem o gato sabe ainda...",
    emoji: "🧐",
    image: meme04,
    illustrationType: "suspicious"
  },
  {
    id: 5,
    title: "Ops! Só bola de pelo 🧶",
    subtitle: "Cof cof! Continua raspando!",
    emoji: "🧶",
    image: meme05,
    illustrationType: "hairball"
  },
  {
    id: 6,
    title: "Erro 404: Bebê não achado 😾",
    subtitle: "Reiniciando o radar felino...",
    emoji: "🤖",
    image: meme06,
    illustrationType: "error404"
  },
  {
    id: 7,
    title: "Quase lá... continua! 😸",
    subtitle: "O coração tá batendo forte?",
    emoji: "💖",
    image: meme07,
    illustrationType: "polite"
  },
  {
    id: 8,
    title: "Curiosidade ao máximo! 🐾",
    subtitle: "Atenção: só resta mais um!",
    emoji: "👀",
    image: meme08,
    illustrationType: "anxious"
  }
];

export const FINAL_REVEAL = {
  id: 9,
  isReveal: true,
  title: "É UM MENINO! 💙",
  subtitle: "O principezinho da família chegou! 👑🍼",
  emoji: "👑",
  image: meninoReveal,
  illustrationType: "prince_boy"
};
