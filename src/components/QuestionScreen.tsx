import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface QuestionScreenProps {
  userName: string;
  onYesClick: () => void;
}

function QuestionScreen({ userName, onYesClick }: QuestionScreenProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonSize, setNoButtonSize] = useState(100);
  const [isYesAnimating, setIsYesAnimating] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);

  const messages = [
    "Yakin nih?",
    "Coba pikir lagi deh...",
    "Kok gitu sih?",
    "Jangan gitu dong...",
    "Ayolah pleasee...",
    "Masa iya sih?",
    "Gabisa klik aku!",
    "Gabisaa Wleeeeee....", 
  ];

  useEffect(() => {
    const handleResize = () => {
      setNoButtonPosition({ x: 0, y: 0 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNoHover = () => {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 200;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: newX, y: newY });
    setNoButtonSize(Math.max(50, noButtonSize - 10));
    setNoClickCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsYesAnimating(true);
    setTimeout(() => {
      onYesClick();
    }, 800);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 flex items-center justify-center p-4 transition-all duration-500 ${isYesAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <Heart className="w-20 h-20 text-rose-500 animate-bounce" fill="currentColor" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Hai {userName}!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            You make my days better, be mine?
          </p>
        </div>

        {noClickCount > 0 && (
          <p className="text-rose-600 font-semibold mb-6 animate-bounce text-lg">
            {messages[Math.min(noClickCount - 1, messages.length - 1)]}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 relative">
          <button
            onClick={handleYesClick}
            className={`bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-4 px-12 rounded-full hover:from-green-500 hover:to-emerald-600 transform hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-green-300/50 text-xl ${isYesAnimating ? 'scale-150 opacity-0' : ''}`}
          >
            Yes
          </button>

          <button
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            onTouchStart={handleNoHover}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonSize / 100})`,
            }}
            className="bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold py-4 px-12 rounded-full hover:from-red-500 hover:to-rose-600 transition-all duration-300 shadow-2xl text-xl absolute sm:relative"
          >
            No
          </button>
        </div>

        <div className="mt-16 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-8 h-8 text-rose-400 animate-pulse"
              fill="currentColor"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;
